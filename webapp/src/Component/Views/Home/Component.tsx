import React from "react";
import { usePersonStore } from "../../../Store/personStore";
import { Person } from "../../../Types/Person";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../Composite/Navbar";
import { Button, Container } from "@mui/material";
import { Availabilities } from "./ChildComponents/Availabilities";
import { useContextStore } from "../../../Store/contextStore";

export const sectionStyle = {
    marginBottom: "30px",
    borderBottom: "1px solid lightgray",
    paddingBottom: "30px"
} as React.CSSProperties;

export const sectionTitleStyle = {
    marginTop: "0px",
}

export const Home = () => {
    const navigate = useNavigate();

    const person: Person | null = usePersonStore((state: any) => state.person);
    const formatText = useContextStore((state: any) => state.formatText);

    document.title = formatText("View.Home.Title");

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
                    <h1>{formatText("View.Home.Welcome")} {person?.name} {person?.surname}</h1>
                </div>

                <Availabilities />

                <Button variant="contained">{formatText("View.Home.CreateApplication")}</Button>
            </Container>
        </>
    );
}