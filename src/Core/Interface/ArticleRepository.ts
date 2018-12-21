import { Repository } from '../Kernel/Repository';
import { Article } from './Article';

export interface ArticleRepository extends Repository<Article> {}
