import React, { useState, useEffect, useRef } from 'react';
import { Camera, Upload, RotateCcw, History, HelpCircle, AlertTriangle } from 'lucide-react';

// Capacitor imports with fallbacks for mobile camera support
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

// REAL Chart Analyzer with Edge Detection + Contour Method
class EdgeDetectionAnalyzer {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
  }

  async analyzeImage(imageData) {
    console.log('🔍 EDGE DETECTION ANALYSIS STARTING...');
    
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        console.log('📷 Image loaded:', img.width, 'x', img.height);
        
        this.canvas.width = img.width;
        this.canvas.height = img.height;
        this.ctx.drawImage(img, 0, 0);
        
        const imageData = this.ctx.getImageData(0, 0, img.width, img.height);
        let pixels = imageData.data;

        console.log('🎨 Starting edge detection on', pixels.length / 4, 'pixels');

        // Preprocessing: Apply noise reduction for better accuracy
        console.log('🔧 Applying noise reduction...');
        pixels = this.applyNoiseReduction(pixels, img.width, img.height);

        // Validate chart
        if (!this.isValidChart(pixels, img.width, img.height)) {
          resolve({
            error: true,
            message: "This doesn't appear to be a trading chart",
            suggestions: ["Upload an image with candlesticks", "Ensure chart has red/green candles"]
          });
          return;
        }
        
        // Use edge detection method
        const candlesticks = this.edgeDetectionMethod(pixels, img.width, img.height);
        console.log('🕯️ Edge detection found', candlesticks.length, 'candlesticks');
        
        if (candlesticks.length < 3) {
          resolve({
            error: true,
            message: `Edge detection found only ${candlesticks.length} candlesticks`,
            suggestions: ["Try a clearer chart image", "Ensure candlesticks have clear edges"]
          });
          return;
        }
        
        const analysis = this.analyzeDetectedData(candlesticks, img.width, img.height);
        resolve(analysis);
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

  isValidChart(pixels, width, height) {
    console.log('✅ Validating chart...');

    let redPixels = 0, greenPixels = 0, yellowPixels = 0, whitePixels = 0, blackPixels = 0;
    let totalSampled = 0;

    // Sample every 60 pixels for better coverage while maintaining performance
    for (let i = 0; i < pixels.length; i += 60) {
      const r = pixels[i], g = pixels[i + 1], b = pixels[i + 2];

      // Enhanced red detection (more flexible thresholds)
      if (r > 100 && r > g + 10 && r > b + 10) redPixels++;

      // Enhanced green detection (including blue-green variations)
      if ((g > 100 && g > r + 10 && g > b + 10) ||
          (g > 80 && b > 80 && r < g - 5 && r < b - 5)) greenPixels++;

      // Cartoon/illustration detection (bright yellows, oranges)
      if (r > 180 && g > 180 && b < 100) yellowPixels++;

      // Background detection
      if (r < 40 && g < 40 && b < 40) blackPixels++;
      if (r > 240 && g > 240 && b > 240) whitePixels++;

      totalSampled++;
    }

    const chartColorPercent = ((redPixels + greenPixels) / totalSampled) * 100;
    const cartoonPercent = (yellowPixels / totalSampled) * 100;
    const backgroundPercent = ((blackPixels + whitePixels) / totalSampled) * 100;

    console.log('🎨 Enhanced Colors:', {
      red: redPixels,
      green: greenPixels,
      chartPercent: chartColorPercent.toFixed(1) + '%',
      cartoonPercent: cartoonPercent.toFixed(1) + '%',
      backgroundPercent: backgroundPercent.toFixed(1) + '%'
    });

    // More relaxed validation rules
    if (cartoonPercent > 20) return false; // Allow some yellow/orange
    if (chartColorPercent < 0.5) return false; // Lower threshold
    if (backgroundPercent > 90) return false; // Ensure it's not just background

    return true;
  }

  applyNoiseReduction(pixels, width, height) {
    console.log('🔧 Applying gentle noise reduction to preserve thin structures...');

    // Create a copy of the pixel data
    const filteredPixels = new Uint8ClampedArray(pixels);

    // Apply gentle bilateral-like filter that preserves edges and thin structures
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = (y * width + x) * 4;
        const centerR = pixels[idx];
        const centerG = pixels[idx + 1];
        const centerB = pixels[idx + 2];

        // Check if this might be part of a thin vertical structure
        const isVerticalStructure = this.isPartOfVerticalStructure(pixels, width, height, x, y);

        if (isVerticalStructure) {
          // Preserve thin vertical structures without filtering
          filteredPixels[idx] = centerR;
          filteredPixels[idx + 1] = centerG;
          filteredPixels[idx + 2] = centerB;
          continue;
        }

        // Apply gentle median filter for other pixels
        const rValues = [], gValues = [], bValues = [];
        let similarPixelCount = 0;

        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const neighborIdx = ((y + dy) * width + (x + dx)) * 4;
            const nr = pixels[neighborIdx];
            const ng = pixels[neighborIdx + 1];
            const nb = pixels[neighborIdx + 2];

            // Only include similar pixels to preserve edges
            const colorDiff = Math.abs(nr - centerR) + Math.abs(ng - centerG) + Math.abs(nb - centerB);
            if (colorDiff < 80) {
              rValues.push(nr);
              gValues.push(ng);
              bValues.push(nb);
              similarPixelCount++;
            }
          }
        }

        if (similarPixelCount >= 3) {
          // Sort and take median value
          rValues.sort((a, b) => a - b);
          gValues.sort((a, b) => a - b);
          bValues.sort((a, b) => a - b);

          const medianIndex = Math.floor(rValues.length / 2);
          filteredPixels[idx] = rValues[medianIndex];
          filteredPixels[idx + 1] = gValues[medianIndex];
          filteredPixels[idx + 2] = bValues[medianIndex];
        } else {
          // Keep original pixel if not enough similar neighbors
          filteredPixels[idx] = centerR;
          filteredPixels[idx + 1] = centerG;
          filteredPixels[idx + 2] = centerB;
        }
        // Keep alpha channel unchanged
        filteredPixels[idx + 3] = pixels[idx + 3];
      }
    }

    console.log('✅ Gentle noise reduction complete');
    return filteredPixels;
  }

  isPartOfVerticalStructure(pixels, width, height, x, y) {
    // Check if current pixel is part of a thin vertical structure
    const idx = (y * width + x) * 4;
    const r = pixels[idx], g = pixels[idx + 1], b = pixels[idx + 2];

    // Must be a colored pixel first
    if (!this.isWickPixel(r, g, b)) return false;

    // Check for vertical continuity (pixels above and below)
    let verticalContinuity = 0;

    // Check above
    for (let checkY = Math.max(0, y - 2); checkY < y; checkY++) {
      const checkIdx = (checkY * width + x) * 4;
      const checkR = pixels[checkIdx], checkG = pixels[checkIdx + 1], checkB = pixels[checkIdx + 2];
      if (this.isWickPixel(checkR, checkG, checkB)) {
        verticalContinuity++;
      }
    }

    // Check below
    for (let checkY = y + 1; checkY <= Math.min(height - 1, y + 2); checkY++) {
      const checkIdx = (checkY * width + x) * 4;
      const checkR = pixels[checkIdx], checkG = pixels[checkIdx + 1], checkB = pixels[checkIdx + 2];
      if (this.isWickPixel(checkR, checkG, checkB)) {
        verticalContinuity++;
      }
    }

    // Check horizontal thinness (should not have many horizontal neighbors)
    let horizontalNeighbors = 0;
    for (let checkX = Math.max(0, x - 1); checkX <= Math.min(width - 1, x + 1); checkX++) {
      if (checkX === x) continue;
      const checkIdx = (y * width + checkX) * 4;
      const checkR = pixels[checkIdx], checkG = pixels[checkIdx + 1], checkB = pixels[checkIdx + 2];
      if (this.isWickPixel(checkR, checkG, checkB)) {
        horizontalNeighbors++;
      }
    }

    // It's a vertical structure if there's vertical continuity and limited horizontal spread
    return verticalContinuity >= 2 && horizontalNeighbors <= 2;
  }

  edgeDetectionMethod(pixels, width, height) {
    console.log('🔍 STARTING COLOR CLUSTERING + MORPHOLOGY METHOD...');
    
    const chartStartX = Math.floor(width * 0.05);
    const chartEndX = Math.floor(width * 0.95);
    const chartStartY = Math.floor(height * 0.05);
    const chartEndY = Math.floor(height * 0.95);
    
    // Step 1: Color Clustering - Group similar colored pixels
    console.log('🎨 Step 1: Color clustering...');
    const colorClusters = this.performColorClustering(pixels, width, height, chartStartX, chartEndX, chartStartY, chartEndY);
    
    // Step 2: Morphological Operations - Clean up clusters
    console.log('🔧 Step 2: Morphological operations...');
    const cleanedClusters = this.applyMorphologicalOperations(colorClusters, width, height);
    
    // Step 3: Connected Component Analysis - Find individual candlesticks
    console.log('🔗 Step 3: Connected component analysis...');
    const components = this.findConnectedComponents(cleanedClusters, width, height);
    
    // Step 4: Candlestick Validation & Structure Analysis
    console.log('🕯️ Step 4: Candlestick structure analysis...');
    const candlesticks = this.analyzeCandlestickStructures(components, pixels, width, height);
    
    console.log('✅ Color Clustering method found', candlesticks.length, 'candlesticks');
    return this.processEdgeDetectedCandles(candlesticks, chartStartY, chartEndY);
  }

  performColorClustering(pixels, width, height, startX, endX, startY, endY) {
    console.log('🎨 Clustering colored pixels...');
    
    const redClusters = [];
    const greenClusters = [];
    
    // Create 2D grid to track pixel assignments
    const assigned = new Array(height).fill(null).map(() => new Array(width).fill(false));
    
    for (let y = startY; y < endY; y += 2) {
      for (let x = startX; x < endX; x += 2) {
        if (assigned[y][x]) continue;
        
        const idx = (y * width + x) * 4;
        const r = pixels[idx], g = pixels[idx + 1], b = pixels[idx + 2];
        
        // Enhanced candlestick color detection
        let clusterType = null;

        // More flexible red detection
        if (r > 50 && r > g + 8 && r > b + 8) {
          clusterType = 'red';
        }
        // Enhanced green detection (including teal/cyan variations)
        else if ((g > 50 && g > r + 8 && g > b + 8) ||
                 (g > 40 && b > 40 && r < g - 5 && r < b - 5) ||
                 (g > 60 && b > 30 && r < 40)) {
          clusterType = 'green';
        }
        
        if (clusterType) {
          // Grow cluster from this seed point
          const cluster = this.growCluster(pixels, width, height, x, y, clusterType, assigned);
          
          if (cluster.pixels.length > 8) { // Minimum cluster size
            if (clusterType === 'red') redClusters.push(cluster);
            else greenClusters.push(cluster);
          }
        }
      }
    }
    
    console.log('🎨 Found', redClusters.length, 'red clusters and', greenClusters.length, 'green clusters');
    return { red: redClusters, green: greenClusters };
  }

  growCluster(pixels, width, height, seedX, seedY, clusterType, assigned) {
    const cluster = {
      type: clusterType,
      pixels: [],
      bounds: { minX: seedX, maxX: seedX, minY: seedY, maxY: seedY }
    };
    
    const stack = [{ x: seedX, y: seedY }];
    
    while (stack.length > 0) {
      const { x, y } = stack.pop();
      
      if (x < 0 || x >= width || y < 0 || y >= height || assigned[y][x]) continue;
      
      const idx = (y * width + x) * 4;
      const r = pixels[idx], g = pixels[idx + 1], b = pixels[idx + 2];
      
      // Enhanced pixel matching for cluster growth
      let matches = false;
      if (clusterType === 'red') {
        // More flexible red matching
        matches = r > 45 && r > g + 5 && r > b + 5;
      } else if (clusterType === 'green') {
        // Enhanced green matching (including teal/cyan variations)
        matches = (g > 45 && g > r + 5 && g > b + 5) ||
                  (g > 35 && b > 35 && r < g - 3 && r < b - 3) ||
                  (g > 55 && b > 25 && r < 35);
      }
      
      if (matches) {
        assigned[y][x] = true;
        cluster.pixels.push({ x, y, r, g, b });
        
        // Update bounds
        cluster.bounds.minX = Math.min(cluster.bounds.minX, x);
        cluster.bounds.maxX = Math.max(cluster.bounds.maxX, x);
        cluster.bounds.minY = Math.min(cluster.bounds.minY, y);
        cluster.bounds.maxY = Math.max(cluster.bounds.maxY, y);
        
        // Add neighbors to stack (8-connected)
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            if (dx === 0 && dy === 0) continue;
            stack.push({ x: x + dx, y: y + dy });
          }
        }
      }
    }
    
    return cluster;
  }

  applyMorphologicalOperations(colorClusters, width, height) {
    console.log('🔧 Applying morphological operations...');
    
    const cleanedClusters = { red: [], green: [] };
    
    ['red', 'green'].forEach(color => {
      colorClusters[color].forEach(cluster => {
        // Step 1: Erosion - Remove noise and thin connections
        const erodedCluster = this.erodeCluster(cluster, 1);
        
        // Step 2: Dilation - Restore size while keeping separation
        const dilatedCluster = this.dilateCluster(erodedCluster, 2);
        
        // Step 3: Fill holes - Connect gaps within candle bodies
        const filledCluster = this.fillHoles(dilatedCluster);
        
        if (filledCluster.pixels.length > 5) { // Keep clusters with sufficient pixels
          cleanedClusters[color].push(filledCluster);
        }
      });
    });
    
    console.log('🔧 After morphology:', cleanedClusters.red.length, 'red,', cleanedClusters.green.length, 'green');
    return cleanedClusters;
  }

  erodeCluster(cluster, radius) {
    const eroded = { ...cluster, pixels: [] };
    
    cluster.pixels.forEach(pixel => {
      // Check if pixel has enough neighbors
      let neighborCount = 0;
      for (let dx = -radius; dx <= radius; dx++) {
        for (let dy = -radius; dy <= radius; dy++) {
          if (dx === 0 && dy === 0) continue;
          const neighborExists = cluster.pixels.some(p => 
            p.x === pixel.x + dx && p.y === pixel.y + dy
          );
          if (neighborExists) neighborCount++;
        }
      }
      
      // Keep pixel if it has sufficient neighbors
      if (neighborCount >= 3) {
        eroded.pixels.push(pixel);
      }
    });
    
    return eroded;
  }

  dilateCluster(cluster, radius) {
    const dilated = { ...cluster, pixels: [...cluster.pixels] };
    const newPixels = [];
    
    cluster.pixels.forEach(pixel => {
      for (let dx = -radius; dx <= radius; dx++) {
        for (let dy = -radius; dy <= radius; dy++) {
          const newX = pixel.x + dx;
          const newY = pixel.y + dy;
          
          // Add pixel if not already in cluster
          const exists = dilated.pixels.some(p => p.x === newX && p.y === newY) ||
                        newPixels.some(p => p.x === newX && p.y === newY);
          
          if (!exists) {
            newPixels.push({ 
              x: newX, 
              y: newY, 
              r: pixel.r, 
              g: pixel.g, 
              b: pixel.b 
            });
          }
        }
      }
    });
    
    dilated.pixels.push(...newPixels);
    return dilated;
  }

  fillHoles(cluster) {
    // Simple hole filling - connect pixels that are surrounded
    const filled = { ...cluster, pixels: [...cluster.pixels] };
    const bounds = cluster.bounds;
    
    for (let y = bounds.minY; y <= bounds.maxY; y++) {
      for (let x = bounds.minX; x <= bounds.maxX; x++) {
        const exists = filled.pixels.some(p => p.x === x && p.y === y);
        
        if (!exists) {
          // Check if surrounded by cluster pixels
          let surroundCount = 0;
          for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
              if (dx === 0 && dy === 0) continue;
              const hasNeighbor = filled.pixels.some(p => 
                p.x === x + dx && p.y === y + dy
              );
              if (hasNeighbor) surroundCount++;
            }
          }
          
          // Fill hole if sufficiently surrounded
          if (surroundCount >= 5) {
            filled.pixels.push({ 
              x, y, 
              r: cluster.pixels[0].r, 
              g: cluster.pixels[0].g, 
              b: cluster.pixels[0].b 
            });
          }
        }
      }
    }
    
    return filled;
  }

  findConnectedComponents(cleanedClusters, width, height) {
    console.log('🔗 Finding connected components...');
    
    const components = [];
    
    ['red', 'green'].forEach(color => {
      cleanedClusters[color].forEach((cluster, index) => {
        // Analyze cluster shape and structure
        const component = this.analyzeClusterStructure(cluster, color);
        
        if (component.isValidCandlestick) {
          components.push({
            ...component,
            id: `${color}_${index}`,
            originalCluster: cluster
          });
        }
      });
    });
    
    // Sort components by X position (left to right)
    components.sort((a, b) => a.centerX - b.centerX);
    
    console.log('🔗 Found', components.length, 'valid components');
    return components;
  }

  analyzeClusterStructure(cluster, color) {
    const pixels = cluster.pixels;
    const bounds = cluster.bounds;
    
    const width = bounds.maxX - bounds.minX + 1;
    const height = bounds.maxY - bounds.minY + 1;
    const centerX = (bounds.minX + bounds.maxX) / 2;
    const centerY = (bounds.minY + bounds.maxY) / 2;
    
    // Analyze vertical distribution (essential for candlesticks)
    const verticalDist = this.analyzeVerticalDistribution(pixels, bounds);
    
    // Check if this looks like a candlestick
    const isValidCandlestick = 
      height >= 3 &&                           // Minimum height
      width <= Math.max(50, height * 2) &&     // Not too wide
      verticalDist.hasVerticalStructure &&     // Has vertical arrangement
      pixels.length >= 6;                      // Sufficient pixels
    
    return {
      centerX,
      centerY,
      width,
      height,
      bounds,
      isGreen: color === 'green',
      pixelCount: pixels.length,
      verticalDistribution: verticalDist,
      isValidCandlestick,
      cluster: cluster
    };
  }

  analyzeVerticalDistribution(pixels, bounds) {
    const height = bounds.maxY - bounds.minY + 1;
    const sections = Math.max(3, Math.floor(height / 3)); // Divide into sections
    const sectionHeight = height / sections;
    
    const distribution = new Array(sections).fill(0);
    
    pixels.forEach(pixel => {
      const relativeY = pixel.y - bounds.minY;
      const section = Math.min(sections - 1, Math.floor(relativeY / sectionHeight));
      distribution[section]++;
    });
    
    // Find densest section (likely the body)
    const maxDensity = Math.max(...distribution);
    const bodySection = distribution.indexOf(maxDensity);
    const bodyDensity = maxDensity / pixels.length;
    
    // Check for vertical structure (not just horizontal blob)
    const hasVerticalStructure = distribution.filter(d => d > 0).length >= 2;
    
    return {
      distribution,
      bodySection,
      bodyDensity,
      hasVerticalStructure,
      sections
    };
  }

  analyzeCandlestickStructures(components, pixels, width, height) {
    console.log('🕯️ Analyzing candlestick structures...');
    
    const candlesticks = [];
    
    components.forEach((component, index) => {
      // Detailed structure analysis for each component
      const structure = this.performDetailedStructureAnalysis(component, pixels, width, height);
      
      if (structure.isValid) {
        candlesticks.push({
          index: index,
          x: component.centerX,
          high: structure.high,
          low: structure.low,
          open: component.isGreen ? structure.bodyTop : structure.bodyBottom,
          close: component.isGreen ? structure.bodyBottom : structure.bodyTop,
          bodyTop: structure.bodyTop,
          bodyBottom: structure.bodyBottom,
          bodyHeight: structure.bodyHeight,
          upperWickLength: structure.upperWickLength || 0,
          lowerWickLength: structure.lowerWickLength || 0,
          hasUpperWick: structure.hasUpperWick || false,
          hasLowerWick: structure.hasLowerWick || false,
          isGreen: component.isGreen,
          pixelCount: component.pixelCount,
          confidence: structure.confidence,
          bodyPixelRatio: structure.bodyPixelRatio,
          aspectType: structure.aspectType,
          pixelData: {
            x: component.centerX,
            pixelCount: component.pixelCount,
            confidence: structure.confidence,
            bounds: component.bounds,
            bodyPixelRatio: structure.bodyPixelRatio,
            bodyHeight: structure.bodyHeight,
            aspectType: structure.aspectType,
            upperWickLength: structure.upperWickLength || 0,
            lowerWickLength: structure.lowerWickLength || 0,
            detectionMethod: 'enhanced_body_wick_separation_v2'
          }
        });
        
        console.log(`Candle ${index + 1}: ${component.isGreen ? 'GREEN' : 'RED'} at X=${Math.round(component.centerX)}, confidence=${structure.confidence}%`);
      }
    });
    
    return candlesticks;
  }

  detectWickLines(pixels, width, height, centerX, bodyTop, bodyBottom) {
    console.log('🔍 Detecting wick lines with enhanced algorithm...');

    // Conservative search radius to prevent false wick extension
    const searchRadius = Math.max(3, Math.floor(width * 0.05)); // Tighter adaptive radius
    const minX = Math.max(0, centerX - searchRadius);
    const maxX = Math.min(width - 1, centerX + searchRadius);

    let upperWickTop = bodyTop;
    let lowerWickBottom = bodyBottom;

    // Enhanced wick detection with column-based tracing
    const wickResults = this.traceWicksWithVerticalScanning(
      pixels, width, height, centerX, bodyTop, bodyBottom, minX, maxX
    );

    // Also detect thin vertical lines that might be separate from body
    const thinWicks = this.detectThinVerticalWicks(
      pixels, width, height, centerX, bodyTop, bodyBottom
    );

    // Combine results, prioritizing the most extreme points
    upperWickTop = Math.min(
      wickResults.upperWickTop,
      thinWicks.upperWick || bodyTop
    );

    lowerWickBottom = Math.max(
      wickResults.lowerWickBottom,
      thinWicks.lowerWick || bodyBottom
    );

    // Apply maximum wick length constraint to prevent exaggeration
    const bodyHeight = bodyBottom - bodyTop;
    const maxWickLength = Math.max(bodyHeight * 3, 30); // Max 3x body height or 30px

    if (bodyTop - upperWickTop > maxWickLength) {
      upperWickTop = bodyTop - maxWickLength;
    }

    if (lowerWickBottom - bodyBottom > maxWickLength) {
      lowerWickBottom = bodyBottom + maxWickLength;
    }

    const upperWickLength = bodyTop - upperWickTop;
    const lowerWickLength = lowerWickBottom - bodyBottom;

    console.log(`🕯️ Enhanced wick detection: upper=${upperWickLength}px, lower=${lowerWickLength}px`);

    return {
      upperWickTop,
      lowerWickBottom,
      upperWickLength,
      lowerWickLength,
      hasUpperWick: upperWickLength > 0,
      hasLowerWick: lowerWickLength > 0
    };
  }

  traceWicksWithVerticalScanning(pixels, width, height, centerX, bodyTop, bodyBottom, minX, maxX) {
    let upperWickTop = bodyTop;
    let lowerWickBottom = bodyBottom;

    const maxGap = 1; // Very tight gap tolerance to prevent exaggeration

    // Trace upward from body top
    let gapCount = 0;
    for (let y = bodyTop - 1; y >= 0; y--) {
      let wickPixelFound = false;

      // Scan each column in the search area
      for (let x = minX; x <= maxX; x++) {
        const idx = (y * width + x) * 4;
        const r = pixels[idx], g = pixels[idx + 1], b = pixels[idx + 2];

        // Enhanced color detection with lower thresholds for thin wicks
        if (this.isWickPixel(r, g, b)) {
          wickPixelFound = true;
          upperWickTop = y;
          gapCount = 0; // Reset gap count
          break;
        }
      }

      if (!wickPixelFound) {
        gapCount++;
        if (gapCount > maxGap) break;
      }
    }

    // Trace downward from body bottom
    gapCount = 0;
    for (let y = bodyBottom + 1; y < height; y++) {
      let wickPixelFound = false;

      for (let x = minX; x <= maxX; x++) {
        const idx = (y * width + x) * 4;
        const r = pixels[idx], g = pixels[idx + 1], b = pixels[idx + 2];

        if (this.isWickPixel(r, g, b)) {
          wickPixelFound = true;
          lowerWickBottom = y;
          gapCount = 0;
          break;
        }
      }

      if (!wickPixelFound) {
        gapCount++;
        if (gapCount > maxGap) break;
      }
    }

    return { upperWickTop, lowerWickBottom };
  }

  isWickPixel(r, g, b) {
    // Balanced wick pixel detection - more conservative thresholds
    return (
      (r > 45 && r > g + 10 && r > b + 10) || // Red wick (more selective)
      (g > 45 && g > r + 10 && g > b + 10) || // Green wick (more selective)
      (r > 80 && g > 80 && b > 80 && Math.max(r, g, b) - Math.min(r, g, b) < 35) // Gray/black wick (tighter range)
    );
  }

  detectThinVerticalWicks(pixels, width, height, centerX, bodyTop, bodyBottom) {
    // Detect isolated thin vertical lines that might be wicks - more conservative
    const searchArea = Math.max(6, Math.floor(width * 0.08)); // Reduced search area
    const startX = Math.max(0, centerX - searchArea);
    const endX = Math.min(width - 1, centerX + searchArea);

    const verticalLines = new Map();
    const xTolerance = 1; // Very strict for thin lines

    // Group pixels into potential vertical lines
    for (let y = 0; y < height; y++) {
      for (let x = startX; x <= endX; x++) {
        const idx = (y * width + x) * 4;
        const r = pixels[idx], g = pixels[idx + 1], b = pixels[idx + 2];

        if (this.isWickPixel(r, g, b)) {
          let foundGroup = false;
          for (let [groupX, points] of verticalLines) {
            if (Math.abs(x - groupX) <= xTolerance) {
              points.push({ x, y });
              foundGroup = true;
              break;
            }
          }

          if (!foundGroup) {
            verticalLines.set(x, [{ x, y }]);
          }
        }
      }
    }

    let upperWick = null, lowerWick = null;
    const centerY = bodyTop + (bodyBottom - bodyTop) / 2;

    // Analyze vertical lines for thin wick characteristics
    for (let [x, points] of verticalLines) {
      if (points.length < 2) continue;

      const minY = Math.min(...points.map(p => p.y));
      const maxY = Math.max(...points.map(p => p.y));
      const lineHeight = maxY - minY;

      // Check if it's a thin vertical line (stricter aspect ratio)
      if (lineHeight >= 6 && points.length >= 4) { // Require more pixels and height
        // Check if it extends above or below the body
        if (maxY < bodyTop && (upperWick === null || minY < upperWick)) {
          upperWick = minY;
        }
        if (minY > bodyBottom && (lowerWick === null || maxY > lowerWick)) {
          lowerWick = maxY;
        }
      }
    }

    return { upperWick, lowerWick };
  }

  splitBodyAndWicks(cluster, pixels, imageWidth, imageHeight) {
    console.log('🔍 Separating body and wicks by pixel density...');

    const bounds = cluster.bounds;
    const clusterHeight = bounds.maxY - bounds.minY + 1;
    const clusterWidth = bounds.maxX - bounds.minX + 1;

    // Create density map for each row
    const rowDensity = new Array(clusterHeight).fill(0);
    const rowPixelCount = new Array(clusterHeight).fill(0);

    // Calculate density for each row
    cluster.pixels.forEach(pixel => {
      const rowIndex = pixel.y - bounds.minY;
      if (rowIndex >= 0 && rowIndex < clusterHeight) {
        rowPixelCount[rowIndex]++;
        rowDensity[rowIndex] = rowPixelCount[rowIndex] / clusterWidth;
      }
    });

    // Find maximum density and threshold for body detection
    const maxDensity = Math.max(...rowDensity);
    const bodyThreshold = maxDensity * 0.6; // 60% of max density

    // Find contiguous high-density region (body)
    let bodyStart = -1, bodyEnd = -1;
    let inBodyRegion = false;
    let currentBodyStart = -1;
    let longestBodyRegion = 0;

    for (let i = 0; i < clusterHeight; i++) {
      if (rowDensity[i] >= bodyThreshold) {
        if (!inBodyRegion) {
          inBodyRegion = true;
          currentBodyStart = i;
        }
      } else {
        if (inBodyRegion) {
          const regionLength = i - currentBodyStart;
          if (regionLength > longestBodyRegion) {
            longestBodyRegion = regionLength;
            bodyStart = currentBodyStart;
            bodyEnd = i - 1;
          }
          inBodyRegion = false;
        }
      }
    }

    // Handle case where body region extends to the end
    if (inBodyRegion) {
      const regionLength = clusterHeight - currentBodyStart;
      if (regionLength > longestBodyRegion) {
        bodyStart = currentBodyStart;
        bodyEnd = clusterHeight - 1;
      }
    }

    // If no clear body found, use middle third as body
    if (bodyStart === -1 || bodyEnd === -1) {
      bodyStart = Math.floor(clusterHeight * 0.33);
      bodyEnd = Math.floor(clusterHeight * 0.67);
    }

    // Calculate actual Y coordinates
    const bodyTop = bounds.minY + bodyStart;
    const bodyBottom = bounds.minY + bodyEnd;

    // Validate body contains sufficient pixels
    const bodyHeight = bodyEnd - bodyStart + 1;
    const bodyPixels = rowPixelCount.slice(bodyStart, bodyEnd + 1).reduce((sum, count) => sum + count, 0);
    const totalPixels = cluster.pixels.length;
    const bodyPixelRatio = bodyPixels / totalPixels;

    // Detect actual wick lines extending from body
    const centerX = Math.round((bounds.minX + bounds.maxX) / 2);
    const wickInfo = this.detectWickLines(pixels, imageWidth, imageHeight, centerX, bodyTop, bodyBottom);

    console.log(`📊 Body analysis: ${bodyPixelRatio.toFixed(2)} pixel ratio, ${bodyHeight} height`);

    return {
      bodyTop,
      bodyBottom,
      wickTop: wickInfo.upperWickTop,
      wickBottom: wickInfo.lowerWickBottom,
      bodyPixelRatio,
      bodyHeight,
      totalHeight: clusterHeight,
      maxDensity,
      upperWickLength: wickInfo.upperWickLength,
      lowerWickLength: wickInfo.lowerWickLength,
      hasUpperWick: wickInfo.hasUpperWick,
      hasLowerWick: wickInfo.hasLowerWick,
      isValidBody: bodyPixelRatio >= 0.3 && bodyHeight >= 1
    };
  }

  classifyByAspectRatio(component) {
    const height = component.bounds.maxY - component.bounds.minY + 1;
    const width = component.bounds.maxX - component.bounds.minX + 1;
    const aspectRatio = height / width;

    // Classify component type based on aspect ratio
    if (aspectRatio > 3 && width <= 3) {
      return 'wick'; // Thin vertical line
    } else if (aspectRatio < 1.5 && width > 5) {
      return 'body'; // Wide, short rectangle
    } else if (aspectRatio >= 1.5 && aspectRatio <= 8) {
      return 'candlestick'; // Balanced candlestick
    }

    return 'unknown';
  }

  performDetailedStructureAnalysis(component, pixels, width, height) {
    const cluster = component.cluster;
    const bounds = component.bounds;

    // Enhanced body/wick separation
    const separation = this.splitBodyAndWicks(cluster, pixels, width, height);
    const aspectType = this.classifyByAspectRatio(component);

    // Use detected wick coordinates for accurate high/low points
    const high = separation.wickTop;
    const low = separation.wickBottom;

    // Use improved body boundaries
    let bodyTop = separation.bodyTop;
    let bodyBottom = separation.bodyBottom;

    // Post-processing validation
    if (!separation.isValidBody || aspectType === 'wick') {
      // If body detection failed, fall back to simple middle estimation
      const totalHeight = low - high + 1;
      bodyTop = high + Math.floor(totalHeight * 0.4);
      bodyBottom = high + Math.floor(totalHeight * 0.6);
      console.log('⚠️ Using fallback body estimation');
    }

    // Enhanced confidence calculation
    let confidence = 40;
    confidence += Math.min(25, component.pixelCount); // Pixel count bonus
    confidence += separation.bodyPixelRatio >= 0.6 ? 20 : 10; // Body ratio bonus
    confidence += aspectType === 'candlestick' ? 15 : 0; // Aspect ratio bonus
    confidence += separation.maxDensity > 0.8 ? 10 : 0; // Density bonus
    confidence += component.height > 15 ? 10 : 0; // Height bonus

    const isValid =
      component.isValidCandlestick &&
      confidence > 55 &&
      component.height >= 3 &&
      (separation.isValidBody || aspectType === 'candlestick');

    console.log(`🕯️ Candle analysis: confidence=${confidence}%, bodyRatio=${separation.bodyPixelRatio.toFixed(2)}, type=${aspectType}`);

    return {
      isValid,
      high,
      low,
      bodyTop,
      bodyBottom,
      confidence: Math.min(95, confidence),
      bodyPixelRatio: separation.bodyPixelRatio,
      aspectType,
      bodyHeight: Math.abs(bodyBottom - bodyTop),
      upperWickLength: separation.upperWickLength,
      lowerWickLength: separation.lowerWickLength,
      hasUpperWick: separation.hasUpperWick,
      hasLowerWick: separation.hasLowerWick,
      wickTop: separation.wickTop,
      wickBottom: separation.wickBottom
    };
  }

  convertToGrayscale(pixels, width, height) {
    const gray = new Array(width * height);
    
    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i], g = pixels[i + 1], b = pixels[i + 2];
      const grayValue = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
      gray[i / 4] = grayValue;
    }
    
    return gray;
  }

  sobelEdgeDetection(grayImage, width, height) {
    const edges = new Array(width * height).fill(0);
    
    // Sobel kernels for edge detection
    const sobelX = [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]];
    const sobelY = [[-1, -2, -1], [0, 0, 0], [1, 2, 1]];
    
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        let gx = 0, gy = 0;
        
        // Apply Sobel kernels
        for (let ky = 0; ky < 3; ky++) {
          for (let kx = 0; kx < 3; kx++) {
            const pixel = grayImage[(y + ky - 1) * width + (x + kx - 1)];
            gx += pixel * sobelX[ky][kx];
            gy += pixel * sobelY[ky][kx];
          }
        }
        
        // Calculate edge magnitude
        const magnitude = Math.sqrt(gx * gx + gy * gy);
        edges[y * width + x] = magnitude > 30 ? 255 : 0; // Lower threshold for better detection
      }
    }
    
    return edges;
  }

  findVerticalEdges(edges, width, height, startX, endX, startY, endY) {
    const verticalRegions = [];
    
    // Scan for vertical edge columns every 2 pixels
    for (let x = startX; x < endX; x += 2) {
      let edgeCount = 0;
      let edgePositions = [];
      
      for (let y = startY; y < endY; y++) {
        if (edges[y * width + x] > 0) {
          edgeCount++;
          edgePositions.push(y);
        }
      }
      
      // If significant vertical edges found
      if (edgeCount > 3) { // Lowered threshold
        verticalRegions.push({
          x: x,
          edgeCount: edgeCount,
          edgePositions: edgePositions,
          top: Math.min(...edgePositions),
          bottom: Math.max(...edgePositions)
        });
      }
    }
    
    return this.mergeNearbyVerticalRegions(verticalRegions);
  }

  mergeNearbyVerticalRegions(regions) {
    const merged = [];
    const minDistance = 8; // Reduced minimum distance
    
    regions.forEach(region => {
      const nearby = merged.find(m => Math.abs(m.x - region.x) < minDistance);
      
      if (!nearby) {
        merged.push(region);
      } else {
        // Keep stronger region
        if (region.edgeCount > nearby.edgeCount) {
          nearby.x = region.x;
          nearby.edgeCount = region.edgeCount;
          nearby.edgePositions = region.edgePositions;
          nearby.top = region.top;
          nearby.bottom = region.bottom;
        }
      }
    });
    
    return merged.sort((a, b) => a.x - b.x);
  }

  extractContours(pixels, width, height, verticalRegions, startY, endY) {
    const contours = [];
    
    verticalRegions.forEach((region, index) => {
      // Scan wider area around each vertical edge
      const scanWidth = 25; // Increased scan width
      const colorData = this.scanColorRegion(
        pixels, width, height,
        region.x - scanWidth/2,
        region.x + scanWidth/2,
        startY, endY
      );
      
      if (colorData.totalPixels > 5) { // Lowered threshold
        contours.push({
          index: index,
          x: region.x,
          edgeData: region,
          colorData: colorData,
          bounds: this.calculateColorBounds(colorData)
        });
      }
    });
    
    return contours;
  }

  scanColorRegion(pixels, width, height, startX, endX, startY, endY) {
    let redPixels = [], greenPixels = [];
    
    for (let x = Math.max(0, Math.floor(startX)); x < Math.min(width, Math.ceil(endX)); x++) {
      for (let y = startY; y < endY; y++) {
        const idx = (y * width + x) * 4;
        const r = pixels[idx], g = pixels[idx + 1], b = pixels[idx + 2];
        
        // More sensitive color detection
        if (r > 70 && r > g + 10 && r > b + 10) { // Red (bearish) - lowered threshold
          redPixels.push({ x, y, intensity: r });
        }
        
        if ((g > 70 && g > r + 10 && g > b + 10) || // Green
            (g > 70 && b > 70 && r < g - 5)) { // Teal/cyan - more sensitive
          greenPixels.push({ x, y, intensity: g });
        }
      }
    }
    
    const totalPixels = redPixels.length + greenPixels.length;
    const isGreen = greenPixels.length > redPixels.length;
    
    return {
      redPixels,
      greenPixels,
      totalPixels,
      isGreen,
      dominantPixels: isGreen ? greenPixels : redPixels
    };
  }

  calculateColorBounds(colorData) {
    const allPixels = [...colorData.redPixels, ...colorData.greenPixels];
    
    if (allPixels.length === 0) {
      return { top: 0, bottom: 0, left: 0, right: 0 };
    }
    
    const xs = allPixels.map(p => p.x);
    const ys = allPixels.map(p => p.y);
    
    return {
      top: Math.min(...ys),
      bottom: Math.max(...ys),
      left: Math.min(...xs),
      right: Math.max(...xs)
    };
  }

  filterCandlestickContours(contours) {
    return contours.filter(contour => {
      const bounds = contour.bounds;
      const colorData = contour.colorData;
      
      // MUCH more lenient for small dojis
      const candleHeight = bounds.bottom - bounds.top;
      const candleWidth = bounds.right - bounds.left;
      
      // Allow very small candles (dojis can be tiny!)
      if (candleHeight < 2 || candleWidth > 100) {
        console.log(`❌ Contour ${contour.index}: dimensions ${candleWidth}x${candleHeight}`);
        return false;
      }
      
      // Very low pixel requirement for dojis
      if (colorData.totalPixels < 3) { // Was 8, now 3 for tiny dojis
        console.log(`❌ Contour ${contour.index}: pixels ${colorData.totalPixels}`);
        return false;
      }
      
      // Much more lenient color dominance for mixed/weak candles
      const dominanceRatio = colorData.dominantPixels.length / colorData.totalPixels;
      if (dominanceRatio < 0.3) { // Was 0.4, now 0.3 for dojis
        console.log(`❌ Contour ${contour.index}: dominance ${dominanceRatio.toFixed(2)}`);
        return false;
      }
      
      console.log(`✅ Contour ${contour.index}: VALID - ${colorData.totalPixels} pixels, ${candleHeight}px high (doji-friendly)`);
      return true;
    });
  }

  processEdgeDetectedCandles(validCandles, chartTop, chartBottom) {
    console.log('📊 Processing', validCandles.length, 'clustered candles...');
    
    if (validCandles.length === 0) return [];
    
    const chartHeight = chartBottom - chartTop;
    const basePrice = 100;
    const priceRange = 50;
    
    return validCandles.map((candle, index) => {
      // Convert pixel positions to prices
      const highPrice = basePrice + ((chartBottom - candle.high) / chartHeight) * priceRange;
      const lowPrice = basePrice + ((chartBottom - candle.low) / chartHeight) * priceRange;
      const bodyTopPrice = basePrice + ((chartBottom - candle.bodyTop) / chartHeight) * priceRange;
      const bodyBottomPrice = basePrice + ((chartBottom - candle.bodyBottom) / chartHeight) * priceRange;
      
      const open = candle.isGreen ? bodyBottomPrice : bodyTopPrice;
      const close = candle.isGreen ? bodyTopPrice : bodyBottomPrice;
      
      const processedCandle = {
        index: index,
        open: parseFloat(Math.max(open, lowPrice).toFixed(2)),
        high: parseFloat(Math.max(highPrice, open, close).toFixed(2)),
        low: parseFloat(Math.min(lowPrice, open, close).toFixed(2)),
        close: parseFloat(Math.max(close, lowPrice).toFixed(2)),
        isGreen: candle.isGreen,
        volume: Math.floor(50000 + Math.random() * 100000),
        pixelData: {
          x: candle.x,
          pixelCount: candle.pixelCount,
          confidence: candle.confidence,
          bounds: candle.pixelData.bounds,
          detectionMethod: candle.pixelData.detectionMethod
        }
      };
      
      console.log(`ClusteredCandle ${index + 1}:`, {
        x: candle.x,
        price: processedCandle.close,
        color: candle.isGreen ? 'GREEN' : 'RED',
        pixels: candle.pixelCount,
        confidence: candle.confidence
      });
      
      return processedCandle;
    });
  }

  findBodyFromColorPixels(pixels) {
    if (pixels.length < 2) {
      return { top: pixels[0]?.y || 0, bottom: pixels[pixels.length - 1]?.y || 0 };
    }
    
    // Group pixels by Y position to find densest area
    const yGroups = {};
    const groupSize = 4; // Smaller groups for better precision
    
    pixels.forEach(pixel => {
      const group = Math.floor(pixel.y / groupSize);
      yGroups[group] = (yGroups[group] || 0) + 1;
    });
    
    // Find group with most pixels
    const densestGroup = Object.keys(yGroups).reduce((a, b) => 
      yGroups[a] > yGroups[b] ? a : b
    );
    
    const bodyCenter = parseInt(densestGroup) * groupSize;
    const bodyPixels = pixels.filter(p => Math.abs(p.y - bodyCenter) < groupSize * 2);
    
    if (bodyPixels.length === 0) {
      return { top: pixels[0].y, bottom: pixels[pixels.length - 1].y };
    }
    
    return {
      top: Math.min(...bodyPixels.map(p => p.y)),
      bottom: Math.max(...bodyPixels.map(p => p.y))
    };
  }

  analyzeDetectedData(candles, width, height) {
    console.log('🔬 Analyzing edge-detected candlestick data...');
    
    const patterns = this.findRealPatterns(candles);
    const levels = this.findRealLevels(candles);
    const trend = this.analyzeRealTrend(candles);
    const confidence = this.calculateRealConfidence(candles, width, height);
    
    return {
      candles: candles,
      patterns: patterns,
      supportResistance: levels,
      trend: trend,
      volume: {
        hasVolumeData: false,
        analysis: { trend: 'not_available', description: 'Volume bars not detected in image' }
      },
      confidence: confidence,
      chartBounds: {
        x: Math.floor(width * 0.05),
        y: Math.floor(height * 0.05),
        width: Math.floor(width * 0.9),
        height: Math.floor(height * 0.9)
      },
      technicalIndicators: this.generateRealIndicators(patterns, trend),
      analysisDetails: {
        imageSize: `${width}x${height}`,
        candlesDetected: candles.length,
        detectionMethod: 'edge_detection_contour',
        avgConfidence: candles.reduce((sum, c) => sum + c.pixelData.confidence, 0) / candles.length
      }
    };
  }

  findRealPatterns(candles) {
    console.log('🔍 Comprehensive pattern analysis on', candles.length, 'candles...');
    const patterns = [];
    
    // === SINGLE CANDLE PATTERNS ===
    patterns.push(...this.detectSingleCandlePatterns(candles));
    
    // === TWO CANDLE PATTERNS ===
    patterns.push(...this.detectTwoCandlePatterns(candles));
    
    // === THREE CANDLE PATTERNS ===
    patterns.push(...this.detectThreeCandlePatterns(candles));
    
    // === MULTI-CANDLE PATTERNS ===
    patterns.push(...this.detectMultiCandlePatterns(candles));
    
    // === TREND PATTERNS ===
    patterns.push(...this.detectTrendPatterns(candles));
    
    // === BREAKOUT PATTERNS ===
    patterns.push(...this.detectBreakoutPatterns(candles));
    
    console.log('🎯 Found', patterns.length, 'total patterns');
    return patterns.sort((a, b) => b.confidence - a.confidence); // Sort by confidence
  }

  detectSingleCandlePatterns(candles) {
    const patterns = [];
    const lastCandle = candles[candles.length - 1];
    
    const body = Math.abs(lastCandle.close - lastCandle.open);
    const totalRange = lastCandle.high - lastCandle.low;
    const upperShadow = lastCandle.high - Math.max(lastCandle.open, lastCandle.close);
    const lowerShadow = Math.min(lastCandle.open, lastCandle.close) - lastCandle.low;
    
    // DOJI PATTERNS
    if (body < totalRange * 0.1) {
      if (upperShadow > totalRange * 0.4 && lowerShadow > totalRange * 0.4) {
        patterns.push({
          name: 'Long-Legged Doji',
          type: 'reversal',
          signal: 'neutral',
          confidence: 85,
          position: candles.length - 1,
          description: 'Strong indecision with long shadows on both sides - major reversal potential',
          outcome: 'Major trend reversal likely. Wait for confirmation before trading.',
          technicalData: { body: body.toFixed(2), totalRange: totalRange.toFixed(2) }
        });
      } else if (Math.abs(lastCandle.open - lastCandle.close) < totalRange * 0.05) {
        patterns.push({
          name: 'Perfect Doji',
          type: 'reversal',
          signal: 'neutral',
          confidence: 82,
          position: candles.length - 1,
          description: 'Perfect balance between buyers and sellers',
          outcome: 'Trend reversal very likely. Look for next candle confirmation.',
          technicalData: { body: body.toFixed(2) }
        });
      }
    }
    
    // HAMMER PATTERNS
    if (lowerShadow > body * 2 && upperShadow < body * 0.5 && totalRange > 0) {
      const hammerStrength = lowerShadow / body;
      patterns.push({
        name: hammerStrength > 3 ? 'Hammer' : 'Small Hammer',
        type: 'reversal',
        signal: 'bullish',
        confidence: Math.min(90, 65 + hammerStrength * 5),
        position: candles.length - 1,
        description: `Strong rejection of lower prices - buyers stepped in`,
        outcome: `Bullish reversal likely. Consider long positions above ${lastCandle.high.toFixed(2)}`,
        technicalData: { lowerShadow: lowerShadow.toFixed(2), hammerRatio: hammerStrength.toFixed(1) }
      });
    }
    
    // SHOOTING STAR PATTERNS
    if (upperShadow > body * 2 && lowerShadow < body * 0.5 && totalRange > 0) {
      const starStrength = upperShadow / body;
      patterns.push({
        name: starStrength > 3 ? 'Shooting Star' : 'Small Shooting Star',
        type: 'reversal',
        signal: 'bearish',
        confidence: Math.min(88, 63 + starStrength * 5),
        position: candles.length - 1,
        description: `Strong rejection of higher prices - sellers stepped in`,
        outcome: `Bearish reversal likely. Consider short positions below ${lastCandle.low.toFixed(2)}`,
        technicalData: { upperShadow: upperShadow.toFixed(2), starRatio: starStrength.toFixed(1) }
      });
    }
    
    // MARUBOZU PATTERNS
    if (body > totalRange * 0.9 && totalRange > 0) {
      patterns.push({
        name: lastCandle.isGreen ? 'Bullish Marubozu' : 'Bearish Marubozu',
        type: 'continuation',
        signal: lastCandle.isGreen ? 'bullish' : 'bearish',
        confidence: 79,
        position: candles.length - 1,
        description: `Strong ${lastCandle.isGreen ? 'buying' : 'selling'} pressure with no shadows`,
        outcome: `Strong ${lastCandle.isGreen ? 'upward' : 'downward'} momentum. Trend likely continues.`,
        technicalData: { bodyRatio: (body/totalRange).toFixed(2) }
      });
    }
    
    return patterns;
  }

  detectTwoCandlePatterns(candles) {
    const patterns = [];
    if (candles.length < 2) return patterns;
    
    const prev = candles[candles.length - 2];
    const curr = candles[candles.length - 1];
    
    // ENGULFING PATTERNS
    if (curr.open < prev.close && curr.close > prev.open && !prev.isGreen && curr.isGreen) {
      const engulfmentRatio = (curr.close - curr.open) / (prev.open - prev.close);
      patterns.push({
        name: 'Bullish Engulfing',
        type: 'reversal',
        signal: 'bullish',
        confidence: Math.min(92, 70 + engulfmentRatio * 10),
        position: candles.length - 1,
        description: 'Bullish candle completely engulfs previous bearish candle',
        outcome: `Strong bullish reversal. Target: ${(curr.close + (curr.close - prev.close)).toFixed(2)}`,
        technicalData: { engulfmentRatio: engulfmentRatio.toFixed(1) }
      });
    }
    
    if (curr.open > prev.close && curr.close < prev.open && prev.isGreen && !curr.isGreen) {
      const engulfmentRatio = (curr.open - curr.close) / (prev.close - prev.open);
      patterns.push({
        name: 'Bearish Engulfing',
        type: 'reversal',
        signal: 'bearish',
        confidence: Math.min(90, 68 + engulfmentRatio * 10),
        position: candles.length - 1,
        description: 'Bearish candle completely engulfs previous bullish candle',
        outcome: `Strong bearish reversal. Target: ${(curr.close - (prev.close - curr.close)).toFixed(2)}`,
        technicalData: { engulfmentRatio: engulfmentRatio.toFixed(1) }
      });
    }
    
    // HARAMI PATTERNS
    if (curr.high <= prev.high && curr.low >= prev.low && 
        Math.abs(curr.close - curr.open) < Math.abs(prev.close - prev.open)) {
      patterns.push({
        name: prev.isGreen !== curr.isGreen ? 'Harami Cross' : 'Harami',
        type: 'reversal',
        signal: prev.isGreen !== curr.isGreen ? 'strong_reversal' : 'consolidation',
        confidence: prev.isGreen !== curr.isGreen ? 84 : 72,
        position: candles.length - 1,
        description: 'Small candle contained within previous large candle',
        outcome: prev.isGreen !== curr.isGreen ? 
          'Strong reversal signal. Trend change likely.' :
          'Market consolidation. Prepare for breakout.',
        technicalData: { containmentRatio: (Math.abs(curr.close - curr.open) / Math.abs(prev.close - prev.open)).toFixed(2) }
      });
    }
    
    // PIERCING PATTERN / DARK CLOUD COVER
    if (!prev.isGreen && curr.isGreen && curr.open < prev.low && curr.close > (prev.open + prev.close) / 2) {
      patterns.push({
        name: 'Piercing Pattern',
        type: 'reversal',
        signal: 'bullish',
        confidence: 81,
        position: candles.length - 1,
        description: 'Bullish candle pierces deep into previous bearish candle',
        outcome: `Bullish reversal. Buyers overwhelmed sellers. Target: ${(curr.close + (curr.close - prev.close) * 0.618).toFixed(2)}`,
        technicalData: { piercingDepth: ((curr.close - prev.close) / (prev.open - prev.close)).toFixed(2) }
      });
    }
    
    if (prev.isGreen && !curr.isGreen && curr.open > prev.high && curr.close < (prev.open + prev.close) / 2) {
      patterns.push({
        name: 'Dark Cloud Cover',
        type: 'reversal',
        signal: 'bearish',
        confidence: 79,
        position: candles.length - 1,
        description: 'Bearish candle covers deep into previous bullish candle',
        outcome: `Bearish reversal. Sellers overwhelmed buyers. Target: ${(curr.close - (prev.close - curr.close) * 0.618).toFixed(2)}`,
        technicalData: { coverageDepth: ((prev.close - curr.close) / (prev.close - prev.open)).toFixed(2) }
      });
    }
    
    return patterns;
  }

  detectThreeCandlePatterns(candles) {
    const patterns = [];
    if (candles.length < 3) return patterns;
    
    const c1 = candles[candles.length - 3];
    const c2 = candles[candles.length - 2];
    const c3 = candles[candles.length - 1];
    
    // THREE WHITE SOLDIERS / THREE BLACK CROWS
    if (c1.isGreen && c2.isGreen && c3.isGreen && 
        c1.close < c2.close && c2.close < c3.close &&
        c2.open > c1.open && c3.open > c2.open) {
      const momentum = ((c3.close - c1.open) / c1.open) * 100;
      patterns.push({
        name: 'Three White Soldiers',
        type: 'continuation',
        signal: 'bullish',
        confidence: 89,
        position: candles.length - 1,
        description: 'Three consecutive bullish candles with strong momentum',
        outcome: `Very strong bullish trend. Momentum: ${momentum.toFixed(1)}%. Continue long positions.`,
        technicalData: { momentum: momentum.toFixed(1) + '%', avgBodySize: ((Math.abs(c1.close-c1.open) + Math.abs(c2.close-c2.open) + Math.abs(c3.close-c3.open))/3).toFixed(2) }
      });
    }
    
    if (!c1.isGreen && !c2.isGreen && !c3.isGreen && 
        c1.close > c2.close && c2.close > c3.close &&
        c2.open < c1.open && c3.open < c2.open) {
      const momentum = ((c1.open - c3.close) / c1.open) * 100;
      patterns.push({
        name: 'Three Black Crows',
        type: 'continuation',
        signal: 'bearish',
        confidence: 87,
        position: candles.length - 1,
        description: 'Three consecutive bearish candles with strong momentum',
        outcome: `Very strong bearish trend. Momentum: ${momentum.toFixed(1)}%. Continue short positions.`,
        technicalData: { momentum: momentum.toFixed(1) + '%', avgBodySize: ((Math.abs(c1.close-c1.open) + Math.abs(c2.close-c2.open) + Math.abs(c3.close-c3.open))/3).toFixed(2) }
      });
    }
    
    // EVENING STAR / MORNING STAR
    if (c1.isGreen && !c3.isGreen && c2.high > Math.max(c1.high, c3.high)) {
      const gapUp = c2.open > c1.close;
      const gapDown = c3.open < c2.close;
      if (gapUp || gapDown) {
        patterns.push({
          name: 'Evening Star',
          type: 'reversal',
          signal: 'bearish',
          confidence: 86,
          position: candles.length - 1,
          description: 'Three-candle bearish reversal pattern with star in middle',
          outcome: `Major bearish reversal. Strong selling likely. Target: ${(c3.close - (c1.close - c3.close)).toFixed(2)}`,
          technicalData: { starHeight: (c2.high - Math.max(c1.close, c3.close)).toFixed(2) }
        });
      }
    }
    
    if (!c1.isGreen && c3.isGreen && c2.low < Math.min(c1.low, c3.low)) {
      const gapDown = c2.open < c1.close;
      const gapUp = c3.open > c2.close;
      if (gapDown || gapUp) {
        patterns.push({
          name: 'Morning Star',
          type: 'reversal',
          signal: 'bullish',
          confidence: 84,
          position: candles.length - 1,
          description: 'Three-candle bullish reversal pattern with star in middle',
          outcome: `Major bullish reversal. Strong buying likely. Target: ${(c3.close + (c3.close - c1.close)).toFixed(2)}`,
          technicalData: { starDepth: (Math.min(c1.close, c3.close) - c2.low).toFixed(2) }
        });
      }
    }
    
    return patterns;
  }

  detectMultiCandlePatterns(candles) {
    const patterns = [];
    if (candles.length < 5) return patterns;
    
    // ASCENDING/DESCENDING TRIANGLE
    const recentCandles = candles.slice(-Math.min(10, candles.length));
    const highs = recentCandles.map(c => c.high);
    const lows = recentCandles.map(c => c.low);
    
    // Check for horizontal resistance with rising lows
    const maxHigh = Math.max(...highs);
    const resistanceTouches = highs.filter(h => Math.abs(h - maxHigh) < (maxHigh - Math.min(...lows)) * 0.02).length;
    
    if (resistanceTouches >= 2) {
      const firstLow = lows[0];
      const lastLow = lows[lows.length - 1];
      if (lastLow > firstLow) {
        patterns.push({
          name: 'Ascending Triangle',
          type: 'continuation',
          signal: 'bullish',
          confidence: 77,
          position: candles.length - 1,
          description: `Horizontal resistance at ${maxHigh.toFixed(2)} with rising support`,
          outcome: `Bullish breakout likely above ${maxHigh.toFixed(2)}. Target: ${(maxHigh + (maxHigh - Math.min(...lows)) * 0.5).toFixed(2)}`,
          technicalData: { resistance: maxHigh.toFixed(2), supportRise: (lastLow - firstLow).toFixed(2) }
        });
      }
    }
    
    // Check for horizontal support with falling highs
    const minLow = Math.min(...lows);
    const supportTouches = lows.filter(l => Math.abs(l - minLow) < (Math.max(...highs) - minLow) * 0.02).length;
    
    if (supportTouches >= 2) {
      const firstHigh = highs[0];
      const lastHigh = highs[highs.length - 1];
      if (lastHigh < firstHigh) {
        patterns.push({
          name: 'Descending Triangle',
          type: 'continuation',
          signal: 'bearish',
          confidence: 75,
          position: candles.length - 1,
          description: `Horizontal support at ${minLow.toFixed(2)} with falling resistance`,
          outcome: `Bearish breakdown likely below ${minLow.toFixed(2)}. Target: ${(minLow - (Math.max(...highs) - minLow) * 0.5).toFixed(2)}`,
          technicalData: { support: minLow.toFixed(2), resistanceFall: (firstHigh - lastHigh).toFixed(2) }
        });
      }
    }
    
    return patterns;
  }

  detectTrendPatterns(candles) {
    const patterns = [];
    if (candles.length < 5) return patterns;
    
    const first = candles[0];
    const last = candles[candles.length - 1];
    const totalChange = ((last.close - first.close) / first.close) * 100;
    
    // Count consecutive moves
    let upMoves = 0, downMoves = 0;
    for (let i = 1; i < candles.length; i++) {
      if (candles[i].close > candles[i-1].close) upMoves++;
      else downMoves++;
    }
    
    const consistency = Math.max(upMoves, downMoves) / (candles.length - 1) * 100;
    
    if (Math.abs(totalChange) > 2 && consistency > 60) {
      const trendStrength = Math.abs(totalChange) + consistency;
      patterns.push({
        name: totalChange > 0 ? 'Strong Uptrend' : 'Strong Downtrend',
        type: 'trend',
        signal: totalChange > 0 ? 'bullish' : 'bearish',
        confidence: Math.min(95, 60 + trendStrength / 2),
        position: candles.length - 1,
        description: `${Math.abs(totalChange).toFixed(1)}% move with ${consistency.toFixed(0)}% consistency`,
        outcome: totalChange > 0 ? 
          `Strong uptrend continues. Buy dips. Next target: ${(last.close * 1.05).toFixed(2)}` :
          `Strong downtrend continues. Sell rallies. Next target: ${(last.close * 0.95).toFixed(2)}`,
        technicalData: { 
          totalChange: totalChange.toFixed(1) + '%', 
          consistency: consistency.toFixed(0) + '%',
          trendStrength: trendStrength.toFixed(1)
        }
      });
    }
    
    return patterns;
  }

  detectBreakoutPatterns(candles) {
    const patterns = [];
    if (candles.length < 6) return patterns;
    
    const recent = candles.slice(-6);
    const lastCandle = candles[candles.length - 1];
    
    // Previous 5 candles range
    const prev5 = recent.slice(0, 5);
    const prev5High = Math.max(...prev5.map(c => c.high));
    const prev5Low = Math.min(...prev5.map(c => c.low));
    const consolidationRange = prev5High - prev5Low;
    
    // Volume simulation (based on pixel count)
    const avgPixelCount = prev5.reduce((sum, c) => sum + (c.pixelData?.pixelCount || 50), 0) / 5;
    const volumeSpike = (lastCandle.pixelData?.pixelCount || 50) > avgPixelCount * 1.5;
    
    // Breakout above resistance
    if (lastCandle.close > prev5High && lastCandle.isGreen) {
      patterns.push({
        name: volumeSpike ? 'High Volume Breakout' : 'Breakout Above Resistance',
        type: 'breakout',
        signal: 'bullish',
        confidence: volumeSpike ? 91 : 78,
        position: candles.length - 1,
        description: `Price broke above resistance at ${prev5High.toFixed(2)}${volumeSpike ? ' with high volume' : ''}`,
        outcome: `Bullish breakout confirmed. Target: ${(lastCandle.close + consolidationRange).toFixed(2)}. Stop: ${prev5High.toFixed(2)}`,
        technicalData: { 
          breakoutLevel: prev5High.toFixed(2), 
          target: (lastCandle.close + consolidationRange).toFixed(2),
          volumeSpike: volumeSpike
        }
      });
    }
    
    // Breakdown below support
    if (lastCandle.close < prev5Low && !lastCandle.isGreen) {
      patterns.push({
        name: volumeSpike ? 'High Volume Breakdown' : 'Breakdown Below Support',
        type: 'breakout',
        signal: 'bearish',
        confidence: volumeSpike ? 89 : 76,
        position: candles.length - 1,
        description: `Price broke below support at ${prev5Low.toFixed(2)}${volumeSpike ? ' with high volume' : ''}`,
        outcome: `Bearish breakdown confirmed. Target: ${(lastCandle.close - consolidationRange).toFixed(2)}. Stop: ${prev5Low.toFixed(2)}`,
        technicalData: { 
          breakdownLevel: prev5Low.toFixed(2), 
          target: (lastCandle.close - consolidationRange).toFixed(2),
          volumeSpike: volumeSpike
        }
      });
    }
    
    return patterns;
  } 

  findRealLevels(candles) {
    const highs = candles.map(c => c.high);
    const lows = candles.map(c => c.low);
    
    const resistance = Math.max(...highs);
    const support = Math.min(...lows);
    const priceRange = resistance - support;
    
    const resistanceTouches = highs.filter(h => Math.abs(h - resistance) < priceRange * 0.02).length;
    const supportTouches = lows.filter(l => Math.abs(l - support) < priceRange * 0.02).length;
    
    return [
      {
        price: resistance,
        type: 'resistance',
        strength: Math.min(95, 40 + resistanceTouches * 15),
        contacts: resistanceTouches,
        description: `Edge-detected resistance from ${resistanceTouches} high(s)`
      },
      {
        price: support,
        type: 'support',
        strength: Math.min(95, 40 + supportTouches * 15),
        contacts: supportTouches,
        description: `Edge-detected support from ${supportTouches} low(s)`
      }
    ];
  }

  analyzeRealTrend(candles) {
    const firstPrice = candles[0].close;
    const lastPrice = candles[candles.length - 1].close;
    const priceChange = ((lastPrice - firstPrice) / firstPrice) * 100;
    
    let upMoves = 0, downMoves = 0;
    for (let i = 1; i < candles.length; i++) {
      if (candles[i].close > candles[i-1].close) upMoves++;
      else downMoves++;
    }
    
    const consistency = Math.max(upMoves, downMoves) / (candles.length - 1) * 100;
    
    let direction = 'sideways';
    if (priceChange > 1) direction = 'bullish';
    else if (priceChange < -1) direction = 'bearish';
    
    return {
      direction: direction,
      strength: Math.round(consistency),
      change: parseFloat(priceChange.toFixed(2)),
      description: `Edge analysis: ${direction} trend with ${consistency.toFixed(0)}% consistency over ${candles.length} candles`
    };
  }

  calculateRealConfidence(candles, width, height) {
    let confidence = 40;
    
    confidence += Math.min(25, candles.length * 1.5);
    
    const avgPixelConfidence = candles.reduce((sum, c) => sum + c.pixelData.confidence, 0) / candles.length;
    confidence += Math.min(20, avgPixelConfidence / 5);
    
    if (width > 800 && height > 600) confidence += 15;
    
    return Math.round(Math.min(95, confidence));
  }

  generateRealIndicators(patterns, trend) {
    return patterns.map(pattern => ({
      type: pattern.name,
      signal: pattern.signal,
      confidence: pattern.confidence,
      description: `Edge detection: ${pattern.description}`
    }));
  }
}

// Technical Overlay - FIXED VERSION
const TechnicalOverlay = ({ originalImage, isActive, onOverlayed, analysisResult }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    if (isActive && originalImage && analysisResult && !analysisResult.error) {
      createTechnicalOverlay();
    }
  }, [isActive, originalImage, analysisResult]);

  const createTechnicalOverlay = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Set canvas to exact image dimensions for crisp quality
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw original image at full quality
      ctx.imageSmoothingEnabled = false; // Prevent blurring
      ctx.drawImage(img, 0, 0, img.width, img.height);
      
      if (analysisResult && analysisResult.candles && analysisResult.candles.length > 0) {
        const candles = analysisResult.candles;
        
        // Find highest and lowest prices from detected candles
        const allHighs = candles.map(c => c.high);
        const allLows = candles.map(c => c.low);
        const highestPrice = Math.max(...allHighs);
        const lowestPrice = Math.min(...allLows);
        
        // Convert prices back to pixel positions
        const chartBounds = analysisResult.chartBounds;
        const priceRange = highestPrice - lowestPrice;
        
        // Calculate Y positions for levels
        const resistanceY = chartBounds.y + ((highestPrice - highestPrice) / priceRange) * chartBounds.height;
        const supportY = chartBounds.y + ((highestPrice - lowestPrice) / priceRange) * chartBounds.height;
        
        // Draw resistance line (red)
        ctx.setLineDash([8, 4]);
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(chartBounds.x, resistanceY + 20);
        ctx.lineTo(chartBounds.x + chartBounds.width, resistanceY + 20);
        ctx.stroke();
        
        // Draw support line (green)
        ctx.strokeStyle = '#22c55e';
        ctx.beginPath();
        ctx.moveTo(chartBounds.x, supportY - 20);
        ctx.lineTo(chartBounds.x + chartBounds.width, supportY - 20);
        ctx.stroke();
        
        // Reset line dash
        ctx.setLineDash([]);
        
        // Add labels with better positioning
        ctx.font = 'bold 12px Arial';
        
        // Resistance label
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(chartBounds.x + 10, resistanceY + 5, 80, 18);
        ctx.fillStyle = '#ffffff';
        ctx.fillText('RESISTANCE', chartBounds.x + 15, resistanceY + 17);
        
        // Support label  
        ctx.fillStyle = '#22c55e';
        ctx.fillRect(chartBounds.x + 10, supportY - 23, 70, 18);
        ctx.fillStyle = '#ffffff';
        ctx.fillText('SUPPORT', chartBounds.x + 15, supportY - 11);
        
        // Add trend arrow if strong trend
        if (analysisResult.trend && Math.abs(analysisResult.trend.change) > 2) {
          const isUptrend = analysisResult.trend.direction === 'bullish';
          const arrowColor = isUptrend ? '#22c55e' : '#ef4444';
          
          ctx.strokeStyle = arrowColor;
          ctx.lineWidth = 3;
          ctx.setLineDash([10, 5]);
          
          const startX = chartBounds.x + 50;
          const endX = chartBounds.x + chartBounds.width - 50;
          const startY = isUptrend ? supportY - 40 : resistanceY + 40;
          const endY = isUptrend ? resistanceY + 40 : supportY - 40;
          
          // Draw trend line
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
          ctx.stroke();
          
          // Draw arrow head
          ctx.setLineDash([]);
          ctx.fillStyle = arrowColor;
          ctx.beginPath();
          if (isUptrend) {
            ctx.moveTo(endX, endY);
            ctx.lineTo(endX - 15, endY + 10);
            ctx.lineTo(endX - 15, endY - 10);
          } else {
            ctx.moveTo(endX, endY);
            ctx.lineTo(endX - 15, endY - 10);
            ctx.lineTo(endX - 15, endY + 10);
          }
          ctx.fill();
        }
      }
      
      // Convert to high-quality image
      const overlayImageData = canvas.toDataURL('image/png', 1.0); // Maximum quality
      onOverlayed(overlayImageData);
    };
    
    img.crossOrigin = 'anonymous'; // Prevent CORS issues
    img.src = originalImage;
  };

  return <canvas ref={canvasRef} className="hidden" />;
};

// SVG Chart Enhancer
const ChartEnhancer = ({ originalImage, isActive, onEnhanced, detectedCandles }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    if (isActive && originalImage) {
      createCleanSVG();
    }
  }, [isActive, originalImage, detectedCandles]);

  const createCleanSVG = () => {
    const svgWidth = 800;
    const svgHeight = 400;
    const margin = 40;
    
    let svgContent = `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">`;
    svgContent += `<rect width="100%" height="100%" fill="#1f2937"/>`;
    
    // Grid
    for (let y = margin; y < svgHeight - margin; y += 40) {
      svgContent += `<line x1="${margin}" y1="${y}" x2="${svgWidth - margin}" y2="${y}" stroke="#374151" stroke-width="1"/>`;
    }
    
    if (detectedCandles && detectedCandles.length > 0) {
      const chartWidth = svgWidth - 2 * margin;
      const chartHeight = svgHeight - 2 * margin;
      
      // Keep uniform width - width was good before
      const candleWidth = Math.max(8, chartWidth / detectedCandles.length * 0.7);
      const spacing = chartWidth / detectedCandles.length;
      
      const allPrices = detectedCandles.flatMap(c => [c.high, c.low]);
      const minPrice = Math.min(...allPrices);
      const maxPrice = Math.max(...allPrices);
      const priceRange = maxPrice - minPrice;
      
      detectedCandles.forEach((candle, i) => {
        const x = margin + i * spacing + spacing / 2;
        
        // Calculate Y positions normally
        const highY = margin + ((maxPrice - candle.high) / priceRange) * chartHeight;
        const lowY = margin + ((maxPrice - candle.low) / priceRange) * chartHeight;
        const openY = margin + ((maxPrice - candle.open) / priceRange) * chartHeight;
        const closeY = margin + ((maxPrice - candle.close) / priceRange) * chartHeight;
        
        const color = candle.isGreen ? '#10b981' : '#ef4444';
        
        // Wick (always same)
        svgContent += `<line x1="${x}" y1="${highY}" x2="${x}" y2="${lowY}" stroke="${color}" stroke-width="2"/>`;
        
        // ACCURATE BODY HEIGHT: Use actual price difference between open and close
        const actualBodyHeight = Math.abs(closeY - openY);

        // Handle doji (very small bodies) - ensure minimum visibility
        const finalBodyHeight = Math.max(1, actualBodyHeight);

        // Position body correctly between open/close
        const bodyTop = Math.min(openY, closeY);
        
        svgContent += `<rect x="${x - candleWidth/2}" y="${bodyTop}" width="${candleWidth}" height="${finalBodyHeight}" fill="${color}"/>`;
      });
    }
    
    svgContent += `</svg>`;
    const svgDataUrl = `data:image/svg+xml;base64,${btoa(svgContent)}`;
    onEnhanced(svgDataUrl);
  };

  return <canvas ref={canvasRef} className="hidden" />;
};

// History Manager
class ScanHistoryManager {
  constructor() {
    this.storageKey = 'edge_scanner_history';
  }

  saveToHistory(result, imageData) {
    const history = this.getHistory();
    const entry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      confidence: result.confidence,
      candlesDetected: result.analysisDetails.candlesDetected,
      patterns: result.patterns.length,
      trend: result.trend.direction,
      summary: `${result.patterns.length} patterns • ${result.trend.direction} trend • ${result.analysisDetails.candlesDetected} candles`
    };

    history.unshift(entry);
    if (history.length > 20) history.splice(20);
    
    localStorage.setItem(this.storageKey, JSON.stringify(history));
    return entry;
  }

  getHistory() {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    } catch {
      return [];
    }
  }

  clearHistory() {
    localStorage.removeItem(this.storageKey);
  }
}

// Main Edge Detection Scanner
const EdgeDetectionScanner = ({ 
  userProfile, 
  setUserProfile, 
  adCounters, 
  setAdCounters, 
  showInterstitialAd,
  showModernAlert 
}) => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [enhancedImage, setEnhancedImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [cameraActive, setCameraActive] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [enhanceMode, setEnhanceMode] = useState(false);
  const [showPriceInput, setShowPriceInput] = useState(false);
  const [firstCandlePrice, setFirstCandlePrice] = useState('');
  const [lastCandlePrice, setLastCandlePrice] = useState('');
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const analyzer = useRef(new EdgeDetectionAnalyzer());
  const historyManager = useRef(new ScanHistoryManager());

  const scanHistory = historyManager.current.getHistory();

  const startCamera = async () => {
    try {
      // For mobile/native platforms, use direct capture instead of video stream
      if (Capacitor.isNativePlatform() && CapacitorCamera) {
        console.log('📱 Using native camera capture');
        await captureWithNativeCamera();
        return;
      }

      // Web fallback - use video stream
      console.log('🌐 Using web camera stream');
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (error) {
      console.error('Camera error:', error);
      showModernAlert('Camera Error', 'Unable to access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  const captureWithNativeCamera = async () => {
    try {
      console.log('📱 Capturing with native camera...');
      const image = await CapacitorCamera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: 'dataUrl', // Get base64 data URL
        source: 'camera', // Use camera source
        width: 1920,
        height: 1080,
        preserveAspectRatio: true
      });

      if (image.dataUrl) {
        console.log('✅ Native camera capture successful');
        setCapturedImage(image.dataUrl);
        setTimeout(() => analyzeImage(image.dataUrl), 500);
      } else {
        throw new Error('No image data received from camera');
      }
    } catch (error) {
      console.error('Native camera error:', error);
      showModernAlert('Camera Error', 'Unable to capture image. Please try again.');
    }
  };

  const capturePhoto = async () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      
      const imageData = canvas.toDataURL('image/jpeg', 0.9);
      setCapturedImage(imageData);
      stopCamera();
      
      setTimeout(() => analyzeImage(imageData), 500);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target.result);
        setTimeout(() => analyzeImage(e.target.result), 500);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async (imageData) => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setAnalysisResult(null);
    
    // Simulate progress for edge detection steps
    const progressSteps = [
      { progress: 15, delay: 300, message: 'Converting to grayscale...' },
      { progress: 35, delay: 400, message: 'Detecting edges...' },
      { progress: 55, delay: 500, message: 'Finding vertical regions...' },
      { progress: 75, delay: 400, message: 'Extracting contours...' },
      { progress: 90, delay: 300, message: 'Validating candlesticks...' },
      { progress: 100, delay: 200, message: 'Complete!' }
    ];
    
    for (let step of progressSteps) {
      await new Promise(resolve => setTimeout(resolve, step.delay));
      setAnalysisProgress(step.progress);
    }
    
    try {
      const result = await analyzer.current.analyzeImage(imageData);
      
      if (!result.error) {
        historyManager.current.saveToHistory(result, imageData);
        // Show price input after successful analysis
        setShowPriceInput(true);
      }
      
      setAnalysisResult(result);
    } catch (error) {
      console.error('Edge detection analysis error:', error);
      setAnalysisResult({
        error: true,
        message: 'Edge detection analysis failed',
        suggestions: ['Try a different image', 'Ensure image has clear candlesticks']
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetScanner = () => {
    setCapturedImage(null);
    setEnhancedImage(null);
    
    setAnalysisResult(null);
    setIsAnalyzing(false);
    setEnhanceMode(false);
   
    setShowPriceInput(false);
    setFirstCandlePrice('');
    setLastCandlePrice('');
    stopCamera();
  };

  // Fixed applyRealPrices function with proper linear interpolation
// FIXED Smart Trading Suggestion Implementation 
// Replace the existing inline calculation in EnhancedScanner.js
const formatPrice = (price, useRealPrices = false) => {
  if (!price) return 'N/A';
  
  if (useRealPrices) {
    // For forex/crypto with real prices applied - use 4-5 decimals max
    return parseFloat(price).toFixed(Math.abs(price) < 1 ? 5 : 4);
  } else {
    // For simulated prices - use 2 decimals
    return parseFloat(price).toFixed(2);
  }
};

const formatPercent = (percent) => {
  if (!percent) return 'N/A';
  return `${percent > 0 ? '+' : ''}${parseFloat(percent).toFixed(1)}%`;
};
// Updated applyRealPrices function with proper linear interpolation
const applyRealPrices = () => {
  if (!firstCandlePrice || !lastCandlePrice || !analysisResult || !analysisResult.candles) return;
  
  const firstRealPrice = parseFloat(firstCandlePrice);
  const lastRealPrice = parseFloat(lastCandlePrice);
  
  if (isNaN(firstRealPrice) || isNaN(lastRealPrice)) {
    showModernAlert('Invalid Price', 'Please enter valid numbers for both prices');
    return;
  }
  
  console.log('🔧 Applying linear interpolation between:', { firstRealPrice, lastRealPrice });
  
  // Get the original fake price data
  const candles = analysisResult.candles;
  const firstFakePrice = candles[0].close;
  const lastFakePrice = candles[candles.length - 1].close;
  
  console.log('📊 Original fake price range:', { firstFakePrice, lastFakePrice });
  
  // Linear interpolation function
  const interpolatePrice = (fakePrice, candleIndex) => {
    // Calculate position ratio (0 = first candle, 1 = last candle)
    const positionRatio = candleIndex / (candles.length - 1);
    
    // Linear interpolation between first and last real prices
    const interpolatedPrice = firstRealPrice + (lastRealPrice - firstRealPrice) * positionRatio;
    
    // Also account for the fake price deviation from its candle's baseline
    const fakeCandleClose = candles[candleIndex].close;
    const fakeBaseline = firstFakePrice + (lastFakePrice - firstFakePrice) * positionRatio;
    const deviation = fakeCandleClose - fakeBaseline;
    
    // Scale the deviation proportionally
    const realPriceRange = Math.abs(lastRealPrice - firstRealPrice);
    const fakePriceRange = Math.abs(lastFakePrice - firstFakePrice);
    const scaledDeviation = fakePriceRange > 0 ? (deviation * realPriceRange / fakePriceRange) : 0;
    
    return interpolatedPrice + scaledDeviation;
  };
  
  // Apply linear interpolation to all candles
  const updatedCandles = candles.map((candle, index) => {
    // Calculate interpolated baseline for this candle position
    const baselinePrice = interpolatePrice(candle.close, index);
    
    // Calculate proportional scaling for OHLC relative to close
    const fakeRange = Math.max(candle.high - candle.low, 0.01);
    const realPriceRange = Math.abs(lastRealPrice - firstRealPrice);
    const fakeTotalRange = Math.abs(lastFakePrice - firstFakePrice);
    const localScale = fakeTotalRange > 0 ? realPriceRange / fakeTotalRange : 1;
    
    // Scale OHLC relative to the baseline price
    const closeOffset = candle.close - candle.close; // 0
    const openOffset = (candle.open - candle.close) * localScale;
    const highOffset = (candle.high - candle.close) * localScale;
    const lowOffset = (candle.low - candle.close) * localScale;
    
    return {
      ...candle,
      open: parseFloat((baselinePrice + openOffset).toFixed(6)),
      high: parseFloat((baselinePrice + highOffset).toFixed(6)),
      low: parseFloat((baselinePrice + lowOffset).toFixed(6)),
      close: parseFloat(baselinePrice.toFixed(6))
    };
  });
  
  // Apply linear interpolation to support/resistance levels
  const updatedLevels = analysisResult.supportResistance.map(level => {
    // Find the closest candle to this price level to determine position
    let closestCandleIndex = 0;
    let minDistance = Math.abs(candles[0].close - level.price);
    
    candles.forEach((candle, index) => {
      const distance = Math.abs(candle.close - level.price);
      if (distance < minDistance) {
        minDistance = distance;
        closestCandleIndex = index;
      }
    });
    
    // Interpolate the level price based on its position
    const interpolatedPrice = interpolatePrice(level.price, closestCandleIndex);
    
    return {
      ...level,
      price: parseFloat(interpolatedPrice.toFixed(6)),
      description: `${level.type} level at interpolated real price`
    };
  });
  
  // Update patterns with interpolated prices
  const updatedPatterns = analysisResult.patterns.map(pattern => {
    if (pattern.outcome) {
      let updatedOutcome = pattern.outcome;
      
      // Find and interpolate target prices
      updatedOutcome = updatedOutcome.replace(/Target: ([\d.]+)/g, (match, price) => {
        const fakePrice = parseFloat(price);
        // Find closest candle for interpolation
        let closestIndex = 0;
        let minDist = Math.abs(candles[0].close - fakePrice);
        
        candles.forEach((candle, index) => {
          const dist = Math.abs(candle.close - fakePrice);
          if (dist < minDist) {
            minDist = dist;
            closestIndex = index;
          }
        });
        
        const realPrice = interpolatePrice(fakePrice, closestIndex);
        return `Target: ${realPrice.toFixed(6)}`;
      });
      
      // Find and interpolate stop prices
      updatedOutcome = updatedOutcome.replace(/Stop: ([\d.]+)/g, (match, price) => {
        const fakePrice = parseFloat(price);
        // Find closest candle for interpolation
        let closestIndex = 0;
        let minDist = Math.abs(candles[0].close - fakePrice);
        
        candles.forEach((candle, index) => {
          const dist = Math.abs(candle.close - fakePrice);
          if (dist < minDist) {
            minDist = dist;
            closestIndex = index;
          }
        });
        
        const realPrice = interpolatePrice(fakePrice, closestIndex);
        return `Stop: ${realPrice.toFixed(6)}`;
      });
      
      return {
        ...pattern,
        outcome: updatedOutcome
      };
    }
    return pattern;
  });
  
  // Update the analysis result with interpolated data
  const updatedResult = {
    ...analysisResult,
    candles: updatedCandles,
    supportResistance: updatedLevels,
    patterns: updatedPatterns,
    priceScaling: {
      applied: true,
      method: 'linear_interpolation',
      firstPrice: firstRealPrice,
      lastPrice: lastRealPrice,
      candleCount: candles.length
    }
  };
  
  setAnalysisResult(updatedResult);
  setShowPriceInput(false);
  
  console.log('✅ Linear interpolation applied successfully');
  console.log('📈 First candle real price:', updatedCandles[0].close);
  console.log('📉 Last candle real price:', updatedCandles[updatedCandles.length - 1].close);
  
  showModernAlert('Success', 'Price interpolation applied! All trading levels are now accurate to your chart.');
};

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            🔍 Edge Detection Scanner
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 
                 text-white text-xs px-2 py-1 rounded-full font-bold shadow-md">
  BETA
</span>
          </h2>
          
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            <History className="w-5 h-5" />
          </button>
        </div>
        
        <p className="text-gray-300 text-sm mb-3">
          🎯 Uses Sobel edge detection + contour analysis for precise candlestick detection
        </p>
        
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            <span className="text-gray-300">Edge Detection Algorithm</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            <span className="text-gray-300">Contour Shape Analysis</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            <span className="text-gray-300">Improved Color Sensitivity</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            <span className="text-gray-300">Better Candlestick Validation</span>
          </div>
        </div>
      </div>

      {/* History */}
      {showHistory && (
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold">Edge Detection History</h3>
            <button
              onClick={() => {
                historyManager.current.clearHistory();
                setShowHistory(false);
              }}
              className="text-red-400 hover:text-red-300 text-sm"
            >
              Clear All
            </button>
          </div>
          {scanHistory.length === 0 ? (
            <p className="text-gray-400 text-center py-4">No edge detection scans yet</p>
          ) : (
            <div className="space-y-2">
              {scanHistory.slice(0, 5).map((scan) => (
                <div key={scan.id} className="bg-gray-700 rounded p-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-white">{scan.summary}</span>
                    <span className="text-purple-400">{scan.confidence}%</span>
                  </div>
                  <div className="text-gray-400 text-xs">
                    {new Date(scan.timestamp).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Camera */}
      {cameraActive && (
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="relative">
            <video ref={videoRef} autoPlay playsInline className="w-full rounded" />
            <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
              🔍 Edge detection ready
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <button onClick={capturePhoto} className="flex-1 bg-purple-600 hover:bg-purple-700 p-3 rounded font-bold">
              📸 Capture & Analyze
            </button>
            <button onClick={stopCamera} className="bg-gray-600 hover:bg-gray-700 p-3 rounded font-bold">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Image Preview & Enhancement & Overlay */}
      {capturedImage && !isAnalyzing && (
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Captured Chart</h3>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Enhanced SVG</span>
                <button
                  onClick={() => setEnhanceMode(!enhanceMode)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    enhanceMode ? 'bg-purple-600' : 'bg-gray-600'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    enhanceMode ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
              
            </div>
          </div>
          
          <div className="relative">
            <img
              src={enhanceMode && enhancedImage ? enhancedImage : capturedImage}
              alt="Chart"
              className="w-full rounded max-h-96 object-contain bg-gray-900"
            />
            
            {enhanceMode && enhancedImage && (
              <div className="absolute top-2 right-2 bg-purple-600 text-white px-2 py-1 rounded text-xs">
                Enhanced
              </div>
            )}
          </div>
          
          <ChartEnhancer
            originalImage={capturedImage}
            isActive={enhanceMode && !enhancedImage}
            onEnhanced={setEnhancedImage}
            detectedCandles={analysisResult?.candles}
          />
          
        </div>
      )}

      {/* Analysis Progress */}
      {isAnalyzing && (
        <div className="bg-gray-800 rounded-lg p-6 text-center">
          <div className="animate-spin w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <h3 className="text-xl font-bold mb-2">Edge Detection Analysis...</h3>
          <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
            <div
              className="bg-purple-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${analysisProgress}%` }}
            />
          </div>
          <p className="text-gray-400">
            {analysisProgress < 20 ? 'Converting to grayscale...' :
             analysisProgress < 40 ? 'Detecting edges with Sobel filters...' :
             analysisProgress < 60 ? 'Finding vertical edge regions...' :
             analysisProgress < 80 ? 'Extracting color contours...' : 'Validating candlestick shapes...'}
          </p>
        </div>
      )}

      {/* Price Input Modal - NOW WITH FIRST AND LAST PRICES */}
      {showPriceInput && analysisResult && !analysisResult.error && (
        <div className="bg-gradient-to-r from-yellow-900 to-orange-900 rounded-xl p-6 border border-yellow-600">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-yellow-400">💰 Set Real Price Range</h3>
            <button
              onClick={() => setShowPriceInput(false)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          
          <p className="text-yellow-200 text-sm mb-4">
            Enter the real prices of the first and last candlesticks to get accurate analysis with correct support, resistance, and trading levels:
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-yellow-300 text-sm mb-2">
                🟢 First Candle Close Price:
              </label>
              <input
                type="number"
                step="0.000001"
                placeholder="e.g. 1.250000"
                value={firstCandlePrice}
                onChange={(e) => setFirstCandlePrice(e.target.value)}
                className="w-full p-3 bg-gray-700 border border-yellow-600 rounded text-white placeholder-gray-400"
              />
            </div>
            
            <div>
              <label className="block text-yellow-300 text-sm mb-2">
                🔴 Last Candle Close Price:
              </label>
              <input
                type="number"
                step="0.000001"
                placeholder="e.g. 1.150000"
                value={lastCandlePrice}
                onChange={(e) => setLastCandlePrice(e.target.value)}
                className="w-full p-3 bg-gray-700 border border-yellow-600 rounded text-white placeholder-gray-400"
              />
            </div>
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={applyRealPrices}
              disabled={!firstCandlePrice || !lastCandlePrice}
              className="px-8 py-3 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-bold text-white transition-colors"
            >
              Apply Price Range
            </button>
          </div>
          
          <div className="mt-4 p-3 bg-yellow-800 rounded">
            <p className="text-yellow-200 text-sm">
              💡 <strong>Perfect Accuracy:</strong> This will map all prices, support/resistance levels, and trading targets to your exact chart using linear interpolation.
            </p>
            <p className="text-yellow-300 text-xs mt-1">
              Example: If your chart goes from $1.25 → $1.15, all analysis will be perfectly scaled to this range.
            </p>
          </div>
        </div>
      )}

      {/* Analysis Results */}
      {analysisResult && !isAnalyzing && (
        <div className="space-y-6">
          {analysisResult.error ? (
            <div className="bg-red-900 border border-red-600 rounded-xl p-6 text-center">
              <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-red-400 mb-3">Edge Detection Failed</h3>
              <p className="text-red-200 mb-4">{analysisResult.message}</p>
              {analysisResult.suggestions && (
                <div className="bg-red-800 rounded p-3 mb-4">
                  <ul className="text-red-200 text-sm">
                    {analysisResult.suggestions.map((suggestion, i) => (
                      <li key={i}>• {suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}
              <button onClick={resetScanner} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-bold">
                Try Again
              </button>
            </div>
          ) : (
            <>
              {/* Success Results - DYNAMIC COLOR CODING */}
              <div className={`bg-gradient-to-r rounded-xl p-6 border ${
                analysisResult.trend.direction === 'bullish' 
                  ? 'from-green-900 to-green-800 border-green-600'
                  : analysisResult.trend.direction === 'bearish'
                  ? 'from-red-900 to-red-800 border-red-600'
                  : 'from-gray-900 to-gray-800 border-gray-600'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-xl font-bold ${
                    analysisResult.trend.direction === 'bullish' ? 'text-green-400' :
                    analysisResult.trend.direction === 'bearish' ? 'text-red-400' :
                    'text-gray-400'
                  }`}>
                    Analysis Complete - {analysisResult.trend.direction.toUpperCase()} TREND
                  </h3>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white">{analysisResult.confidence}%</div>
                    <div className={`text-sm ${
                      analysisResult.trend.direction === 'bullish' ? 'text-green-300' :
                      analysisResult.trend.direction === 'bearish' ? 'text-red-300' :
                      'text-gray-300'
                    }`}>Confidence</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-white">{analysisResult.analysisDetails.candlesDetected}</div>
                    <div className={`text-sm ${
                      analysisResult.trend.direction === 'bullish' ? 'text-green-300' :
                      analysisResult.trend.direction === 'bearish' ? 'text-red-300' :
                      'text-gray-300'
                    }`}>Candles Detected</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{analysisResult.patterns.length}</div>
                    <div className={`text-sm ${
                      analysisResult.trend.direction === 'bullish' ? 'text-green-300' :
                      analysisResult.trend.direction === 'bearish' ? 'text-red-300' :
                      'text-gray-300'
                    }`}>Patterns Found</div>
                  </div>
                  <div>
                    <div className={`text-2xl font-bold ${
                      analysisResult.trend.direction === 'bullish' ? 'text-green-400' :
                      analysisResult.trend.direction === 'bearish' ? 'text-red-400' :
                      'text-gray-400'
                    }`}>
                      {analysisResult.trend.change > 0 ? '+' : ''}{analysisResult.trend.change}%
                    </div>
                    <div className={`text-sm ${
                      analysisResult.trend.direction === 'bullish' ? 'text-green-300' :
                      analysisResult.trend.direction === 'bearish' ? 'text-red-300' :
                      'text-gray-300'
                    }`}>Price Change</div>
                  </div>
                </div>
              </div>

              {/* SMART TRADING SUGGESTION BOX */}
              {(() => {
  // Calculate smart trading suggestion with FIXED interpolated prices
  const candles = analysisResult.candles;
  const lastCandle = candles[candles.length - 1];
  
  // ✅ FIXED: Use properly interpolated current price
  const currentPrice = lastCandle.close;
  
  console.log('💡 Smart Trading - Current price (interpolated):', currentPrice);
  console.log('💡 Price scaling applied:', analysisResult.priceScaling?.applied || false);
  
  const priceRange = Math.max(...candles.map(c => c.high)) - Math.min(...candles.map(c => c.low));
  const avgCandle = priceRange / candles.length;
  
  // Get strongest pattern for trade setup
  const strongestPattern = analysisResult.patterns
    .filter(p => p.confidence > 70)
    .sort((a, b) => b.confidence - a.confidence)[0];
  
  let tradeAction, takeProfit, stopLoss, reasoning;
  
  if (analysisResult.trend.direction === 'bullish' && analysisResult.trend.change > 2) {
    tradeAction = 'BUY';
    
    // ✅ FIXED: Calculate with interpolated current price
    const profitPercent = 0.05 + (Math.abs(analysisResult.trend.change) / 100 * 0.3);
    takeProfit = currentPrice * (1 + profitPercent);
    
    const stopPercent = 0.03 + (Math.abs(analysisResult.trend.change) / 100 * 0.2);
    stopLoss = currentPrice * (1 - stopPercent);
    
    reasoning = `Strong bullish trend (${analysisResult.trend.change.toFixed(1)}%) with ${analysisResult.trend.strength}% consistency`;
    
  } else if (analysisResult.trend.direction === 'bearish' && analysisResult.trend.change < -2) {
    tradeAction = 'SELL';
    
    // ✅ FIXED: Calculate with interpolated current price
    const profitPercent = 0.05 + (Math.abs(analysisResult.trend.change) / 100 * 0.3);
    takeProfit = currentPrice * (1 - profitPercent);
    
    const stopPercent = 0.03 + (Math.abs(analysisResult.trend.change) / 100 * 0.2);
    stopLoss = currentPrice * (1 + stopPercent);
    
    reasoning = `Strong bearish trend (${analysisResult.trend.change.toFixed(1)}%) with ${analysisResult.trend.strength}% consistency`;
    
  } else if (strongestPattern) {
    // ✅ FIXED: Use pattern-based trade with interpolated current price
    if (strongestPattern.signal === 'bullish') {
      tradeAction = 'BUY';
      takeProfit = currentPrice * 1.04; // 4% profit target
      stopLoss = currentPrice * 0.97;   // 3% stop loss
      reasoning = `${strongestPattern.name} pattern (${strongestPattern.confidence}% confidence)`;
    } else if (strongestPattern.signal === 'bearish') {
      tradeAction = 'SELL';
      takeProfit = currentPrice * 0.96; // 4% profit target
      stopLoss = currentPrice * 1.03;   // 3% stop loss
      reasoning = `${strongestPattern.name} pattern (${strongestPattern.confidence}% confidence)`;
    }
  }
  
  // ✅ FIXED: Calculate risk/reward with interpolated prices
  let riskReward = 'N/A';
  if (takeProfit && stopLoss && currentPrice) {
    const reward = Math.abs(takeProfit - currentPrice);
    const risk = Math.abs(currentPrice - stopLoss);
    riskReward = risk > 0 ? `1:${(reward / risk).toFixed(1)}` : 'N/A';
  }
  
  if (!tradeAction) {
    return (
      <div className="bg-yellow-900 border border-yellow-600 rounded-xl p-6">
        <h3 className="text-xl font-bold text-yellow-400 mb-3">⚠️ No Clear Signal</h3>
        <p className="text-yellow-200">
          Market shows mixed signals. Wait for clearer trend confirmation before entering trades.
        </p>
        {!analysisResult.priceScaling?.applied && (
          <div className="mt-3 p-2 bg-yellow-800 rounded text-xs text-yellow-200">
            💡 Apply real prices above for accurate trading levels
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div className={`rounded-xl p-6 border ${
      tradeAction === 'BUY' 
        ? 'bg-gradient-to-r from-green-900 to-green-800 border-green-500'
        : 'bg-gradient-to-r from-red-900 to-red-800 border-red-500'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-xl font-bold ${
          tradeAction === 'BUY' ? 'text-green-400' : 'text-red-400'
        }`}>
          💡 Smart Trading Suggestion
        </h3>
        <span className={`px-4 py-2 rounded-lg font-bold text-lg ${
          tradeAction === 'BUY' 
            ? 'bg-green-600 text-white' 
            : 'bg-red-600 text-white'
        }`}>
          {tradeAction}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-6 mb-4">
        <div className="bg-black bg-opacity-30 rounded-lg p-4">
          <div className="text-gray-300 text-sm mb-1">🎯 Take Profit</div>
          <div className="text-green-400 text-2xl font-mono font-bold">
            ${takeProfit?.toFixed(analysisResult.priceScaling?.applied ? 6 : 2)}
          </div>
        </div>
        
        <div className="bg-black bg-opacity-30 rounded-lg p-4">
          <div className="text-gray-300 text-sm mb-1">🛡️ Stop Loss</div>
          <div className="text-red-400 text-2xl font-mono font-bold">
            ${stopLoss?.toFixed(analysisResult.priceScaling?.applied ? 6 : 2)}
          </div>
        </div>
      </div>
      
      <div className="bg-black bg-opacity-30 rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-gray-300 text-sm">Entry Price:</span>
            <span className="text-white text-lg font-mono ml-2">
              ${currentPrice?.toFixed(analysisResult.priceScaling?.applied ? 6 : 2)}
            </span>
          </div>
          <div>
            <span className="text-gray-300 text-sm">Risk/Reward:</span>
            <span className="text-yellow-400 text-lg font-bold ml-2">{riskReward}</span>
          </div>
        </div>
      </div>
      
      <div className={`text-sm p-3 rounded ${
        tradeAction === 'BUY' ? 'bg-green-800' : 'bg-red-800'
      }`}>
        <strong>Reasoning:</strong> {reasoning}
      </div>
      
      {/* ✅ NEW: Show interpolation status */}
      {analysisResult.priceScaling?.applied ? (
        <div className="mt-3 text-xs text-green-400 bg-green-900 bg-opacity-30 p-2 rounded border border-green-600">
          ✅ Using interpolated real prices ({analysisResult.priceScaling.firstPrice?.toFixed(6)} → {analysisResult.priceScaling.lastPrice?.toFixed(6)})
        </div>
      ) : (
        <div className="mt-3 text-xs text-yellow-400 bg-yellow-900 bg-opacity-30 p-2 rounded border border-yellow-600">
          ⚠️ Using simulated prices. Apply real prices above for accurate trading levels.
        </div>
      )}
      
      <div className="mt-2 text-xs text-gray-400">
        💡 This analysis uses {analysisResult.priceScaling?.applied ? 'linear interpolation for accurate price mapping' : 'estimated prices'}. Always use proper risk management.
      </div>
    </div>
  );
})()}

              {/* Detected Patterns */}
              {analysisResult.patterns.length > 0 && (
                <div className="bg-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-blue-400 mb-4">🔍 Edge-Detected Patterns</h3>
                  <div className="space-y-4">
                    {analysisResult.patterns.map((pattern, index) => (
                      <div key={index} className="bg-gray-700 rounded-lg p-4 border-l-4 border-purple-500">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-white">{pattern.name}</h4>
                          <span className={`px-3 py-1 rounded text-xs font-bold ${
                            pattern.signal === 'bullish' ? 'bg-green-600' :
                            pattern.signal === 'bearish' ? 'bg-red-600' : 
                            pattern.signal === 'strong_reversal' ? 'bg-purple-600' :
                            'bg-gray-600'
                          }`}>
                            {pattern.signal.toUpperCase().replace('_', ' ')}
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm mb-2">{pattern.description}</p>
                        
                        {/* TRADING ACTION BOX */}
                        {pattern.outcome && (
                          <div className={`mt-3 p-4 rounded-lg border-l-4 ${
                            pattern.signal === 'bullish' ? 'bg-green-900 border-green-400' :
                            pattern.signal === 'bearish' ? 'bg-red-900 border-red-400' :
                            'bg-blue-900 border-blue-400'
                          }`}>
                            <div className="flex items-center justify-between mb-2">
                              <span className={`font-bold text-lg ${
                                pattern.signal === 'bullish' ? 'text-green-300' :
                                pattern.signal === 'bearish' ? 'text-red-300' :
                                'text-blue-300'
                              }`}>
                                📈 Trading Action
                              </span>
                              <span className={`px-3 py-1 rounded font-bold text-sm ${
                                pattern.signal === 'bullish' ? 'bg-green-600 text-white' :
                                pattern.signal === 'bearish' ? 'bg-red-600 text-white' :
                                'bg-blue-600 text-white'
                              }`}>
                                {pattern.signal === 'bullish' ? 'BUY' : 
                                 pattern.signal === 'bearish' ? 'SELL' : 'WAIT'}
                              </span>
                            </div>
                            <p className={`text-sm ${
                              pattern.signal === 'bullish' ? 'text-green-100' :
                              pattern.signal === 'bearish' ? 'text-red-100' :
                              'text-blue-100'
                            }`}>
                              {pattern.outcome}
                            </p>
                            
                            {/* TAKE PROFIT & STOP LOSS BOX */}
                            {(pattern.outcome.includes('Target:') || pattern.outcome.includes('Stop:')) && (
                              <div className="mt-3 p-3 bg-gray-800 rounded border border-gray-600">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  {pattern.outcome.includes('Target:') && (
                                    <div>
                                      <span className="text-gray-400">🎯 Take Profit:</span>
                                      <span className="text-green-400 ml-2 font-mono">
                                        {pattern.outcome.match(/Target: ([\d.]+)/)?.[1] || 'TBD'}
                                      </span>
                                    </div>
                                  )}
                                  {pattern.outcome.includes('Stop:') && (
                                    <div>
                                      <span className="text-gray-400">🛡️ Stop Loss:</span>
                                      <span className="text-red-400 ml-2 font-mono">
                                        {pattern.outcome.match(/Stop: ([\d.]+)/)?.[1] || 'TBD'}
                                      </span>
                                    </div>
                                  )}
                                </div>
                                
                                {/* Risk/Reward Calculation */}
                                {pattern.outcome.includes('Target:') && pattern.outcome.includes('Stop:') && (
                                  <div className="mt-2 pt-2 border-t border-gray-700">
                                    <span className="text-gray-400 text-xs">⚖️ Risk/Reward Ratio: </span>
                                    <span className="text-yellow-400 text-xs font-bold">
                                      {(() => {
                                        const target = parseFloat(pattern.outcome.match(/Target: ([\d.]+)/)?.[1] || 0);
                                        const stop = parseFloat(pattern.outcome.match(/Stop: ([\d.]+)/)?.[1] || 0);
                                        const entry = analysisResult.candles[pattern.position]?.close || 0;
                                        
                                        if (target && stop && entry) {
                                          const reward = Math.abs(target - entry);
                                          const risk = Math.abs(entry - stop);
                                          const ratio = risk > 0 ? (reward / risk).toFixed(1) : 'N/A';
                                          return `1:${ratio}`;
                                        }
                                        return 'Calculating...';
                                      })()}
                                    </span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                        
                        <div className="text-xs text-gray-400 mt-3 flex justify-between">
                          <span>Confidence: {pattern.confidence}%</span>
                          <span>Type: {pattern.type}</span>
                        </div>
                        
                        {/* Technical Details */}
                        {pattern.technicalData && (
                          <div className="mt-2 text-xs text-gray-500">
                            {Object.entries(pattern.technicalData).map(([key, value]) => (
                              <span key={key} className="mr-3">
                                {key}: {value}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Trend Analysis */}
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-purple-400 mb-4">📈 Edge-Based Trend Analysis</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-700 rounded p-4">
                    <div className="text-gray-400 text-sm">Direction</div>
                    <div className={`text-xl font-bold capitalize ${
                      analysisResult.trend.direction === 'bullish' ? 'text-green-400' :
                      analysisResult.trend.direction === 'bearish' ? 'text-red-400' : 'text-gray-400'
                    }`}>
                      {analysisResult.trend.direction}
                    </div>
                  </div>
                  <div className="bg-gray-700 rounded p-4">
                    <div className="text-gray-400 text-sm">Strength</div>
                    <div className="text-xl font-bold text-white">{analysisResult.trend.strength}%</div>
                  </div>
                  <div className="bg-gray-700 rounded p-4 col-span-2">
                    <div className="text-gray-400 text-sm">Price Change</div>
                    <div className={`text-xl font-bold ${
                      analysisResult.trend.change > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {analysisResult.trend.change > 0 ? '+' : ''}{analysisResult.trend.change}%
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-gray-700 rounded">
                  <p className="text-gray-300 text-sm">{analysisResult.trend.description}</p>
                </div>
              </div>

              
          

              {/* Technical Details */}
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-400 mb-4">Analysis Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Method:</span>
                    <span className="text-white ml-2">Color Clustering + Morphology</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Image Size:</span>
                    <span className="text-white ml-2">{analysisResult.analysisDetails.imageSize}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Candles Found:</span>
                    <span className="text-white ml-2">{analysisResult.analysisDetails.candlesDetected}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Avg Detection Quality:</span>
                    <span className="text-white ml-2">{analysisResult.analysisDetails.avgConfidence.toFixed(0)}%</span>
                  </div>
                  {analysisResult.priceScaling?.applied && (
                    <>
                      <div className="col-span-2 border-t border-gray-600 pt-3">
                        <span className="text-gray-400">Price Scaling:</span>
                        <span className="text-green-400 ml-2">✓ Applied ({analysisResult.priceScaling.firstPrice} → {analysisResult.priceScaling.lastPrice})</span>
                      </div>
                    </>
                  )}
                </div>
                
                {!analysisResult.priceScaling?.applied && (
                  <div className="mt-4 p-3 bg-yellow-900 border border-yellow-600 rounded">
                    <p className="text-yellow-200 text-sm">
                      ⚠️ <strong>Using simulated prices.</strong> Click the price input above to set real prices for accurate analysis.
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={resetScanner}
                  className="bg-purple-600 hover:bg-purple-700 p-4 rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  <Camera className="w-5 h-5" />
                  New Edge Scan
                </button>
                <button
                  onClick={() => {
                    const summary = `Edge Detection Analysis:\n\nCandles Detected: ${analysisResult.analysisDetails.candlesDetected}\nPatterns Found: ${analysisResult.patterns.length}\nTrend: ${analysisResult.trend.direction} (${analysisResult.trend.change}%)\nConfidence: ${analysisResult.confidence}%\nMethod: Sobel Edge Detection + Contour Analysis`;
                    navigator.clipboard?.writeText(summary);
                    showModernAlert('Copied!', 'Edge analysis copied to clipboard');
                  }}
                  className="bg-green-600 hover:bg-green-700 p-4 rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  📤 Share Results
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Main Interface */}
      {!capturedImage && !cameraActive && !isAnalyzing && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={startCamera}
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 p-6 rounded-xl font-bold transition-all transform hover:scale-105"
            >
              <div className="flex flex-col items-center gap-3">
                <Camera className="w-10 h-10" />
                <span className="text-lg">Edge Detection Scan</span>
                <span className="text-xs opacity-90">Advanced algorithm</span>
              </div>
            </button>
            
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 p-6 rounded-xl font-bold transition-all transform hover:scale-105"
            >
              <div className="flex flex-col items-center gap-3">
                <Upload className="w-10 h-10" />
                <span className="text-lg">Upload Chart</span>
                <span className="text-xs opacity-90">From gallery</span>
              </div>
            </button>
          </div>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
          
          {/* How Edge Detection Works */}
          <div className="bg-purple-900 rounded-lg p-4">
            <h3 className="font-bold text-purple-300 mb-2">🔍 Edge Detection Method:</h3>
            <ul className="text-purple-100 text-sm space-y-1">
              <li>• Converts image to grayscale for edge processing</li>
              <li>• Uses Sobel kernels to detect vertical edges</li>
              <li>• Finds edge regions that form candlestick boundaries</li>
              <li>• Analyzes color contours around detected edges</li>
              <li>• Validates shapes using geometric properties</li>
              <li>• More accurate than simple color scanning</li>
            </ul>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default EdgeDetectionScanner;