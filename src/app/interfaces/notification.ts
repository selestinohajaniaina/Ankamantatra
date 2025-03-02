import { Ankamantatra } from "./Ankamantatra"
import { User } from "./User"

export interface Notification {
    type: string,
    message: string,
    isRead: boolean,
    userId: number,
    ankamantatraId: number,
    createdAt: Date,
    updatedAt: Date,
    Ankamantatra: Ankamantatra,
    User: User
}
