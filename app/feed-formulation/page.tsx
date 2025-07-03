'use client';
import React, { useState } from 'react';

const animalTypes = [
    { value: 'cattle', label: 'Cattle' },
    { value: 'sheep', label: 'Sheep' },
    { value: 'goat', label: 'Goat' },
    { value: 'pig', label: 'Pig' },
    { value: 'horse', label: 'Horse' }
];

export default function FeedFormulationCalculator() {
    const [species, setSpecies] = useState<string>('cattle');
    const [milkProduction, setMilkProduction] = useState<number>(0);

    // Calculate feed requirements
    const concentration = milkProduction ? (milkProduction / 2) + 2 : 0;
    const greenFodder = 20; // Hardcoded value
    const dryFodder = 'ad libitum'; // Hardcoded value
    const crudeProtein = milkProduction ? (milkProduction * 96) + 515 : 0;

    return (
        <div className="min-h-screen flex-1 p-8 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Feed Formulation Calculator</h1>
                    <p className="text-gray-600">Estimate your feed formulation using milk production</p>
                </div>
                <div className="flex items-center gap-4">
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border bg-background hover:text-accent-foreground h-10 px-4 py-2 border-teal-300 text-teal-700 hover:bg-teal-50">
                        Export Data
                    </button>
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white h-10 px-4 py-2">
                        Upgrade Plan
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column - Form */}
                <div className="lg:col-span-2">
                    <div className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-xl">
                        <div className="space-y-1.5 p-6">
                            <h3 className="text-xl font-semibold text-gray-800 leading-none tracking-tight">Feed Details</h3>
                            <p className="text-sm text-muted-foreground">Enter your animal details and milk production</p>
                        </div>
                        <div className="p-6 pt-0 space-y-6">
                            {/* Species Selection */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Species</label>
                                <div className="relative">
                                    <select
                                        value={species}
                                        onChange={(e) => setSpecies(e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {animalTypes.map((animal) => (
                                            <option key={animal.value} value={animal.value}>
                                                {animal.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Milk Production Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Milk Production (kg/day)
                                </label>
                                <input
                                    type="number"
                                    value={milkProduction}
                                    onChange={(e) => setMilkProduction(parseFloat(e.target.value))}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Enter milk production in kg/day"
                                />
                            </div>

                            {/* <button
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white h-11 py-3 text-lg font-semibold"
                            >
                                Calculate Feed Requirements
                            </button> */}
                        </div>
                    </div>
                </div>

                {/* Right Column - Results */}
                <div className="space-y-6">
                    {/* Results Card */}
                    <div className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-xl">
                        <div className="space-y-1.5 p-6">
                            <h3 className="text-xl font-semibold text-gray-800 leading-none tracking-tight">Feed Requirements</h3>
                        </div>
                        <div className="p-6 pt-0">
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                {/* Concentration */}
                                <div className="text-center p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg">
                                    <div className="text-2xl font-bold text-gray-800">{concentration.toFixed(2)}</div>
                                    <div className="text-sm text-gray-600">Concentration (kg)</div>
                                </div>

                                {/* Green Fodder */}
                                <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                                    <div className="text-2xl font-bold text-gray-800">{greenFodder}</div>
                                    <div className="text-sm text-gray-600">Green Fodder (kg)</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Dry Fodder */}
                                <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg">
                                    <div className="text-2xl font-bold text-gray-800">{dryFodder}</div>
                                    <div className="text-sm text-gray-600">Dry Fodder</div>
                                </div>

                                {/* Crude Protein */}
                                <div className="text-center p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg">
                                    <div className="text-2xl font-bold text-gray-800">{crudeProtein.toFixed(0)}</div>
                                    <div className="text-sm text-gray-600">Crude Protein (gm)</div>
                                </div>
                            </div>

                            {milkProduction > 0 && (
                                <div className="mt-6 space-y-3">
                                    <div className="text-sm font-medium text-gray-700">Formulas Used:</div>
                                    <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg font-mono">
                                        <div>Concentration: (Milk Production / 2) + 2</div>
                                        <div>Crude Protein: (Milk Production × 96) + 515</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-xl">
                        <div className="p-6 space-y-3">
                            <button
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border bg-background hover:text-accent-foreground w-full border-teal-300 text-teal-700 hover:bg-teal-50 h-10 px-4 py-2"
                                onClick={() => {
                                    setSpecies('cattle');
                                    setMilkProduction(0);
                                }}
                            >
                                Reset Values
                            </button>
                            <button
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border bg-background hover:text-accent-foreground w-full border-blue-300 text-blue-700 hover:bg-blue-50 h-10 px-4 py-2"
                            >
                                Export Report
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}