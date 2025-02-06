import { Ankamantatra } from "./Ankamantatra"
import { User } from "./User"

export interface Enregistrement {
    id: number,
    userId: number,
    ankamantatraId: number,
    Ankamantatra: Ankamantatra,
    User: User,
    updatedAt: Date,
    createdAt: Date
}
