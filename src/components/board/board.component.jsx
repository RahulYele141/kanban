import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './board.style.css'
import Kcard from '../card/card.component';
import uuid from "uuid/v4";

const itemsOfColumn =
    [{
        id: uuid(), content: 'Create a div',
    }, {
        id: uuid(), content: 'Create a div 2',
    }, {
        id: uuid(), content: 'Create a div 2',
    }, {
        id: uuid(), content: 'Create a div 2',
    }, {
        id: uuid(), content: 'Create a div 2',
    }, {
        id: uuid(), content: 'Create a div 2',
    }]

const workColumns = [
    {
        name: 'Backlog',
        id: uuid(),
        items: itemsOfColumn,
    },
    {
        name: 'Selected for Development',
        id: uuid(),
        items: itemsOfColumn,
    },
    {
        name: 'In Progress',
        id: uuid(),
        items: itemsOfColumn,
    },
    {
        name: 'Dev Completed',
        id: uuid(),
        items: itemsOfColumn,
    },
    {
        name: 'Verified by QA',
        id: uuid(),
        items: itemsOfColumn,
    },
    {
        name: 'Done & Deployed',
        id: uuid(),
        items: itemsOfColumn,
    },]

const Board = () => {
    const [columns, setColumn] = useState(workColumns);
    console.log(columns);

    return (
        <div className='grid-container'>
            <DragDropContext>
                {columns.map((column) => {
                    console.log(column.name)
                    return (
                        <Droppable droppableId={'id'}>
                            {(provided, snapshot) => {
                                return (
                                    <div key={column.id} className='column' ref={provided.innerRef} style={{ backgroundColor: snapshot.isDraggingOver ? 'lightBlue' : 'lightGrey' }} >
                                        <div className='column-title'>{column.name}</div>
                                        {
                                            column.items.map((item, index) => {
                                                console.log(item)
                                                return (
                                                    <Draggable key={item.id} draggableId={item.id} index={index}> {(provided, snapshot) => {
                                                        return <div ref={provided.innerRef}></div>
                                                    }}</Draggable>)
                                            })}

                                    </div>
                                )
                            }}

                        </Droppable>
                    )
                }
                )}
            </DragDropContext>
        </div>
    );
};

export default Board;