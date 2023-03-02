import { Person } from "./Person";

export interface JwtResponse {
    token: string;
    person: Person;
}