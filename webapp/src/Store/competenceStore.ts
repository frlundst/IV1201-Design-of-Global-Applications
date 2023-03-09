import { create } from "zustand";
import { Person } from "../Types/Person";
import { URL } from "../Resources/URL";
import { Application } from "../Types/Application";
import { UpdateApplicationStatusRequest } from "../Types/UpdateApplicationStatusRequest";
import {Competence} from "../Types/Competence";


export const useCompetenceStore = create((set: any, get: any) => ({
    competenceList: null,
    competenceProfileList: null,
    
    getCompetenceList: async () => { // FETCH ALL COMPETENCES OK?
        const response = await fetch(`${URL}/api/competences`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });

        console.log(response);

        if (response.status === 200) {
            response.json().then((data: Competence[]) => {
                console.log(data);
                set({ competenceList: data }); // set competenceList to data ok?.
            });
        }
        else {
            throw new Error("Could not fetch");
        }  
    },

    createCompetenceProfile: async (Id:string, yearsOfExperience:string) => { // FETCH ALL COMPETENCES OK?
        const response = await fetch(`${URL}/api/competences`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });

        console.log(response);

        if (response.status === 200) {
            response.json().then((data: Competence[]) => {
                console.log(data);
                set({ competenceList: data }); // set competenceList to data ok?.
            });
        }
        else {
            throw new Error("Could not fetch");
        }  
    },



    getCompetenceProfileListNOTUSED: async () => { // FETCH ALL COMPETENCES OK?
        const response = await fetch(`${URL}/api/competences`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });

        console.log(response);

        if (response.status === 200) {
            response.json().then((data: Competence[]) => {
                console.log(data);
                set({ competenceList: data }); // set competenceList to data ok?.
            });
        }
        else {
            throw new Error("Could not fetch");
        }  
    }




}));