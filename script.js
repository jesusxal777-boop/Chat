const API = "https://script.google.com/macros/s/AKfycbyRAJomYjAuK2oGMkB0HpF8mD8quQmpa83bRevCJPr9Gs4D7KMI8QI08gTU42clmOze/exec";

async function loadMessages() {
  const res = await fetch(API);
  const data = await res.json();

  const box = document.getElementById("messages");
  box.innerHTML = "";

  data.forEach(m => {
    const div = document.createElement("div");
    div.className = "msg";
    div.textContent = `[${m.user}] ${m.text}`;
    box.appendChild(div);
  });

  box.scrollTop = box.scrollHeight;
}

async function sendMessage() {
  const user = document.getElementById("user").value;
  const text = document.getElementById("text").value;
  if (!user || !text) return;

  await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ user, text })
  });

  document.getElementById("text").value = "";
  loadMessages();
}

setInterval(loadMessages, 2000);
loadMessages();
