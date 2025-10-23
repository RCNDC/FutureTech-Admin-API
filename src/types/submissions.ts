import { localcompany } from "@prisma/client";

export type Submission = {
    entry_id:string;
    fullName:string;
    email:string;
    phoneNo:string;
    registerAs:string;
}


export type LocalCompanyDTO = Omit<localcompany, 'id'>

