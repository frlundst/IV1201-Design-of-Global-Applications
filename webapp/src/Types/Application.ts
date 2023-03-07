import { Person } from "./Person";

export type Status = "Status.Unhandled | Status.Accepted | Status.Rejected";

export interface Application {
    id: string;
    person_id: string;
    status: Status;
    person: Person;
}