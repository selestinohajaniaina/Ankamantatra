import { User } from "./User";

export interface Response {
    id: number,
    content: string,
    userId: number,
    ankamantatraId: number,
    User: User
    createdAt: Date,
    updatedAt: Date,
}