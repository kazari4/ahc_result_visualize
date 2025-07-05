// src/App.jsx
import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("/.netlify/functions/getData")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("Error fetching data"));
  }, []);

  return (
    <div>
      <h1>Message from Server:</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
