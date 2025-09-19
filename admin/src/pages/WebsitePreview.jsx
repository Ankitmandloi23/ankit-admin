// src/pages/WebsitePreview.js
import React from "react";

const WebsitePreview = ({ content, editing }) => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1
        data-edit-id="heroTitle"
        contentEditable={editing}
        suppressContentEditableWarning={true}
        style={{ outline: editing ? "1px dashed red" : "none" }}
      >
        {content.heroTitle}
      </h1>
      <p
        data-edit-id="heroSubtitle"
        contentEditable={editing}
        suppressContentEditableWarning={true}
        style={{ outline: editing ? "1px dashed red" : "none" }}
      >
        {content.heroSubtitle}
      </p>
      <footer
        data-edit-id="footerText"
        contentEditable={editing}
        suppressContentEditableWarning={true}
        style={{ outline: editing ? "1px dashed red" : "none" }}
      >
        {content.footerText}
      </footer>
    </div>
  );
};

export default WebsitePreview;
