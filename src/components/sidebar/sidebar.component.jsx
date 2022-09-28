import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import CodeOffIcon from '@mui/icons-material/CodeOff';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import React from "react";
import './sidebar.style.css'

const Sidebar = () => {
    console.log('sidebar');
    return (
        // <div className="sidebar">
        <Drawer variant="permanent"
            PaperProps={{ sx: { marginTop: '100px', } }}
            ModalProps={{
                // keepMounted: true,
                height: 50
            }} sx={{}} >

            <div className="sidebar">
                <ListItemText>Planning</ListItemText>
                <List>
                    {['Dashboard', 'Kanban', 'Issues', 'Reports'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemIcon style={{ color: '#404BF5' }}>
                                {
                                    index % 2 === 0 ? <TrendingUpRoundedIcon /> : <DashboardRoundedIcon />
                                }
                            </ListItemIcon>
                            <ListItemButton>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <ListItemText>Development</ListItemText>
                <List>
                    {['Code', 'Releases'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemIcon style={{ color: '#66F35B' }}>
                                {
                                    index % 2 === 0 ? <CodeOffIcon /> : <DeveloperBoardIcon />
                                }
                            </ListItemIcon>
                            <ListItemButton>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </div>
        </Drawer>
        // </div >
    )
}

export default Sidebar