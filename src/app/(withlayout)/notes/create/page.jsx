"use client";

import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { message } from "antd";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });


const CreateNewNotes = () => {
  const [noteContent, setNoteContent] = useState(""); // Rich text content
  const [tags, setTags] = useState(""); // Inline tags
  const [title, setTitle] = useState(""); // Title of the note
  const [isSubmitting, setIsSubmitting] = useState(false); // Submission state

  // Memoized editor options to avoid unnecessary re-renders
  const editorOptions = useMemo(
    () => ({
      placeholder: "Write your note...",
      spellChecker: false,
      toolbar: [
        "bold",
        "italic",
        "heading",
        "|",
        "quote",
        "unordered-list",
        "ordered-list",
        "|",
        "code",
        "link",
        "image",
        "|",
        "preview",
        "guide",
      ],
    }),
    []
  );

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim() || !noteContent.trim()) {
      message.error("Title and Note Content are required.");
      return;
    }

    const payload = {
      title: title.trim(),
      note: noteContent.trim(),
      tag: tags.trim(),
    };

    try {
      setIsSubmitting(true);
      const response = await axios.post(
        "https://6749427886802029663051ce.mockapi.io/notesApi/api/v1/notes",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      message.success("Note created successfully!");
      setTitle("");
      setNoteContent("");
      setTags("");
    } catch (error) {
      console.error("Error creating note:", error);
      message.error("Failed to create note.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Create New Note</h1>
      <form onSubmit={handleSubmit}>
        {/* Title Input */}
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="title" style={{ display: "block", marginBottom: "8px" }}>
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter note title"
            required
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
        </div>

        {/* Rich Text Editor */}
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="noteContent" style={{ display: "block", marginBottom: "8px" }}>
            Note Content
          </label>
          <SimpleMDE
            id="noteContent"
            value={noteContent}
            onChange={setNoteContent}
            options={editorOptions} 
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="tags" style={{ display: "block", marginBottom: "8px" }}>
            Tags (e.g., #todo, #important)
          </label>
          <input
            id="tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter tags separated by commas"
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: isSubmitting ? "#aaa" : "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: isSubmitting ? "not-allowed" : "pointer",
          }}
        >
          {isSubmitting ? "Creating..." : "Create Note"}
        </button>
      </form>
    </div>
  );
};

export default CreateNewNotes;
