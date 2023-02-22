import { Person } from "../../../Types/Person";

export function RegisterPerson(person: Person): Promise<Response> {
    return fetch("http://localhost:8080/api/person/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
    });
}