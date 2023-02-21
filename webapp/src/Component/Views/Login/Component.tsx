import { Avatar, Box, Button, Checkbox, Container, FormControlLabel, Grid, Link, TextField, Typography } from "@mui/material";
import { ViewBaseProps } from "../../../Internalization/ViewBaseProps";

export const Login: React.FC<ViewBaseProps> = ({ formatText }) => {
    document.title = formatText("View.Login.Title");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <Container>
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
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                {formatText("View.Login.ForgotPassword")}
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {formatText("View.Login.DontHaveAnAccount")}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
                <Typography variant="body2" color="text.secondary" align="center">
                    Copyright © VFA Recruitment {new Date().getFullYear()}.
                </Typography>
            </Box>
        </Container>
    );
}