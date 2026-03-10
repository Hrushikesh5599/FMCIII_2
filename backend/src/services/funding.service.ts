import { FundingRepository } from '../repositories/funding.repository';
import { StartupRepository } from '../repositories/startup.repository';
import { UserRepository } from '../repositories/user.repository';
import { NotFoundError, ValidationError } from '../utils/errors';

interface CreateFundingDto {
  startupId: string;
  investorId: string;
  fundingDate: string;
  amount: number;
  fundingType: string;
}

export class FundingService {
  private fundingRepo: FundingRepository;
  private startupRepo: StartupRepository;
  private userRepo: UserRepository;

  constructor(
    fundingRepo = new FundingRepository(),
    startupRepo = new StartupRepository(),
    userRepo = new UserRepository(),
  ) {
    this.fundingRepo = fundingRepo;
    this.startupRepo = startupRepo;
    this.userRepo = userRepo;
  }

  async createFunding(data: CreateFundingDto) {
    if (!data.startupId || !data.investorId || !data.amount) {
      throw new ValidationError('Startup ID, investor ID, and amount are required');
    }

    const startup = await this.startupRepo.findById(data.startupId);
    if (!startup) throw new NotFoundError('Startup');

    const investor = await this.userRepo.findById(data.investorId);
    if (!investor) throw new NotFoundError('Investor');

    return this.fundingRepo.create({
      startup: { connect: { id: data.startupId } },
      investor: { connect: { id: data.investorId } },
      fundingDate: new Date(data.fundingDate),
      amount: data.amount,
      fundingType: data.fundingType,
    });
  }

  async getAllFunding() {
    return this.fundingRepo.findAll();
  }

  async getFundingByStartup(startupId: string) {
    return this.fundingRepo.findByStartup(startupId);
  }

  async getFundingById(id: string) {
    const funding = await this.fundingRepo.findById(id);
    if (!funding) throw new NotFoundError('Funding record');
    return funding;
  }

  async getAnalytics() {
    const allFunding = await this.fundingRepo.findAll();
    const totalAmount = allFunding.reduce((sum, f) => sum + f.amount, 0);
    const byType = allFunding.reduce((acc: Record<string, number>, f) => {
      acc[f.fundingType] = (acc[f.fundingType] || 0) + f.amount;
      return acc;
    }, {});

    return { totalAmount, byType, count: allFunding.length, records: allFunding };
  }
}
