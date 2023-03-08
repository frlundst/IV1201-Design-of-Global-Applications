import { Button } from "@mui/material";
import { usePersonStore } from "../../../../Store/personStore";
import { Application as ApplicationType } from "../../../../Types/Application";
import { useContextStore } from "../../../../Store/contextStore";
import React from "react";
import { sectionStyle, sectionTitleStyle } from "../Component";

export const Application = () => {
    const application: ApplicationType | null = usePersonStore((state: any) => state.application);
    const getApplication = usePersonStore((state: any) => state.getApplication);
    const addApplication = usePersonStore((state: any) => state.addApplication);
    const formatText = useContextStore((state: any) => state.formatText);
    const deleteApplication = usePersonStore((state: any) => state.deleteApplication);

    React.useEffect(() => {
        getApplication();
    }, [getApplication]);

    function getStatusColor(status: string) {
        switch (status) {
            case "Status.Unhandled":
                return "black";
            case "Status.Accepted":
                return "green";
            case "Status.Rejected":
                return "red";
        }
    }

    return <div style={sectionStyle}>
        {application ?
            <>
                <h2 style={sectionTitleStyle}>{formatText("View.Home.Application")}</h2>
                <p>{formatText("View.Home.ApplicationId")}<strong>{application.id}</strong></p>
                <p>{formatText("View.Home.ApplicationStatus")}<strong style={{color: getStatusColor(application.status)}}>{formatText(application.status)}</strong></p>
                <Button
                    variant="contained"
                    onClick={() => deleteApplication(application.id)}
                    color="error"
                >Delete</Button>
            </>
            :
            <Button
                variant="contained"
                onClick={() => addApplication()}
            >
                {formatText("View.Home.CreateApplication")}
            </Button>
        }
    </div>
}