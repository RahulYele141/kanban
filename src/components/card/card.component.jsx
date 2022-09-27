import { Card, Button, CardActions, CardContent } from "@mui/material";
import React from "react";
import './card.style.css'

const Kcard = ({ title }) => {

    return (
        <div className="card">
            <Card >
                <CardContent>
                    {title}
                </CardContent>
                <CardActions>
                    <Button >more...</Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default Kcard