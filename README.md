## **Overview**

The chat widget is a fully functional, real-time chat client that can be easily integrated into any web application. It utilizes Socket.IO for real-time communication and Feather Icons for displaying icons. The widget can be easily customized and styled using the provided CSS.

## **How to use**

To use the chat widget, include the provided JavaScript code and follow the instructions below:

1. Add the following libraries to your HTML file:

```
htmlCopy code
<script src="https://unpkg.com/feather-icons"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.4.1/socket.io.min.js"></script>

```

1. Include the chat widget JavaScript code in your HTML file, or in a separate JavaScript file.
2. To initialize the chat widget, call the **`initializeChatWidget`** function with the WebSocket URL of your server:

```
javascriptCopy code
initializeChatWidget("ws://localhost:8080");

```

1. The chat widget will be automatically added to your web page, and the required CSS styles will be applied.

## **Functions**

### **gatherBrowserInfo()**

This function collects browser and system information from the user, such as the user agent, screen size, language, and timezone.

### **getClientInfo(socketId)**

This function generates and returns the client ID for the user, as well as additional browser and system information. The client ID is stored in **`localStorage`**.

### **formatDateToTime(date)**

This function formats a given date object into a string representing the time in the format **`HH:mm`**.

### **makeMessageBubble(message)**

This function takes a message object and returns a formatted HTML string representing the message bubble.

### **initializeChatWidget(socketServerURL)**

This function initializes the chat widget and sets up the required event listeners. It takes the WebSocket URL of your server as an argument.

### **loadScript(url, callback)**

This function loads a script from the specified URL and calls the provided callback function when the script has finished loading.

### **loadScriptsSequentially(scripts, callback)**

This function loads an array of scripts sequentially and calls the provided callback function when all scripts have finished loading.

## **Customization**

The chat widget can be easily customized using the provided CSS. You can change the primary and secondary colors, fonts, and other styles by modifying the CSS variables:

```
cssCopy code
--primary-color: #9f23ff;
--secondary-color: #fff;
--primary-font: "Roboto", sans-serif;
--secondary-font: "Roboto", sans-serif;

```

You can also modify other styles within the **`chatWidgetCSS`** variable to customize the appearance of the chat widget to fit your needs.