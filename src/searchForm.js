import React, { useState } from "react";
import Tabs from "./TabsResults";

function SearchForm() {
  const [palabra, setPalabra] = useState("");
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState(null);
  const [isInputValid, setIsInputValid] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isInputValid) return;
    setResultado(null);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:8080/search?palabra=${palabra}`
      );
      if (!response.ok) {
        console.log(response.body);
        const errorText = await response.text();
        setError("No se encontraron resultados: " + errorText);
        throw new Error("No se encontraron resultados");
      }
      const data = await response.json();
      console.log(data);
      setResultado(data);
    } catch (error) {
      console.error("Error al realizar la búsqueda:", error);
    }
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setPalabra(inputValue);

    if (inputValue.includes(" ")) {
      setError("La búsqueda no debe contener espacios");
      setIsInputValid(false);
    } else {
      setError(null);
      setIsInputValid(true);
    }
  };

  return (
    <div class="search-container">
      <form id="searchForm" onSubmit={handleSubmit}>
        <input
          type="text"
          id="searchInput"
          value={palabra}
          onChange={handleInputChange}
          placeholder="Introduce una palabra..."
        />
        <button type="submit" disabled={!isInputValid}>
          Buscar
        </button>
      </form>

      <div class="result-container">
        {resultado && (
          <div>
            <Tabs resultado={resultado} />
          </div>
        )}
        {error && (
          <div>
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchForm;
