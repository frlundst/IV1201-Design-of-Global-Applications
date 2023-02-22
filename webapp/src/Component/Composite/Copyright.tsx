import { Typography } from "@mui/material"

export const Copyright = () => {
    return <Typography variant="body2" color="text.secondary" align="center">
        Copyright © VFA Recruitment {new Date().getFullYear()}.
    </Typography>
}