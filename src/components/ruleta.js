import React, { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";

const Roulette = ({ data }) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [rouletteData, setRouletteData] = useState(data);
  const [selectedLetter, setSelectedLetter] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState(null);
  const [definicion, setDefinicion] = useState("");

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * rouletteData.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    setSelectedLetter(rouletteData[prizeNumber].completeOption);
    console.log("handleSpinClick");
    handleSearchWord(selectedLetter);
  };

  useEffect(() => {
    const addShortString = data.map((item) => {
      return {
        completeOption: item.text,
        option:
          item.text.length >= 30
            ? item.text.substring(0, 30).trimEnd() + "..."
            : item.text,
      };
    });
    setRouletteData(addShortString);
  }, [data]);

  const handleResult = (selectedPrizes) => {
    console.log("handleResult");
    console.log(selectedPrizes);
    setSelectedLetter(rouletteData[prizeNumber].completeOption);
  };

  useEffect(() => {
    if (!mustSpin && rouletteData.length > 0) {
      console.log("useEffect2");
      console.log(rouletteData[prizeNumber].completeOption);

      //remove selected letter from rouletteData
      //rouletteData.splice(prizeNumber, 1);
      //selectedPrizes.push(rouletteData[prizeNumber].completeOption);
    }
  }, [mustSpin, rouletteData, prizeNumber]);

  const handleSearchWord = async (e) => {
    try {
      const response = await fetch(
        `http://localhost:8080/search/letra?letra=${selectedLetter}`
      );
      if (!response.ok) {
        console.log(response.body);
        const errorText = await response.text();
        setError("No se encontraron resultados: " + errorText);
        throw new Error("No se encontraron resultados");
      }
      const data = await response.json();
      console.log(data);
      setResult(data);
      setDefinicion(data.definition);
    } catch (error) {
      console.error("Error al realizar la búsqueda:", error);
    }
  };

  return (
    <>
      <div align="center" className="roulette-container">
        <Wheel
          mustStartSpinning={mustSpin}
          spinDuration={[0.05]}
          prizeNumber={prizeNumber}
          data={rouletteData}
          outerBorderColor={["#ccc"]}
          outerBorderWidth={[9]}
          innerBorderColor={["#f2f2f2"]}
          radiusLineColor={["tranparent"]}
          radiusLineWidth={[1]}
          textColors={["#f5f5f5"]}
          textDistance={75}
          fontSize={[20]}
          //disabledSectors={[selectedPrizes]}
          equalSectors={true}
          startingOptionIndex={0}
          backgroundColors={[
            "#3f297e",
            "#175fa9",
            "#169ed8",
            "#239b63",
            "#64b031",
            "#efe61f",
            "#f7a416",
            "#e6471d",
            "#dc0936",
            "#e5177b",
            "#be1180",
            "#871f7f",
          ]}
          onStopSpinning={() => {
            setMustSpin(false);
            handleResult();
          }}
        />
        <button className="button roulette-button" onClick={handleSpinClick}>
          Girar
        </button>
      </div>
      <br />
      <button
        className="prize-message"
        onClick={handleSpinClick}
        disabled={mustSpin}
      >
        {!mustSpin ? rouletteData[prizeNumber].completeOption : "Girando..."}
      </button>
      <br />
      <br />
      <div className="result-container">
        {result && (
          <div>
            <div className="result-name">
              <h2>{result.name}</h2>
            </div>
            <div className="result-definition">
              <p>{definicion}</p>
            </div>
          </div>
        )}
        {error && (
          <div>
            <p>{error}</p>
          </div>
        )}
      </div>
    </>

    // <div>
  );
};

export default Roulette;
