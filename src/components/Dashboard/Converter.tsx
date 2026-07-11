import React, { useState } from "react";

export const Converter: React.FC = () => {
  const [rawText, setRawText] = useState(`{"id": 125478, "username": "leak.test"}`);
  const [convertedText, setConvertedText] = useState("");
  const [isConverting, setIsConverting] = useState(false);

  const handleConvert = () => {
    setIsConverting(true);
    setTimeout(() => {
      setConvertedText(`[\n  {\n    "id": 125478,\n    "username": "leak.test",\n    "status": "parsed"\n  }\n]`);
      setIsConverting(false);
    }, 600);
  };

  return (
    <div className="reveal">
      <div className="hero-card" style={{ marginBottom: "18px" }}>
        <h1>Конвертер даних (Mock)</h1>
        <p>Перетворення різноманітних SQL, TXT та JSON витоків у стандартизований формат.</p>
      </div>

      <div className="converter">
        <div className="panel code-panel">
          <div className="panel-head">
            <div className="panel-title"><strong>RAW (Сирі дані)</strong></div>
          </div>
          <textarea 
            className="code-box"
            style={{ width: "100%", border: "none", resize: "none" }}
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
          />
        </div>

        <div className="controls-panel">
          <div className="field">
            <label>Шаблон парсингу</label>
            <select className="select">
              <option>User DB (За замовчуванням)</option>
              <option>Combo List</option>
            </select>
          </div>
          <button className="convert-button" onClick={handleConvert} disabled={isConverting}>
            {isConverting ? "Обробка..." : "Конвертувати"}
          </button>
        </div>

        <div className="panel code-panel">
          <div className="panel-head">
            <div className="panel-title"><strong>Структуровані дані</strong></div>
          </div>
          <textarea 
            className="code-box"
            style={{ width: "100%", border: "none", resize: "none", background: "#fbf6ea", color: "#111" }}
            value={convertedText}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};
