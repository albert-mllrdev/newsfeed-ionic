import { IComment } from './IComment';

export interface IPost {
    id: number;
    categoryId: number;
    title: string;
    source: string;
    content: string;
    publishedAt: Date;
    isLiked: boolean;
    comments: IComment[];
}
