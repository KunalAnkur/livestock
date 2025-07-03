import React from 'react';

interface SliderProps {
    value: number[];
    onValueChange: (val: number[]) => void;
    min?: number;
    max?: number;
    step?: number;
    className?: string;
}

export const Slider: React.FC<SliderProps> = ({
    value,
    onValueChange,
    min = 0,
    max = 100,
    step = 1,
    className = ''
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onValueChange([parseInt(e.target.value)]);
    };

    return (
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value[0]}
            onChange={handleChange}
            className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer ${className}`}
        />
    );
};