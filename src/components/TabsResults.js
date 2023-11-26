// Tabs.js
import React, { useState, useEffect } from "react";

function TabsResults({ resultado }) {
  const [activeTab, setActiveTab] = useState("definicion");
  const [formattedResultado, setFormattedResultado] = useState("");

  useEffect(() => {
    if (resultado && resultado.definition) {
      const formattedText = resultado.definition.replace(/\n/g, "<br> <br>");
      setFormattedResultado(formattedText);
    }
  }, [resultado]);

  return (
    <div>
      <div className="result-name">
        <h2>{resultado.name}</h2>
      </div>

      <ul className="tabs">
        <li
          className={activeTab === "definicion" ? "active" : ""}
          onClick={() => setActiveTab("definicion")}
        >
          Definición
        </li>
        <li
          className={activeTab === "etimologia" ? "active" : ""}
          onClick={() => setActiveTab("etimologia")}
        >
          Etimología
        </li>
      </ul>
      <div className="tab-content">
        {activeTab === "definicion" && formattedResultado && (
          <div dangerouslySetInnerHTML={{ __html: formattedResultado }}></div>
        )}
        {activeTab === "etimologia" && resultado.definition && (
          <div>
            <p>{resultado.etimologia}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TabsResults;
