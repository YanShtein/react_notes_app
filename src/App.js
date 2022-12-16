import { useState } from 'react';
import { editSvg, deleteSvg } from './svg';
const shortid = require('shortid');

function Note({ id, title, body, footer, handleChange }) {
  const [isEditing, setIsEditing] = useState(false);
  
  let content;
  if (isEditing) {
    content = (
      <>
        <div className='note_title'>
          <button onClick={() => setIsEditing(false)}>
            save
          </button>
          <input 
            name='title'
            value={title}
            onChange={e => handleChange(e, id)}
          />
        </div>
        <div className='note_description'>
          <input 
            name='body'
            value={body}
            onChange={e => handleChange(e, id)}
          />
        </div>
        <div className='note_footer'>
          <span>{footer}</span>
          <div>
            {deleteSvg}
          </div>
        </div>
      </>
    )
  } else {
    content = (
      <>
        <div className='note_title'>
          <span>{title}</span>
          <div onClick={() => setIsEditing(true)}>
            {editSvg}
          </div>
        </div>
        <div className='note_description'>
          <span>{body}</span>
        </div>
        <div className='note_footer'>
          <span>{footer}</span>
          <div>
            {deleteSvg}
          </div>
        </div>
      </>
    )
  };

  return (
    <div className='note'>
      {content}
    </div>
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
          };
        }
        return note;
      })
    );
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
            />
          )
        })
      }
    </div>
  )
}

function App() {
  const [notes, setNotes] = useState([{
    id: 0,
    title: 'Take a note...',
    body: 'buy a shirt this weekend',
    footer: new Date().toLocaleString(),
    edit: false,
  }]);

  function addEmptyNote() {
    // adds empty note
    setNotes([
      {id: shortid.generate()},
      ...notes,
    ])
  };

  return (
    <div className="container">
      <div className='search'>
        Search
        <input />
        <button onClick={addEmptyNote}>Add</button>
      </div>
      <Notes notes={notes} setNotes={setNotes}/>
      {console.log(notes)}
    </div>
  );
}

export default App;
