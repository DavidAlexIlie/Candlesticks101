// flashcardData.js - Flashcards for quick learning and review
export const flashcardData = {
    basics: {
      title: 'Basics Flashcards',
      cards: [
        {
          id: 1,
          front: "What are the 4 data points shown in a candlestick?",
          back: "Open, High, Low, Close (OHLC)\n\n• Open: Starting price\n• High: Highest price reached\n• Low: Lowest price reached\n• Close: Ending price"
        },
        {
          id: 2,
          front: "What do green vs red candlesticks represent?",
          back: "Green (bullish): Close > Open\nRed (bearish): Close < Open\n\nGreen = buyers won the battle\nRed = sellers won the battle"
        },
        {
          id: 3,
          front: "What are wicks/shadows?",
          back: "Thin lines extending from candlestick body\n\n• Upper wick: Shows rejection of higher prices\n• Lower wick: Shows rejection of lower prices\n• Long wicks = strong rejection"
        },
        {
          id: 4,
          front: "What is Support?",
          back: "Price level where downtrend pauses/reverses\n\n• Buyers step in at this level\n• Acts like a 'floor' for price\n• Multiple touches make it stronger\n• Break below = bearish signal"
        },
        {
          id: 5,
          front: "What is Resistance?",
          back: "Price level where uptrend pauses/reverses\n\n• Sellers step in at this level\n• Acts like a 'ceiling' for price\n• Multiple touches make it stronger\n• Break above = bullish signal"
        },
        {
          id: 6,
          front: "What drives market psychology?",
          back: "Fear and Greed cycle:\n\n📈 Greed: Optimism → Excitement → Euphoria\n📉 Fear: Anxiety → Panic → Desperation\n🔄 Then Hope → Relief → Back to Optimism"
        },
        {
          id: 7,
          front: "What is Volume?",
          back: "Number of shares traded in a time period\n\n• High volume = Strong conviction\n• Low volume = Weak moves\n• Volume confirms price movements\n• 'Volume precedes price'"
        },
        {
          id: 8,
          front: "Define Trend",
          back: "General direction of price movement\n\n📈 Uptrend: Higher highs + higher lows\n📉 Downtrend: Lower highs + lower lows\n➡️ Sideways: Range-bound movement"
        }
      ]
    },
  
    bullish: {
      title: 'Bullish Patterns Flashcards',
      cards: [
        {
          id: 1,
          front: "Hammer Pattern",
          back: "🔨 Bullish Reversal at Bottoms\n\n• Small body at top of range\n• Long lower shadow (2x+ body)\n• Little/no upper shadow\n• Shows rejection of lower prices\n• Wait for confirmation"
        },
        {
          id: 2,
          front: "Bullish Engulfing",
          back: "🟢 Two-Candle Bullish Reversal\n\nDay 1: Small red candle\nDay 2: Large green candle that completely engulfs first\n\n• Bulls overwhelm bears\n• Higher volume increases reliability"
        },
        {
          id: 3,
          front: "Morning Star",
          back: "⭐ Three-Candle Bullish Reversal\n\n1. Large red candle\n2. Small 'star' candle (indecision)\n3. Large green candle\n\n• Often marks important bottoms\n• Third candle closes into first candle's body"
        },
        {
          id: 4,
          front: "Piercing Pattern",
          back: "🗡️ Two-Candle Bullish Reversal\n\nDay 1: Large red candle\nDay 2: Green candle that:\n• Gaps down on open\n• Closes above midpoint of first candle\n• Doesn't completely engulf (vs Bullish Engulfing)"
        },
        {
          id: 5,
          front: "Three White Soldiers",
          back: "👥 Strong Bullish Continuation\n\n• Three consecutive green candles\n• Each opens within previous body\n• Each closes at/near highs\n• Shows sustained buying pressure\n• Very reliable pattern"
        },
        {
          id: 6,
          front: "Inverted Hammer",
          back: "🔨⬆️ Bullish Reversal (at tops)\n\n• Small body at bottom\n• Long upper shadow\n• Appears after downtrend\n• Same shape as Shooting Star but bullish context\n• Needs confirmation"
        },
        {
          id: 7,
          front: "Dragonfly Doji",
          back: "🐉 Bullish Reversal Doji\n\n• Open = Close (or very close)\n• Long lower shadow\n• No/minimal upper shadow\n• Shows strong rejection of lows\n• Powerful at support levels"
        },
        {
          id: 8,
          front: "Bullish Harami",
          back: "🤰 Bullish Reversal Pattern\n\n• Large red candle followed by small candle\n• Second candle contained within first's body\n• 'Harami' = pregnant in Japanese\n• Shows weakening selling pressure"
        }
      ]
    },
  
    bearish: {
      title: 'Bearish Patterns Flashcards',
      cards: [
        {
          id: 1,
          front: "Shooting Star",
          back: "🌠 Bearish Reversal at Tops\n\n• Small body at bottom of range\n• Long upper shadow (2x+ body)\n• Little/no lower shadow\n• Shows rejection of higher prices\n• Appears after uptrends"
        },
        {
          id: 2,
          front: "Bearish Engulfing",
          back: "🔴 Two-Candle Bearish Reversal\n\nDay 1: Small green candle\nDay 2: Large red candle that completely engulfs first\n\n• Bears overwhelm bulls\n• Often gaps up before selling"
        },
        {
          id: 3,
          front: "Evening Star",
          back: "🌟 Three-Candle Bearish Reversal\n\n1. Large green candle\n2. Small 'star' candle (indecision)\n3. Large red candle\n\n• Often marks important tops\n• Third candle closes into first candle's body"
        },
        {
          id: 4,
          front: "Dark Cloud Cover",
          back: "☁️ Two-Candle Bearish Reversal\n\nDay 1: Green candle in uptrend\nDay 2: Red candle that:\n• Opens above first candle's high\n• Closes below midpoint of first candle\n• 'Clouds' the previous bullish sentiment"
        },
        {
          id: 5,
          front: "Three Black Crows",
          back: "🐦‍⬛ Strong Bearish Reversal\n\n• Three consecutive red candles\n• Each opens within previous body\n• Each closes at/near lows\n• Shows sustained selling pressure\n• Very reliable pattern"
        },
        {
          id: 6,
          front: "Hanging Man",
          back: "🪓 Bearish Reversal (at tops)\n\n• Small body at top\n• Long lower shadow\n• Appears after uptrend\n• Same shape as Hammer but bearish context\n• Shows potential exhaustion"
        },
        {
          id: 7,
          front: "Gravestone Doji",
          back: "🪦 Bearish Reversal Doji\n\n• Open = Close (or very close)\n• Long upper shadow\n• No/minimal lower shadow\n• Shows strong rejection of highs\n• Powerful at resistance levels"
        },
        {
          id: 8,
          front: "Bearish Harami",
          back: "🤰 Bearish Reversal Pattern\n\n• Large green candle followed by small candle\n• Second candle contained within first's body\n• Shows weakening buying pressure\n• Often leads to trend change"
        }
      ]
    },
  
    technical: {
      title: 'Technical Indicators Flashcards',
      cards: [
        {
          id: 1,
          front: "Moving Average (MA)",
          back: "📈 Trend Following Indicator\n\n• SMA: Simple average of N periods\n• EMA: Exponential (more recent weight)\n• Common: 20, 50, 200 periods\n• Price above MA = Uptrend\n• Golden Cross: 50 > 200 MA"
        },
        {
          id: 2,
          front: "RSI (Relative Strength Index)",
          back: "⚖️ Momentum Oscillator (0-100)\n\n• >70 = Overbought (potential sell)\n• <30 = Oversold (potential buy)\n• 50 = Equilibrium\n• Look for divergences\n• Default period: 14"
        },
        {
          id: 3,
          front: "MACD",
          back: "📊 Moving Average Convergence Divergence\n\n• MACD Line: 12 EMA - 26 EMA\n• Signal Line: 9 EMA of MACD\n• Histogram: MACD - Signal\n• Crossovers = Buy/Sell signals\n• Zero line = Trend changes"
        },
        {
          id: 4,
          front: "Bollinger Bands",
          back: "📏 Volatility Bands\n\n• Middle: 20 SMA\n• Upper/Lower: ±2 Standard Deviations\n• Squeeze = Low volatility → Breakout\n• Band walking = Strong trend\n• 95% of prices stay within bands"
        },
        {
          id: 5,
          front: "Stochastic Oscillator",
          back: "🎯 Momentum Indicator (0-100)\n\n• %K = Fast line\n• %D = Slow line (3-period MA of %K)\n• >80 = Overbought\n• <20 = Oversold\n• Crossovers in extreme zones = Signals"
        },
        {
          id: 6,
          front: "Volume",
          back: "📊 Confirms Price Movements\n\n• High volume = Strong moves\n• Low volume = Weak moves\n• Volume leads price\n• Breakouts need volume confirmation\n• Divergence = Warning signal"
        },
        {
          id: 7,
          front: "Support & Resistance",
          back: "🏗️ Key Price Levels\n\n• Support: Floor (buyers step in)\n• Resistance: Ceiling (sellers step in)\n• Multiple touches = Stronger level\n• Break = Role reversal\n• Round numbers often act as levels"
        },
        {
          id: 8,
          front: "Fibonacci Retracements",
          back: "🌀 Natural Ratio Levels\n\n• 23.6%, 38.2%, 50%, 61.8%, 78.6%\n• Measure pullbacks in trends\n• 61.8% = Golden ratio\n• Extensions: 127.2%, 161.8%\n• Confluence with other levels = Stronger"
        }
      ]
    },
  
    fundamental: {
      title: 'Fundamental Analysis Flashcards',
      cards: [
        {
          id: 1,
          front: "P/E Ratio",
          back: "💰 Price-to-Earnings Ratio\n\n• Formula: Stock Price ÷ EPS\n• Shows what investors pay per $1 of earnings\n• Higher P/E = Higher growth expectations\n• Compare to industry average\n• Forward P/E uses projected earnings"
        },
        {
          id: 2,
          front: "Current Ratio",
          back: "💧 Liquidity Measure\n\n• Formula: Current Assets ÷ Current Liabilities\n• Measures ability to pay short-term debts\n• >1.0 = Good liquidity\n• Too high = Inefficient cash use\n• Industry context matters"
        },
        {
          id: 3,
          front: "ROE (Return on Equity)",
          back: "📊 Profitability Measure\n\n• Formula: Net Income ÷ Shareholders' Equity\n• Shows efficiency of using shareholder money\n• Higher ROE = Better performance\n• Compare to peers\n• Look for consistency"
        },
        {
          id: 4,
          front: "Free Cash Flow",
          back: "💵 Real Cash Generation\n\n• Formula: Operating Cash Flow - CapEx\n• Shows actual cash after investments\n• More reliable than net income\n• Supports dividends and growth\n• Key for valuation models"
        },
        {
          id: 5,
          front: "GDP (Gross Domestic Product)",
          back: "🏛️ Economic Health Measure\n\n• Total value of goods/services produced\n• Growth rate shows economic expansion\n• Components: C + I + G + (X-M)\n• Leading indicator for markets\n• Released quarterly"
        },
        {
          id: 6,
          front: "Interest Rates",
          back: "💸 Cost of Money\n\n• Fed Funds Rate: Central bank policy tool\n• Higher rates = Stronger currency, lower stocks\n• Lower rates = Stimulus for economy\n• Affects borrowing costs\n• Yield curve shows expectations"
        },
        {
          id: 7,
          front: "Inflation (CPI)",
          back: "📈 Price Level Changes\n\n• Consumer Price Index measures price changes\n• Core CPI excludes food/energy\n• Fed targets 2% annual inflation\n• High inflation = Rate hikes likely\n• Affects purchasing power"
        },
        {
          id: 8,
          front: "Debt-to-Equity Ratio",
          back: "⚠️ Financial Leverage\n\n• Formula: Total Debt ÷ Total Equity\n• Measures financial risk\n• Higher ratio = More leverage\n• Industry comparison important\n• Consider ability to service debt"
        }
      ]
    }
  };