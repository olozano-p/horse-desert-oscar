import { useState } from "preact/hooks";
import { calculateMaxNuts } from "../utils/calculateMaxNuts.ts";

// Handle single calculation
function handleSingleCalculation(
  D: string,
  N: string,
  F: string,
  C: string,
  setSingleResult: (value: number | null) => void
) {
  const result = calculateMaxNuts(+D, +N, +F, +C);
  setSingleResult(result);
}

// Handle batch calculation
function handleBatchCalculation(
  batchInput: string,
  setBatchResults: (results: string[]) => void
) {
  const lines = batchInput.split("\n").map((l) => l.trim()).filter(Boolean);
  const results = lines.map((line) => {
    const [d, n, f, c] = line.split(",").map(Number);
    const x = calculateMaxNuts(d, n, f, c);
    return `${line} -> ${x.toFixed(2)}`;
  });
  setBatchResults(results);
}

export default function TripCalculator() {
  const [mode, setMode] = useState<"single" | "batch">("single");

  const [D, setD] = useState("");
  const [N, setN] = useState("");
  const [F, setF] = useState("");
  const [C, setC] = useState("");
  const [singleResult, setSingleResult] = useState<number | null>(null);

  const [batchInput, setBatchInput] = useState("");
  const [batchResults, setBatchResults] = useState<string[]>([]);

  return (
    <div class="w-full max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-lg">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">🐴 Desert Trip Calculator</h1>
        <p class="text-gray-600">Calculate maximum nuts that can be delivered across the desert</p>
      </div>

      {/* Mode toggle */}
      <div class="flex justify-center mb-8">
        <div class="bg-white rounded-lg p-1 shadow-inner">
          <button
            class={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
              mode === "single" 
                ? "bg-blue-500 text-white shadow-md" 
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setMode("single")}
          >
            Single Input
          </button>
          <button
            class={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
              mode === "batch" 
                ? "bg-blue-500 text-white shadow-md" 
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setMode("batch")}
          >
            Batch Input
          </button>
        </div>
      </div>

      {/* Single Input Mode */}
      {mode === "single" && (
        <div class="bg-white rounded-xl p-6 shadow-md">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700">Distance (km)</label>
              <input
                class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Enter distance in km"
                type="number"
                value={D}
                onInput={(e) => setD(e.currentTarget.value)}
              />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700">Initial Nuts (kg)</label>
              <input
                class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Enter initial nuts in kg"
                type="number"
                value={N}
                onInput={(e) => setN(e.currentTarget.value)}
              />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700">Fuel Rate (kg/km)</label>
              <input
                class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Enter fuel consumption rate"
                type="number"
                value={F}
                onInput={(e) => setF(e.currentTarget.value)}
              />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700">Capacity (kg)</label>
              <input
                class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Enter horse capacity in kg"
                type="number"
                value={C}
                onInput={(e) => setC(e.currentTarget.value)}
              />
            </div>
          </div>
          
          <div class="flex justify-center">
            <button
              class="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => handleSingleCalculation(D, N, F, C, setSingleResult)}
              disabled={!D || !N || !F || !C}
            >
              Calculate Maximum Nuts 🥜
            </button>
          </div>

          {singleResult !== null && (
            <div class="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div class="text-center">
                <div class="text-sm font-medium text-green-600 mb-1">Maximum Nuts Delivered</div>
                <div class="text-2xl font-bold text-green-800">{singleResult.toFixed(2)} kg</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Batch Input Mode */}
      {mode === "batch" && (
        <div class="bg-white rounded-xl p-6 shadow-md">
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Batch Input (format: D,N,F,C per line)
            </label>
            <textarea
              class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all h-40 font-mono text-sm"
              placeholder={"100,1000,1,1000\n200,2000,2,1500\n300,3000,1.5,2000"}
              value={batchInput}
              onInput={(e) => setBatchInput(e.currentTarget.value)}
            />
          </div>
          
          <div class="flex justify-center">
            <button
              class="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => handleBatchCalculation(batchInput, setBatchResults)}
              disabled={!batchInput.trim()}
            >
              Calculate All 🚀
            </button>
          </div>

          {batchResults.length > 0 && (
            <div class="mt-6">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Results:</h3>
              <div class="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                <div class="space-y-2">
                  {batchResults.map((r, idx) => (
                    <div key={idx} class="bg-white p-3 rounded border-l-4 border-blue-400 font-mono text-sm">
                      {r}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
