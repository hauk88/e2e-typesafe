import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { trpc } from "./trpc";

function App() {
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");

  const sendGreetingRequest = async () => {
    const data = await trpc.greeting.query({ name: name });

    setGreeting(data.greeting);
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <button onClick={sendGreetingRequest}>send</button>
        <p>Greeting from trpc: {greeting}</p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
