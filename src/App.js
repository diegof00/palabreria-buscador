import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./components/menu";
import SearchForm from "./components/searchForm";
import DraggeableForm from "./components/DraggeableForm";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-logo">
          <img src="palabreria2.png" alt="logo" />
        </div>
        <div className="App-menu">
          <BrowserRouter>
            <Menu />
            <Routes>
              <Route path="/" element={<SearchForm />} />
              <Route path="/searchForm" element={<SearchForm />} />
              <Route path="/ruleta" element={<DraggeableForm />} />
            </Routes>
          </BrowserRouter>
        </div>
      </header>
      <main className="Main"></main>
    </div>
  );
}

export default App;
