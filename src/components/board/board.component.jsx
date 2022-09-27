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
        id: uuid(), content: 'Create a div 3',
    }, {
        id: uuid(), content: 'Create a div 4',
    }, {
        id: uuid(), content: 'Create a div 5',
    }, {
        id: uuid(), content: 'Create a div 6',
    }]

const workColumns = {
    [uuid()]: {
        name: 'Backlog',
        id: uuid(),
        items: itemsOfColumn,
    },
    [uuid()]: {
        name: 'Selected for Development',

        items: [],
    },
    [uuid()]: {
        name: 'In Progress',
        id: uuid(),
        items: [],
    },
    [uuid()]: {
        name: 'Dev Completed',
        id: uuid(),
        items: [],
    },
    [uuid()]: {
        name: 'Verified by QA',
        id: uuid(),
        items: [],
    },
    [uuid()]: {
        name: 'Done & Deployed',
        id: uuid(),
        items: [],
    },
}

const onDragEnd = (result, columns, setColumn) => {
    if (!result.destination) return;
    const { source, destination } = result;
    console.log(result, 'source:', source, 'dest', destination);

    if (source.droppableId !== destination.droppableId) {

        const sourceColumnData = columns[source.droppableId]
        const destinationColumnData = columns[destination.droppableId]
        console.log(source.droppableId, '\n', destination.droppableId);
        const sourceItemsData = [...sourceColumnData.items]
        const destItemsData = [...destinationColumnData.items]
        console.log('items', sourceItemsData, destItemsData);

        const [removed] = sourceItemsData.splice(source.index, 1)
        console.log(removed);

        destItemsData.splice(destination.index, 0, removed)
        setColumn({
            ...columns, [source.droppableId]: {
                ...sourceColumnData, items: sourceItemsData
            }, [destination.droppableId]: { ...destinationColumnData, items: destItemsData }
        })
    } else {
        const column = columns[source.droppableId];
        console.log('else: column:', column);
        const copiedItems = [...column.items];
        console.log('copied items:', copiedItems);
        const [removed] = copiedItems.splice(source.index, 1);
        console.log(source.index);
        copiedItems.splice(destination.index, 0, removed);
        setColumn({
            ...columns,
            [source.droppableId]: {
                ...column,
                items: copiedItems
            }
        });
    }
};

const Board = () => {
    const [columns, setColumn] = useState(workColumns);
    // console.log(columns);

    return (
        <div className='grid-container'>
            <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumn)}>
                {Object.entries(columns).map(([columnId, column]) => {
                    return (
                        <Droppable droppableId={columnId} key={columnId}>
                            {(provided, snapshot) => {
                                return (
                                    <div key={columnId} className='column' {...provided.droppableProps}
                                        ref={provided.innerRef} style={{ backgroundColor: snapshot.isDraggingOver ? 'lightBlue' : '#Cff7ed' }} >

                                        <div className='column-title'>{column.name}</div>

                                        {
                                            column.items.map((item, index) => {
                                                return (
                                                    <Draggable
                                                        key={item.id}
                                                        draggableId={item.id}
                                                        index={index}
                                                    >
                                                        {(provided, snapshot) => {
                                                            return (

                                                                <div className='column-body' ref={provided.innerRef}
                                                                    {...provided.draggableProps}

                                                                    {...provided.dragHandleProps}
                                                                    style={{
                                                                        margin: "5px 5px ",
                                                                        backgroundColor: snapshot.isDragging
                                                                            ? "#263B4A"
                                                                            : "#456C86",
                                                                        color: "black",
                                                                        ...provided.draggableProps.style
                                                                    }}>
                                                                    <Kcard title={item.content} >

                                                                    </Kcard>
                                                                </div>
                                                            );
                                                        }}
                                                    </Draggable>)
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