// content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const video = document.querySelector("video");
  
    if (!video) {
      console.error("No video element found!");
      return;
    }
  
    if (message.type === "CONTROL_VIDEO") {
      if (message.action === "PLAY") video.play();
      if (message.action === "PAUSE") video.pause();
      if (message.action === "SYNC") video.currentTime = message.timestamp;
    }
  
    if (message.type === "SERVER_MESSAGE") {
      console.log("Server message received:", message.data);
      // Additional server message handling logic here
    }
  
    sendResponse({ success: true });
  });
  