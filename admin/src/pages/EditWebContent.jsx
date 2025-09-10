import React, { useEffect, useState } from "react";

const EditWebContent = ({ section }) => {
  const [content, setContent] = useState({ title: "", description: "", points: [] });

  useEffect(() => {
    fetch(`http://localhost:5000/api/content/${section}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) setContent(data);
      });
  }, [section]);

  const handleChange = (e) => {
    setContent({ ...content, [e.target.name]: e.target.value });
  };

  const handlePointsChange = (index, value) => {
    const updatedPoints = [...content.points];
    updatedPoints[index] = value;
    setContent({ ...content, points: updatedPoints });
  };

  const handleSave = () => {
    fetch(`http://localhost:5000/api/content/${section}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    })
      .then((res) => res.json())
      .then((data) => alert("Content Updated Successfully!"));
  };

  return (
    <div className="edit-content">
      <h2>Edit {section} Section</h2>
      <input
        type="text"
        name="title"
        value={content.title}
        onChange={handleChange}
        placeholder="Title"
      />
      <textarea
        name="description"
        value={content.description}
        onChange={handleChange}
        placeholder="Description"
      />

      <h3>Points</h3>
      {content.points?.map((point, i) => (
        <input
          key={i}
          type="text"
          value={point}
          onChange={(e) => handlePointsChange(i, e.target.value)}
        />
      ))}

      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default EditWebContent;
