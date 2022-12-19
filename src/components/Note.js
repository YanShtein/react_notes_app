import { useState } from 'react';
import { editSvg, deleteSvg, saveSvg } from './../assets/svg';

function Note({ id, title, body, footer, edited, handleChange, handleDelete, svgColor }) {
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
            style={svgColor}
            name='title'
            value={title}
            placeholder="Title"
            onChange={e => handleChange(e, id)}
          />
        </div>
        <div className='note_description'>
          <textarea 
            style={svgColor}
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
          {
            title.length === 0 ? 
            <span className='empty_note'>Empty note</span>
            : <span>{title}</span>
          }
        </div>
        <div className='note_description'>
          <span>{body}</span>
        </div>
        <div className='note_footer'>
          {
            edited ? <span>Edited</span> : <span>Created</span>
          }
          <span>{footer}</span>
          <button 
            title='Delete note'
            className='delete_note'
            type='button' 
            style={svgColor} 
            onClick={() => handleDelete(id)}
            >{deleteSvg}
          </button>
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