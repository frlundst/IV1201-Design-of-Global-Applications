import { create } from "zustand";
import { Person } from "../Types/Person";
import { URL } from "../Resources/URL";
import { Application } from "../Types/Application";
import { UpdateApplicationStatusRequest } from "../Types/UpdateApplicationStatusRequest";

export const useAdminStore = create((set: any, get: any) => ({
    persons: [],
    applications: [],
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
    },
    fetchAllApplications: async () => {
        const response = await fetch(`${URL}/api/allApplications`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });

        console.log(response);

        if (response.status === 200) {
            response.json().then((data: Application[]) => {
                console.log(data);
                set({ applications: data });
            });
        }
    },
    updateApplicationStatus: async (updateApplicationStatusRequest: UpdateApplicationStatusRequest) => {
        const response = await fetch(`${URL}/api/updateApplicationStatus`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(updateApplicationStatusRequest)
        });

        console.log(response);

        if (response.status === 200) {
            useAdminStore.getState().fetchAllApplications();
        }
    }
}));