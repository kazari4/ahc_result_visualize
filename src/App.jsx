import { useEffect, useState } from "react";

function App() {
  useEffect(() => {
    fetch('/.netlify/functions/getData')
      .then(res => res.json())
      .then(data => console.log("取得成功:", data))
      .catch(err => console.error("取得失敗:", err));
  }, []);

  return (
    <div>
      <h1>Hello!!</h1>
    </div>
  );
}

export default App;
