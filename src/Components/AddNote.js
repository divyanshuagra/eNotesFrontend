import React, { useContext, useState } from 'react'
import NoteContext from '../Context/notes/NoteContext'

const AddNote = () => {

    const context = useContext(NoteContext)
    const { addNote } = context
    const [note, setnote] = useState({ title: "", description: "", tag: "" })

    const handleclick = (e) => {
        e.preventDefault()
        addNote(note) //calling addnote function
        setnote({ title: "", description: "", tag: "" }) //after the note has been added the form shud be empty
    }

    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }
    return (

        <div className="container my-3">
            <h3>Add note</h3>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
                </div>
                <button disabled={note.title.length < 6 || note.description.length < 10} type="submit" className="btn btn-primary" onClick={handleclick}>Add</button>
            </form>
        </div>

    )
}

export default AddNote
