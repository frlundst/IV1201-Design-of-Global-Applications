import { create } from "zustand";
import { JwtRequest } from "../Types/JwtRequest";
import { JwtResponse } from "../Types/JwtResponse";
import { URL } from "../Resources/URL";
import { NavigateFunction } from "react-router-dom";

export const useAuthStore = create((set, get) => ({
    token: localStorage.getItem("token"),
    person: JSON.parse(localStorage.getItem("person") as string),
    setToken: (token: string) => set({ token }),
    login: async (jwtRequest: JwtRequest, navigate: NavigateFunction) => {
        const response = await fetch(`${URL}/api/person/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jwtRequest),
        });

        if(response.status === 200){
            response.json().then((data: JwtResponse) => {
                console.log(data);
                set({ person: data.person });
                set({ token: data.token });
                localStorage.setItem("token", data.token);
                localStorage.setItem("person", JSON.stringify(data.person));
                if(data.person.personRole === "ADMIN"){
                    navigate("/admin");
                }else{
                    navigate("/");
                }
            });
        }else{
            throw new Error("Login failed");
        }
    }
}));