import { Card, CardContent } from "@mui/material";
import React from "react";
import Draggable from "react-draggable";


const Kcard = () => {

    return (
        <Draggable>
            <Card >
                <CardContent>
                    name
                </CardContent>
            </Card>
        </Draggable>

    )
}

export default Kcard