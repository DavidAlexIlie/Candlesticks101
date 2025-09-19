# Complete Enhanced Scanner Analysis Code Overview

## What the Computer "Sees"

The Enhanced Scanner processes raw pixel data from your uploaded chart image. Here's how it works:

## 1. Image Processing Pipeline

```javascript
async analyzeImage(imageData) {
  // Load image and extract pixel data
  const img = new Image();
  const pixels = this.ctx.getImageData(0, 0, img.width, img.height).data;

  // Apply noise reduction while preserving thin structures
  pixels = this.applyNoiseReduction(pixels, img.width, img.height);

  // Validate it's actually a trading chart
  if (!this.isValidChart(pixels, img.width, img.height)) {
    return { error: "Not a trading chart" };
  }

  // Detect candlesticks using edge detection
  const candlesticks = this.edgeDetectionMethod(pixels, img.width, img.height);

  // Process and analyze results
  return this.analyzeDetectedData(candlesticks, img.width, img.height);
}
```

## 2. Noise Reduction (Structure Preserving)

```javascript
applyNoiseReduction(pixels, width, height) {
  // Check if pixel is part of thin vertical structure
  const isVerticalStructure = this.isPartOfVerticalStructure(pixels, width, height, x, y);

  if (isVerticalStructure) {
    // DON'T filter - preserve thin wicks
    return originalPixel;
  } else {
    // Apply gentle median filter for noise reduction
    return medianFilteredPixel;
  }
}
```

## 3. Chart Validation

```javascript
isValidChart(pixels, width, height) {
  // Count colored pixels to ensure it's a trading chart
  let redPixels = 0, greenPixels = 0, yellowPixels = 0;

  // Sample every 60 pixels for performance
  for (let i = 0; i < pixels.length; i += 60) {
    const r = pixels[i], g = pixels[i + 1], b = pixels[i + 2];

    // Detect red candlesticks
    if (r > 100 && r > g + 10 && r > b + 10) redPixels++;

    // Detect green candlesticks
    if (g > 100 && g > r + 10 && g > b + 10) greenPixels++;

    // Detect yellow/orange (some charts)
    if (r > 150 && g > 100 && b < 80) yellowPixels++;
  }

  // Need enough colored pixels to be a valid chart
  return (redPixels + greenPixels + yellowPixels) > 50;
}
```

## 4. Main Candlestick Detection

```javascript
edgeDetectionMethod(pixels, width, height) {
  // Skip chart borders and focus on trading area
  const chartStartX = Math.floor(width * 0.05);
  const chartEndX = Math.floor(width * 0.95);

  // Find clusters of colored pixels
  const clusters = this.findColorClusters(pixels, width, height, chartStartX, chartEndX);

  // Convert clusters into candlestick data
  const candlesticks = [];
  clusters.forEach(cluster => {
    const separation = this.splitBodyAndWicks(cluster, pixels, width, height);

    if (separation.isValidBody) {
      candlesticks.push({
        x: cluster.centerX,
        high: separation.wickTop,
        low: separation.wickBottom,
        bodyTop: separation.bodyTop,
        bodyBottom: separation.bodyBottom,
        isGreen: separation.isGreen,
        confidence: separation.confidence
      });
    }
  });

  return candlesticks;
}
```

## 5. Enhanced Wick Detection (The Key Improvement)

```javascript
detectWickLines(pixels, width, height, centerX, bodyTop, bodyBottom) {
  // Two-stage detection approach

  // Stage 1: Vertical line tracing from body
  const wickResults = this.traceWicksWithVerticalScanning(
    pixels, width, height, centerX, bodyTop, bodyBottom, minX, maxX
  );

  // Stage 2: Detect isolated thin vertical lines
  const thinWicks = this.detectThinVerticalWicks(
    pixels, width, height, centerX, bodyTop, bodyBottom
  );

  // Combine results, taking most extreme points
  let upperWickTop = Math.min(wickResults.upperWickTop, thinWicks.upperWick || bodyTop);
  let lowerWickBottom = Math.max(wickResults.lowerWickBottom, thinWicks.lowerWick || bodyBottom);

  // Prevent exaggeration with maximum wick length constraint
  const bodyHeight = bodyBottom - bodyTop;
  const maxWickLength = Math.max(bodyHeight * 3, 30);

  if (bodyTop - upperWickTop > maxWickLength) {
    upperWickTop = bodyTop - maxWickLength;
  }

  return { upperWickTop, lowerWickBottom, hasWicks: true };
}
```

## 6. Vertical Line Tracing Algorithm

```javascript
traceWicksWithVerticalScanning(pixels, width, height, centerX, bodyTop, bodyBottom, minX, maxX) {
  const maxGap = 1; // Very tight gap tolerance

  // Trace upward from body top
  let gapCount = 0;
  for (let y = bodyTop - 1; y >= 0; y--) {
    let wickPixelFound = false;

    // Scan each column in search area
    for (let x = minX; x <= maxX; x++) {
      const r = pixels[idx], g = pixels[idx + 1], b = pixels[idx + 2];

      if (this.isWickPixel(r, g, b)) {
        wickPixelFound = true;
        upperWickTop = y;
        gapCount = 0;
        break;
      }
    }

    if (!wickPixelFound) {
      gapCount++;
      if (gapCount > maxGap) break; // Stop if gap too large
    }
  }

  // Same process downward for lower wick...
  return { upperWickTop, lowerWickBottom };
}
```

## 7. Wick Pixel Detection (Conservative)

```javascript
isWickPixel(r, g, b) {
  return (
    (r > 45 && r > g + 10 && r > b + 10) || // Red wick
    (g > 45 && g > r + 10 && g > b + 10) || // Green wick
    (r > 80 && g > 80 && b > 80 && Math.max(r, g, b) - Math.min(r, g, b) < 35) // Gray/black
  );
}
```

## 8. Thin Vertical Line Detection

```javascript
detectThinVerticalWicks(pixels, width, height, centerX, bodyTop, bodyBottom) {
  const verticalLines = new Map();

  // Group pixels into potential vertical lines
  for (let y = 0; y < height; y++) {
    for (let x = startX; x <= endX; x++) {
      if (this.isWickPixel(r, g, b)) {
        // Group with nearby vertical lines (1px tolerance)
        verticalLines.groupPixel(x, y);
      }
    }
  }

  // Analyze lines for wick characteristics
  for (let [x, points] of verticalLines) {
    const lineHeight = maxY - minY;

    // Must be tall enough and have enough pixels
    if (lineHeight >= 6 && points.length >= 4) {
      // Check if extends above/below body
      if (extends beyond body) {
        recordAsWick(minY, maxY);
      }
    }
  }
}
```

## What This Means

The computer literally examines every pixel in your chart image:
- **Red pixels** (R > 45, R > G+10, R > B+10) = Red candlesticks
- **Green pixels** (G > 45, G > R+10, G > B+10) = Green candlesticks
- **Gray pixels** (R,G,B > 80, similar values) = Wicks/shadows

It then:
1. Groups nearby colored pixels into clusters
2. Identifies body vs wick regions using density analysis
3. Traces thin vertical lines pixel-by-pixel to find wicks
4. Applies constraints to prevent false detections

The enhanced algorithm specifically looks for **1-2 pixel wide vertical lines** that extend above/below the main body clusters - these become the wick endpoints.