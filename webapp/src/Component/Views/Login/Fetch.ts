import { URL } from "../../../Resources/URL";
import { JwtRequest } from "../../../Types/JwtRequest";

export function LoginPerson(jwtRequest: JwtRequest): Promise<Response> {
    return fetch(`${URL}/api/person/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(jwtRequest),
    });
}