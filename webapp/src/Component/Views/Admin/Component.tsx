import { Container } from "@mui/system";
import { Navbar } from "../../Composite/Navbar";
import { Person } from "../../../Types/Person";
import { usePersonStore } from "../../../Store/personStore";
import React from "react";
import { useNavigate } from "react-router";
import { useAdminStore } from "../../../Store/adminStore";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Application } from "../../../Types/Application";
import { useContextStore } from "../../../Store/contextStore";
import { AdminModal } from "./ChildComponents/AdminModal";
import { Button } from "@mui/material";

export const Admin = () => {
    const navigate = useNavigate();
    const person: Person | null = usePersonStore((state: any) => state.person);
    const formatText = useContextStore((state: any) => state.formatText);
    const applications: Application[] = useAdminStore((state: any) => state.applications);
    const fetchAllApplications = useAdminStore((state: any) => state.fetchAllApplications);

    const [adminModalOpen, setAdminModalOpen] = React.useState(false);
    const [currentApplication, setCurrentApplication] = React.useState<Application>({} as Application);

    document.title = formatText("View.Admin.DocumentTitle");

    React.useEffect(() => {
        if (person === null) {
            navigate("/login");
        }
        if (person?.personRole !== "ADMIN") {
            navigate("/");
        } else {
            fetchAllApplications();
        }
    }, [person]);

    const columns: GridColDef[] = [
        { field: 'id', headerName: formatText("View.Admin.ApplicationId"), width: 300 },
        {
            field: 'fullName',
            headerName: formatText("View.Admin.FullName"),
            width: 160,
            valueGetter: (params: GridValueGetterParams) =>
                `${params.row.person.name || ''} ${params.row.person.surname || ''}`,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 160,
            renderCell(params) {
                const status = params.row.status;
                let color = "black";

                switch(status) {
                    case "Status.Unhandled":
                        color = "black";
                        break;
                    case "Status.Rejected":
                        color = "red";
                        break;
                    case "Status.Accepted":
                        color = "green";
                        break;
                }

                return <strong style={{color: color}}>
                    {formatText(status)}
                </strong>
            }
        },
        {
            field: 'nrOfCompetenceProfiles',
            headerName: formatText("View.Admin.NrOfCompetenceProfiles"),
            width: 160,
            valueGetter: (params: GridValueGetterParams) =>
                `${params.row.person.competenceProfiles.length || ''}`,
            
        },
        {
            field: 'nrOfAvailabilities',
            headerName: formatText("View.Admin.NrOfAvailabilities"),
            width: 160,
            valueGetter: (params: GridValueGetterParams) =>
                `${params.row.person.availabilities.length || ''}`,
        },
        {
            field: 'person',
            headerName: 'Information',
            width: 130,
            sortable: false,
            renderCell(params) {
                return <strong>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setCurrentApplication(params.row);
                            setAdminModalOpen(true);
                        }}
                    >
                        {formatText("View.Admin.View")}
                    </Button>
                </strong>
            }
        }
    ];

    return <>
        <Navbar />

        <AdminModal open={adminModalOpen} setOpen={setAdminModalOpen} setCurrentApplication={setCurrentApplication} currentApplication={currentApplication} />

        <Container>
            <h1>Admin - {person?.name} {person?.surname}</h1>

            <h2>{formatText("View.Admin.Applications")}</h2>

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={applications}
                    columns={columns}
                />
            </div>
        </Container>
    </>
}