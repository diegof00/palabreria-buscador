import "./App.css";
import React from "react";
import SearchForm from "./searchForm";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-logo">
          <img src="palabreria2.png" alt="logo" />
        </div>
      </header>
      <main className="Main">
        <SearchForm />
      </main>
    </div>
  );
}

export default App;
