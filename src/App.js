import { useEffect, useState } from 'react';
import { lightSvg, darkSvg, notesSvg } from './assets/svg';
import Notes from './components/Notes';
import useTheme from './components/useTheme';
const shortid = require('shortid');


function App() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');
  const { changeTheme, themeClass, svgColor, theme } = useTheme();

  function addEmptyNote() {
    const newNote = {
      id: shortid.generate(),
      title: '',
      body: '',
      edited: false,
    }
    setNotes([
      {...newNote}, 
      ...notes,
    ]);
  };

  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem('Tasks', JSON.stringify(notes))
    }; // saving to localStorage
  }, [notes]); // re-render when notes state changes

  
  useEffect(() => {
    const localItems = JSON.parse(localStorage.getItem('Tasks'));
    if (localItems) {
      setNotes(localItems);
    }; // get from localStorage
  }, []);

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
            onChange={e => setSearch(e.target.value)}/>
        </div>
        <div className='add_note'>
          <button 
            onClick={addEmptyNote}
            >Add note
          </button>
        </div>
      </div>
      {
        notes.length === 0 ? 
          <div className='done'>
            <p>{notesSvg}</p>
            <p> All Done!</p>
          </div>  
          :
          <Notes 
            notes={notes} 
            setNotes={setNotes} 
            search={search} 
            svgColor={svgColor}
          />
      }
    </div>
  );
};

export default App;
