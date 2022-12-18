import { useState } from 'react';
import { addSvg, lightSvg, darkSvg } from './assets/svg';
import Notes from './components/Notes';
const shortid = require('shortid');


function App() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');
  const [theme, setTheme] = useState('light');

  function addEmptyNote() {
    let newNote = {
      id: shortid.generate(),
      title: '',
      body: '',
      footer: new Date().toLocaleString(),
    }
    setNotes([
      newNote,
      ...notes,
    ])
    let isNoteEmpty = notes.map(note => {
      if (note.title.length === 0 || note.body.length === 0) {
        alert('Note is empty!')
        return 'empty';
      } else {
        setNotes([
          newNote,
          ...notes,
        ])
      }
    })
    console.log(isNoteEmpty)
  };

  function changeTheme() {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }
  let themeClass = theme === 'light' ? 'theme_light' : 'theme_dark';
  let svgColor = theme === 'light' ? {color: 'black'} : {color: 'white'};

  return (
    <div className={`container ${themeClass}`}>
      <div className='theme'>
        <button 
          className='theme_btn'
          type='button'
          onClick={changeTheme}>
          {theme === 'light' ? darkSvg : lightSvg}
        </button>
      </div>
      <h2>Notes App</h2>
      <div className='header'>
        <div className='search'>
          <input  
            style={svgColor}
            placeholder='Search notes...'
            value={search} 
            onChange={e => setSearch(e.target.value)}
          />
          <div className='add_note'>
            <button 
              style={svgColor} 
              onClick={addEmptyNote}>{addSvg}
            </button>
          </div>
        </div>
      </div>
      {
        notes.length === 0 ?
        (
          <div className='add_note'>
            <p>Add new note!</p>
            <button style={svgColor} type='button' onClick={addEmptyNote}>
              {addSvg}
            </button>
          </div>
        ) :
        <Notes 
          notes={notes} 
          setNotes={setNotes} 
          search={search} 
          svgColor={svgColor}
        />
      }
      {console.log(notes)}
    </div>
  );
};

export default App;
