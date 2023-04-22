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

function getClientID(id) {
  const storedID = localStorage.getItem("chat_client_id");
  if (storedID && storedID !== "undefined") {
    return storedID;
  } else {
    const newID = id ? id : Math.random().toString(36).substr(2, 9);
    console.log("New client ID:", newID);
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
  const { isFromUser, content, serverError } = message;
  var messageClass = isFromUser ? "message-user" : "message-incoming";
  if (serverError) messageClass = "message-error";
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
              ${serverError ? "" : `<div class="message-time">${time}</div>`}
            </div>
          </div>
        </div>
        `;
  return element;
}

const messageHistory = [];

document.addEventListener("DOMContentLoaded", function () {
  // Initialize the socket.io client
  const socket = io("ws://localhost:8080");
  feather.replace();

  const clientID = getClientID(socket.id);
  const chatButton = document.getElementById("chat-button");
  const closeButton = document.getElementById("close-button");
  const chatBox = document.getElementById("chat-box");
  const sendButton = document.getElementById("send-button");
  const sendButtonIcon = document.getElementById("send-button-icon");
  const chatInput = document.getElementById("chat-input");
  const messages = document.getElementById("chat-messages");
  let isChatOpen = false;
  chatButton.addEventListener("click", () => {
    chatBox.classList.toggle("hidden");
    const chatIcon = document.getElementById("chat-button-icon");

    if (!isChatOpen) {
      chatIcon.setAttribute("data-feather", "chevron-right");
      chatIcon.classList.remove("chat-icon-closed");
      chatIcon.classList.add("chat-icon-open");
    } else {
      chatIcon.setAttribute("data-feather", "message-circle");
      chatIcon.classList.remove("chat-icon-open");
      chatIcon.classList.add("chat-icon-closed");
    }

    isChatOpen = !isChatOpen;
    feather.replace(); // Update the rendered icon
  });
  closeButton.addEventListener("click", () => {
    chatBox.classList.add("hidden");
  });

  // Handle connection errors
  socket.on("connect_error", (error) => {
    console.error("Connection error:", error);
    //add only one error message
    if (messages.innerHTML.includes("Server Error")) return;
    const newMessage = {
      serverError: true,
      content: "Server Error",
    };
    messages.innerHTML += makeMessageBubble(newMessage);
    messages.scrollTop = messages.scrollHeight;
    messageHistory.push(newMessage);
    // Inform the user about the connection error
  });

  // Handle message events
  socket.on("message", (data) => {
    console.log("Message received:", data);
    const isFromUser = data.user === clientID;
    console.log(isFromUser);
    const newMessage = {
      isFromUser,
      content: data.message,
    };
    messages.innerHTML += makeMessageBubble(newMessage);
    messages.scrollTop = messages.scrollHeight;
    messageHistory.push(newMessage);
  });

  const userData = gatherUserData();

  const sendMessage = () => {
    const message = chatInput.value.trim();
    if (message) {
      // Emit the message event to the server
      socket.emit("message", {
        user: clientID,
        message,
        // userData,
      });
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
