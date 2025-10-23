export type User = {
    email:string,
    password: string,
    isLocked: number,
    createdAt: Date,
    updatedAt: Date,
    isNew: number
}