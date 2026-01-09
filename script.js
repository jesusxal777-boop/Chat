const repoOwner = "Jesusxal777-boop";
const repoName = "Chat";
const filePath = "messages.json";
const branch = "main";
const token = "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"; // ⚠️ lee abajo

const apiURL = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;

async function loadMessages() {
  const res = await fetch(apiURL);
  const data = await res.json();
  const content = JSON.parse(atob(data.content));

  const box = document.getElementById("messages");
  box.innerHTML = "";

  content.messages.forEach(m => {
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

  const res = await fetch(apiURL);
  const data = await res.json();
  const json = JSON.parse(atob(data.content));

  json.messages.push({
    user,
    text,
    time: Date.now()
  });

  const updated = btoa(JSON.stringify(json, null, 2));

  await fetch(apiURL, {
    method: "PUT",
    headers: {
      "Authorization": `token ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: "Nuevo mensaje",
      content: updated,
      sha: data.sha,
      branch
    })
  });

  document.getElementById("text").value = "";
  loadMessages();
}

setInterval(loadMessages, 3000);
loadMessages();
