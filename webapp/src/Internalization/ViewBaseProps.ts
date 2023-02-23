import { Person } from "../Types/Person";

export interface ViewBaseProps {
    formatText: (code: string) => string;
    person: Person;
}