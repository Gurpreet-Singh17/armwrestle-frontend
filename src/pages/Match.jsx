import { useState } from "react";

export default function Match() {
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);
  const [input, setInput] = useState("");

  const userId = localStorage.getItem("userId");

  const connect = () => {
    if (!userId) {
      alert("Please login first ❌");
      return;
    }

    // ✅ PRODUCTION WebSocket (IMPORTANT CHANGE)
    const socket = new WebSocket(
      `wss://armwrestle-connect-backend.onrender.com/api/v1/ws/match/${userId}`
    );

    socket.onopen = () => {
      console.log("Connected ✅");
      setConnected(true);
    };

    socket.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    socket.onclose = () => {
      console.log("Connection closed ❌");
      setConnected(false);
    };

    socket.onerror = (err) => {
      console.log("WebSocket error", err);
      alert("WebSocket error ❌");
    };

    setWs(socket);
  };

  const send = (msg) => {
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      alert("WebSocket not connected ❌");
      return;
    }

    ws.send(msg);
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "auto",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)"
      }}
    >
      <h2 style={{ textAlign: "center" }}>Armwrestle Match 🔥</h2>

      {!connected && (
        <button onClick={connect} style={{ width: "100%" }}>
          Find Match
        </button>
      )}

      {connected && (
        <>
          <div style={{ marginTop: "10px", textAlign: "center" }}>
            <button onClick={() => send("accept")}>Accept</button>
            <button onClick={() => send("reject")}>Reject</button>
          </div>

          <div
            style={{
              border: "1px solid gray",
              height: "200px",
              overflowY: "scroll",
              marginTop: "10px",
              padding: "10px",
              borderRadius: "5px"
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  background: "#eee",
                  padding: "8px",
                  margin: "5px 0",
                  borderRadius: "6px"
                }}
              >
                {m}
              </div>
            ))}
          </div>

          <input
            placeholder="Type message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ width: "100%", marginTop: "10px" }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && input.trim()) {
                send(input);
                setInput("");
              }
            }}
          />
        </>
      )}
    </div>
  );
}