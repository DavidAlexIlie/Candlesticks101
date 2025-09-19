import React, { useState, useEffect, useRef } from 'react';
import { Camera, Upload, RotateCcw, History, HelpCircle, AlertTriangle, Zap, ZapOff, Focus, Grid3X3, Settings, Eye, EyeOff, X } from 'lucide-react';
import cv from 'opencv.js';

// Capacitor imports with fallbacks
let CapacitorCamera, Capacitor;
try {
  const capacitorCamera = require('@capacitor/camera');
  CapacitorCamera = capacitorCamera.Camera;
} catch (e) {
  console.log('Capacitor Camera not available, using web fallback');
}

try {
  const capacitor = require('@capacitor/core');
  Capacitor = capacitor.Capacitor;
} catch (e) {
  console.log('Capacitor not available, using web fallback');
  // Mock Capacitor for web
  Capacitor = { isNativePlatform: () => false };
}

// Professional OpenCV-Powered Chart Analyzer
class OpenCVChartAnalyzer {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.isOpenCVReady = false;
    this.initOpenCV();
  }

  async initOpenCV() {
    try {
      // Wait for OpenCV to be ready
      if (typeof cv === 'undefined') {
        console.log('⏳ Waiting for OpenCV.js to load...');
        await this.waitForOpenCV();
      }
      
      this.isOpenCVReady = true;
      console.log('✅ OpenCV.js loaded successfully');
    } catch (error) {
      console.error('❌ Failed to load OpenCV.js:', error);
      this.isOpenCVReady = false;
    }
  }

  waitForOpenCV() {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error('OpenCV loading timeout')), 10000);
      
      const checkOpenCV = () => {
        if (typeof cv !== 'undefined' && cv.Mat) {
          clearTimeout(timeout);
          resolve();
        } else {
          setTimeout(checkOpenCV, 100);
        }
      };
      
      checkOpenCV();
    });
  }

  async analyzeImage(imageData) {
    console.log('🔍 OPENCV SCANNER STARTING...');
    const startTime = Date.now();
    
    if (!this.isOpenCVReady) {
      console.log('⏳ OpenCV not ready, initializing...');
      await this.initOpenCV();
    }

    if (!this.isOpenCVReady) {
      return {
        error: true,
        message: "OpenCV failed to load",
        suggestions: ["Refresh the page", "Check internet connection"]
      };
    }

    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        try {
          console.log('📷 Image loaded:', img.width, 'x', img.height);
          
          // Set up canvas
          this.canvas.width = img.width;
          this.canvas.height = img.height;
          this.ctx.drawImage(img, 0, 0);
          
          // Get image data
          const imageData = this.ctx.getImageData(0, 0, img.width, img.height);
          
          // Convert to OpenCV Mat
          const src = cv.matFromImageData(imageData);
          
          // Analyze with OpenCV
          const candlesticks = this.detectCandlesticksWithOpenCV(src);
          
          // Clean up
          src.delete();
          
          console.log('🕯️ OpenCV found', candlesticks.length, 'candlesticks in', Date.now() - startTime, 'ms');
          
          if (candlesticks.length === 0) {
            resolve({
              error: true,
              message: "No candlesticks detected",
              suggestions: ["Try a clearer chart image", "Ensure the chart shows candlesticks clearly"]
            });
            return;
          }
          
          const analysis = this.processOpenCVResults(candlesticks, img.width, img.height);
          resolve(analysis);
          
        } catch (error) {
          console.error('❌ OpenCV analysis error:', error);
          resolve({
            error: true,
            message: "Analysis failed: " + error.message,
            suggestions: ["Try a different image", "Ensure the image is a valid chart"]
          });
        }
      };
      
      img.onerror = () => {
        resolve({
          error: true,
          message: "Failed to load image"
        });
      };
      
      img.src = imageData;
    });
  }

  detectCandlesticksWithOpenCV(src) {
    console.log('🎯 Starting OpenCV candlestick detection...');
    
    // Step 1: Convert to HSV for better color detection
    const hsv = new cv.Mat();
    cv.cvtColor(src, hsv, cv.COLOR_RGBA2RGB);
    cv.cvtColor(hsv, hsv, cv.COLOR_RGB2HSV);
    
    // Step 2: Create masks for red and green colors
    const redMask = this.createRedMask(hsv);
    const greenMask = this.createGreenMask(hsv);
    
    // Step 3: Combine masks
    const combinedMask = new cv.Mat();
    cv.bitwise_or(redMask, greenMask, combinedMask);
    
    // Step 4: Gentle morphological operations to preserve thin structures
    const smallKernel = cv.getStructuringElement(cv.MORPH_RECT, new cv.Size(2, 2));
    const verticalKernel = cv.getStructuringElement(cv.MORPH_RECT, new cv.Size(1, 3));
    const cleaned = new cv.Mat();

    // Use smaller kernel and preserve vertical structures
    cv.morphologyEx(combinedMask, cleaned, cv.MORPH_OPEN, smallKernel);
    cv.morphologyEx(cleaned, cleaned, cv.MORPH_CLOSE, verticalKernel);
    
    // Step 5: Find contours
    const contours = new cv.MatVector();
    const hierarchy = new cv.Mat();
    cv.findContours(cleaned, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);
    
    // Step 6: Analyze contours and extract candlesticks
    const candlesticks = this.analyzeContours(contours, redMask, greenMask, src);
    
    // Clean up
    hsv.delete();
    redMask.delete();
    greenMask.delete();
    combinedMask.delete();
    cleaned.delete();
    smallKernel.delete();
    verticalKernel.delete();
    contours.delete();
    hierarchy.delete();
    
    return candlesticks;
  }

  createRedMask(hsv) {
    // HSV ranges for red (handles wraparound at 180)
    const mask1 = new cv.Mat();
    const mask2 = new cv.Mat();
    const redMask = new cv.Mat();
    
    // Red range 1: 0-10 degrees
    const lower1 = new cv.Mat(hsv.rows, hsv.cols, hsv.type(), [0, 50, 50, 0]);
    const upper1 = new cv.Mat(hsv.rows, hsv.cols, hsv.type(), [10, 255, 255, 255]);
    cv.inRange(hsv, lower1, upper1, mask1);
    
    // Red range 2: 170-180 degrees  
    const lower2 = new cv.Mat(hsv.rows, hsv.cols, hsv.type(), [170, 50, 50, 0]);
    const upper2 = new cv.Mat(hsv.rows, hsv.cols, hsv.type(), [180, 255, 255, 255]);
    cv.inRange(hsv, lower2, upper2, mask2);
    
    // Combine both red ranges
    cv.bitwise_or(mask1, mask2, redMask);
    
    // Clean up
    mask1.delete();
    mask2.delete();
    lower1.delete();
    upper1.delete();
    lower2.delete();
    upper2.delete();
    
    return redMask;
  }

  createGreenMask(hsv) {
    // HSV range for green: 40-80 degrees
    const greenMask = new cv.Mat();
    const lower = new cv.Mat(hsv.rows, hsv.cols, hsv.type(), [40, 50, 50, 0]);
    const upper = new cv.Mat(hsv.rows, hsv.cols, hsv.type(), [80, 255, 255, 255]);
    
    cv.inRange(hsv, lower, upper, greenMask);
    
    // Clean up
    lower.delete();
    upper.delete();
    
    return greenMask;
  }

  analyzeContours(contours, redMask, greenMask, originalImage) {
    const candlesticks = [];
    const minArea = 8; // Reduced minimum area to capture thin candlesticks
    const maxArea = 5000; // Maximum area to filter out large regions
    
    console.log('🔍 Analyzing', contours.size(), 'contours...');
    
    for (let i = 0; i < contours.size(); i++) {
      const contour = contours.get(i);
      const area = cv.contourArea(contour);
      
      // Filter by area
      if (area < minArea || area > maxArea) continue;
      
      // Get bounding rectangle
      const rect = cv.boundingRect(contour);
      
      // Filter by aspect ratio (candlesticks should be taller than wide)
      const aspectRatio = rect.height / rect.width;
      if (aspectRatio < 1.5 || aspectRatio > 20) continue;
      
      // Determine color by checking which mask has more pixels in this region
      const roi = new cv.Rect(rect.x, rect.y, rect.width, rect.height);
      const redROI = redMask.roi(roi);
      const greenROI = greenMask.roi(roi);
      
      const redPixels = cv.countNonZero(redROI);
      const greenPixels = cv.countNonZero(greenROI);
      
      redROI.delete();
      greenROI.delete();
      
      // Need sufficient colored pixels
      if (redPixels + greenPixels < 5) continue;
      
      // Determine dominant color
      const isGreen = greenPixels > redPixels;
      
      // Analyze the candlestick structure
      const candleAnalysis = this.analyzeCandlestickStructure(contour, rect, originalImage);
      
      if (candleAnalysis.isValid) {
        candlesticks.push({
          x: rect.x + rect.width / 2,
          high: candleAnalysis.high,
          low: candleAnalysis.low,
          bodyTop: candleAnalysis.bodyTop,
          bodyBottom: candleAnalysis.bodyBottom,
          isGreen: isGreen,
          area: area,
          aspectRatio: aspectRatio,
          confidence: candleAnalysis.confidence,
          rect: rect,
          contour: contour
        });
      }
    }
    
    // Sort by X position (left to right)
    candlesticks.sort((a, b) => a.x - b.x);
    
    // Remove duplicates that are too close together
    return this.removeDuplicateCandlesticks(candlesticks);
  }

  analyzeCandlestickStructure(contour, rect, originalImage) {
    // Get all points in the contour
    const points = [];
    for (let i = 0; i < contour.rows; i++) {
      const point = contour.data32S.slice(i * 2, (i + 1) * 2);
      points.push({ x: point[0], y: point[1] });
    }

    if (points.length === 0) {
      return { isValid: false };
    }

    // Find extremes
    const minY = Math.min(...points.map(p => p.y));
    const maxY = Math.max(...points.map(p => p.y));
    const height = maxY - minY;

    // Create pixel density map for better body detection
    const densityMap = this.createDensityMap(points, rect);
    const bodyBounds = this.detectBodyBounds(densityMap, rect);

    // Use vertical line tracing for accurate wick detection
    const wickBounds = this.detectWicksWithTracing(points, bodyBounds, rect);

    // Calculate confidence based on structure and wick detection
    let confidence = 60;
    confidence += Math.min(20, points.length); // More points = higher confidence
    confidence += height > 10 ? 10 : 0; // Height bonus
    confidence += rect.width < height / 2 ? 10 : 0; // Good aspect ratio bonus
    confidence += wickBounds.hasWicks ? 15 : 0; // Wick detection bonus

    return {
      isValid: confidence > 60 && height >= 8,
      high: wickBounds.wickTop,
      low: wickBounds.wickBottom,
      bodyTop: Math.round(bodyBounds.top),
      bodyBottom: Math.round(bodyBounds.bottom),
      confidence: Math.min(95, confidence)
    };
  }

  createDensityMap(points, rect) {
    // Create horizontal density map to identify body region
    const densityMap = new Array(rect.height).fill(0);

    points.forEach(point => {
      const relativeY = point.y - rect.y;
      if (relativeY >= 0 && relativeY < rect.height) {
        densityMap[relativeY]++;
      }
    });

    return densityMap;
  }

  detectBodyBounds(densityMap, rect) {
    // Use dual-threshold approach for body detection
    const maxDensity = Math.max(...densityMap);
    const highThreshold = maxDensity * 0.6; // High density = body
    const lowThreshold = maxDensity * 0.2;  // Low density = potential body edge

    let bodyStart = -1, bodyEnd = -1;
    let inBody = false;

    // Find body region using density thresholds
    for (let i = 0; i < densityMap.length; i++) {
      if (densityMap[i] >= highThreshold && !inBody) {
        bodyStart = i;
        inBody = true;
      } else if (densityMap[i] < lowThreshold && inBody) {
        bodyEnd = i;
        break;
      }
    }

    // If no clear body found, use middle third as fallback
    if (bodyStart === -1 || bodyEnd === -1) {
      const third = rect.height / 3;
      bodyStart = Math.floor(third);
      bodyEnd = Math.floor(third * 2);
    }

    return {
      top: rect.y + bodyStart,
      bottom: rect.y + bodyEnd
    };
  }

  detectWicksWithTracing(points, bodyBounds, rect) {
    const centerX = rect.x + rect.width / 2;
    const tolerance = Math.max(2, rect.width / 2); // Allow some horizontal variance

    // Group points by Y coordinate for efficient column scanning
    const pointsByY = new Map();
    points.forEach(point => {
      if (!pointsByY.has(point.y)) {
        pointsByY.set(point.y, []);
      }
      pointsByY.get(point.y).push(point);
    });

    let wickTop = bodyBounds.top;
    let wickBottom = bodyBounds.bottom;
    let hasWicks = false;

    // Trace upward from body top to find upper wick
    let gapCount = 0;
    const maxGap = 3; // Maximum gap tolerance for continuous wick

    for (let y = bodyBounds.top - 1; y >= rect.y; y--) {
      const rowPoints = pointsByY.get(y) || [];
      const nearCenterPoints = rowPoints.filter(p =>
        Math.abs(p.x - centerX) <= tolerance
      );

      if (nearCenterPoints.length > 0) {
        wickTop = y;
        gapCount = 0;
        hasWicks = true;
      } else {
        gapCount++;
        if (gapCount > maxGap) break;
      }
    }

    // Trace downward from body bottom to find lower wick
    gapCount = 0;
    for (let y = bodyBounds.bottom + 1; y <= rect.y + rect.height; y++) {
      const rowPoints = pointsByY.get(y) || [];
      const nearCenterPoints = rowPoints.filter(p =>
        Math.abs(p.x - centerX) <= tolerance
      );

      if (nearCenterPoints.length > 0) {
        wickBottom = y;
        gapCount = 0;
        hasWicks = true;
      } else {
        gapCount++;
        if (gapCount > maxGap) break;
      }
    }

    // Also check for thin vertical components (aspect ratio filter)
    const thinWicks = this.detectThinVerticalLines(points, rect);
    if (thinWicks.upperWick) {
      wickTop = Math.min(wickTop, thinWicks.upperWick);
      hasWicks = true;
    }
    if (thinWicks.lowerWick) {
      wickBottom = Math.max(wickBottom, thinWicks.lowerWick);
      hasWicks = true;
    }

    return {
      wickTop,
      wickBottom,
      hasWicks
    };
  }

  detectThinVerticalLines(points, rect) {
    // Group points into potential thin vertical lines
    const verticalLines = new Map();
    const xTolerance = 2; // Very strict for thin lines

    points.forEach(point => {
      let foundGroup = false;
      for (let [groupX, groupPoints] of verticalLines) {
        if (Math.abs(point.x - groupX) <= xTolerance) {
          groupPoints.push(point);
          foundGroup = true;
          break;
        }
      }

      if (!foundGroup) {
        verticalLines.set(point.x, [point]);
      }
    });

    let upperWick = null, lowerWick = null;
    const centerY = rect.y + rect.height / 2;

    // Check each vertical line for thin wick characteristics
    for (let [x, linePoints] of verticalLines) {
      if (linePoints.length < 3) continue; // Too few points

      const minY = Math.min(...linePoints.map(p => p.y));
      const maxY = Math.max(...linePoints.map(p => p.y));
      const lineHeight = maxY - minY;
      const lineWidth = 2; // Assume thin line width

      // Check if it's a thin vertical line (high aspect ratio)
      if (lineHeight / lineWidth >= 4) {
        if (maxY < centerY && (upperWick === null || minY < upperWick)) {
          upperWick = minY; // Upper wick
        }
        if (minY > centerY && (lowerWick === null || maxY > lowerWick)) {
          lowerWick = maxY; // Lower wick
        }
      }
    }

    return { upperWick, lowerWick };
  }

  removeDuplicateCandlesticks(candlesticks) {
    const filtered = [];
    const minDistance = 15; // Minimum distance between candlesticks
    
    candlesticks.forEach(candle => {
      const tooClose = filtered.some(existing => 
        Math.abs(existing.x - candle.x) < minDistance
      );
      
      if (!tooClose) {
        filtered.push(candle);
      } else {
        // Keep the one with higher confidence
        const closeCandle = filtered.find(existing => 
          Math.abs(existing.x - candle.x) < minDistance
        );
        if (closeCandle && candle.confidence > closeCandle.confidence) {
          const index = filtered.indexOf(closeCandle);
          filtered[index] = candle;
        }
      }
    });
    
    console.log('🎯 After duplicate removal:', filtered.length, 'candlesticks');
    return filtered;
  }

  processOpenCVResults(candlesticks, width, height) {
    console.log('📊 Processing OpenCV results...');
    
    // Convert to the format expected by the app
    const chartTop = Math.min(...candlesticks.map(c => c.high));
    const chartBottom = Math.max(...candlesticks.map(c => c.low));
    const chartHeight = chartBottom - chartTop;
    
    const basePrice = 100;
    const priceRange = 50;
    
    const processedCandles = candlesticks.map((candle, index) => {
      // Convert pixel positions to prices
      const highPrice = basePrice + ((chartBottom - candle.high) / chartHeight) * priceRange;
      const lowPrice = basePrice + ((chartBottom - candle.low) / chartHeight) * priceRange;
      const bodyTopPrice = basePrice + ((chartBottom - candle.bodyTop) / chartHeight) * priceRange;
      const bodyBottomPrice = basePrice + ((chartBottom - candle.bodyBottom) / chartHeight) * priceRange;
      
      const open = candle.isGreen ? bodyBottomPrice : bodyTopPrice;
      const close = candle.isGreen ? bodyTopPrice : bodyBottomPrice;
      
      return {
        index: index,
        open: Math.max(0.1, parseFloat(open.toFixed(2))),
        close: Math.max(0.1, parseFloat(close.toFixed(2))),
        high: Math.max(0.1, parseFloat(highPrice.toFixed(2))),
        low: Math.max(0.1, parseFloat(lowPrice.toFixed(2))),
        volume: Math.floor(Math.random() * 1000000) + 100000,
        color: candle.isGreen ? '#10B981' : '#EF4444',
        confidence: candle.confidence,
        pixelData: {
          x: candle.x,
          high: candle.high,
          low: candle.low,
          bodyTop: candle.bodyTop,
          bodyBottom: candle.bodyBottom,
          area: candle.area,
          aspectRatio: candle.aspectRatio,
          detectionMethod: 'opencv'
        }
      };
    });
    
    // Generate summary
    const patterns = this.detectPatterns(processedCandles);
    
    return {
      success: true,
      candlesticks: processedCandles,
      summary: {
        totalCandles: processedCandles.length,
        bullishCandles: processedCandles.filter(c => c.close > c.open).length,
        bearishCandles: processedCandles.filter(c => c.close < c.open).length,
        averageConfidence: Math.round(candlesticks.reduce((sum, c) => sum + c.confidence, 0) / candlesticks.length),
        detectionMethod: 'OpenCV Computer Vision',
        processingTime: Date.now() - this.startTime
      },
      patterns: patterns,
      technicalAnalysis: this.generateTechnicalAnalysis(processedCandles)
    };
  }

  detectPatterns(candlesticks) {
    const patterns = [];
    
    candlesticks.forEach((candle, index) => {
      const bodySize = Math.abs(candle.close - candle.open);
      const upperShadow = candle.high - Math.max(candle.open, candle.close);
      const lowerShadow = Math.min(candle.open, candle.close) - candle.low;
      const totalRange = candle.high - candle.low;
      
      // Doji detection
      if (bodySize < totalRange * 0.1) {
        if (upperShadow > bodySize * 3 && lowerShadow > bodySize * 3) {
          patterns.push({
            name: 'Doji',
            type: 'reversal',
            candle: index,
            confidence: 85,
            description: 'Market indecision - potential reversal signal'
          });
        } else if (upperShadow > bodySize * 5) {
          patterns.push({
            name: 'Gravestone Doji',
            type: 'bearish_reversal',
            candle: index,
            confidence: 80,
            description: 'Strong bearish reversal signal'
          });
        } else if (lowerShadow > bodySize * 5) {
          patterns.push({
            name: 'Dragonfly Doji',
            type: 'bullish_reversal',
            candle: index,
            confidence: 80,
            description: 'Strong bullish reversal signal'
          });
        }
      }
      
      // Hammer/Shooting Star
      if (bodySize < totalRange * 0.3) {
        if (lowerShadow > bodySize * 2 && upperShadow < bodySize) {
          patterns.push({
            name: 'Hammer',
            type: 'bullish_reversal',
            candle: index,
            confidence: 75,
            description: 'Bullish reversal pattern'
          });
        } else if (upperShadow > bodySize * 2 && lowerShadow < bodySize) {
          patterns.push({
            name: 'Shooting Star',
            type: 'bearish_reversal',
            candle: index,
            confidence: 75,
            description: 'Bearish reversal pattern'
          });
        }
      }
    });
    
    return patterns;
  }

  generateTechnicalAnalysis(candlesticks) {
    if (candlesticks.length === 0) return null;
    
    const prices = candlesticks.map(c => c.close);
    const highs = candlesticks.map(c => c.high);
    const lows = candlesticks.map(c => c.low);
    
    const currentPrice = prices[prices.length - 1];
    const firstPrice = prices[0];
    const priceChange = currentPrice - firstPrice;
    const priceChangePercent = (priceChange / firstPrice) * 100;
    
    const highestPrice = Math.max(...highs);
    const lowestPrice = Math.min(...lows);
    
    return {
      currentPrice: currentPrice,
      priceChange: parseFloat(priceChange.toFixed(2)),
      priceChangePercent: parseFloat(priceChangePercent.toFixed(2)),
      highestPrice: highestPrice,
      lowestPrice: lowestPrice,
      range: parseFloat((highestPrice - lowestPrice).toFixed(2)),
      trend: priceChange > 0 ? 'Bullish' : 'Bearish',
      volatility: this.calculateVolatility(prices)
    };
  }

  calculateVolatility(prices) {
    if (prices.length < 2) return 0;
    
    const returns = [];
    for (let i = 1; i < prices.length; i++) {
      returns.push((prices[i] - prices[i-1]) / prices[i-1]);
    }
    
    const avgReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;
    const variance = returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / returns.length;
    
    return parseFloat((Math.sqrt(variance) * 100).toFixed(2));
  }
}

// Export the OpenCV Scanner Component
const OpenCVScanner = ({ onAnalysisComplete, onError }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzer] = useState(() => new OpenCVChartAnalyzer());
  const fileInputRef = useRef(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsAnalyzing(true);
    
    try {
      const imageUrl = URL.createObjectURL(file);
      const result = await analyzer.analyzeImage(imageUrl);
      
      if (result.success) {
        onAnalysisComplete && onAnalysisComplete(result);
      } else {
        onError && onError(result.message || 'Analysis failed');
      }
      
      URL.revokeObjectURL(imageUrl);
    } catch (error) {
      console.error('Upload error:', error);
      onError && onError('Failed to analyze image: ' + error.message);
    } finally {
      setIsAnalyzing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="opencv-scanner">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />
      
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={isAnalyzing}
        className="scanner-button"
      >
        {isAnalyzing ? (
          <>
            <div className="spinner"></div>
            Analyzing with OpenCV...
          </>
        ) : (
          <>
            <Upload size={20} />
            Upload Chart (OpenCV)
          </>
        )}
      </button>
      
      <style jsx>{`
        .opencv-scanner {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .scanner-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 24px;
          background: linear-gradient(135deg, #10B981, #059669);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .scanner-button:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }
        
        .scanner-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }
        
        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export { OpenCVChartAnalyzer, OpenCVScanner };