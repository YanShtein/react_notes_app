import { useState } from 'react';
import { editSvg, deleteSvg, saveSvg, addSvg } from './svg';
const shortid = require('shortid');


function Note({ id, title, body, footer, handleChange, handleDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  
  let content;
  if (isEditing) {
    content = (
      <div className='note'>
        <div className='svg' onClick={() => setIsEditing(false)}>
          {saveSvg}
        </div>
        <div className='note_title'>
          <textarea 
            name='title'
            value={title}
            placeholder="Take a note..."
            onChange={e => handleChange(e, id)}
          />
        </div>
        <div className='note_description'>
          <textarea 
            name='body'
            value={body}
            placeholder="Note"
            onChange={e => handleChange(e, id)}
          />
        </div>
        <div className='note_footer'>
          <span>Edited</span>
          <span>{footer}</span>
        </div>
      </div>
    )
  } else {
    content = (
      <div className='note' onClick={() => setIsEditing(true)}>
        <div className='svg'>
          {editSvg}
        </div>
        <div className='note_title'>
          <span>{title.length === 0 ? 'Take a note...' : title}</span>
        </div>
        <div className='note_description'>
          <span>{body}</span>
        </div>
        <div className='note_footer'>
          <span>Edited</span>
          <span>{footer}</span>
          <div onClick={() => handleDelete(id)}>
            {deleteSvg}
          </div>
        </div>
      </div>
    )
  };

  return (
    <>
      {content}
    </>
  )
}

function Notes({ notes, setNotes }) {

  function handleChange(e, id) {
    setNotes(
      notes.map(note => {
        if (note.id === id) {
          return {
            ...note,
            [e.target.name]: e.target.value,
            footer: new Date().toLocaleString(),
          };
        }
        return note;
      })
    );
  };

  function handleDelete(id) {
    const removeNote = notes.filter(note => note.id !== id)
    setNotes(removeNote)
    console.log(removeNote)
  }

  return (
    <div className='notes'>
      {
        notes.map(note => {
          return (
            <Note 
              key={note.id}
              id={note.id}
              title={note.title}
              body={note.body}
              footer={note.footer}
              handleChange={handleChange}
              handleDelete={handleDelete}
            />
          )
        })
      }
    </div>
  )
}

function App() {
  const [notes, setNotes] = useState([]);

  function addEmptyNote() {
    setNotes([
      {    
        id: shortid.generate(),
        title: '',
        body: '',
        footer: new Date().toLocaleString(),
      },
      ...notes,
    ])
  };

  return (
    <div className="container">
      <div className='header'>
        <div className='search'>
          Search
          <input />
        </div>
        <div className='add_note'>
          <p>Add new note!</p>
          <button onClick={addEmptyNote}>{addSvg}</button>
        </div>
      </div>
      {
        notes.length === 0 ?
        (
          <div className='add_note'>
            <p>Add new note!</p>
            <button onClick={addEmptyNote}>{addSvg}</button>
          </div>
        ) :
        <Notes notes={notes} setNotes={setNotes} />
      }
      {console.log(notes)}
    </div>
  );
}

export default App;
