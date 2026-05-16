@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}

body{
  overflow:hidden;
  font-family:'Press Start 2P', cursive;
}


.desktop{
  width:78%;
  height:78%;

  max-width:1400px;
  max-height:820px;

  position:absolute;

  top:50%;
  left:50%;

  transform:translate(-50%,-50%);

  overflow:hidden;

  z-index:100;

  border:5px solid rgba(255,255,255,0.75);

  border-radius:22px;

  background:rgba(0,0,0,0.08);

  backdrop-filter:blur(4px);

  box-shadow:
    0 0 60px rgba(0,0,0,0.45),
    0 0 0 4px rgba(255,255,255,0.08);

  animation:desktopOpen 0.35s ease;
}

/* subtle screen glow */

.desktop::after{
  content:"";

  position:absolute;
  inset:0;

  background:
    linear-gradient(
      to bottom,
      rgba(255,255,255,0.04),
      rgba(0,0,0,0.08)
    );

  pointer-events:none;
}


.wallpaper{
  width:100%;
  height:100%;

  object-fit:cover;

  position:absolute;
  inset:0;
}

/* =========================
   HOTSPOTS
========================= */

.hotspot{
  position:absolute;

  background:transparent;

  border:none;

  cursor:pointer;

  z-index:10;

  transition:0.2s ease;
}

.hotspot:hover{
  transform:scale(1.05);
}

/* contacts */

.contacts-hotspot{
  left:10px;
  top:10px;

  width:160px;
  height:140px;
}

/* projects */

.projects-hotspot{
  left:10px;
  top:160px;

  width:170px;
  height:150px;
}

/* diary */

.diary-hotspot{
  left:10px;
  top:330px;

  width:170px;
  height:160px;
}

/* github */

.github-hotspot{
  left:10px;
  top:520px;

  width:180px;
  height:160px;
}

/* skills */

.skills-hotspot{
  left:10px;
  top:700px;

  width:180px;
  height:160px;
}

/* music */

.music-hotspot{
  right:20px;
  top:80px;

  width:360px;
  height:320px;
}

/* sticky note */

.note-hotspot{
  right:40px;
  top:420px;

  width:330px;
  height:320px;
}

/* internet */

.internet-hotspot{
  left:540px;
  bottom:0;

  width:260px;
  height:90px;
}

/* docs */

.docs-hotspot{
  left:820px;
  bottom:0;

  width:220px;
  height:90px;
}

/* start button */

.start-hotspot{
  left:0;
  bottom:0;

  width:180px;
  height:90px;
}



.popup-window{
  width:720px;
  height:480px;

  position:absolute;

  top:50%;
  left:50%;

  transform:translate(-50%,-50%);

  background:#ece4ff;

  border:5px solid #241B35;

  border-radius:22px;

  overflow:hidden;

  z-index:500;

  box-shadow:
    0 0 45px rgba(0,0,0,0.45);

  animation:popupOpen 0.25s ease;
}

.popup-header{
  height:58px;

  background:
    linear-gradient(
      to right,
      #6c4fc6,
      #b78dff
    );

  display:flex;

  align-items:center;

  justify-content:space-between;

  padding:0 22px;

  color:white;

  font-size:12px;
}

.popup-header button{
  width:34px;
  height:34px;

  border:none;

  border-radius:8px;

  background:#ff7272;

  color:white;

  cursor:pointer;

  font-size:18px;

  transition:0.2s ease;
}

.popup-header button:hover{
  transform:scale(1.08);
}

.popup-content{
  padding:40px;

  color:#2d2145;

  line-height:2;
}

.popup-content h1{
  margin-bottom:30px;

  font-size:22px;
}

.popup-content p{
  font-size:12px;
}

@keyframes popupOpen{
  from{
    opacity:0;
    transform:
      translate(-50%,-50%)
      scale(0.8);
  }

  to{
    opacity:1;
    transform:
      translate(-50%,-50%)
      scale(1);
  }
}

@keyframes desktopOpen{
  from{
    opacity:0;
    transform:
      translate(-50%,-50%)
      scale(0.9);
  }

  to{
    opacity:1;
    transform:
      translate(-50%,-50%)
      scale(1);
  }
}



@media(max-width:1200px){

  .desktop{
    width:95%;
    height:90%;
  }

  .popup-window{
    width:92%;
    height:80%;
  }

}