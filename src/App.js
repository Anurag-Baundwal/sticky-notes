import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";
import { createAPI } from './api.js';
import axios from 'axios';

function App() {
  const [notes, setNotes] = useState([]);

  const [baseURL, setBaseURL] = useState("default_url");

  useEffect(() => {
    const fetchBaseURL = async () => {
      try {
        const response = await axios.get("https://fc49-2402-3a80-88c-d9ad-cc6d-949f-a6f9-b77e.ngrok.io/getBaseURL");
        setBaseURL(response.data.baseURL);
      } catch (error) {
        console.error("Could not fetch baseURL", error);
      }
    };
    fetchBaseURL();
    console.log(baseURL)
  });

  useEffect(() => {
    if (baseURL !== "") {
      const api = createAPI(baseURL);
      async function fetchData() {
        try {
          const response = await api.get("/notes");
          setNotes(response.data);
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      }
      fetchData();
    }
  }, [baseURL]);

  const api = createAPI(baseURL);

  async function addNote(newNote) {
    const response = await api.post("/notes", newNote);
    setNotes(prevNotes => {
      return [...prevNotes, response.data];
    });
  }

  async function deleteNote(id) {
    await api.delete(`/notes/${id}`);
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem) => {
        return noteItem._id !== id;
      });
    });
  }

  const updateNote = async (id, newTitle, newContent) => {
    const updatedNote = { title: newTitle, content: newContent };
    try {
      // const response = await api.put(`/notes/${id}`, updatedNote);
      // Manually update the state
      setNotes(prevNotes => {
        return prevNotes.map((note) => {
          if (note._id === id) {
            return { ...note, ...updatedNote };
          } else {
            return note;
          }
        });
      });
    } catch (error) {
      console.error("An error occurred while updating the note:", error);
    }
  };

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.length > 0 ? (
        notes.map((noteItem, index) => {
          console.log(`NoteItem ${index}:`, noteItem);  // Debug line
          return (
            <Note
              key={noteItem._id}
              // id={noteItem._id}
              // title={noteItem.title}
              // content={noteItem.content}
              note={noteItem}
              onDelete={deleteNote}
              onUpdate={updateNote}
            />
          );
        })
      ) : (
        <p>No notes available.</p>
      )}
      <Footer />
    </div>
  );
}

export default App;
