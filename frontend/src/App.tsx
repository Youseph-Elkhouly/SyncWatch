import React, { useState } from "react";
import { VideoControlAction, ControlMessage } from "./types";
import "./App.css";

const App: React.FC = () => {
  const [sessionId, setSessionId] = useState<string>("");

  const sendMessageToContent = (action: string, timestamp?: number) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id || 0, { type: "CONTROL_VIDEO", action, timestamp });
    });
  };

  const handleConnect = () => {
    chrome.runtime.sendMessage({ type: "CONNECT_SOCKET" }, (response) => {
      if (response.success) console.log("WebSocket connection initiated!");
    });
  };

  const handlePlay = () => sendMessageToContent("PLAY");
  const handlePause = () => sendMessageToContent("PAUSE");
  const handleSync = () => {
    // Example timestamp; replace with actual logic to sync timestamps
    const timestamp = 30; // Assume 30 seconds as an example
    sendMessageToContent("SYNC", timestamp);
  };

  return (
    <div className="syncwatch-container">
      <header className="syncwatch-header">
        <h1>SyncWatch</h1>
      </header>
      <main className="syncwatch-main">
        <button className="btn" onClick={handleConnect}>
          Connect to Server
        </button>
        <div className="playback-controls">
          <button className="btn btn-play" onClick={handlePlay}>
            ▶️ Play
          </button>
          <button className="btn btn-pause" onClick={handlePause}>
            ⏸ Pause
          </button>
          <button className="btn btn-sync" onClick={handleSync}>
            🔄 Sync
          </button>
        </div>
      </main>
    </div>
  );
};

export default App;
