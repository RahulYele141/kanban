import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React from "react";

const pages = ['Your Work', 'Projects', 'Filters', 'Peoples'];

const Navbar = () => {
    return (<AppBar position="static" style={{ backgroundColor: 'white' }}>
        <Container maxWidth="xl" >
            <Toolbar disableGutters>
                <MenuOutlinedIcon sx={{ color: 'black', display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'roboto',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'black',
                        textDecoration: 'none',
                    }}
                >
                    WEOTO
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {pages.map((page) => (
                        <Button
                            key={page}
                            disableElevation
                            onClick={() => { }}
                            endIcon={<KeyboardArrowDownIcon />}
                            sx={{ my: 2, color: 'black', display: 'flex', fontWeight: 500 }}
                        >
                            {page}
                        </Button>
                    ))}
                </Box>
            </Toolbar>
        </Container>
    </AppBar>)
}

export default Navbar