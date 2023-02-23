import { Avatar, Box, Button, Checkbox, Container, FormControlLabel, Grid, Link, TextField, Typography } from "@mui/material";
import { ViewBaseProps } from "../../../Internalization/ViewBaseProps";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Copyright } from "../../Composite/Copyright";
import { JwtRequest } from "../../../Types/JwtRequest";
import { LoginPerson } from "./Fetch";
import { JwtResponse } from "../../../Types/JwtReponse";

interface LoginProps extends ViewBaseProps {
    setToken: (token: string | null) => void;
}

export const Login: React.FC<LoginProps> = ({ formatText, setToken }) => {
    document.title = formatText("View.Login.DocumentTitle");
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        const jwtRequest = {
            username: data.get('email'),
            password: data.get('password')
        } as JwtRequest;

        LoginPerson(jwtRequest).then(res => {
            console.log(res);
            if (res.status === 200) {
                res.json().then(data => {
                    const jwtResponse = data as JwtResponse;
                    console.log(jwtResponse);
                    localStorage.setItem("token", "Bearer " + jwtResponse.token);
                    setToken("Bearer " + jwtResponse.token);
                });
            }
        });
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
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label={formatText("View.Login.RememberMe")}
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
                <br/>
                <Copyright />
            </Box>
        </Container>
    );
}