"use client";
import React, { useState } from 'react';
import { Scale, Download, Calculator, User, BarChart3, Activity, TrendingUp, Beef } from 'lucide-react';

interface WeightResult {
  weight: number;
  confidenceRange: { min: number; max: number };
  formula: string;
}

const LivestockWeightCalculator: React.FC = () => {
  const [animalType, setAnimalType] = useState<string>('cattle');
  const [measurementUnit, setMeasurementUnit] = useState<string>('metric');
  const [breed, setBreed] = useState<string>('');
  const [heartGirth, setHeartGirth] = useState<number[]>([100]);
  const [bodyLength, setBodyLength] = useState<number[]>([150]);
  const [age, setAge] = useState<number[]>([24]);
  const [result, setResult] = useState<WeightResult | null>(null);

  const animalTypes = [
    { value: 'cattle', label: 'Cattle' },
    { value: 'sheep', label: 'Sheep' },
    { value: 'goat', label: 'Goat' },
    { value: 'pig', label: 'Pig' },
    { value: 'horse', label: 'Horse' }
  ];

  const breeds = {
    cattle: ['Holstein', 'Angus', 'Hereford', 'Brahman', 'Jersey', 'Others'],
    sheep: ['Merino', 'Suffolk', 'Dorper', 'Romney', 'Others'],
    goat: ['Boer', 'Nubian', 'Alpine', 'Saanen', 'Others'],
    pig: ['Yorkshire', 'Duroc', 'Hampshire', 'Landrace', 'Others'],
    horse: ['Thoroughbred', 'Arabian', 'Quarter Horse', 'Clydesdale', 'Others']
  };

  const calculateWeight = () => {
    const hg = heartGirth[0];
    const bl = bodyLength[0];

    if (!hg || !bl) return;

    // Convert to appropriate units
    const hgCm = measurementUnit === 'imperial' ? hg * 2.54 : hg;
    const blCm = measurementUnit === 'imperial' ? bl * 2.54 : bl;

    let weight = 0;
    let formula = '';

    switch (animalType) {
      case 'cattle':
        weight = (hgCm * hgCm * blCm) / 10854;
        formula = '(Heart Girth² × Body Length) ÷ 10854';
        break;
      case 'sheep':
      case 'goat':
        weight = (hgCm * hgCm * blCm) / 13200;
        formula = '(Heart Girth² × Body Length) ÷ 13200';
        break;
      case 'pig':
        weight = (hgCm * hgCm * blCm) / 6600;
        formula = '(Heart Girth² × Body Length) ÷ 6600';
        break;
      case 'horse':
        weight = (hgCm * hgCm * blCm) / 5434;
        formula = '(Heart Girth² × Body Length) ÷ 5434';
        break;
      default:
        weight = (hgCm * hgCm * blCm) / 10854;
        formula = '(Heart Girth² × Body Length) ÷ 10854';
    }

    const confidenceRange = {
      min: weight * 0.92,
      max: weight * 1.08
    };

    setResult({
      weight: Math.round(weight),
      confidenceRange: {
        min: Math.round(confidenceRange.min),
        max: Math.round(confidenceRange.max)
      },
      formula
    });
  };

  React.useEffect(() => {
    if (heartGirth[0] && bodyLength[0]) {
      calculateWeight();
    }
  }, [heartGirth, bodyLength, animalType, measurementUnit]);


  return (
    <div className="min-h-screen flex-1 p-8 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Calculate Livestock Weight</h1>
          <p className="text-gray-600">Estimate your livestock weight using body measurements</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 border-teal-300 text-teal-700 hover:bg-teal-50">
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
              <h3 className="text-xl font-semibold text-gray-800 leading-none tracking-tight">Animal Details</h3>
              <p className="text-sm text-muted-foreground text-gray-600">Enter your livestock measurements and details</p>
            </div>
            <div className="p-6 pt-0 space-y-6">
              {/* System Toggle */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">System</label>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setMeasurementUnit('imperial')}
                    className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 flex-1 ${measurementUnit === 'imperial' ? 'bg-white shadow-sm' : ''} h-9 px-3`}
                  >
                    Imperial
                  </button>
                  <button
                    onClick={() => setMeasurementUnit('metric')}
                    className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 flex-1 ${measurementUnit === 'metric' ? 'bg-white shadow-sm' : ''} h-9 px-3`}
                  >
                    Metric
                  </button>
                </div>
              </div>

              {/* Animal Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Animal Type</label>
                <div className="relative">
                  <select
                    value={animalType}
                    onChange={(e) => setAnimalType(e.target.value)}
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

              {/* Age Slider */}
              <div className="space-y-4">
                <label className="text-sm font-medium text-gray-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Age: {age[0]} months
                </label>
                <div className="relative flex w-full items-center">
                  <input
                    type="range"
                    min="1"
                    max="120"
                    value={age[0]}
                    onChange={(e) => setAge([parseInt(e.target.value)])}
                    step="1"
                    className="relative flex-1 h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200"
                  />
                </div>
              </div>

              {/* Heart Girth Slider */}
              <div className="space-y-4">
                <label className="text-sm font-medium text-gray-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Heart Girth: {heartGirth[0]} {measurementUnit === 'metric' ? 'cm' : 'inches'}
                </label>
                <div className="relative flex w-full items-center">
                  <input
                    type="range"
                    min={measurementUnit === 'metric' ? 50 : 20}
                    max={measurementUnit === 'metric' ? 300 : 120}
                    value={heartGirth[0]}
                    onChange={(e) => setHeartGirth([parseInt(e.target.value)])}
                    step="1"
                    className="relative flex-1 h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200"
                  />
                </div>
              </div>

              {/* Body Length Slider */}
              <div className="space-y-4">
                <label className="text-sm font-medium text-gray-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Body Length: {bodyLength[0]} {measurementUnit === 'metric' ? 'cm' : 'inches'}
                </label>
                <div className="relative flex w-full items-center">
                  <input
                    type="range"
                    min={measurementUnit === 'metric' ? 80 : 30}
                    max={measurementUnit === 'metric' ? 400 : 160}
                    value={bodyLength[0]}
                    onChange={(e) => setBodyLength([parseInt(e.target.value)])}
                    step="1"
                    className="relative flex-1 h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200"
                  />
                </div>
              </div>

              {/* Breed Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Breed (Optional)</label>
                <div className="relative">
                  <select
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select breed</option>
                    {breeds[animalType as keyof typeof breeds]?.map((breedOption) => (
                      <option key={breedOption} value={breedOption}>
                        {breedOption}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={calculateWeight}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white h-11 py-3 text-lg font-semibold"
              >
                Calculate Weight
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="space-y-6">
          {/* Weight Result */}
          {result && (
            <div className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-xl">
              <div className="space-y-1.5 p-6">
                <h3 className="text-xl font-semibold text-gray-800 leading-none tracking-tight">Estimated Weight</h3>
              </div>
              <div className="p-6 pt-0">
                <div className="text-center mb-6">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 opacity-20"></div>
                    <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800">{result.weight}</div>
                        <div className="text-sm text-gray-600">kg</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    Range: {result.confidenceRange.min} - {result.confidenceRange.max} kg
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Measurement Summary */}
          <div className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-xl">
            <div className="space-y-1.5 p-6">
              <h3 className="text-xl font-semibold text-gray-800 leading-none tracking-tight">Measurements</h3>
            </div>
            <div className="p-6 pt-0">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg">
                  <Scale className="h-8 w-8 text-teal-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">{heartGirth[0]}</div>
                  <div className="text-sm text-gray-600">Heart Girth</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                  <BarChart3 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">{bodyLength[0]}</div>
                  <div className="text-sm text-gray-600">Body Length</div>
                </div>
              </div>

              {result && (
                <div className="space-y-3">
                  <div className="text-sm font-medium text-gray-700">Formula Used:</div>
                  <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg font-mono">
                    {result.formula}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-xl">
            <div className="p-6 space-y-3">
              <button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground w-full border-teal-300 text-teal-700 hover:bg-teal-50 h-10 px-4 py-2"
                onClick={() => {
                  setHeartGirth([100]);
                  setBodyLength([150]);
                  setAge([24]);
                  setBreed('');
                }}
              >
                Reset Values
              </button>
              <button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground w-full border-blue-300 text-blue-700 hover:bg-blue-50 h-10 px-4 py-2"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivestockWeightCalculator;