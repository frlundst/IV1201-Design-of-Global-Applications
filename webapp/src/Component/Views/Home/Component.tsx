import React from "react";
import { ViewBaseProps } from "../../../Internalization/ViewBaseProps";
import { useAuthStore } from "../../../Store/authStore";
import { Person } from "../../../Types/Person";
import { useNavigate } from "react-router-dom";

export const Home: React.FC<ViewBaseProps> = ({ formatText }) => {
    const navigate = useNavigate();

    const person: Person | null = useAuthStore((state: any) => state.person);

    React.useEffect(() => {
        if(!person){
            navigate("/login");
        }
    }, []);

    return (
        <div>
        <h1>Welcome {person?.name} {person?.surname}</h1>
        </div>
    );
}