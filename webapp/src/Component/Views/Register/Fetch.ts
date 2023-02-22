import { URL } from "../../../Resources/URL";
import { Person } from "../../../Types/Person";

export function RegisterPerson(person: Person): Promise<Response> {
    return fetch(`${URL}/api/person/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
    });
}