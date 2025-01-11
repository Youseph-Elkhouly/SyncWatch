// background.js
let socket;

chrome.runtime.onInstalled.addListener(() => {
  console.log("SyncWatch Extension Installed!");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "CONNECT_SOCKET") {
    if (!socket) {
      socket = new WebSocket("ws://localhost:5000"); // Replace with your WebSocket server URL
      socket.onopen = () => console.log("WebSocket connected!");
      socket.onmessage = (event) => {
        console.log("Received from server:", event.data);
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id || 0, { type: "SERVER_MESSAGE", data: event.data });
        });
      };
    }
  }
  sendResponse({ success: true });
});
