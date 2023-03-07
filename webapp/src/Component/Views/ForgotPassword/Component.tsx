import { Box, Button, Container, TextField, Typography } from "@mui/material"
import { useContextStore } from "../../../Store/contextStore"
import { Navbar } from "../../Composite/Navbar";
import { useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
    const navigate = useNavigate();
    const formatText = useContextStore((state: any) => state.formatText);
    document.title = formatText("View.ForgotPassword.DocumentTitle");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        alert(formatText("View.ForgotPassword.Sent") + " " + email);
        navigate("/login");
    };

    return <>
        <Navbar />

        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    {formatText("View.ForgotPassword.Title")}
                </Typography>
            </Box>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label={formatText("View.Login.Email")}
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    {formatText("View.ForgotPassword.Send")}
                </Button>
            </Box>
        </Container>
    </>
}