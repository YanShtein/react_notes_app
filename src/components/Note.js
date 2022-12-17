import { useState } from 'react';
import { editSvg, deleteSvg, saveSvg } from './../assets/svg';

function Note({ id, title, body, footer, handleChange, handleDelete, svgColor }) {
  const [isEditing, setIsEditing] = useState(false);
  
  let content;
  if (isEditing) {
    content = (
      <div className='note'>
        <div className='note_svg' title="Save note">
          <button type='button' style={svgColor} onClick={() => setIsEditing(false)}>
            {saveSvg}
          </button>
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
      <div className='note' onClick={() => setIsEditing(true)} title="Edit note">
        <div className='note_svg'>
          <button type='button' style={svgColor}>
            {editSvg}
          </button>
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
          <div title="Delete note">
            <button type='button' style={svgColor} onClick={() => handleDelete(id)}>
              {deleteSvg}
            </button>
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
};

export default Note;