import { Container } from "@mui/system";
import { Navbar } from "../../Composite/Navbar";
import { Person } from "../../../Types/Person";
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { usePersonStore } from "../../../Store/personStore";
import React from "react";
import { useNavigate } from "react-router";
import { useAdminStore } from "../../../Store/adminStore";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Application, Status } from "../../../Types/Application";
import { useContextStore } from "../../../Store/contextStore";
import { Availability } from "../../../Types/Availability";
import { UpdateApplicationStatusRequest } from "../../../Types/UpdateApplicationStatusRequest";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export const Admin = () => {
    const navigate = useNavigate();
    const person: Person | null = usePersonStore((state: any) => state.person);
    const formatText = useContextStore((state: any) => state.formatText);
    const applications: Application[] = useAdminStore((state: any) => state.applications);
    const fetchAllApplications = useAdminStore((state: any) => state.fetchAllApplications);
    const updateApplicationStatus = useAdminStore((state: any) => state.updateApplicationStatus);

    const [open, setOpen] = React.useState(false);
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
                            setOpen(true);
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

        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h5" component="h2">
                    Profile
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Name: <strong>{currentApplication?.person?.name} {currentApplication?.person?.surname}</strong>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Email: <a href={`mailto:${currentApplication?.person?.email}`}>{currentApplication?.person?.email}</a>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
                    Pnr: <strong>{currentApplication?.person?.pnr}</strong>
                </Typography>
                <Typography id="modal-modal-title" variant="h5" component="h2">
                    Availabilities
                </Typography>
                <div style={{ margin: "1rem 0" }}>
                    {currentApplication?.person?.availabilities.map((availability: Availability) => {
                        return <div key={availability.id}>
                            <strong>{availability.dateFrom}</strong> - <strong>{availability.dateTo}</strong>
                        </div>
                    })}
                </div>
                <Typography id="modal-modal-title" variant="h5" component="h2">
                    Status
                </Typography>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "1rem 0" }}>
                        <FormControl>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={currentApplication?.status}
                                label="Status"
                                onChange={(value) => {
                                    const modifiedApplication = {
                                        ...currentApplication,
                                        status: value.target.value as Status
                                    }
                                    setCurrentApplication(modifiedApplication);
                                }}
                            >
                                <MenuItem value={"Status.Unhandled"}>{formatText("Status.Unhandled")}</MenuItem>
                                <MenuItem value={"Status.Rejected"}>{formatText("Status.Rejected")}</MenuItem>
                                <MenuItem value={"Status.Accepted"}>{formatText("Status.Accepted")}</MenuItem>
                            </Select>
                        </FormControl>
                    <Button 
                        variant="contained"
                        onClick={() => updateApplicationStatus({id: currentApplication.id, status: currentApplication.status} as UpdateApplicationStatusRequest)}
                    >Save</Button>
                </div>
            </Box>
        </Modal>

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