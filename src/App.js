import { useState } from 'react';
import { addSvg, lightSvg, darkSvg } from './assets/svg';
import Notes from './components/Notes';
const shortid = require('shortid');


function App() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');
  const [theme, setTheme] = useState('light');

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
      <div className='header'>
        <div className='search'>
          Search
          <input value={search} onChange={e => setSearch(e.target.value)}/>
        </div>
        <div className='add_note'>
          <p>Add new note!</p>
          <button style={svgColor} onClick={addEmptyNote}>{addSvg}</button>
        </div>
        <div className='theme_btn'>
          <button onClick={changeTheme} type='button'>{theme === 'light' ? darkSvg : lightSvg}</button>
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
        <Notes notes={notes} setNotes={setNotes} search={search} svgColor={svgColor}/>
      }
      {console.log(notes)}
    </div>
  );
}

export default App;
