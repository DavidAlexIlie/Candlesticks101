import React, { useState } from 'react';
import { OpenCVScanner, OpenCVChartAnalyzer } from './OpenCVScanner';
import { useOpenCVScanner } from './useOpenCVScanner';
import { Camera, Upload, RotateCcw, Zap, TrendingUp, TrendingDown, Activity } from 'lucide-react';

// Example component showing how to integrate OpenCV scanner
const OpenCVExample = () => {
  const { isAnalyzing, results, error, analyzeFile, reset } = useOpenCVScanner();
  const [showDetails, setShowDetails] = useState(false);

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (file) {
      await analyzeFile(file);
    }
  };

  const renderCandlestickResults = () => {
    if (!results?.candlesticks) return null;

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {results.candlesticks.length}
            </div>
            <div className="text-sm text-blue-500">Candlesticks</div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {results.summary.bullishCandles}
            </div>
            <div className="text-sm text-green-500">Bullish</div>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-red-600">
              {results.summary.bearishCandles}
            </div>
            <div className="text-sm text-red-500">Bearish</div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {results.summary.averageConfidence}%
            </div>
            <div className="text-sm text-purple-500">Confidence</div>
          </div>
        </div>

        {results.technicalAnalysis && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Activity size={16} />
              Technical Analysis
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Current Price:</span> ${results.technicalAnalysis.currentPrice}
              </div>
              <div className={`flex items-center gap-1 ${results.technicalAnalysis.priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {results.technicalAnalysis.priceChange >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {results.technicalAnalysis.priceChangePercent.toFixed(2)}%
              </div>
              <div>
                <span className="font-medium">Range:</span> ${results.technicalAnalysis.range}
              </div>
              <div>
                <span className="font-medium">Volatility:</span> {results.technicalAnalysis.volatility}%
              </div>
            </div>
          </div>
        )}

        {results.patterns && results.patterns.length > 0 && (
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Detected Patterns</h3>
            <div className="space-y-2">
              {results.patterns.map((pattern, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="font-medium">{pattern.name}</span>
                  <span className="text-gray-600">{pattern.confidence}% confidence</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          {showDetails ? 'Hide Details' : 'Show Candlestick Details'}
        </button>

        {showDetails && (
          <div className="bg-white border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left">#</th>
                    <th className="px-3 py-2 text-left">Open</th>
                    <th className="px-3 py-2 text-left">High</th>
                    <th className="px-3 py-2 text-left">Low</th>
                    <th className="px-3 py-2 text-left">Close</th>
                    <th className="px-3 py-2 text-left">Type</th>
                    <th className="px-3 py-2 text-left">Conf.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {results.candlesticks.map((candle, index) => (
                    <tr key={index}>
                      <td className="px-3 py-2">{index + 1}</td>
                      <td className="px-3 py-2">${candle.open}</td>
                      <td className="px-3 py-2">${candle.high}</td>
                      <td className="px-3 py-2">${candle.low}</td>
                      <td className="px-3 py-2">${candle.close}</td>
                      <td className="px-3 py-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          candle.close >= candle.open 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {candle.close >= candle.open ? 'Bull' : 'Bear'}
                        </span>
                      </td>
                      <td className="px-3 py-2">{candle.confidence}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
          <Zap className="text-blue-600" />
          OpenCV Chart Scanner
        </h1>
        <p className="text-gray-600">
          Professional computer vision powered candlestick detection
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        {!results && !error && (
          <div className="text-center">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Upload Chart Image
              </h3>
              <p className="text-gray-600 mb-4">
                Select a candlestick chart image to analyze with OpenCV
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                disabled={isAnalyzing}
                className="block w-full text-sm text-gray-500
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-lg file:border-0
                         file:text-sm file:font-semibold
                         file:bg-blue-50 file:text-blue-700
                         hover:file:bg-blue-100 file:cursor-pointer"
              />
            </div>
          </div>
        )}

        {isAnalyzing && (
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="text-lg text-gray-700">Analyzing with OpenCV...</span>
            </div>
            <p className="text-gray-500 mt-2 text-sm">
              Using computer vision to detect candlestick patterns
            </p>
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700 font-medium">Analysis Failed</p>
              <p className="text-red-600 text-sm mt-1">{error}</p>
              <button
                onClick={reset}
                className="mt-3 inline-flex items-center gap-2 text-sm text-red-700 hover:text-red-800"
              >
                <RotateCcw size={14} />
                Try Again
              </button>
            </div>
          </div>
        )}

        {results && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Analysis Complete
                </h2>
                <p className="text-gray-600 text-sm">
                  Processed in {results.summary.processingTime}ms using {results.summary.detectionMethod}
                </p>
              </div>
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium"
              >
                <RotateCcw size={14} />
                New Analysis
              </button>
            </div>

            {renderCandlestickResults()}
          </div>
        )}
      </div>

      <div className="mt-6 text-center text-xs text-gray-500">
        Powered by OpenCV.js - Professional Computer Vision for Web
      </div>
    </div>
  );
};

export default OpenCVExample;