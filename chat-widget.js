const chatWidgetHTML = `
 <body id="chat-body">
    <div id="chat-button" class="chat-button">
      <i id="chat-button-icon" data-feather="message-circle" class="chat-icon-closed"></i>
    </div>
    <div id="chat-box" class="chat-box hidden">
      <div class="chat-header">
        <h4>Chat</h4>
        <button id="close-button" class="close-button">&times;</button>
      </div>
      <div id="chat-messages" class="chat-messages"></div>
      <div class="chat-input-container">
        <input id="chat-input" class="chat-input" type="text" placeholder="Type your message..." />
        <button id="send-button" class="send-button"><i id="send-button-icon" class="send-button-icon" data-feather="send"></i></button>
      </div>
    </div>
  </body>
`;

const chatWidgetCSS = `
/* General styles */
#czr-chat-widget-wrapper .chat-button,
#czr-chat-widget-wrapper .close-button,
#czr-chat-widget-wrapper .send-button {
  cursor: pointer;
}

#czr-chat-widget-wrapper {
  --primary-color: #9f23ff;
  --secondary-color: #fff;
  --primary-font: "Roboto", sans-serif;
  --secondary-font: "Roboto", sans-serif;
  font-family: var(--primary-font);
  font-size: 14px;
  line-height: 1.5;
}

/* Chat button styles */
#czr-chat-widget-wrapper .chat-button {
  position: fixed;
  bottom: 25px;
  /* right: 30px; */
  left: 30px;
  z-index: 1000;
  background-color: var(--primary-color);
  color: var(--secondary-color);
  border-radius: 50%;
  width: 45px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}
#czr-chat-widget-wrapper .chat-button:hover {
  transition: transform 0.16s linear 0s, opacity 0.08s linear 0s;
  transform: scale(1.1);
}
#czr-chat-widget-wrapper .chat-button:active {
  transition: transform 0.16s linear 0s, opacity 0.08s linear 0s;
  transform: scale(0.9);
}

#czr-chat-widget-wrapper .chat-icon-open {
  animation-fill-mode: forwards;
  animation-name: rotate-icon;
  animation-duration: 0.4s;
  transform: rotate(90deg);
}

#czr-chat-widget-wrapper .chat-icon-closed {
  /* Add animation to scale up when class is added */
  animation-name: icon-scale-up;
  animation-duration: 0.6s;
  animation-fill-mode: backwards;
}

@keyframes icon-scale-up {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  33% {
    opacity: 0.5;
    transform: scale(1.2);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes rotate-icon {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(90deg);
  }
}

.hiden {
  display: none;
}
/* Chat box styles */
#czr-chat-widget-wrapper .chat-box {
  position: fixed;
  bottom: 80px;
  /* right: 30px; */
  left: 35px;
  z-index: 1001;
  width: 90%;
  min-height: 500px;
  max-width: 360px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  max-height: 60vh;
  overflow-y: auto;
  /* Add animation to scale up when class is added */
  animation-name: scale-up;
  animation-duration: 0.3s;
  transform-origin: bottom left;
}

@keyframes scale-up {
  0% {
    opacity: 0;
    transform: scale(0);
    border-radius: 5px;
  }
  50% {
    border-radius: 10px;
  }

  100% {
    opacity: 1;
    transform: scale(1);
    border-radius: 15px;
  }
}

#czr-chat-widget-wrapper .chat-box.hidden {
  display: none;
}

#czr-chat-widget-wrapper .chat-header {
  padding: 10px;
  background-color: var(--primary-color);
  color: #fff;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

#czr-chat-widget-wrapper .close-button {
  background-color: transparent;
  border: none;
  font-size: 24px;
  color: #fff;
}

#czr-chat-widget-wrapper .chat-messages {
  flex-grow: 1;
  padding: 10px;
  overflow-y: auto;
}

#czr-chat-widget-wrapper .chat-input-container {
  width: 100%;
  border-top: 1px solid #ddd;
  /* padding: 10px; */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#czr-chat-widget-wrapper .chat-input {
  width: 80%;
  height: 100%;
  outline: none;
  padding: 10px;
  font-size: 14px;
  line-height: 20px;
  word-wrap: break-word;
  word-break: break-word;
  white-space: pre-wrap;
  resize: none;
  overflow-x: hidden;
  overflow-y: auto;
  min-height: 60px;
  max-height: 148px;
  border: none;
  background: rgba(0, 0, 0, 0);
  -webkit-overflow-scrolling: touch;
  color: #333;
}

#czr-chat-widget-wrapper .chat-input:focus {
  outline: none;
}

#czr-chat-widget-wrapper .send-button {
  height: 100%;
  background: transparent;
  color: #666;
  border: none;
  outline: none;
}

#czr-chat-widget-wrapper .send-button-icon:hover {
  transition: transform 0.16s linear 0s, opacity 0.08s linear 0s;
  transform: scale(1.1);
}
#czr-chat-widget-wrapper .send-button-icon:active {
  transition: transform 0.16s linear 0s, opacity 0.08s linear 0s;
  transform: scale(0.9);
}

#czr-chat-widget-wrapper .chat-messages {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

#czr-chat-widget-wrapper .chat-message {
  padding: 5px;
}

#czr-chat-widget-wrapper .message-bubble {
  display: flex;
  padding: 15px;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  border-radius: 10px;
  margin-bottom: 10px;
    -webkit-box-shadow: 0px 0px 50px 5px rgba(0, 0, 0, 0.38);
  box-shadow: 0px 0px 50px 5px rgba(0, 0, 0, 0.38);
}

#czr-chat-widget-wrapper .chat-message .message-bubble {
  min-width: 150px;
  max-width: 80%;
}

#czr-chat-widget-wrapper .message-user .message-bubble {
  margin-left: auto;
  background-color: var(--primary-color);
  color: #fafafa;
}

`;

function gatherBrowserInfo() {
  return {
    appName: navigator.appName,
    userAgent: navigator.userAgent,
    screenSize: { width: screen.width, height: screen.height },
    language: navigator.language || navigator.userLanguage,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    referrer: document.referrer,
  };
}

function getClientInfo(socketId) {
  localStorage.clear();
  let clientInfo = {
    id: localStorage.getItem("chat_client_id"),
    browserInfo: gatherBrowserInfo(),
    domain: window.location.hostname,
  };
  if (!clientInfo.id) {
    const newID = socketId ? socketId + "-" + clientInfo.domain : Math.random().toString(36).substr(2, 9) + "-" + clientInfo.domain;
    console.log("New client ID:", newID);
    localStorage.setItem("chat_client_id", newID);
    clientInfo.id = newID;
  }

  return clientInfo;
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

function initializeChatWidget(socketServerURL) {
  (function () {
    const messageHistory = [];
    const socket = io(socketServerURL);
    feather.replace();

    const clientInfo = getClientInfo(socket.id);
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
      const isFromUser = data.user === clientInfo.id;
      console.log(isFromUser);
      const newMessage = {
        isFromUser,
        content: data.message,
      };
      messages.innerHTML += makeMessageBubble(newMessage);
      messages.scrollTop = messages.scrollHeight;
      messageHistory.push(newMessage);
    });

    const userData = gatherBrowserInfo();

    const sendMessage = () => {
      const message = chatInput.value.trim();
      if (message) {
        // Emit the message event to the server
        socket.emit("message", {
          userType: "user",
          user: clientInfo.id,
          message,
          clientInfo: clientInfo,
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
  })();
}

function loadScript(url, callback) {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = url;

  script.onload = function () {
    callback();
  };

  document.head.appendChild(script);
}

function loadScriptsSequentially(scripts, callback) {
  function loadNextScript(index) {
    if (index < scripts.length) {
      loadScript(scripts[index], function () {
        loadNextScript(index + 1);
      });
    } else {
      callback();
    }
  }

  loadNextScript(0);
}

const libraries = ["https://unpkg.com/feather-icons", "https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.4.1/socket.io.min.js"];

loadScriptsSequentially(libraries, function () {
  const chatWidgetContainer = document.createElement("div");
  chatWidgetContainer.id = "czr-chat-widget-wrapper";
  chatWidgetContainer.innerHTML = chatWidgetHTML;
  document.body.appendChild(chatWidgetContainer);

  const styleElement = document.createElement("style");
  styleElement.innerHTML = chatWidgetCSS;
  document.head.appendChild(styleElement);

  initializeChatWidget("ws://localhost:8080");
});
