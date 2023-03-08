import { Application } from "./Application";
import { Availability } from "./Availability";
import { CompetenceProfile } from "./ComptenceProfile";

export interface Person {
    id: string;
    name: string;
    surname: string;
    pnr: string;
    email: string;
    password: string;
    personRole: "USER" | "ADMIN";
    username: string;
    availabilities: Availability[];
    competenceProfiles: CompetenceProfile[];
}