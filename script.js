let messages = [];
let currentPopupIndex = 0;
const popup = document.getElementById("popup");
const popupText = document.getElementById("popup-text");
const popupAuthor = document.getElementById("popup-author");
const popupIcon = document.getElementById("popup-icon");

document.getElementById("popup-close").addEventListener("click", () => {
  popup.style.display = "none";
});

fetch("news.json")
  .then(res => res.json())
  .then(data => {
    messages = data;
    renderMessages();
    if (messages.length > 0) showPopup(0);
  });

function getIconClass(name) {
  const icons = {
    megaphone: "bi-megaphone",
    info: "bi-info-circle",
    warning: "bi-exclamation-triangle"
  };
  return icons[name] || "bi-info-circle";
}

function createMessageBox(msg) {
  const box = document.createElement("div");
  box.classList.add("message-box");
  if (msg.urgent) box.classList.add("urgent");

  const icon = document.createElement("i");
  icon.className = "message-icon bi " + getIconClass(msg.icon);
  box.appendChild(icon);

  const contentDiv = document.createElement("div");
  contentDiv.classList.add("message-content");

  // Bild falls vorhanden
  if (msg.image) {
    const img = document.createElement("img");
    img.src = msg.image;
    img.alt = "Bild";
    contentDiv.appendChild(img);
  }

  const textNode = document.createElement("div");
  if (msg.link) {
    const btn = document.createElement("button");
    btn.textContent = msg.message || "Kein Text vorhanden";
    btn.style.background = "#444";
    btn.style.color = "#fff";
    btn.style.border = "none";
    btn.style.padding = "0.5rem 1rem";
    btn.style.borderRadius = "6px";
    btn.style.cursor = "pointer";
    btn.addEventListener("click", () => {
      window.open(msg.link, "_blank", "noopener");
    });
    textNode.appendChild(btn);
  } else {
    textNode.textContent = msg.message || "Kein Text vorhanden";
  }
  contentDiv.appendChild(textNode);

  const authorNode = document.createElement("div");
  authorNode.classList.add("message-author");
  authorNode.textContent = msg.author || "Unbekannter Autor";
  contentDiv.appendChild(authorNode);

  box.appendChild(contentDiv);
  return box;
}

function renderMessages() {
  const list = document.getElementById("message-list");
  list.innerHTML = "";
  messages.forEach(msg => {
    list.appendChild(createMessageBox(msg));
  });
}

function showPopup(index) {
  if (index >= messages.length) {
    popup.style.display = "none";
    return;
  }
  const msg = messages[index];
  popupText.innerHTML = "";

  if (msg.image) {
    const img = document.createElement("img");
    img.src = msg.image;
    img.alt = "Bild";
    popupText.appendChild(img);
  }

  if (msg.link) {
    const btn = document.createElement("button");
    btn.textContent = msg.message || "";
    btn.style.background = "#444";
    btn.style.color = "#fff";
    btn.style.border = "none";
    btn.style.padding = "0.4rem 0.8rem";
    btn.style.borderRadius = "6px";
    btn.style.cursor = "pointer";
    btn.addEventListener("click", () => {
      window.open(msg.link, "_blank", "noopener");
    });
    popupText.appendChild(btn);
  } else {
    popupText.appendChild(document.createTextNode(msg.message || ""));
  }

  popupAuthor.textContent = msg.author || "";
  popup.className = msg.urgent ? "urgent" : "";
  popupIcon.className = "message-icon bi " + getIconClass(msg.icon);
  popup.style.display = "block";
  currentPopupIndex = index;
}
