import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './board.style.css'
import Kcard from '../card/card.component';
import uuid from "uuid/v4";
import { Button, Modal, TextField } from '@mui/material';
import { Box } from '@mui/system';

const itemsOfColumn =
    [{
        id: uuid(), content: 'Create a div',
    }, {
        id: uuid(), content: 'Create a div 2',
    }, {
        id: uuid(), content: 'Create a div 3',
    },]

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
    if (source.droppableId !== destination.droppableId) {

        const sourceColumnData = columns[source.droppableId]
        const destinationColumnData = columns[destination.droppableId]
        const sourceItemsData = [...sourceColumnData.items]
        const destItemsData = [...destinationColumnData.items]
        const [removed] = sourceItemsData.splice(source.index, 1)
        destItemsData.splice(destination.index, 0, removed)

        setColumn({
            ...columns, [source.droppableId]: {
                ...sourceColumnData, items: sourceItemsData
            }, [destination.droppableId]: { ...destinationColumnData, items: destItemsData }
        })

    } else {
        const column = columns[source.droppableId];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
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
    const [isTextOpen, setIsTextOpen] = useState(false);
    const [isId, setIsId] = useState();
    const [issue, setIssue] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onClickCreateIssue = () => {
        return setIsTextOpen(true)
    }

    const showCreateIssue = (event, columnId) => {
        if (event._targetInst.key === columnId) return setIsId(event._targetInst.key);
    }

    const hideCreateIssue = (event, columnId) => {
        if (event._targetInst.key === columnId) {
            setIsId();
            setIsTextOpen(false)
        }
    }

    const onEnterKeyPress = (event, title) => {
        console.log('event', event);
        console.log('issue:', issue, 'title:', title);
        if (issue.length > 1 && event.key === 'Enter') {
            const columnsData = columns[isId]
            const columnItemsData = [...columnsData.items]
            columnItemsData.push({ id: uuid(), content: issue })

            setColumn({
                ...columns, [isId]: {
                    ...columnsData,
                    items: columnItemsData
                }
            })
            setIsTextOpen(false)
            setIssue('')
        }
    }
    const createIssue = (e) => {
        const details = Object.keys(columns)[0];
        setIsId(details)
        return (setIsModalOpen(true), setIssue(''))
    };


    const createIssueFromButton = () => {
        const columnsData = columns[isId]
        const columnItemsData = [...columnsData.items]
        columnItemsData.push({ id: uuid(), content: issue })

        setColumn({
            ...columns, [isId]: {
                ...columnsData,
                items: columnItemsData
            }
        })
        setIsTextOpen(false)
        setIsModalOpen(false)
        setIssue('')
    }

    const deleteIssue = (index) => {

        const columnsData = columns[isId]
        const columnItemsData = [...columnsData.items]
        columnItemsData.splice(index, 1)

        setColumn({
            ...columns, [isId]: {
                ...columnsData,
                items: columnItemsData
            }
        })
        setIsTextOpen(false)
        setIssue('')
        setIsModalOpen(false)
    }

    const onAddColumn = () => {
        console.log('clicked');
        columns[uuid()] = {
            name: 'Done',
            id: uuid(),
            items: [],
        }


    }

    return (
        <div >
            <Button variant='outlined' onClick={() => onAddColumn()} sx={{ margin: '10px' }}>Create a column</Button>
            <Button variant='contained' sx={{ float: 'top' }} onClick={(e) => createIssue(e)}>Create a issue</Button><br />
            <div className='grid-container'>
                <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumn)}>
                    {Object.entries(columns).map(([columnId, column], ind) => {
                        return (
                            <Droppable droppableId={columnId} key={columnId}>
                                {(provided, snapshot) => {
                                    return (
                                        <div onMouseLeave={(event) => { hideCreateIssue(event, columnId) }} onMouseEnter={(event) => showCreateIssue(event, columnId)} key={columnId} className='column' {...provided.droppableProps}
                                            ref={provided.innerRef} style={{ backgroundColor: snapshot.isDraggingOver ? 'lightBlue' : '#f4f5f7' }} >

                                            <div className='column-title'>{column.name}</div><hr></hr>
                                            <div>
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
                                                                                color: "black",
                                                                                ...provided.draggableProps.style
                                                                            }} onClick={() => {
                                                                                return setIsId(columnId)
                                                                            }}>
                                                                            <Kcard onKeyUp={(event) => onEnterKeyPress(event, item.content)} title={item.content} onHandleClick={() => deleteIssue(index)} onChange={(e) => { setIssue(e.target.value) }} >

                                                                            </Kcard>

                                                                        </div>
                                                                    );
                                                                }}

                                                            </Draggable>)
                                                    })}
                                            </div>
                                            <Button style={isId === columnId ? { display: 'block' } : { display: 'none' }} onClick={() => { onClickCreateIssue() }}>Create a issue</Button>

                                            <TextField sx={{ width: '150px', backgroundColor: 'white' }} style={isTextOpen && (isId === columnId) ? { display: 'block' } : { display: 'none' }} id="outlined-multiline-static" multiline rows={3} label="Add a new issue" variant="outlined" onKeyUp={(event) => onEnterKeyPress(event)} onChange={(e) => { setIssue(e.target.value) }} value={issue} />
                                        </div>
                                    )

                                }}
                            </Droppable>
                        )
                    }
                    )}
                </DragDropContext>
            </div>
            <Modal
                className='modal-box'
                open={true}
                onClose={() => { setIsModalOpen(false) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={isModalOpen ? { display: 'block', } : { display: 'none' }}

            >
                <Box sx={{

                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'white',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <select onChange={(e) => setIsId(e.target.value)} style={{ margin: '10px', padding: '8px', border: 'black solid 1px' }} >
                        {Object.entries(columns).map(([columnId, column], ind) => (<option key={columnId} value={columnId}
                        >{column.name}</option>))}
                    </select>

                    <TextField value={issue} sx={{ margin: '10px', padding: '10px', backgroundColor: 'white' }} onChange={(e) => { setIssue(e.target.value) }}></TextField><br />

                    <Button variant='contained' onClick={() => createIssueFromButton()} sx={{ float: 'right' }}>Create</Button>
                </Box>
            </Modal>
        </div >
    );
};

export default Board;