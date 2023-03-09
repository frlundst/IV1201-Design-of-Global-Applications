import { create } from "zustand";
import { JwtRequest } from "../Types/JwtRequest";
import { JwtResponse } from "../Types/JwtResponse";
import { URL } from "../Resources/URL";
import { NavigateFunction } from "react-router-dom";
import { Person } from "../Types/Person";
import { Availability } from "../Types/Availability";
import { Application } from "../Types/Application";

export const usePersonStore = create((set: any, get: any) => ({
    token: localStorage.getItem("token"),
    person: JSON.parse(localStorage.getItem("person") as string),
    application: null,
    setToken: (token: string) => set({ token }),
    /**
     * Login the user and navigate to the correct page.
     * @param jwtRequest 
     * @param navigate 
     */
    login: async (jwtRequest: JwtRequest, navigate: NavigateFunction) => {
        const response = await fetch(`${URL}/api/person/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jwtRequest),
        }).catch(() => alert("Failed to establish connection to server")) as Response;;

        if (response.status === 200) {
            response.json().then((data: JwtResponse) => {
                console.log(data);
                set({ person: data.person });
                set({ token: data.token });
                localStorage.setItem("token", data.token);
                localStorage.setItem("person", JSON.stringify(data.person));
                if (data.person.personRole === "ADMIN") {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
            });
        } else {
            alert(response.status + ": Failed to login");
        }
    },
    /**
     * Logout the user and navigate to the login page.
     */
    logout: (navigate: NavigateFunction) => {
        set({ token: undefined });
        set({ person: undefined });
        localStorage.removeItem("token");
        localStorage.removeItem("person");
        navigate("/login");
    },
    /**
     * Each time we update a persons data, use this function to fetch the latest data from the server.
     */
    updatePerson: async () => {
        const person: Person = get().person;
        const response = await fetch(`${URL}/api/person/${person.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        }).catch(() => alert("Failed to establish connection to server")) as Response;

        if (response.status === 200) {
            response.json().then((data: Person) => {
                set({ person: data });
                localStorage.setItem("person", JSON.stringify(data));
            });
        } else {
            alert(response.status + ": Failed to update person");
        }
    },
    /**
     * Add availability to the logged in person.
     * @param availability 
     */
    addAvailability: async (availability: Availability) => {
        const response = await fetch(`${URL}/api/availability/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(availability),
        }).catch(() => alert("Failed to establish connection to server")) as Response;

        if (response.status !== 200) {
            alert(response.status + ": Failed to add availability");
        }

        usePersonStore.getState().updatePerson();
    },
    /**
     * Remove availability from the logged in person.
     * @param id
     */
    removeAvailability: async (id: string) => {
        const response = await fetch(`${URL}/api/availability/remove/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        }).catch(() => alert("Failed to establish connection to server")) as Response;

        if (response.status !== 200) {
            alert(response.status + ": Failed to remove availability");
        }

        usePersonStore.getState().updatePerson();
    },
    /**
     * Add an application to the logged in person.
     */
    addApplication: async () => {
        const response = await fetch(`${URL}/api/application/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        }).catch(() => alert("Failed to establish connection to server")) as Response;

        if (response.status !== 200) {
            alert(response.status + ": Failed to add application");
        }

        usePersonStore.getState().updatePerson();
        usePersonStore.getState().getApplication();
    },
    getApplication: async () => {
        const response = await fetch(`${URL}/api/application/get`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        }).catch(() => alert("Failed to establish connection to server")) as Response;

        if (response.status === 200) {
            response.json().then((data: Application) => {
                console.log(data);
                set({ application: data });
            }).catch((error: Error) => {
                set({ application: null });
            });
        } else {
            alert(response.status + ": Failed to get application");
        }
    },
    deleteApplication: async (applicationId: String) => {
        const response = await fetch(`${URL}/api/application/delete/${applicationId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        }).catch(() => alert("Failed to establish connection to server")) as Response;

        if (response.ok) {
            usePersonStore.getState().getApplication();
        } else {
            alert(response.status + ": Failed to delete application");
        }
    },
}));