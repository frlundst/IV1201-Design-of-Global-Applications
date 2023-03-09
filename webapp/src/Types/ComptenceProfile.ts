import { Competence } from "./Competence";

export interface CompetenceProfile {
    id: string;
    yearsOfExperience: number;
    competence: Competence;
    personId: string;
}