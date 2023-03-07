import { AppBar, Box, Button, Container, Menu, MenuItem, Toolbar, Typography } from "@mui/material"
import React from "react";
import { useContextStore } from "../../Store/contextStore";
import { usePersonStore } from "../../Store/personStore";
import { useNavigate } from "react-router-dom";
import { Person } from "../../Types/Person";

export const Navbar = () => {
    const navigate = useNavigate();

    const setLanguage = useContextStore((state: any) => state.setLanguage);
    const formatText = useContextStore((state: any) => state.formatText);
    const logout = usePersonStore((state: any) => state.logout);
    const person: Person | null = usePersonStore((state: any) => state.person);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="inherit">
            <Container>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Grönalund rekrytering
                        <span style={{ fontSize: "12px", marginLeft: "15px" }}>
                            {formatText("Component.Composite.Navbar.PoweredBy")}
                        </span>
                    </Typography>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        color="inherit"
                        onClick={handleClick}
                    >
                        {formatText("Component.Composite.Navbar.Language")}
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem
                            onClick={() => {
                                handleClose();
                                setLanguage("en");
                            }}
                        >English</MenuItem>
                        <MenuItem
                            onClick={() => {
                                handleClose();
                                setLanguage("sv");
                            }}
                        >Svenska</MenuItem>
                    </Menu>
                    {person ?
                        <Button
                            color="inherit"
                            onClick={() => logout(navigate)}
                        >
                            {formatText("Component.Composite.Navbar.Logout")}
                        </Button> :
                        <Button
                        color="inherit"
                        onClick={() => navigate("/login")}
                    >
                        {formatText("View.Login.SignIn")}
                    </Button>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    </Box>
}