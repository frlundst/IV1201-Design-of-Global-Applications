import dayjs from "dayjs";
import React from "react";
import { usePersonStore } from "../../../../Store/personStore";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { sectionStyle, sectionTitleStyle } from "../Component";
import { Availability } from "../../../../Types/Availability";
import { Person } from "../../../../Types/Person";

export const Availabilities = () => {
    const [dateFrom, setDateFrom] = React.useState(dayjs());
    const [dateTo, setDateTo] = React.useState(dayjs());

    const person: Person | null = usePersonStore((state: any) => state.person);
    const availabilites = person?.availabilities;
    const addAvailability = usePersonStore((state: any) => state.addAvailability);
    const removeAvailibilty = usePersonStore((state: any) => state.removeAvailability);
    const updatePerson = usePersonStore((state: any) => state.updatePerson);

    function handleAddAvailability() {
        const availability = {
            dateFrom: dateFrom.format("YYYY-MM-DD"),
            dateTo: dateTo.format("YYYY-MM-DD")
        } as Availability;
        addAvailability(availability, updatePerson);
    }

    function handleRemoveAvailability(id: string) {
        removeAvailibilty(id, updatePerson);
    }

    return <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Availabilities</h2>

        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Availability id</TableCell>
                        <TableCell align="right">Date from</TableCell>
                        <TableCell align="right">Date to</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {availabilites?.map((availability: Availability) => (
                        <TableRow
                            key={availability.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {availability.id}
                            </TableCell>
                            <TableCell align="right">{availability.dateFrom}</TableCell>
                            <TableCell align="right">{availability.dateTo}</TableCell>
                            <TableCell align="right">
                                <Button
                                    onClick={() => handleRemoveAvailability(availability.id)}
                                >Remove</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <div style={{display: "flex", gap:"20px"}}>
                                    <DesktopDatePicker
                                        label="Date from"
                                        value={dateFrom}
                                        onChange={(date) => setDateFrom(date as any)}
                                    />
                                    <DesktopDatePicker
                                        label="Date to"
                                        value={dateTo}
                                        onChange={(date) => setDateTo(date as any)}
                                    />
                                </div>
                            </LocalizationProvider>
                        </TableCell>
                        <TableCell />
                        <TableCell />
                        <TableCell align="right">
                            <Button onClick={handleAddAvailability}>Add</Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    </div>
}