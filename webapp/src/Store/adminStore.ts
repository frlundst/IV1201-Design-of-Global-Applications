import { create } from "zustand";
import { Person } from "../Types/Person";
import { URL } from "../Resources/URL";

export const useAdminStore = create((set: any, get: any) => ({
    persons: [],
    fetchAllPersons: async () => {
        const response = await fetch(`${URL}/api/allPersons`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });

        console.log(response);

        if (response.status === 200) {
            response.json().then((data: Person[]) => {
                console.log(data);
                set({ persons: data });
            });
        }
    }
}));