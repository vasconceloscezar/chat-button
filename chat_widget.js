function gatherUserData() {
  const browser = {
    appName: navigator.appName,
    userAgent: navigator.userAgent,
    screenSize: { width: screen.width, height: screen.height },
    language: navigator.language || navigator.userLanguage,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    referrer: document.referrer,
  };

  const userData = {
    browser,
  };

  return userData;
}

function getClientID() {
  const storedID = localStorage.getItem("chat_client_id");
  if (storedID) {
    return storedID;
  } else {
    const newID = "client-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
    localStorage.setItem("chat_client_id", newID);
    return newID;
  }
}
function formatDateToTime(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedHours = hours < 10 ? "0" + hours : hours;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  const time = formattedHours + ":" + formattedMinutes;
  return time;
}

document.addEventListener("DOMContentLoaded", function () {
  const clientID = getClientID();

  const chatButton = document.getElementById("chat-button");
  const closeButton = document.getElementById("close-button");
  const chatBox = document.getElementById("chat-box");
  const sendButton = document.getElementById("send-button");
  const chatInput = document.getElementById("chat-input");
  const messages = document.getElementById("chat-messages");

  chatButton.addEventListener("click", () => {
    chatBox.classList.toggle("hidden");
  });

  closeButton.addEventListener("click", () => {
    chatBox.classList.add("hidden");
  });

  // Initialize the socket.io client
  const socket = io("ws://localhost:8080");

  // Handle connection errors
  socket.on("connect_error", (error) => {
    console.error("Connection error:", error);
    messages.innerHTML += "<p>Connection error: " + error + "</p>";

    // Inform the user about the connection error
  });

  // Handle message events
  socket.on("message", (data) => {
    console.log("Message received:", data);
    const messageClass = data.user === clientID ? "user-message" : "incoming-message";
    const time = formatDateToTime(date);

    const messageBubbleClass = "message-bubble";
    if (data.user !== clientID) {
      messages.innerHTML += `<div class="chat-message ${messageClass}">
                              <div class="${messageBubbleClass}">
																<div class="message-content">${data.message}</div>
																<div class="message-time">${time}</div>
                              </div>
                            </div>`;
    }
  });

  const userData = gatherUserData();

  const sendMessage = () => {
    const message = chatInput.value.trim();
    if (message) {
      // Emit the message event to the server
      socket.emit("message", {
        user: clientID,
        message,
        userData,
      });
      const date = new Date();
      const time = formatDateToTime(date);
      const messageBubbleClass = "message-bubble";
      messages.innerHTML += `<div class="chat-message user-message">
                             	 <div class="${messageBubbleClass}">
																<div class="message-content">${message}</div>
																<div class="message-time">${time}</div>
                              </div>
                            </div>`;
      chatInput.value = "";
    }
  };

  sendButton.addEventListener("click", () => sendMessage());
  chatInput.addEventListener("keydown", (event) => {
    if (event.code === "Enter" || event.code === "NumpadEnter") {
      event.preventDefault();
      sendMessage();
    }
  });
});
