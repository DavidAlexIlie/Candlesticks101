import { useState, useRef } from 'react';
import { OpenCVChartAnalyzer } from './OpenCVScanner';

// Custom hook for easy OpenCV scanner integration
export const useOpenCVScanner = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const analyzerRef = useRef(null);

  // Initialize analyzer if needed
  if (!analyzerRef.current) {
    analyzerRef.current = new OpenCVChartAnalyzer();
  }

  const analyzeImage = async (imageData) => {
    setIsAnalyzing(true);
    setError(null);
    setResults(null);

    try {
      const result = await analyzerRef.current.analyzeImage(imageData);
      
      if (result.success) {
        setResults(result);
        return result;
      } else {
        setError(result.message || 'Analysis failed');
        return null;
      }
    } catch (err) {
      const errorMsg = err.message || 'Unknown error occurred';
      setError(errorMsg);
      console.error('OpenCV Analysis Error:', err);
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  };

  const analyzeFile = async (file) => {
    if (!file) return null;

    const imageUrl = URL.createObjectURL(file);
    const result = await analyzeImage(imageUrl);
    URL.revokeObjectURL(imageUrl);
    return result;
  };

  const reset = () => {
    setResults(null);
    setError(null);
    setIsAnalyzing(false);
  };

  return {
    isAnalyzing,
    results,
    error,
    analyzeImage,
    analyzeFile,
    reset
  };
};