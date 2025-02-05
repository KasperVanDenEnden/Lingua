import { Id } from "./id";

export interface IComment {
    id: Id;

    student: Id; // user Id
    class: Id; // class Id

    comment: string;
    rating:number;
    createdAt:Date;
}

export type ICreateComment = Pick<IComment, 'student' | 'class' | 'comment' | 'rating'>;
export type IUpdateComment = Partial<Omit<IComment, 'id'>>;
export type IUpsertComment = IComment;