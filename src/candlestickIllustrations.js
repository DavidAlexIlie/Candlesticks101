// candlestickIllustrations.js - Complete SVG illustrations for all candlestick patterns
export const candlestickIllustrations = {
  // === BULLISH PATTERNS ===
  'Hammer Pattern': {
    candles: [
      { open: 100, high: 102, low: 85, close: 99, isGreen: false }
    ],
    description: "Long lower shadow (2x+ body), small body at top, shows rejection of lower prices",
    recognitionTips: [
      "✓ Small body at the top of the trading range",
      "✓ Long lower shadow (at least 2x body size)", 
      "✓ Little to no upper shadow",
      "✓ Appears after a downtrend",
      "✓ Body color doesn't matter (can be red or green)"
    ],
    psychology: "Bears pushed price down aggressively, but bulls stepped in and rejected lower prices, closing near the open."
  },

  'Bullish Engulfing': {
    candles: [
      { open: 102, high: 103, low: 98, close: 99, isGreen: false },
      { open: 98, high: 108, low: 97, close: 107, isGreen: true }
    ],
    description: "Large green candle completely engulfs the previous red candle's body",
    recognitionTips: [
      "✓ First candle: Small red/bearish candle",
      "✓ Second candle: Large green/bullish candle",
      "✓ Second candle's body completely engulfs first candle's body",
      "✓ Appears after a downtrend",
      "✓ Higher volume on engulfing candle strengthens signal"
    ],
    psychology: "Day 1: Bears in control. Day 2: Bulls take complete control, overwhelming the bears with strong buying pressure."
  },

  'Morning Star': {
    candles: [
      { open: 105, high: 106, low: 95, close: 96, isGreen: false },
      { open: 95, high: 97, low: 94, close: 96, isGreen: false },
      { open: 97, high: 108, low: 96, close: 106, isGreen: true }
    ],
    description: "Three-candle bullish reversal: large red, small star, large green",
    recognitionTips: [
      "✓ First candle: Large red/bearish candle",
      "✓ Second candle: Small-bodied 'star' (can be red or green)",
      "✓ Third candle: Large green/bullish candle",
      "✓ Third candle closes well into first candle's body",
      "✓ Star should gap down from first candle"
    ],
    psychology: "Day 1: Bears dominate. Day 2: Market shows indecision, selling weakens. Day 3: Bulls take control with strong buying."
  },

  'Piercing Pattern': {
    candles: [
      { open: 105, high: 106, low: 95, close: 96, isGreen: false },
      { open: 94, high: 104, low: 93, close: 101, isGreen: true }
    ],
    description: "Green candle opens below red candle's low, closes above its midpoint",
    recognitionTips: [
      "✓ First candle: Large red/bearish candle",
      "✓ Second candle: Opens below first candle's low (gap down)",
      "✓ Second candle: Closes above midpoint of first candle's body",
      "✓ Doesn't completely engulf first candle (vs Bullish Engulfing)",
      "✓ Higher volume on second day increases reliability"
    ],
    psychology: "Gap down shows continued pessimism, but strong buying emerges during the day, closing above midpoint shows shift to bulls."
  },

  'Three White Soldiers': {
    candles: [
      { open: 95, high: 102, low: 94, close: 101, isGreen: true },
      { open: 100, high: 107, low: 99, close: 106, isGreen: true },
      { open: 105, high: 112, low: 104, close: 111, isGreen: true }
    ],
    description: "Three consecutive long green candles with progressive higher closes",
    recognitionTips: [
      "✓ Three consecutive long green/bullish candles",
      "✓ Each candle opens within previous candle's body",
      "✓ Each candle closes at or near its high",
      "✓ Progressive higher closes",
      "✓ Relatively long bodies with small upper shadows"
    ],
    psychology: "Sustained buying pressure over three periods: Day 1: Bulls establish control, Day 2: Buying continues, Day 3: Bulls maintain dominance."
  },

  // === BEARISH PATTERNS ===
  'Shooting Star': {
    candles: [
      { open: 98, high: 115, low: 97, close: 99, isGreen: false }
    ],
    description: "Long upper shadow (2x+ body), small body at bottom, shows rejection of higher prices",
    recognitionTips: [
      "✓ Small body at the bottom of the trading range",
      "✓ Long upper shadow (at least 2x body size)",
      "✓ Little to no lower shadow", 
      "✓ Appears after an uptrend or at resistance",
      "✓ Body color doesn't matter (can be red or green)"
    ],
    psychology: "Bulls pushed prices significantly higher, but bears stepped in at those levels and rejected the advance, closing near the open."
  },

  'Bearish Engulfing': {
    candles: [
      { open: 98, high: 103, low: 97, close: 102, isGreen: true },
      { open: 104, high: 105, low: 92, close: 94, isGreen: false }
    ],
    description: "Large red candle completely engulfs the previous green candle's body",
    recognitionTips: [
      "✓ First candle: Small green/bullish candle",
      "✓ Second candle: Large red/bearish candle", 
      "✓ Second candle opens above first candle's close",
      "✓ Second candle completely engulfs first candle's body",
      "✓ Appears after an uptrend"
    ],
    psychology: "Day 1: Bulls maintain control but momentum weakening. Day 2: Bears overwhelm bulls completely with gap up then strong selling."
  },

  'Evening Star': {
    candles: [
      { open: 95, high: 105, low: 94, close: 104, isGreen: true },
      { open: 105, high: 107, low: 103, close: 104, isGreen: true },
      { open: 103, high: 105, low: 92, close: 94, isGreen: false }
    ],
    description: "Three-candle bearish reversal: large green, small star, large red",
    recognitionTips: [
      "✓ First candle: Large green/bullish candle",
      "✓ Second candle: Small-bodied 'star' (can be red or green)",
      "✓ Third candle: Large red/bearish candle",
      "✓ Third candle closes well into first candle's body",
      "✓ Star should gap up from first candle"
    ],
    psychology: "Day 1: Bulls in control. Day 2: Market shows uncertainty, momentum slows. Day 3: Bears take control with strong selling."
  },

  'Dark Cloud Cover': {
    candles: [
      { open: 95, high: 105, low: 94, close: 104, isGreen: true },
      { open: 106, high: 107, low: 96, close: 98, isGreen: false }
    ],
    description: "Red candle opens above green candle's high, closes below its midpoint",
    recognitionTips: [
      "✓ First candle: Green/bullish candle in uptrend",
      "✓ Second candle: Opens above first candle's high (gap up)",
      "✓ Second candle: Closes below midpoint of first candle's body",
      "✓ Deeper penetration = stronger bearish signal",
      "✓ Doesn't completely engulf first candle"
    ],
    psychology: "Optimism continues with gap up, but bears step in during session, selling pressure overcomes buying, closing in lower half."
  },

  'Three Black Crows': {
    candles: [
      { open: 110, high: 111, low: 103, close: 104, isGreen: false },
      { open: 105, high: 106, low: 98, close: 99, isGreen: false },
      { open: 100, high: 101, low: 93, close: 94, isGreen: false }
    ],
    description: "Three consecutive long red candles with progressive lower closes",
    recognitionTips: [
      "✓ Three consecutive long red/bearish candles",
      "✓ Each candle opens within previous candle's body",
      "✓ Each candle closes at or near its low",
      "✓ Progressive lower closes",
      "✓ Long bodies with small or no lower shadows"
    ],
    psychology: "Sustained selling pressure over three periods: Day 1: Bears establish control, Day 2: Selling continues, Day 3: Bears maintain dominance."
  },

  // === NEUTRAL/INDECISION PATTERNS ===
  'Doji': {
    candles: [
      { open: 100, high: 105, low: 95, close: 100, isGreen: false }
    ],
    description: "Open and close are equal or very close, showing market indecision",
    recognitionTips: [
      "✓ Open and close prices are equal (or nearly equal)",
      "✓ Can have long or short shadows",
      "✓ Body is essentially a thin line",
      "✓ Shows balance between buyers and sellers",
      "✓ Significance depends on context and location"
    ],
    psychology: "Perfect balance between buying and selling pressure. Neither bulls nor bears could gain control during the session."
  },

  'Spinning Top': {
    candles: [
      { open: 98, high: 105, low: 92, close: 102, isGreen: true }
    ],
    description: "Small body with long upper and lower shadows, showing indecision",
    recognitionTips: [
      "✓ Small real body (green or red)",
      "✓ Long upper and lower shadows",
      "✓ Shadows much longer than the body",
      "✓ Shows indecision and market uncertainty",
      "✓ Can appear at tops or bottoms"
    ],
    psychology: "High volatility during session with bulls and bears fighting, but neither side could maintain control, closing near open."
  },

  // === SPECIAL VARIATIONS ===
  'Dragonfly Doji': {
    candles: [
      { open: 100, high: 100, low: 85, close: 100, isGreen: false }
    ],
    description: "Doji with long lower shadow, no upper shadow - bullish at bottoms",
    recognitionTips: [
      "✓ Open and close are equal",
      "✓ Long lower shadow",
      "✓ No upper shadow (or very small)",
      "✓ Shows strong rejection of lower prices",
      "✓ Bullish when appears at support levels"
    ],
    psychology: "Bears pushed price significantly lower, but bulls stepped in strongly and pushed price back to opening level."
  },

  'Gravestone Doji': {
    candles: [
      { open: 100, high: 115, low: 100, close: 100, isGreen: false }
    ],
    description: "Doji with long upper shadow, no lower shadow - bearish at tops",
    recognitionTips: [
      "✓ Open and close are equal",
      "✓ Long upper shadow",
      "✓ No lower shadow (or very small)",
      "✓ Shows strong rejection of higher prices",
      "✓ Bearish when appears at resistance levels"
    ],
    psychology: "Bulls pushed price significantly higher, but bears stepped in strongly and pushed price back to opening level."
  },

  'Hanging Man': {
    candles: [
      { open: 110, high: 112, low: 95, close: 108, isGreen: false }
    ],
    description: "Hammer-shaped pattern at tops (bearish context) - potential exhaustion",
    recognitionTips: [
      "✓ Same shape as Hammer (long lower shadow, small body)",
      "✓ Appears after an uptrend (bearish context)",
      "✓ Small body at upper end of range",
      "✓ Long lower shadow",
      "✓ Shows potential trend exhaustion"
    ],
    psychology: "Despite uptrend, selling pressure emerged during session, creating long lower shadow - potential sign of exhaustion."
  },

  'Inverted Hammer': {
    candles: [
      { open: 90, high: 105, low: 89, close: 92, isGreen: true }
    ],
    description: "Shooting Star shape at bottoms (bullish context) - potential reversal",
    recognitionTips: [
      "✓ Same shape as Shooting Star (long upper shadow, small body)",
      "✓ Appears after a downtrend (bullish context)",
      "✓ Small body at lower end of range",
      "✓ Long upper shadow",
      "✓ Shows potential buying interest"
    ],
    psychology: "Despite downtrend, buying pressure emerged during session, creating long upper shadow - potential reversal signal."
  },

  // === COMPLEX MULTI-CANDLE PATTERNS ===
  'Bullish Harami': {
    candles: [
      { open: 110, high: 112, low: 95, close: 96, isGreen: false },
      { open: 100, high: 103, low: 98, close: 102, isGreen: true }
    ],
    description: "Small green candle contained within large red candle's body",
    recognitionTips: [
      "✓ First candle: Large red/bearish candle",
      "✓ Second candle: Small candle (any color)",
      "✓ Second candle completely contained within first candle's body",
      "✓ 'Harami' means pregnant in Japanese",
      "✓ Shows weakening selling pressure"
    ],
    psychology: "Large selling pressure followed by smaller range, showing bears losing momentum and potential reversal brewing."
  },

  'Bearish Harami': {
    candles: [
      { open: 85, high: 110, low: 84, close: 109, isGreen: true },
      { open: 105, high: 107, low: 102, close: 103, isGreen: false }
    ],
    description: "Small red candle contained within large green candle's body",
    recognitionTips: [
      "✓ First candle: Large green/bullish candle",
      "✓ Second candle: Small candle (any color)",
      "✓ Second candle completely contained within first candle's body",
      "✓ Shows weakening buying pressure",
      "✓ Potential trend change signal"
    ],
    psychology: "Large buying pressure followed by smaller range, showing bulls losing momentum and potential reversal brewing."
  },

  'Tweezer Tops': {
    candles: [
      { open: 95, high: 110, low: 94, close: 108, isGreen: true },
      { open: 107, high: 110, low: 102, close: 104, isGreen: false }
    ],
    description: "Two candles with same or nearly same highs - resistance level",
    recognitionTips: [
      "✓ Two or more candles with similar highs",
      "✓ Appears at market tops",
      "✓ Shows strong resistance at that level",
      "✓ Second candle often bearish",
      "✓ More significant with higher volume"
    ],
    psychology: "Price tested same high level twice and was rejected both times, showing strong resistance and potential reversal."
  },

  'Tweezer Bottoms': {
    candles: [
      { open: 105, high: 106, low: 90, close: 92, isGreen: false },
      { open: 93, high: 98, low: 90, close: 96, isGreen: true }
    ],
    description: "Two candles with same or nearly same lows - support level",
    recognitionTips: [
      "✓ Two or more candles with similar lows",
      "✓ Appears at market bottoms",
      "✓ Shows strong support at that level",
      "✓ Second candle often bullish",
      "✓ More significant with higher volume"
    ],
    psychology: "Price tested same low level twice and bounced both times, showing strong support and potential reversal."
  }
};

// Pattern recognition helper
export const getPatternKeyPoints = (patternName) => {
  const pattern = candlestickIllustrations[patternName];
  if (!pattern) return null;

  return {
    candles: pattern.candles,
    description: pattern.description,
    tips: pattern.recognitionTips,
    psychology: pattern.psychology,
    candleCount: pattern.candles.length,
    type: pattern.candles.length === 1 ? 'Single Candle' : 
          pattern.candles.length === 2 ? 'Two Candle' : 
          'Multi Candle'
  };
};