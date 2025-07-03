"use client";

import React, { useState } from "react";

const animalTypes = [
    { value: "cattle", label: "Cattle" },
    { value: "sheep", label: "Sheep" },
    { value: "goat", label: "Goat" },
    { value: "pig", label: "Pig" },
    { value: "horse", label: "Horse" },
];

export default function FeedFormulationCalculator() {
    const [species, setSpecies] = useState<string>("cattle");
    const [milkProduction, setMilkProduction] = useState<number>(0);

    const concentration = milkProduction ? (milkProduction / 2) + 2 : 0;
    const greenFodder = 20;
    const dryFodder = "ad libitum";
    const crudeProtein = milkProduction ? milkProduction * 96 + 515 : 0;

    const resetValues = () => {
        setSpecies("cattle");
        setMilkProduction(0);
    };

    return (
        <div className="min-h-screen flex-1 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 p-4 md:p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
                        Feed Formulation Calculator
                    </h1>
                    <p className="text-gray-600 text-sm">
                        Estimate your feed requirements based on milk production
                    </p>
                </div>
                <div className="flex gap-3 flex-wrap">
                    <button className="h-10 px-4 py-2 text-sm font-medium border border-teal-300 text-teal-700 hover:bg-teal-50 rounded-md">
                        Export Data
                    </button>
                    <button className="h-10 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 rounded-md">
                        Upgrade Plan
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Form */}
                <div className="lg:col-span-2">
                    <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-xl p-6 space-y-6">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 mb-1">Feed Details</h2>
                            <p className="text-sm text-gray-600">
                                Enter animal species and milk production data.
                            </p>
                        </div>

                        {/* Species */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">
                                Species
                            </label>
                            <select
                                value={species}
                                onChange={(e) => setSpecies(e.target.value)}
                                className="w-full h-10 px-3 py-2 text-sm border rounded-md bg-background border-input focus:outline-none focus:ring-2 focus:ring-teal-300"
                            >
                                {animalTypes.map((animal) => (
                                    <option key={animal.value} value={animal.value}>
                                        {animal.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Milk Production */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">
                                Milk Production (kg/day)
                            </label>
                            <input
                                type="number"
                                value={milkProduction}
                                onChange={(e) => setMilkProduction(parseFloat(e.target.value))}
                                placeholder="Enter milk production"
                                className="w-full h-10 px-3 py-2 text-sm border rounded-md bg-background border-input focus:outline-none focus:ring-2 focus:ring-teal-300"
                            />
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="space-y-6">
                    <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-xl p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Feed Requirements</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <ResultCard label="Concentration (kg)" value={concentration.toFixed(2)} bg="teal" />
                            <ResultCard label="Green Fodder (kg)" value={greenFodder.toString()} bg="blue" />
                            <ResultCard label="Dry Fodder" value={dryFodder} bg="purple" />
                            <ResultCard label="Crude Protein (gm)" value={crudeProtein.toFixed(0)} bg="rose" />
                        </div>

                        {milkProduction > 0 && (
                            <div className="mt-4">
                                <p className="text-sm font-medium text-gray-700 mb-1">Formulas Used:</p>
                                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md font-mono space-y-1">
                                    <div>Concentration = (Milk Production / 2) + 2</div>
                                    <div>Crude Protein = (Milk Production × 96) + 515</div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-xl p-6 space-y-3">
                        <button
                            onClick={resetValues}
                            className="w-full h-10 px-4 py-2 text-sm font-medium text-teal-700 border border-teal-300 hover:bg-teal-50 rounded-md"
                        >
                            Reset Values
                        </button>
                        <button className="w-full h-10 px-4 py-2 text-sm font-medium text-blue-700 border border-blue-300 hover:bg-blue-50 rounded-md">
                            Export Report
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Result Card Component
function ResultCard({
    label,
    value,
    bg,
}: {
    label: string;
    value: string;
    bg: "teal" | "blue" | "purple" | "rose";
}) {
    const bgMap = {
        teal: "from-teal-50 to-cyan-50",
        blue: "from-blue-50 to-indigo-50",
        purple: "from-purple-50 to-violet-50",
        rose: "from-rose-50 to-pink-50",
    };

    return (
        <div className={`text-center p-4 rounded-lg bg-gradient-to-r ${bgMap[bg]}`}>
            <div className="text-2xl font-bold text-gray-800">{value}</div>
            <div className="text-sm text-gray-600">{label}</div>
        </div>
    );
}