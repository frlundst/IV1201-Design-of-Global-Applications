import { Avatar, Box, Button, Checkbox, Container, FormControlLabel, Grid, Link, TextField, Typography } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Copyright } from "../../Composite/Copyright";
import { JwtRequest } from "../../../Types/JwtRequest";
import { usePersonStore } from "../../../Store/personStore";
import React from "react";
import { useContextStore } from "../../../Store/contextStore";

export const Login = () => {
    const navigate = useNavigate();
    const token = usePersonStore((state: any) => state.token);
    const login = usePersonStore((state: any) => state.login);
    const formatText = useContextStore((state: any) => state.formatText);
    
    document.title = formatText("View.Login.DocumentTitle");

    // Check if token is set
    React.useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [token]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const jwtRequest = {
            username: data.get('email'),
            password: data.get('password')
        } as JwtRequest;

        login(jwtRequest, navigate).catch((error: Error) => alert(error));
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>

                </Avatar>
                <Typography component="h1" variant="h5">
                    {formatText("View.Login.Title")}
                </Typography>
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
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label={formatText("View.Login.Password")}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {formatText("View.Login.SignIn")}
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link
                                component={RouterLink}
                                to="/register"
                                variant="body2"
                            >
                                {formatText("View.Login.DontHaveAnAccount")}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
                <br />
                <Copyright />
            </Box>
        </Container>
    );
}