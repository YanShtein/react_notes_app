function searchNotes(notes, search) {
  let filtered = notes.filter(note => {
    if (search === '') {
      return note;
    } else {
      return (
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.body.toLowerCase().includes(search.toLowerCase())
      )
    };
  });

  return filtered;
};

export default searchNotes;