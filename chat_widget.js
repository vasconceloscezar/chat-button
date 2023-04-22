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

function makeMessageBubble(message) {
  const { sender, content } = message;
  var messageClass = sender === "user" ? "message-user" : "message-incoming";
  if (!sender) messageClass = "message-error";
  const date = new Date();
  const time = formatDateToTime(date);

  const element = `<div class="chat-message ${messageClass}">
          <div class="message-bubble">
            <div class="message-content-container">
              <div class="message-content">
                ${content}
              </div>
            </div>
            <div class="message-time-container">
              ${!sender ? "" : `<div class="message-time">${time}</div>`}
            </div>
          </div>
        </div>
        `;
  return element;
}

document.addEventListener("DOMContentLoaded", function () {
  const clientID = getClientID();
  const chatButton = document.getElementById("chat-button");
  const closeButton = document.getElementById("close-button");
  const chatBox = document.getElementById("chat-box");
  const sendButton = document.getElementById("send-button");
  const chatInput = document.getElementById("chat-input");
  const messages = document.getElementById("chat-messages");
  let isChatOpen = false;

  chatButton.addEventListener("click", () => {
    chatBox.classList.toggle("hidden");
    if (!isChatOpen) {
      chatButton.innerHTML = `<i class="chat-icon">Close</i>`;
    } else {
      chatButton.innerHTML = `<i class="chat-icon">Chat</i>`;
    }
    isChatOpen = !isChatOpen;
  });

  closeButton.addEventListener("click", () => {
    chatBox.classList.add("hidden");
  });

  // Initialize the socket.io client
  const socket = io("ws://localhost:8080");

  // Handle connection errors
  socket.on("connect_error", (error) => {
    console.error("Connection error:", error);
    //add only one error message
    if (messages.innerHTML.includes("Server Error")) return;
    messages.innerHTML += makeMessageBubble({ content: "Server Error" });
    messages.scrollTop = messages.scrollHeight;

    // Inform the user about the connection error
  });

  // Handle message events
  socket.on("message", (data) => {
    console.log("Message received:", data);
    if (data.user !== clientID) {
      messages.innerHTML += makeMessageBubble({ sender: "user", content: data.message });
      messages.scrollTop = messages.scrollHeight;
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

      messages.innerHTML += makeMessageBubble({ sender: "user", content: message });
      messages.scrollTop = messages.scrollHeight;

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
