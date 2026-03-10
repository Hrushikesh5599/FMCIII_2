import { KnowledgeRepository } from '../repositories/knowledge.repository';
import { NotFoundError, ValidationError } from '../utils/errors';

interface CreateArticleDto {
  title: string;
  content: string;
  authorId: string;
}

export class KnowledgeService {
  private knowledgeRepo: KnowledgeRepository;

  constructor(knowledgeRepo = new KnowledgeRepository()) {
    this.knowledgeRepo = knowledgeRepo;
  }

  async createArticle(data: CreateArticleDto) {
    if (!data.title || !data.content) throw new ValidationError('Title and content are required');

    return this.knowledgeRepo.create({
      title: data.title,
      content: data.content,
      author: { connect: { id: data.authorId } },
    });
  }

  async getAllArticles() {
    return this.knowledgeRepo.findAll();
  }

  async getArticleById(id: string) {
    const article = await this.knowledgeRepo.findById(id);
    if (!article) throw new NotFoundError('Article');
    return article;
  }

  async updateArticle(id: string, data: Partial<CreateArticleDto>) {
    const article = await this.knowledgeRepo.findById(id);
    if (!article) throw new NotFoundError('Article');
    return this.knowledgeRepo.update(id, { title: data.title, content: data.content });
  }

  async deleteArticle(id: string) {
    const article = await this.knowledgeRepo.findById(id);
    if (!article) throw new NotFoundError('Article');
    return this.knowledgeRepo.delete(id);
  }
}
