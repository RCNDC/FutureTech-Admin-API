import { GenericFilterArgs } from "./pagination_filtering";

export type AttendeeDTO={
    fullname:string;
    email:string;
    phone:string;
    ticket:string;
    entryId?:string;
}


export type AttendeeFilterArgs = Omit<GenericFilterArgs, 'companyName' | 'companyWebsite'>
