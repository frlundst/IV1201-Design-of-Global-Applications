import { Container } from "@mui/system";
import { Navbar } from "../../Composite/Navbar";
import { Person } from "../../../Types/Person";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { usePersonStore } from "../../../Store/personStore";
import React from "react";
import { useNavigate } from "react-router";
import { useAdminStore } from "../../../Store/adminStore";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

export const Admin = () => {
    const navigate = useNavigate();
    const person: Person | null = usePersonStore((state: any) => state.person);

    const persons: Person[] = useAdminStore((state: any) => state.persons);
    const fetchAllPersons = useAdminStore((state: any) => state.fetchAllPersons);

    React.useEffect(() => {
        if (person === null) {
            navigate("/login");
        }
        if (person?.personRole !== "ADMIN") {
            navigate("/");
        } else {
            fetchAllPersons();
        }
    }, [person]);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 130 },
        {
            field: 'name',
            headerName: 'Full Name',
            sortable: true,
            width: 160,
            valueGetter: (params: GridValueGetterParams) =>
                `${params.row.name || ''} ${params.row.surname || ''}`,
        },
        { field: 'pnr', headerName: 'SSN', width: 130 },
        { field: 'email', headerName: 'Email', width: 200 },
        {
            field: 'action',
            headerName: 'Action',
            width: 130,
            renderCell(params) {
                return <strong>
                    <Button
                        variant="contained"
                        onClick={() => {
                            console.log(params.row);
                        }}
                    >View</Button>
                </strong>
            }
        },
    ];

    return <>
        <Navbar />
        <Container>
            <h1>Admin</h1>

            <div style={{ height: 600, width: '100%' }}>
                {/*<TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>SSN</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {persons.map((person: Person) => (
                                <TableRow key={person.id}>
                                    <TableCell>{person.id}</TableCell>
                                    <TableCell>{person.name} {person.surname}</TableCell>
                                    <TableCell>{person.pnr}</TableCell>
                                    <TableCell>{person.email}</TableCell>
                                    <TableCell>
                                        <Button>View</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>*/}
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={persons}
                        columns={columns}
                    />
                </div>
            </div>
        </Container>
    </>
}