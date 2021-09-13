import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {

    const host = "http://localhost:5000"
    const initialNotes = []

    const [notes, setnotes] = useState(initialNotes)

    //get all notes
    const getNotes = async () => {

        const url = `${host}/api/notes/fetchallnotes`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzZTRmMDAyZTMyODYxNTE3ODJhODA5In0sImlhdCI6MTYzMTQ3MzQwOH0.pd6RJ8Oo8-DMMwaDdR30Sif9Gf8y1-UQfaqFYRrVMEM'
            },

        });
        const json = await response.json();
        setnotes(json)  //fetched notes from database and assigned to notes
    }

    //add a note
    const addNote = async ({ title, description, tag }) => {
        //api call 
        // console.log(title, description, tag)
        const url = `${host}/api/notes/addnotes`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzZTRmMDAyZTMyODYxNTE3ODJhODA5In0sImlhdCI6MTYzMTQ3MzQwOH0.pd6RJ8Oo8-DMMwaDdR30Sif9Gf8y1-UQfaqFYRrVMEM'

            },
            body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
        });
        const note = await response.json();
        setnotes(notes.concat(note))
    }

    //delete a note
    const deleteNote = async (id) => {
        const url = `${host}/api/notes/deletenote/${id}`
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzZTRmMDAyZTMyODYxNTE3ODJhODA5In0sImlhdCI6MTYzMTQ3MzQwOH0.pd6RJ8Oo8-DMMwaDdR30Sif9Gf8y1-UQfaqFYRrVMEM'
            },
        });
        const json = await response.json();

        const newNotes = notes.filter((note) => note._id != id) //the leftover notes after deleting a note
        setnotes(newNotes)
    }

    const editNote = async ({ id, title, description, tag }) => {
        const url = `${host}/api/notes/updatenote/${id}`
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzZTRmMDAyZTMyODYxNTE3ODJhODA5In0sImlhdCI6MTYzMTQ3MzQwOH0.pd6RJ8Oo8-DMMwaDdR30Sif9Gf8y1-UQfaqFYRrVMEM'
            },
            body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
        });
        const json = await response.json();

        //cpoy of notes array is created because in REACT we can't update the state directly
        let updatedNotes = JSON.parse(JSON.stringify(notes)) //query2

        //applying note update at frontend
        for (let i = 0; i < updatedNotes.length; i++) {
            const noteToBeUpdated = updatedNotes[i]

            if (noteToBeUpdated._id === id) {
                updatedNotes[i].title = title
                updatedNotes[i].description = description
                updatedNotes[i].tag = tag
                break;
            }
        }
        setnotes(updatedNotes)
    }
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState