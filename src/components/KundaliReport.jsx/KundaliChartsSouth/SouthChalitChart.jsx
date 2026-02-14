import React, { useContext, useEffect, useRef, useState } from 'react';
import { kundaliContext } from '../../../context/KundaliContext';
import { PLANET_NAMES, PLANET_NAMES_HINDI, planetColorMap,PLANET_NAMES_ORDER } from '../KundaliVariables';

export default function SouthChalitChart({ data, defaultPlanet, defaultHouse }) {
    const [houseData, setHouseData] = useState({});
    const canvasRef = useRef(null);
    const { language } = useContext(kundaliContext);

    const PlanetChangeInChalit = data?.global?.Global?.PlanetChangeInChalit
    let chalitPlanet = []
    if (PlanetChangeInChalit) {
        PlanetChangeInChalit.map((item, index) => {
            chalitPlanet.push({ planetName: PLANET_NAMES_ORDER[index], value: item })
        })
    }

    function getPlanetValue(name) {
        const planet = chalitPlanet.find(p => p.planetName.toLowerCase() === name.toLowerCase());
        return planet ? planet.value : null; // returns null if not found
    }

    const defaultPlanetName = defaultPlanet || "Ascendant";
    const defaultHouseNumber = defaultHouse || "D1";

    function getChalitHouse(houseNumber, planetName) {
        let num = houseNumber + getPlanetValue(planetName)
        if (num == 13) {
            num = 1
        } else if (num == 0) {
            num = 12
        }

        return num
    }
    const rows = Object.entries(data)
        .filter(([key]) => PLANET_NAMES.includes(key))
        .map(([planet, info]) => ({
            planet,
            degree: `${info.Degree.degree}°${info.Degree.minutes}′${info.Degree.seconds}″`,
            house: getChalitHouse(info[defaultHouseNumber], planet) || '--',
        }));
    function groupPlanetsByHouse(data) {
        const houseMap = {};
        data.forEach(entry => {
            const { house, planet, degree } = entry;
            if (!houseMap[house]) houseMap[house] = [];

            const name = language === 'hi' ? PLANET_NAMES_HINDI[planet] || planet : planet.slice(0, 3);
            houseMap[house].push({ planet, text: `${name} ${degree}`, house });
        });
        return houseMap;
    }
    useEffect(() => {
        const houseMap = groupPlanetsByHouse(rows);
        setHouseData(houseMap);
    }, [data, language]);


    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const ratio = window.devicePixelRatio || 1;
        const size = 400;

        canvas.style.width = `${size}px`;
        canvas.style.height = `${size}px`;
        canvas.width = size * ratio;
        canvas.height = size * ratio;
        ctx.scale(ratio, ratio);

        ctx.fillStyle = '#fcf8e3';
        ctx.fillRect(0, 0, size, size);

        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        ctx.lineCap = 'round';

        ctx.beginPath();
        // vertical line 
        ctx.moveTo(0, size / 4);
        ctx.lineTo(size, size / 4);

        ctx.moveTo(0, size / 2);
        ctx.lineTo(size / 4, size / 2);

        ctx.moveTo(0, size - (size / 4));
        ctx.lineTo(size, size - (size / 4));
        // horizontal line
        ctx.moveTo(size / 4, 0);
        ctx.lineTo(size / 4, size);

        ctx.moveTo(size / 2, 0);
        ctx.lineTo(size / 2, size / 4);

        ctx.moveTo(size - (size / 4), 0);
        ctx.lineTo(size - (size / 4), size);

        ctx.moveTo(size / 2, size - (size / 4));
        ctx.lineTo(size / 2, size);

        ctx.moveTo(size - (size / 4), size / 2);
        ctx.lineTo(size, size / 2);

        ctx.stroke();

        ctx.fillStyle = 'black';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.strokeRect(0, 0, size, size);
        ctx.font = '12px Arial';
        const drawHouseText = (planets, x, y) => {
            console.log(planets, x, y)
            const entries = planets;
            if (!entries) return;
            entries.forEach((entry, idx) => {
                console.log(entry)
                const color = planetColorMap[entry.planet] || 'black';
                ctx.fillStyle = color;
                ctx.fillText(entry.text, x, (y-10) + idx * 12); // 12px line spacing
            });
        };

        drawHouseText(houseData[1], (size / 4) + (size / 4) / 2, 20);
        drawHouseText(houseData[2], (size / 4) * 2 + (size / 4) / 2, 20);
        drawHouseText(houseData[3], (size / 4) * 3 + (size / 4) / 2, 20);
        drawHouseText(houseData[4], (size / 4) * 3 + (size / 4) / 2, size / 4 + 20);
        drawHouseText(houseData[5], (size / 4) * 3 + (size / 4) / 2, size / 2 + 20);
        drawHouseText(houseData[6], (size / 4) * 3 + (size / 4) / 2, size - (size / 4) + 20);
        drawHouseText(houseData[7], (size / 4) * 2 + (size / 4) / 2, size - (size / 4) + 20);
        drawHouseText(houseData[8], (size / 4) + (size / 4) / 2, size - (size / 4) + 20);
        drawHouseText(houseData[9], (size / 4) / 2, size - (size / 4) + 20);
        drawHouseText(houseData[10], (size / 4) / 2, size / 4 + 20);
        drawHouseText(houseData[11], (size / 4) / 2, size / 2 + 20);
        drawHouseText(houseData[12], (size / 4) / 2, 20);
    }, [houseData,language]);

    return (
        <canvas
            ref={canvasRef}
            style={{ maxWidth: "100%" }}
            className="object-contain"
        />
    );
}
