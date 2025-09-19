import React, { useEffect, useState } from "react";
import WebsitePreview from "./WebsitePreview";

const EditWebContent = () => {
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState({
    heroTitle: "",
    heroSubtitle: "",
    footerText: ""
  });

  // Load from backend
  useEffect(() => {
    fetch("http://localhost:8080/api/WebsiteContentEditRoutes/webSiteGetContent")
      .then(res => res.json())
      .then((data) => {
        const array = data.result || []; // <-- use the result array
        const obj = {};
        array.forEach((item) => {
          obj[item.key] = item.value;
        });
        console.log("Fetched content:", obj);
        setContent(obj);
      })
      .catch(err => console.error(err));

  }, []);

  const saveChanges = () => {
    fetch("http://localhost:8080/api/WebsiteContentEditRoutes/WebsiteSetContent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content)
    }).then(() => alert("Content saved!"));
    console.log("Saved content:", content);
  };

  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={() => setEditing(!editing)}>
          {editing ? "Disable Edit Mode" : "Enable Edit Mode"}
        </button>
        <button onClick={saveChanges}>Save</button>
      </div>
      <WebsitePreview content={content} editing={editing} />
    </div>
  );
};

export default EditWebContent;
