import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Toolbar } from "@mui/material";
import React from "react";

const Sidebar = () => {
    console.log('sidebar');
    return (
        <div>
            <Drawer variant="permanent"
                ModalProps={{
                    keepMounted: true,
                }} >

                <div>
                    <Toolbar />
                    <Divider />
                    <ListSubheader>Planning</ListSubheader>
                    <List>
                        {['Dashboard', 'Kanban Board', 'Issues', 'Components'].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <ListSubheader>Development</ListSubheader>
                    <List>
                        {['Code', 'Releases'].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>
        </div>)
}

export default Sidebar