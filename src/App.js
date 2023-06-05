import './style.css';
import { useState, useEffect } from 'react';
import supabase from './supabase.js';

function App() {
  const [notes, setNotes] = useState([]);
  const [showForm, setForm] = useState(false);

  useEffect(function () {
    async function getNotes() {

      let { data: notes, error } = await supabase
        .from('notes')
        .select('*')
        .order('created_at', { ascending: false })
      setNotes(notes);
      console.log(notes);
      console.log(error);
    }
    getNotes();
  }, []);

  return (
    <>
      <Header showForm={showForm} setForm={setForm} />
      {showForm ? <AddNote setForm={setForm} setNotes={setNotes} /> : null}

      <NotesList notes={notes} />
    </>
  );
}

function Header({ showForm, setForm }) {
  return (<div className="header">
    < h1 className='app-title' > notetaker</h1 >
    <button className='note-btn top-btn' onClick={() => setForm((show) => !show)}>
      {showForm ? "Close" : "Add New"}
    </button>

  </div>);
}

function AddNote({ setForm, setNotes }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  async function addNote(e) {
    e.preventDefault();
    console.log(title, text);

    if (text && title) {

      const { data: newNote, error } = await supabase.from('notes').insert([{ title, text }]).select();

      setNotes((notes) => [newNote[0], ...notes]);
      setText("");
      setTitle("");
      setForm(false);
    }
  }
  return (<form className='add-note' onSubmit={addNote}>
    <input type="text" placeholder="note title" value={title} onChange={(e) => setTitle(e.target.value)} />
    <input type="text" placeholder="note content" value={text} onChange={(e) => setText(e.target.value)} />
    <button className='note-btn'>post</button>
  </form >);
}

function NotesList({ notes }) {
  return (
    <>
      <ul className='notes-list'>{
        notes.map((note) => (
          <Note key={note.id} note={note} />))
      }
      </ul >
    </>
  );
}

function Note({ note }) {
  return <li className='note'>
    <h3>{note.title}</h3>
    <h5>Creation date: {note.created_at.substring(0, 10)}</h5>
    <p>{note.text}</p> </li>
}

export default App;
