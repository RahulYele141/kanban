import { Card, Button, CardActions, CardContent, Modal, Box, Typography } from "@mui/material";
import React, { useState } from "react";
import './card.style.css'

const Kcard = ({ title }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        console.log(open);
        return setOpen(false)
    };


    return (
        <div className="card">
            <Card >
                <CardContent>
                    {title}
                </CardContent>
                <CardActions>
                    {open ? <Modal
                        className='modal-box'
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            border: '2px solid #000',
                            boxShadow: 24,
                            p: 4,
                        }}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                This is a Modal
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                This is <br /> modal text
                            </Typography>
                        </Box>
                    </Modal> : <Button onClick={handleOpen}>more...</Button>
                    }
                </CardActions>
            </Card>
        </div>
    )
}

export default Kcard