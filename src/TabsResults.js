// Tabs.js
import React, { useState } from "react";

function TabsResults({ resultado }) {
  const [activeTab, setActiveTab] = useState("definicion");

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
        {activeTab === "definicion" && resultado && (
          <div>
            <p>{resultado.definition}</p>
          </div>
        )}
        {activeTab === "etimologia" && resultado.etimologia && (
          <div>
            <p>{resultado.name}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TabsResults;
