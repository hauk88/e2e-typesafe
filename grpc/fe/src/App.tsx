import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { GreetingClient } from './grpc/greeting.client';
import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport';

function App() {

  const [name, setName] = useState("default");
  const [greeting,setGreeting] = useState("");
  
  const transport = new GrpcWebFetchTransport({
    baseUrl: "http://localhost:50051",
  });
  const client = new GreetingClient(transport);

  const sendGrpc = () => {
    client.greeting({name:name}).then((r) => {
      setGreeting(r.response.greetings);
    })
  }

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
        <input type="text" onChange={(e) => setName(e.target.value)} value={name}/>
        <button onClick={sendGrpc}>
          send
        </button>
        <p>
          Greeting from grpc: {greeting}
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
