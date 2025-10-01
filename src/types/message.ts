import type { messages } from "@prisma/client"
export type Message = Omit<messages, 'id'>;