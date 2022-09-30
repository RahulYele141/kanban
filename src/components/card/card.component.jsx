import { Card, Button, CardActions, CardContent, Modal, Box, Typography } from "@mui/material";
import React, { useState } from "react";
import './card.style.css'

const Kcard = ({ title, onHandleClick, onKeyUp, onChange, setIsEditing, isEditing }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => { return setOpen(true); };
    const handleClose = () => {
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
                            textAlign: 'left',
                            p: 4,
                        }}>


                            {isEditing ?
                                <input type='text' onChange={onChange} onKeyUp={onKeyUp} defaultValue={title} />
                                : <h3 onDoubleClick={() => setIsEditing(true)}>{title}</h3>
                            }
                            <br />

                            <Button onClick={onHandleClick} variant="contained" style={{ color: 'white', backgroundColor: 'red' }}>Delete</Button>
                        </Box>
                    </Modal> : <Button onClick={handleOpen}>more...</Button>
                    }
                </CardActions>
            </Card>
        </div>
    )
}

export default Kcard