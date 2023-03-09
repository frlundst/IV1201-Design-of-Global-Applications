import { create } from "zustand";
import { NewCompetenceRequest } from "../Types/NewCompetenceRequest";

export const useCompetenceStore = create((set: any, get: any) => ({
    competences: [],
    getAllCompetences: async () => {
        const response = await fetch(`http://localhost:8080/api/competences`).catch(() => alert("Failed to establish connection to server")) as Response;
        if (response.status === 200) {
            response.json().then((data: any) => {
                console.log(data);
                set({ competences: data });
            })
        } else {
            alert(response.status + ": Failed to get competences");
        }
    },
    addCompetenceProfile: async (newCompetenceRequest: NewCompetenceRequest, updatePerson: () => void) => {
        const response = await fetch(`http://localhost:8080/api/create/competenceProfile`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify(newCompetenceRequest),
        }).catch(() => alert("Failed to establish connection to server")) as Response;
        console.log(response);
        if (response.ok) {
            updatePerson();
        } else {
            alert(response.status + ": Failed to add competence profile");
        }
    },
    deleteCompetenceProfile: async (competenceProfileId: number, updatePerson: () => void) => {
        const response = await fetch(`http://localhost:8080/api/delete/competenceProfile/${competenceProfileId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
            },
        }).catch(() => alert("Failed to establish connection to server")) as Response;

        if (response.ok) {
            updatePerson();
        } else {
            alert(response.status + ": Failed to delete competence profile");
        }
    },
}));