import React, { useContext, useEffect, useRef, useState } from 'react';
import { kundaliContext } from '../../../context/KundaliContext';
import  {PLANET_NAMES, PLANET_NAMES_HINDI, planetColorMap } from '../KundaliVariables';

export default function Navasama({ data }) {
  const canvasRef = useRef(null);
  const [houseData, setHouseData] = useState({});
  const [kundaliNumbers, setKundaliNumbers] = useState([]);
  const {language} = useContext(kundaliContext);

  const rows = Object.entries(data)
    .filter(([key]) => PLANET_NAMES.includes(key))
    .map(([planet, info]) => ({
      planet,
      degree: `${info.Degree.degree}°${info.Degree.minutes}′${info.Degree.seconds}″`,
      house: info.D9 || '--',
    }));

  function groupPlanetsByHouse(data) {
    const houseMap = {};
    data.forEach(entry => {
      const { house, planet } = entry;

      const planetName =
        language === 'hi'
          ? PLANET_NAMES_HINDI[planet] || planet
          : planet.slice(0, 3); // abbreviation in English

      if (!houseMap[house]) houseMap[house] = [];
      houseMap[house].push({ planet, text: `${planetName} `, house });
    });
    return houseMap;
  }

  useEffect(() => {
    if (data?.Ascendant?.D9) {
      let d9 = data.Ascendant.D9;
      const nums = [];
      for (let i = 1; i <= 12; i++) {
        if (d9 > 12) d9 = 1;
        nums.push(d9);
        d9++;
      }
      setKundaliNumbers(nums);
    }

    const houseMap = groupPlanetsByHouse(rows);
    setHouseData(houseMap);
  }, [data, language]);

  useEffect(() => {
    if (!kundaliNumbers.length || !Object.keys(houseData).length) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const ratio = window.devicePixelRatio || 1;
    const size = 400;

    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    canvas.width = size * ratio;
    canvas.height = size * ratio;
    ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transforms
    ctx.scale(ratio, ratio);

    ctx.fillStyle = '#fcf8e3';
    ctx.fillRect(0, 0, size, size);

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';

    ctx.beginPath();

    ctx.moveTo(0, 0);
    ctx.lineTo(size, size);

    ctx.moveTo(0, size / 2);
    ctx.lineTo(size / 2, size);

    ctx.moveTo(size / 2, 0);
    ctx.lineTo(size, size / 2);

    ctx.moveTo(size, 0);
    ctx.lineTo(0, size);

    ctx.moveTo(size / 2, 0);
    ctx.lineTo(0, size / 2);

    ctx.moveTo(size, size / 2);
    ctx.lineTo(size / 2, size);

    ctx.stroke();

    // Kundali house numbers
    ctx.fillStyle = 'black';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillText(kundaliNumbers[11], 300, 80);
    ctx.fillText(kundaliNumbers[0], 200, 180);
    ctx.fillText(kundaliNumbers[1], 100, 80);
    ctx.fillText(kundaliNumbers[2], 80, 100);
    ctx.fillText(kundaliNumbers[3], 180, 200);
    ctx.fillText(kundaliNumbers[4], 80, 300);
    ctx.fillText(kundaliNumbers[5], 100, 320);
    ctx.fillText(kundaliNumbers[6], 200, 220);
    ctx.fillText(kundaliNumbers[7], 300, 320);
    ctx.fillText(kundaliNumbers[8], 320, 300);
    ctx.fillText(kundaliNumbers[9], 220, 200);
    ctx.fillText(kundaliNumbers[10], 320, 100);

    ctx.font = '12px Arial';

    const drawHouseText = (houseNum, x, y) => {
      const entries = houseData[houseNum];
      if (!entries) return;
      entries.forEach((entry, idx) => {
        const color = planetColorMap[entry.planet] || 'black';
        ctx.fillStyle = color;
        ctx.fillText(entry.text, x, y + idx * 12);
      });
    };

    drawHouseText(kundaliNumbers[0], size * 0.5, size * 0.15);
    drawHouseText(kundaliNumbers[1], size * 0.25, 10);
    drawHouseText(kundaliNumbers[2], (size * 0.125) - 10, (size * 0.25) - 15);
    drawHouseText(kundaliNumbers[3], size * 0.25, size * 0.5);
    drawHouseText(kundaliNumbers[4], (size * 0.125) - 10, (size * 0.75) - 15);
    drawHouseText(kundaliNumbers[5], size * 0.25, (size * 0.875) - 5);
    drawHouseText(kundaliNumbers[6], size * 0.5, size * 0.75);
    drawHouseText(kundaliNumbers[7], size * 0.75, (size * 0.875) - 4);
    drawHouseText(kundaliNumbers[8], (size * 0.915) - 8, (size * 0.75) - 15);
    drawHouseText(kundaliNumbers[9], size * 0.75, size * 0.5);
    drawHouseText(kundaliNumbers[10], (size * 0.915) - 4, (size * 0.25) - 15);
    drawHouseText(kundaliNumbers[11], size * 0.75, 10);

    ctx.strokeRect(0, 0, size, size);
  }, [kundaliNumbers, houseData]);

  return (
    <canvas
      ref={canvasRef}
      style={{ maxWidth: "100%" }}
      className="object-contain"
    />
  );
}
