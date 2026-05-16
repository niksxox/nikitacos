import { useState } from "react";
import "../App.css";

import wallpaper from "../assets/bg.png";
import taskbar from "../assets/taskbar.png";

import diaryIcon from "../assets/diary.png";
import projectsIcon from "../assets/projects.png";
import skillsIcon from "../assets/skills.png";
import contactsIcon from "../assets/contacts.png";
import githubIcon from "../assets/github.png";

function Desktop() {
  const [openWindow, setOpenWindow] = useState(null);

  return (
    <div className="desktop">

      <img src={wallpaper} className="wallpaper" />

      <div className="icons-area">

        <div className="desktop-icon" onClick={() => setOpenWindow("Diary")}>
          <img src={diaryIcon} />
          <p>Diary</p>
        </div>

        <div className="desktop-icon" onClick={() => setOpenWindow("Projects")}>
          <img src={projectsIcon} />
          <p>Projects</p>
        </div>

        <div className="desktop-icon" onClick={() => setOpenWindow("Skills")}>
          <img src={skillsIcon} />
          <p>Skills</p>
        </div>

        <div className="desktop-icon" onClick={() => setOpenWindow("Contacts")}>
          <img src={contactsIcon} />
          <p>Contacts</p>
        </div>

        <div className="desktop-icon" onClick={() => setOpenWindow("Github")}>
          <img src={githubIcon} />
          <p>Github</p>
        </div>

      </div>

      {openWindow && (
        <div className="popup-window">
          <div className="popup-header">
            <span>{openWindow}.exe</span>

            <button onClick={() => setOpenWindow(null)}>
              ✕
            </button>
          </div>

          <div className="popup-content">
            <h1>{openWindow}</h1>
            <p>content coming soon...</p>
          </div>
        </div>
      )}

      <img src={taskbar} className="taskbar" />

    </div>
  );
}

export default Desktop;