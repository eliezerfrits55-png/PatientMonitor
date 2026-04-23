// wara ntem fridz eliezer

import { useState, useEffect } from "react";
import "./App.css";

const HR_INITIAL   = 70;
const TEMP_INITIAL = 37.0;

function DigitalValue({ value, unit, color }) {
  return (
    <span className="digital-value" style={{ color, textShadow: `0 0 12px ${color}88` }}>
      {value}
      <span className="digital-unit">{unit}</span>
    </span>
  );
}

export default function App() {
  const [heartRate,   setHeartRate]   = useState(HR_INITIAL);
  const [isCritical,  setIsCritical]  = useState(false);
  const [temperature, setTemperature] = useState(TEMP_INITIAL);

  const isHighHR = heartRate > 100;
  const isFever  = temperature > 39.0;

  // Bonus : log à chaque changement de fréquence cardiaque
  useEffect(() => {
    console.log(`[PatientMonitor] Fréquence cardiaque : ${heartRate} bpm`);
  }, [heartRate]);

  const hrColor     = isHighHR   ? "#ff4d4d" : "#00e5a0";
  const tempColor   = isFever    ? "#ff8c00" : "#00bfff";
  const statusColor = isCritical ? "#ff2222" : "#00e5a0";

  return (
    <div className={`page ${isCritical ? "page--critical" : ""}`}>
      <div className={`card ${isCritical ? "card--critical" : ""}`}>

        {/* En-tête */}
        <div className="card-header">
          <div className={`dot ${isCritical ? "dot--critical" : ""}`} />
          <h1 className="card-title">Patient Monitor</h1>
        </div>

        {/* Alertes conditionnelles */}
        <div className="alerts">
          {isHighHR   && <div className="alert" style={{ borderColor: "#ff4d4d66", background: "#ff4d4d11", color: "#ff4d4d" }}>⚠ High Heart Rate</div>}
          {isCritical && <div className="alert" style={{ borderColor: "#ff222266", background: "#ff222211", color: "#ff2222" }}>🚨 Emergency Mode Activated</div>}
          {isFever    && <div className="alert" style={{ borderColor: "#ff8c0066", background: "#ff8c0011", color: "#ff8c00" }}>🌡 Fever Alert</div>}
        </div>

        {/* État 1 : Fréquence cardiaque */}
        <div className="monitor-row">
          <div>
            <span className="row-label">❤ Heart Rate</span>
            <DigitalValue value={heartRate} unit="bpm" color={hrColor} />
          </div>
          <div className="btn-group">
            <button
              className="ctrl-btn"
              style={{ borderColor: hrColor, color: hrColor }}
              onClick={() => setHeartRate(v => Math.max(0, v - 1))}
            >−</button>
            <button
              className="ctrl-btn"
              style={{ borderColor: hrColor, color: hrColor }}
              onClick={() => setHeartRate(v => v + 1)}
            >+</button>
          </div>
        </div>

        {/* Bonus : Température */}
        <div className="monitor-row">
          <div>
            <span className="row-label">🌡 Temperature</span>
            <DigitalValue value={temperature.toFixed(1)} unit="°C" color={tempColor} />
          </div>
          <div className="btn-group">
            <button
              className="ctrl-btn"
              style={{ borderColor: tempColor, color: tempColor }}
              onClick={() => setTemperature(v => parseFloat(Math.max(34, v - 0.1).toFixed(1)))}
            >−</button>
            <button
              className="ctrl-btn"
              style={{ borderColor: tempColor, color: tempColor }}
              onClick={() => setTemperature(v => parseFloat((v + 0.1).toFixed(1)))}
            >+</button>
          </div>
        </div>

        {/* État 2 : Statut patient */}
        <div className="monitor-row">
          <div>
            <span className="row-label">Status</span>
            <span className="status-value" style={{ color: statusColor }}>
              {isCritical ? "CRITICAL" : "STABLE"}
            </span>
          </div>
          <button
            className="toggle-btn"
            style={{ borderColor: statusColor, color: statusColor, background: isCritical ? "#ff222222" : "transparent" }}
            onClick={() => setIsCritical(v => !v)}
          >
            {isCritical ? "→ Stabilize" : "→ Set Critical"}
          </button>
        </div>

        {/* Bonus : Reset */}
        <button
          className="reset-btn"
          onClick={() => { setHeartRate(HR_INITIAL); setTemperature(TEMP_INITIAL); setIsCritical(false); }}
        >
          ↺ Reset All Values
        </button>

      </div>
    </div>
  );
}

/*
 *
 *  Réponses aux questions du devoir

 * 1. On NE  MODIFIER jamais DIRECTEMENT UNE VARIABLE EN REACT parce que :
 *    En React, les donnees sont immuables. Modifier une variable directement n'informera pas React que les donnees ont ete changees. d'ou l'interface utilisateur restera donc inchangee.
 *
 * 2.  setState DÉCLENCHE UN RE-RENDER ?
 *   Car l'appel a setState signale a React qu'une partie de l'etat a ete mise a jour, d'ou React declenche alors une comparaison entre DOm virtuel actuel et le nouveau pour mettre a jour efficacement l'interface.
 *
 * 3. La DIFFÉRENCE ENTRE UN STATE ET UNE VARIABLE NORMALE est :
 *    -Une variable normale est reinitialisee a chaque fois que  le composant est rendu et ne persiste pas.
 * -Le state en revanche est preserve par React entre les rendus, d'ou sa modification force la mise a jour visuelle du composant.
 */
