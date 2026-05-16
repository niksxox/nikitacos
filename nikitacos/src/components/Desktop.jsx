import { useState } from "react";
import "../App.css";

import wallpaper from "../assets/desktop-wallpaper.png";

function Desktop() {

  const [openWindow, setOpenWindow] = useState(null);

  return (

    <div className="desktop">

      {/* wallpaper */}
      <img
        src={wallpaper}
        className="wallpaper"
        alt="desktop"
      />

      {/* CONTACTS */}
      <button
        className="hotspot contacts-hotspot"
        onClick={() => setOpenWindow("Contacts")}
      />

      {/* PROJECTS */}
      <button
        className="hotspot projects-hotspot"
        onClick={() => setOpenWindow("Projects")}
      />

      {/* DIARY */}
      <button
        className="hotspot diary-hotspot"
        onClick={() => setOpenWindow("Diary")}
      />

      {/* GITHUB */}
      <button
        className="hotspot github-hotspot"
        onClick={() => setOpenWindow("Github")}
      />

      {/* SKILLS */}
      <button
        className="hotspot skills-hotspot"
        onClick={() => setOpenWindow("Skills")}
      />

      {/* MUSIC */}
      <button
        className="hotspot music-hotspot"
        onClick={() => setOpenWindow("Music")}
      />

      {/* STICKY NOTE */}
      <button
        className="hotspot note-hotspot"
        onClick={() => setOpenWindow("Notes")}
      />

      {/* INTERNET */}
      <button
        className="hotspot internet-hotspot"
        onClick={() => setOpenWindow("Internet")}
      />

      {/* DOCS */}
      <button
        className="hotspot docs-hotspot"
        onClick={() => setOpenWindow("Docs")}
      />

      {/* START */}
      <button
        className="hotspot start-hotspot"
        onClick={() => setOpenWindow("Start")}
      />

      {/* POPUP WINDOW */}

      {openWindow && (

        <div className="popup-window">

          <div className="popup-header">

            <span>
              {openWindow}.exe
            </span>

            <button onClick={() => setOpenWindow(null)}>
              ✕
            </button>

          </div>

          <div className="popup-content">

            <h1>{openWindow}</h1>

            <p>
              content coming soon...
            </p>

          </div>

        </div>

      )}

    </div>

  );
}

export default Desktop;