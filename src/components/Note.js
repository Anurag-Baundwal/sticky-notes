import React, { useState, useEffect } from 'react';

function Note({ note, onDelete, onUpdate }) {

	console.log("From Note.js", note); // Debug line	
  const [isEditing, setEditing] = useState(false);
  const [newContent, setNewContent] = useState("");
  const [newTitle, setNewTitle] = useState("");

	useEffect(() => {
    if(note) {
      setNewContent(note.content);
      setNewTitle(note.title);
    }
  }, [note]);

  const handleUpdate = () => {
    onUpdate(note._id, newTitle, newContent);
    setEditing(false);
  };

  return (
    <div className="note">
      {isEditing ? (
        <div>
          <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
          <textarea value={newContent} onChange={(e) => setNewContent(e.target.value)} />
          <button onClick={handleUpdate}>Update</button>
        </div>
      ) : (
        <div>
          <h1 onClick={() => setEditing(true)}>{note.title}</h1>
          <p onClick={() => setEditing(true)}>{note.content}</p>
        </div>
      )}
      <button onClick={() => onDelete(note._id)}>DELETE</button>
    </div>
  );
}

export default Note;