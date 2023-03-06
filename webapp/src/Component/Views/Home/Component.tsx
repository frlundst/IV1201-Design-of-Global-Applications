import React from "react";
import { usePersonStore } from "../../../Store/personStore";
import { Person } from "../../../Types/Person";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../Composite/Navbar";
import { Button, Container } from "@mui/material";
import { Availabilities } from "./ChildComponents/Availabilities";

export const sectionStyle = {
    marginBottom: "30px",
    borderBottom: "1px solid lightgray",
    //borderRadius: "5px",
    paddingBottom: "30px"
} as React.CSSProperties;

export const sectionTitleStyle = {
    marginTop: "0px",
}

export const Home = () => {
    const navigate = useNavigate();

    const person: Person | null = usePersonStore((state: any) => state.person);

    React.useEffect(() => {
        if (!person) {
            navigate("/login");
        }
        if (person?.personRole === "ADMIN") {
            navigate("/admin");
        }
    }, [person]);

    return (
        <>
            <Navbar />
            <Container>
                <div style={sectionStyle}>
                    <h1>Welcome {person?.name} {person?.surname}</h1>
                </div>

                <Availabilities />

                <div style={sectionStyle}>
                    <h2>Competence profiles</h2>
                </div>

                <Button variant="contained">Create application</Button>
            </Container>
        </>
    );
}