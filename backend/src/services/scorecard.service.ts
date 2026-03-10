import { ScorecardRepository } from '../repositories/scorecard.repository';
import { ApplicationRepository } from '../repositories/application.repository';
import { NotFoundError, ValidationError } from '../utils/errors';

interface CreateScorecardDto {
  applicationId: string;
  judgeId: string;
  remarks?: string;
  scores: Array<{ criteriaId: string; score: number }>;
}

export class ScorecardService {
  private scorecardRepo: ScorecardRepository;
  private appRepo: ApplicationRepository;

  constructor(
    scorecardRepo = new ScorecardRepository(),
    appRepo = new ApplicationRepository(),
  ) {
    this.scorecardRepo = scorecardRepo;
    this.appRepo = appRepo;
  }

  async createScorecard(data: CreateScorecardDto) {
    if (!data.applicationId || !data.judgeId) {
      throw new ValidationError('Application ID and judge ID are required');
    }

    const application = await this.appRepo.findById(data.applicationId);
    if (!application) throw new NotFoundError('Application');

    const scorecard = await this.scorecardRepo.create({
      application: { connect: { id: data.applicationId } },
      judge: { connect: { id: data.judgeId } },
      remarks: data.remarks,
    });

    if (data.scores && data.scores.length > 0) {
      const criteria = await this.scorecardRepo.findAllCriteria();
      const criteriaMap = new Map(criteria.map(c => [c.id, c]));

      for (const scoreItem of data.scores) {
        const criterion = criteriaMap.get(scoreItem.criteriaId);
        if (criterion) {
          await this.scorecardRepo.addScore(scorecard.id, scoreItem.criteriaId, scoreItem.score);
        }
      }

      const totalScore = this.calculateWeightedScore(data.scores, criteriaMap);
      await this.scorecardRepo.updateTotalScore(scorecard.id, totalScore);
    }

    return this.scorecardRepo.findById(scorecard.id);
  }

  private calculateWeightedScore(
    scores: Array<{ criteriaId: string; score: number }>,
    criteriaMap: Map<string, { weight: number }>,
  ): number {
    let totalWeight = 0;
    let weightedSum = 0;

    for (const scoreItem of scores) {
      const criterion = criteriaMap.get(scoreItem.criteriaId);
      if (criterion) {
        weightedSum += scoreItem.score * criterion.weight;
        totalWeight += criterion.weight;
      }
    }

    return totalWeight > 0 ? weightedSum / totalWeight : 0;
  }

  async getScorecardById(id: string) {
    const scorecard = await this.scorecardRepo.findById(id);
    if (!scorecard) throw new NotFoundError('Scorecard');
    return scorecard;
  }

  async getCriteria() {
    return this.scorecardRepo.findAllCriteria();
  }

  async seedDefaultCriteria() {
    const defaults = [
      { name: 'ProblemSolutionFit', weight: 1.5 },
      { name: 'MarketOpportunity', weight: 1.5 },
      { name: 'TeamStrength', weight: 1.2 },
      { name: 'Traction', weight: 1.0 },
      { name: 'Scalability', weight: 1.3 },
    ];

    const existing = await this.scorecardRepo.findAllCriteria();
    const existingNames = new Set(existing.map(c => c.name));

    for (const criterion of defaults) {
      if (!existingNames.has(criterion.name)) {
        await this.scorecardRepo.createCriteria(criterion.name, criterion.weight);
      }
    }

    return this.scorecardRepo.findAllCriteria();
  }
}
