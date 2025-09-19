import React, { useState, useRef } from 'react';
import { Camera, Upload, RotateCcw, Zap, Settings, Eye, EyeOff } from 'lucide-react';
import { useOpenCVScanner } from './useOpenCVScanner';
import EnhancedScanner from './EnhancedScanner';

const HybridScanner = ({ userProfile, setUserProfile, adCounters, setAdCounters, showInterstitialAd }) => {
  const [scannerType, setScannerType] = useState('opencv'); // 'opencv' or 'legacy'
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  // OpenCV scanner hook
  const { isAnalyzing: isOpenCVAnalyzing, results: openCVResults, error: openCVError, analyzeFile, reset } = useOpenCVScanner();

  const handleScannerSwitch = () => {
    reset(); // Clear any existing results when switching
    setScannerType(scannerType === 'opencv' ? 'legacy' : 'opencv');
  };

  if (scannerType === 'legacy') {
    // Use the original EnhancedScanner
    return (
      <div className="space-y-4">
        {/* Scanner Type Selector */}
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">Chart Scanner</h3>
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              <Settings className="w-4 h-4 text-gray-300" />
            </button>
          </div>
          
          {showAdvanced && (
            <div className="mb-4 p-3 bg-gray-700 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">Scanner Engine</p>
                  <p className="text-xs text-gray-400">
                    {scannerType === 'opencv' ? 'OpenCV - Professional computer vision' : 'Legacy - Custom algorithm'}
                  </p>
                </div>
                <button
                  onClick={handleScannerSwitch}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
                >
                  <Zap className="w-4 h-4" />
                  Switch to {scannerType === 'opencv' ? 'Legacy' : 'OpenCV'}
                </button>
              </div>
            </div>
          )}
        </div>

        <EnhancedScanner 
          userProfile={userProfile}
          setUserProfile={setUserProfile}
          adCounters={adCounters}
          setAdCounters={setAdCounters}
          showInterstitialAd={showInterstitialAd}
        />
      </div>
    );
  }

  // OpenCV Scanner UI
  return (
    <div className="space-y-4">
      {/* Scanner Type Selector */}
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Zap className="w-6 h-6 text-blue-400" />
            <div>
              <h3 className="text-lg font-bold text-white">OpenCV Scanner</h3>
              <p className="text-xs text-gray-400">Professional computer vision powered</p>
            </div>
          </div>
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            <Settings className="w-4 h-4 text-gray-300" />
          </button>
        </div>
        
        {showAdvanced && (
          <div className="mb-4 p-3 bg-gray-700 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">Scanner Engine</p>
                <p className="text-xs text-gray-400">
                  OpenCV - 90%+ accuracy, professional computer vision
                </p>
              </div>
              <button
                onClick={handleScannerSwitch}
                className="flex items-center gap-2 px-3 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg text-sm transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Switch to Legacy
              </button>
            </div>
          </div>
        )}
      </div>

      {/* File Upload */}
      <div className="bg-gray-800 rounded-lg p-6">
        {!openCVResults && !openCVError && (
          <div className="text-center">
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-12">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                Upload Chart Image
              </h3>
              <p className="text-gray-400 mb-4">
                Analyze candlestick patterns with professional computer vision
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (file) await analyzeFile(file);
                }}
                disabled={isOpenCVAnalyzing}
                className="block w-full text-sm text-gray-400
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-lg file:border-0
                         file:text-sm file:font-semibold
                         file:bg-blue-600 file:text-white
                         hover:file:bg-blue-700 file:cursor-pointer
                         file:disabled:opacity-50"
              />
            </div>
          </div>
        )}

        {isOpenCVAnalyzing && (
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400"></div>
              <span className="text-lg text-white">Analyzing with OpenCV...</span>
            </div>
            <p className="text-gray-400 mt-2 text-sm">
              Using professional computer vision algorithms
            </p>
          </div>
        )}

        {openCVError && (
          <div className="text-center py-8">
            <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4">
              <p className="text-red-400 font-medium">Analysis Failed</p>
              <p className="text-red-300 text-sm mt-1">{openCVError}</p>
              <button
                onClick={reset}
                className="mt-3 inline-flex items-center gap-2 text-sm text-red-400 hover:text-red-300"
              >
                <RotateCcw size={14} />
                Try Again
              </button>
            </div>
          </div>
        )}

        {openCVResults && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Analysis Complete
                </h2>
                <p className="text-gray-400 text-sm">
                  Processed in {openCVResults.summary?.processingTime || 0}ms using OpenCV
                </p>
              </div>
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium text-white"
              >
                <RotateCcw size={14} />
                New Analysis
              </button>
            </div>

            <OpenCVResults results={openCVResults} />
          </div>
        )}
      </div>
    </div>
  );
};

// Results display component
const OpenCVResults = ({ results }) => {
  const [showDetails, setShowDetails] = useState(false);

  if (!results?.candlesticks) return null;

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-900/20 border border-blue-500/20 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-400">
            {results.candlesticks.length}
          </div>
          <div className="text-sm text-blue-300">Candlesticks</div>
        </div>
        
        <div className="bg-green-900/20 border border-green-500/20 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-400">
            {results.summary?.bullishCandles || 0}
          </div>
          <div className="text-sm text-green-300">Bullish</div>
        </div>
        
        <div className="bg-red-900/20 border border-red-500/20 p-4 rounded-lg">
          <div className="text-2xl font-bold text-red-400">
            {results.summary?.bearishCandles || 0}
          </div>
          <div className="text-sm text-red-300">Bearish</div>
        </div>
        
        <div className="bg-purple-900/20 border border-purple-500/20 p-4 rounded-lg">
          <div className="text-2xl font-bold text-purple-400">
            {results.summary?.averageConfidence || 0}%
          </div>
          <div className="text-sm text-purple-300">Confidence</div>
        </div>
      </div>

      {/* Technical Analysis */}
      {results.technicalAnalysis && (
        <div className="bg-gray-700/50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2 flex items-center gap-2 text-white">
            📊 Technical Analysis
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-gray-300">
              <span className="font-medium">Current:</span> ${results.technicalAnalysis.currentPrice}
            </div>
            <div className={`flex items-center gap-1 ${
              results.technicalAnalysis.priceChange >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {results.technicalAnalysis.priceChangePercent?.toFixed(2)}%
            </div>
            <div className="text-gray-300">
              <span className="font-medium">Range:</span> ${results.technicalAnalysis.range}
            </div>
            <div className="text-gray-300">
              <span className="font-medium">Volatility:</span> {results.technicalAnalysis.volatility}%
            </div>
          </div>
        </div>
      )}

      {/* Detected Patterns */}
      {results.patterns && results.patterns.length > 0 && (
        <div className="bg-yellow-900/20 border border-yellow-500/20 p-4 rounded-lg">
          <h3 className="font-semibold mb-2 text-yellow-400">🎯 Detected Patterns</h3>
          <div className="space-y-2">
            {results.patterns.map((pattern, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span className="font-medium text-white">{pattern.name}</span>
                <span className="text-gray-400">{pattern.confidence}% confidence</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Toggle Details */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium"
      >
        {showDetails ? <EyeOff size={14} /> : <Eye size={14} />}
        {showDetails ? 'Hide Details' : 'Show Candlestick Details'}
      </button>

      {/* Detailed Table */}
      {showDetails && (
        <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-3 py-2 text-left text-gray-300">#</th>
                  <th className="px-3 py-2 text-left text-gray-300">Open</th>
                  <th className="px-3 py-2 text-left text-gray-300">High</th>
                  <th className="px-3 py-2 text-left text-gray-300">Low</th>
                  <th className="px-3 py-2 text-left text-gray-300">Close</th>
                  <th className="px-3 py-2 text-left text-gray-300">Type</th>
                  <th className="px-3 py-2 text-left text-gray-300">Confidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {results.candlesticks.map((candle, index) => (
                  <tr key={index}>
                    <td className="px-3 py-2 text-gray-300">{index + 1}</td>
                    <td className="px-3 py-2 text-gray-300">${candle.open}</td>
                    <td className="px-3 py-2 text-gray-300">${candle.high}</td>
                    <td className="px-3 py-2 text-gray-300">${candle.low}</td>
                    <td className="px-3 py-2 text-gray-300">${candle.close}</td>
                    <td className="px-3 py-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        candle.close >= candle.open 
                          ? 'bg-green-900/30 text-green-400' 
                          : 'bg-red-900/30 text-red-400'
                      }`}>
                        {candle.close >= candle.open ? 'Bull' : 'Bear'}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-gray-300">{candle.confidence}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="text-center text-xs text-gray-500 mt-4">
        Powered by OpenCV.js - Professional Computer Vision
      </div>
    </div>
  );
};

export default HybridScanner;