import React, { useContext } from 'react'
import { kundaliContext } from '../../context/KundaliContext';

function KundaliSelector() {
    const { chartType, setChartType, language } = useContext(kundaliContext);
    const buttons = [
        { id: 'north', label: { en: 'North Indian', hi: 'उत्तर भारतीय' }, value: 'north' },
        { id: 'south', label: { en: 'South Indian', hi: 'दक्षिण भारतीय' }, value: 'south' }
    ];


    const handleButtonClick = (value) => {
        setChartType(value);
    };

    return (
        <div className="flex items-center justify-center mt-2 mb-4">
            <div className="flex gap-4 flex-wrap">
                {buttons.map((button) => (
                    <button
                        key={button.id}
                        onClick={() => handleButtonClick(button.value)}
                        className={`
              px-8 py-3 rounded-full font-medium text-sm transition-all duration-200 border-2
              ${chartType === button.value
                                ? 'bg-yellow-400 text-black border-yellow-400 shadow-lg'
                                : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:shadow-md'
                            }
            `}
                    >
                        {button.label[language]}
                    </button>
                ))}
            </div>
        </div>)
}

export default KundaliSelector
