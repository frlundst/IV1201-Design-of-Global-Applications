import { Button, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { useContextStore } from "../../../../Store/contextStore";
import { sectionStyle, sectionTitleStyle } from "../Component"
import { usePersonStore } from "../../../../Store/personStore";
import { Person } from "../../../../Types/Person";
import { CompetenceProfile } from "../../../../Types/ComptenceProfile";
import React from "react";
import { useCompetenceStore } from "../../../../Store/competenceStore";
import { Competence } from "../../../../Types/Competence";
import { NewCompetenceRequest } from "../../../../Types/NewCompetenceRequest";

export const CompetenceProfiles = () => {
    const formatText = useContextStore((state: any) => state.formatText);
    const person: Person | null = usePersonStore((state: any) => state.person);
    const competenceProfiles = person?.competenceProfiles;
    const getAllCompetences = useCompetenceStore((state: any) => state.getAllCompetences);
    const competences = useCompetenceStore((state: any) => state.competences);
    const addCompetenceProfile = useCompetenceStore((state: any) => state.addCompetenceProfile);
    const updatePerson = usePersonStore((state: any) => state.updatePerson);
    const deleteCompetenceProfile = useCompetenceStore((state: any) => state.deleteCompetenceProfile);

    const [competenceId, setCompetenceId] = React.useState<string>("1");
    const [yearsOfExperience, setYearsOfExperience] = React.useState<number>(0);

    React.useEffect(() => {
        getAllCompetences();
    }, [])

    function handleAddCompetenceProfile() {
        const addCompetenceProfileRequest = {
            id: competenceId,
            yearsOfExperience: yearsOfExperience
        } as NewCompetenceRequest;
        addCompetenceProfile(addCompetenceProfileRequest, updatePerson);
    }

    return <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>{formatText("View.Home.ComptenceProfiles")}</h2>

        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>{formatText("View.Home.ComptenceProfileId")}</TableCell>

                        <TableCell align="right">{formatText("View.Home.ComptenceProfileCompetence")}</TableCell>

                        <TableCell align="right">{formatText("View.Home.ComptenceProfileYearsOfExperience")}</TableCell>

                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {competenceProfiles?.map((cp: CompetenceProfile) => (
                        <TableRow
                            key={cp.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {cp.id}
                            </TableCell>

                            <TableCell align="right">{formatText(cp.competence.nameOfCompetence)}</TableCell>

                            <TableCell align="right">{cp.yearsOfExperience}</TableCell>

                            <TableCell align="right">
                                <Button
                                    onClick={() => deleteCompetenceProfile(cp.id, updatePerson)}
                                >{formatText("View.Home.AvalabilityRemove")}</Button>
                            </TableCell>
                        </TableRow>
                    ))}

                    <TableRow
                        sx={{ '&:last-child td, &:last-child th': { borderTop: "2px solid black" } }}
                    >
                        <TableCell>
                            <div style={{ display: "flex", gap: "20px" }}>
                                <FormControl>
                                    <InputLabel id="demo-simple-select-label">{formatText("View.Home.ComptenceProfileCompetence")}</InputLabel>

                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={competenceId}
                                        label={formatText("View.Home.ComptenceProfileCompetence")}
                                        onChange={e => setCompetenceId(e.target.value)}
                                    >
                                        {competences?.map((c: Competence) => {
                                            return <MenuItem key={"competence" + c.id} value={c.id}>{formatText(c.nameOfCompetence)}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                                <TextField
                                    id="outlined-number"
                                    label={formatText("View.Home.ComptenceProfileYearsOfExperience")}
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={yearsOfExperience}
                                    onChange={e => setYearsOfExperience(parseInt(e.target.value))}
                                />
                            </div>
                        </TableCell>
                        <TableCell />
                        <TableCell />
                        <TableCell align="right">
                            <Button onClick={handleAddCompetenceProfile}>{formatText("View.Home.AvalabilityAdd")}</Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    </div >
}