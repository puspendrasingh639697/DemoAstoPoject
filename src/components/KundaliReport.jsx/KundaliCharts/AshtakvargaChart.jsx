import React, { useEffect, useRef, useState } from 'react';

export default function AshtakvargaChart({ label, data,dataKey }) {
    const canvasRef = useRef(null);
    const [kundaliNumbers, setKundaliNumbers] = useState([]);
    console.log(data.astakvarga2.astakvarga[dataKey])

    function sumAtIndex(data, index) {
        let total = 0;

        for (let i = 0; i < data.length; i++) {
            if (index < data[i].length) {
                total += data[i][index];
            } else {
                console.warn(`Index ${index} out of range for row ${i}`);
            }
        }
        return total;
    }
    useEffect(() => {
        if (data?.Ascendant?.D1) {
            let d1 = data.Ascendant.D1;
            const nums = [];
            for (let i = 1; i <= 12; i++) {
                if (d1 > 12) d1 = 1;
                nums.push(d1);
                d1++;
            }
            console.log(nums);
            let astakvarganumbers = []
            nums.map((num, index) => {
                astakvarganumbers.push(sumAtIndex(data.astakvarga2.astakvarga[dataKey], num - 1))
            })
            setKundaliNumbers(astakvarganumbers);
        }
    }, [data]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const ratio = window.devicePixelRatio || 1;
        const size = 200;

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

        ctx.strokeRect(0, 0, size, size);
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

        ctx.fillStyle = 'black';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.fillText(kundaliNumbers[0], (size / 100) * 50, (size / 100) * 25);
        ctx.fillText(kundaliNumbers[1], (size / 100) * 25, ((size / 100) * 25) / 2);
        ctx.fillText(kundaliNumbers[2], ((size / 100) * 25) / 2, (size / 100) * 25);
        ctx.fillText(kundaliNumbers[3], (size / 100) * 25, (size / 100) * 50);
        ctx.fillText(kundaliNumbers[4], ((size / 100) * 25) / 2, (size / 100) * 75);
        ctx.fillText(kundaliNumbers[5], (size / 100) * 25, size - ((size / 100) * 25) / 2);
        ctx.fillText(kundaliNumbers[6], (size / 100) * 50, (size / 100) * 75);
        ctx.fillText(kundaliNumbers[7], (size / 100) * 75, size - ((size / 100) * 25) / 2);
        ctx.fillText(kundaliNumbers[8], size - ((size / 100) * 25) / 2, (size / 100) * 75);
        ctx.fillText(kundaliNumbers[9], (size / 100) * 75, (size / 100) * 50);
        ctx.fillText(kundaliNumbers[10], size - ((size / 100) * 25) / 2, (size / 100) * 25);
        ctx.fillText(kundaliNumbers[11], (size / 100) * 75, ((size / 100) * 25) / 2);
    }, [kundaliNumbers]);

    return (<div>
        <h1>{label}</h1>
        <canvas ref={canvasRef} style={{ maxWidth: "100%" }} className='object-contain' />
    </div>)

}
