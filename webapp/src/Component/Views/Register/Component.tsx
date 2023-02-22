import React from "react";
import { ViewBaseProps } from "../../../Internalization/ViewBaseProps";
import { Avatar, Box, Button, Container, CssBaseline, Grid, Link, TextField, Typography } from "@mui/material";
import { Copyright } from "../../Composite/Copyright";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Person } from "../../../Types/Person";
import { RegisterPerson } from "./Fetch";

export const Register: React.FC<ViewBaseProps> = ({ formatText }) => {
    document.title = formatText("View.Register.DocumentTitle");
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const person = {
            name: data.get('firstName'),
            surname: data.get('lastName'),
            pnr: data.get('pnr'),
            email: data.get('email'),
            password: data.get('password'),
            username: data.get('username')
        } as Person;

        RegisterPerson(person).then(res => {
            console.log(res);
            if (res.status === 200) {
                navigate('/login');
            }
        })
        
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
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
                    {formatText("View.Register.Title")}
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label={formatText("View.Register.Name")}
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label={formatText("View.Register.Surname")}
                                name="lastName"
                                autoComplete="family-name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="pnr"
                                label={formatText("View.Register.Pnr")}
                                name="pnr"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label={formatText("View.Register.Email")}
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label={formatText("View.Register.Password")}
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="username"
                                label={formatText("View.Register.Username")}
                                name="username"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {formatText("View.Register.SignUp")}
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link 
                                component={RouterLink}
                                to="/login"
                                variant="body2">
                                {formatText("View.Register.AlreadyHaveAnAccount")}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <br/>
            <Copyright />
        </Container>
    );
};