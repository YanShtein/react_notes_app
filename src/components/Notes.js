import Note from './Note';
import searchNotes from './searchNotes';

function Notes({ notes, setNotes, search, svgColor }) {

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

  const handleDelete = (id) => {
    const removeNote = notes.filter(note => note.id !== id)
    setNotes(removeNote);
  };

  return (
    <div className='notes'>
      {
        searchNotes(notes, search).map(note => {
          return (
            <Note 
              key={note.id}
              id={note.id}
              title={note.title}
              body={note.body}
              footer={note.footer}
              handleChange={handleChange}
              handleDelete={handleDelete}
              svgColor={svgColor}
            />
          )
        })
      }
    </div>
  )
};

export default Notes;