import dayjs from "dayjs";
import React from "react";
import { usePersonStore } from "../../../../Store/personStore";
import { Button, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { sectionStyle, sectionTitleStyle } from "../Component";
import { Availability } from "../../../../Types/Availability";
import { Person } from "../../../../Types/Person";
import { useContextStore } from "../../../../Store/contextStore";
import { useCompetenceStore } from "../../../../Store/competenceStore";
import { Competence as CompetenceType } from "../../../../Types/Competence";
import {useState} from "react";
import { CompetenceProfile } from "../../../../Types/CompetenceProfile";

export const Competence = () => {
    const formatText = useContextStore((state: any) => state.formatText);

    const [dateFrom, setDateFrom] = React.useState(dayjs());
    const [dateTo, setDateTo] = React.useState(dayjs());

    const person: Person | null = usePersonStore((state: any) => state.person);
    const availabilites = person?.availabilities;
    const addAvailability = usePersonStore((state: any) => state.addAvailability);
    const removeAvailibilty = usePersonStore((state: any) => state.removeAvailability);
    const updatePerson = usePersonStore((state: any) => state.updatePerson);




    // MY NEW FUNCTIONS OK?
    const competenceList: CompetenceType[] | null = useCompetenceStore((state:any) => state.competenceList);
    const getCompetenceList = useCompetenceStore((state:any) => state.getCompetenceList); // THIS IS USED TO GET COMPETENCE LIST.
    const [selectedCategory, setSelectedCategory] = useState("");
    const [yearsOfExperience, setYearsOfExperience] = useState("");

   // const competenceProfileList: CompetenceProfile[] | null = 
    // FIND COMPETENCE PROFILE OK?.


    /*
    React.useEffect(() => {
        getCompetenceList();
    }, []); // GET CompetenceList.*/

    
    React.useEffect(() => {
        if (!competenceList) { 
            getCompetenceList();
        }

        

    });


    function getImportant(a:void){
        getCompetenceList();
        console.log("HELLO HERE");
        console.log(competenceList);
    }

    function handleSubmit(b:void) // CLEAR VALUE OK:
    {   

       // CREATE A NEW COMPETENCE PROFILE HERE OK?


        (document.getElementById("titleText") as HTMLInputElement).value = "";
        setSelectedCategory("");



        
    }

    function handleRemoveCompetence(id: string) { // ADD LATER.
        removeAvailibilty(id, updatePerson);
    }
        // FIRST STEP. MAke DROPDOWN WITH ALL COMPETENCES LISTED OK?.
    return <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>{formatText("View.Home.Availabilities")}</h2>

        <h2>HELLO THIS IS COMPETENCE: </h2>

        <Button size="small" onClick={() => getImportant()}>Render list</Button>

        <TextField label={"Years of Experience"}
                       id={"titleText"}
                       onChange={e => setYearsOfExperience(e.target.value)}
                       inputProps={{maxLength: 50}}
        />


        {competenceList ?
                        <TextField
                            id={"select-Competence"}
                            select
                            label={"Competence"}
                            defaultValue={""}
                            onChange={e => setSelectedCategory(e.target.value)}
                            sx={{margin: "0px 10px 10px 0px", width: "233px"}}
                        >
                            
                        {competenceList.map((listOfCompetences: CompetenceType) => (
                        
                        <MenuItem key={listOfCompetences.id}
                        value={listOfCompetences.nameOfCompetence}>{listOfCompetences.nameOfCompetence}
                        </MenuItem>

                    ))}
                            {/*competenceList.map(competenceList: CompetenceType => {
                                
                                    return <MenuItem key={competenceList.name}
                                                     value={competenceList.name}>{competenceList.name}
                                    </MenuItem>
                                
                            })*/}
                        </TextField>
                        : <div></div>}

        <Button
                variant={"contained"}
                onClick={() => handleSubmit()}
               // disabled={!title || !message || !id}
            >
                Submit
            </Button>                






        
    </div>
}