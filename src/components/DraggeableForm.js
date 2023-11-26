import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Roulette from "./ruleta";

const FormularioTexto = () => {
  const abecedario = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("").map((letra) => ({
    id: uuidv4(),
    text: letra,
    enable: true,
  }));

  const [inputList] = useState(abecedario);

  return (
    <div className="search-container">
      <div className="text-title">
        <h2>Ruleta de Letras</h2>
        <Roulette data={inputList} />
      </div>
    </div>
  );
};

export default FormularioTexto;
