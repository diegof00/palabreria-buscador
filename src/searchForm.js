import React, { useState } from "react";
import Tabs from "./TabsResults";

function SearchForm() {
  const [palabra, setPalabra] = useState("");
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResultado(null);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:8080/search?palabra=${palabra}`
      );
      if (!response.ok) {
        setError("No se encontraron resultados");
        throw new Error("No se encontraron resultados");
      }
      const data = await response.json();
      setResultado(data);
    } catch (error) {
      console.error("Error al realizar la búsqueda:", error);
    }
  };

  return (
    <div class="search-container">
      <form id="searchForm" onSubmit={handleSubmit}>
        <input
          type="text"
          id="searchInput"
          value={palabra}
          onChange={(e) => setPalabra(e.target.value)}
          placeholder="Introduce una palabra..."
        />
        <button type="submit">Buscar</button>
      </form>

      <div class="result-container">
        {resultado && (
          <div>
            <Tabs resultado={resultado} />
          </div>
        )}
        {error && (
          <div>
            <h2>Error:</h2>
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchForm;
