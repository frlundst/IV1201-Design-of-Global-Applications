import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, Typography } from "@mui/material";
import { Application, Status } from "../../../../Types/Application";
import { useContextStore } from "../../../../Store/contextStore";
import { Availability } from "../../../../Types/Availability";
import { CompetenceProfile } from "../../../../Types/ComptenceProfile";
import { UpdateApplicationStatusRequest } from "../../../../Types/UpdateApplicationStatusRequest";
import { useAdminStore } from "../../../../Store/adminStore";

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

interface AdminModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    currentApplication: Application;
    setCurrentApplication: (application: Application) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({open, setOpen, currentApplication, setCurrentApplication}) => {
    const formatText = useContextStore((state: any) => state.formatText);
    const updateApplicationStatus = useAdminStore((state: any) => state.updateApplicationStatus);
    
    return <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h5" component="h2">
                {formatText("View.Admin.Profile")}
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {formatText("View.Admin.Name")}<strong>{currentApplication?.person?.name} {currentApplication?.person?.surname}</strong>
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {formatText("View.Admin.Email")}<a href={`mailto:${currentApplication?.person?.email}`}>{currentApplication?.person?.email}</a>
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
                {formatText("View.Admin.PersonalNumber")}<strong>{currentApplication?.person?.pnr}</strong>
            </Typography>

            <Typography id="modal-modal-title" variant="h5" component="h2">
                {formatText("View.Admin.Avalabilities")}
            </Typography>

            <div style={{ margin: "1rem 0" }}>
                {currentApplication?.person?.availabilities.map((availability: Availability) => {
                    return <div key={availability.id} style={{ border: "1px solid lightgray", padding: "5px", borderRadius: "5px", marginBottom: "5px" }}>
                        <strong>{availability.dateFrom}</strong> - <strong>{availability.dateTo}</strong>
                    </div>
                })}
            </div>

            <Typography id="modal-modal-title" variant="h5" component="h2">
                {formatText("View.Admin.CompetenceProfiles")}
            </Typography>

            <div style={{ margin: "1rem 0" }}>
                {currentApplication?.person?.competenceProfiles.map((cp: CompetenceProfile) => {
                    return <div key={cp.id} style={{ border: "1px solid lightgray", padding: "5px", borderRadius: "5px", marginBottom: "5px" }}>
                        {formatText("View.Admin.Competence")}<strong>{formatText(cp.competence.nameOfCompetence)}</strong>
                        <br />
                        {formatText("View.Admin.YearsOfExperience")}<strong>{cp.yearsOfExperience}</strong>
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
                    onClick={() => updateApplicationStatus({ id: currentApplication.id, status: currentApplication.status } as UpdateApplicationStatusRequest)}
                >{formatText("View.Admin.Save")}</Button>
            </div>
        </Box>
    </Modal>
}