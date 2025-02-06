import { Enregistrement } from "./enregistrement";
import { Reaction } from "./Reaction";
import { Response } from "./response";
import { User } from "./User";

export interface Ankamantatra {
    id: number,
    content: string,
    response: string,
    userId: number,
    updatedAt: Date,
    createdAt: Date,
    User: User,
    Reactions: Reaction[],
    Responses: Response[],
    Enregistrements: Enregistrement[],
    hasLike: boolean
}