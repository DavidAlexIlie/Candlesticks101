// quizData.js - Quiz questions organized by topic
export const quizData = {
    basics: {
      title: 'Basics Quiz',
      questions: [
        {
          id: 1,
          question: "What are the three key principles of technical analysis?",
          options: [
            "Price discounts everything, prices move in trends, history repeats",
            "Buy low sell high, follow the crowd, ignore fundamentals",
            "Only trade stocks, avoid options, use stop losses",
            "Focus on volume, ignore price, follow news"
          ],
          correct: 0,
          explanation: "The three key principles are: 1) Price discounts everything (all information is reflected in price), 2) Prices move in trends, and 3) History tends to repeat itself due to human psychology."
        },
        {
          id: 2,
          question: "What does a green/bullish candlestick indicate?",
          options: [
            "Close price is lower than open price",
            "Close price is higher than open price", 
            "High volume trading occurred",
            "The stock will continue rising"
          ],
          correct: 1,
          explanation: "A green/bullish candlestick means the closing price was higher than the opening price, indicating buying pressure during that time period."
        },
        {
          id: 3,
          question: "What information does a candlestick NOT directly show?",
          options: [
            "Opening price",
            "Closing price",
            "Highest price",
            "Number of trades executed"
          ],
          correct: 3,
          explanation: "A candlestick shows open, high, low, and close prices, but does not directly show the number of individual trades executed during that period."
        },
        {
          id: 4,
          question: "What is a 'wick' or 'shadow' on a candlestick?",
          options: [
            "The thick body of the candle",
            "The thin lines extending from the body",
            "The color of the candlestick",
            "The trading volume indicator"
          ],
          correct: 1,
          explanation: "Wicks or shadows are the thin lines extending above and below the candlestick body, showing the highest and lowest prices reached during that period."
        },
        {
          id: 5,
          question: "In market psychology, what typically happens at market tops?",
          options: [
            "Fear and panic selling",
            "Euphoria and 'this time is different' mentality",
            "Rational decision making",
            "Low trading volume"
          ],
          correct: 1,
          explanation: "At market tops, emotions run high with euphoria, overconfidence, and the dangerous 'this time is different' mentality, often marking the end of bull runs."
        }
      ]
    },
    
    bullish: {
      title: 'Bullish Patterns Quiz',
      questions: [
        {
          id: 1,
          question: "What is the key characteristic of a Hammer pattern?",
          options: [
            "Long upper shadow, small body at top",
            "Long lower shadow, small body at upper end",
            "Large green body with no shadows",
            "Equal open and close prices"
          ],
          correct: 1,
          explanation: "A Hammer has a long lower shadow (at least 2x the body size) with a small body at the upper end of the trading range, showing rejection of lower prices."
        },
        {
          id: 2,
          question: "For a Bullish Engulfing pattern, what must the second candle do?",
          options: [
            "Close higher than the first candle's high",
            "Completely engulf the first candle's body",
            "Have higher volume than average",
            "Be twice the size of the first candle"
          ],
          correct: 1,
          explanation: "In a Bullish Engulfing pattern, the second (green) candle's body must completely engulf the first (red) candle's body, showing bulls overwhelming bears."
        },
        {
          id: 3,
          question: "How many candles make up a Morning Star pattern?",
          options: [
            "Two candles",
            "Three candles",
            "Four candles", 
            "Five candles"
          ],
          correct: 1,
          explanation: "Morning Star is a three-candle pattern: 1) Large red candle, 2) Small 'star' candle (showing indecision), 3) Large green candle closing well into the first candle's body."
        },
        {
          id: 4,
          question: "What does the 'star' represent in a Morning Star pattern?",
          options: [
            "Strong buying pressure",
            "Strong selling pressure",
            "Market indecision and potential trend change",
            "High trading volume"
          ],
          correct: 2,
          explanation: "The 'star' (middle candle) has a small body representing market indecision and weakening selling pressure, setting up for the bullish reversal."
        },
        {
          id: 5,
          question: "Three White Soldiers pattern shows:",
          options: [
            "Three consecutive red candles",
            "Three consecutive green candles with higher closes",
            "Three doji candles in a row",
            "Three spinning top candles"
          ],
          correct: 1,
          explanation: "Three White Soldiers consists of three consecutive green candles, each opening within the previous candle's body and closing progressively higher, showing strong bullish momentum."
        }
      ]
    },
  
    bearish: {
      title: 'Bearish Patterns Quiz', 
      questions: [
        {
          id: 1,
          question: "A Shooting Star pattern appears at:",
          options: [
            "Market bottoms after downtrends",
            "Market tops after uptrends", 
            "The middle of trading ranges",
            "Any point in the trend"
          ],
          correct: 1,
          explanation: "Shooting Star is a bearish reversal pattern that appears at market tops after uptrends, signaling potential trend change to the downside."
        },
        {
          id: 2,
          question: "What story does a Shooting Star's long upper shadow tell?",
          options: [
            "Buyers were in control all day",
            "Sellers dominated from the open",
            "Bulls pushed higher but bears rejected the advance",
            "No significant price movement occurred"
          ],
          correct: 2,
          explanation: "The long upper shadow shows bulls initially pushed prices higher, but bears stepped in at those levels and rejected the advance, pushing price back down near the open."
        },
        {
          id: 3,
          question: "In a Bearish Engulfing pattern, the second candle should:",
          options: [
            "Open below the first candle's close",
            "Open above the first candle's close and engulf it",
            "Have the same size as the first candle",
            "Show low trading volume"
          ],
          correct: 1,
          explanation: "The second (red) candle should open above the first candle's close (gap up showing optimism) but then completely engulf the first candle's body, showing bears overwhelming bulls."
        },
        {
          id: 4,
          question: "Evening Star pattern consists of:",
          options: [
            "Large green, small star, large red candle",
            "Large red, small star, large green candle",
            "Three equal-sized red candles",
            "Three doji candles"
          ],
          correct: 0,
          explanation: "Evening Star is: 1) Large green candle (uptrend continuation), 2) Small 'star' candle (indecision), 3) Large red candle (bears take control) - a bearish reversal pattern."
        },
        {
          id: 5,
          question: "Three Black Crows indicates:",
          options: [
            "Strong bullish continuation",
            "Market consolidation",
            "Strong bearish momentum over three periods",
            "High volatility with no direction"
          ],
          correct: 2,
          explanation: "Three Black Crows shows sustained selling pressure over three consecutive periods, with each candle opening within the previous body and closing progressively lower."
        }
      ]
    },
  
    technical: {
      title: 'Technical Indicators Quiz',
      questions: [
        {
          id: 1,
          question: "What does a Golden Cross represent?",
          options: [
            "50 MA crossing below 200 MA",
            "50 MA crossing above 200 MA",
            "Price crossing above resistance",
            "High trading volume"
          ],
          correct: 1,
          explanation: "A Golden Cross occurs when the 50-period moving average crosses above the 200-period moving average, typically considered a bullish long-term signal."
        },
        {
          id: 2,
          question: "RSI readings above 70 typically indicate:",
          options: [
            "Oversold conditions - time to buy",
            "Overbought conditions - potential sell signal",
            "Neutral market conditions",
            "High trading volume"
          ],
          correct: 1,
          explanation: "RSI above 70 indicates overbought conditions where recent gains outweigh losses, suggesting potential selling pressure or pullback ahead."
        },
        {
          id: 3,
          question: "MACD crossover signals occur when:",
          options: [
            "Price crosses above moving average",
            "MACD line crosses above/below the signal line",
            "RSI crosses 50 level",
            "Volume exceeds average"
          ],
          correct: 1,
          explanation: "MACD crossover signals happen when the MACD line crosses above (bullish) or below (bearish) the signal line, indicating potential momentum changes."
        },
        {
          id: 4,
          question: "Bollinger Bands expand when:",
          options: [
            "Volatility decreases",
            "Volatility increases",
            "Volume decreases",
            "Price trends sideways"
          ],
          correct: 1,
          explanation: "Bollinger Bands expand when volatility increases, as the bands are calculated using standard deviation which measures price volatility."
        },
        {
          id: 5,
          question: "A Bollinger Squeeze indicates:",
          options: [
            "High volatility period",
            "Low volatility before a potential breakout",
            "Strong trending market",
            "Market crash incoming"
          ],
          correct: 1,
          explanation: "A Bollinger Squeeze occurs when bands contract to very narrow width, indicating low volatility that often precedes significant price movements or breakouts."
        }
      ]
    },
  
    fundamental: {
      title: 'Fundamental Analysis Quiz',
      questions: [
        {
          id: 1,
          question: "What does P/E ratio measure?",
          options: [
            "Price relative to company's revenue",
            "Price relative to company's earnings per share",
            "Price relative to company's book value",
            "Price relative to company's cash flow"
          ],
          correct: 1,
          explanation: "P/E (Price-to-Earnings) ratio measures how much investors are willing to pay for each dollar of earnings, calculated as Stock Price ÷ Earnings Per Share."
        },
        {
          id: 2,
          question: "A company's Current Ratio measures:",
          options: [
            "Profitability compared to competitors",
            "Ability to pay short-term obligations",
            "Return on shareholder investment",
            "Revenue growth rate"
          ],
          correct: 1,
          explanation: "Current Ratio (Current Assets ÷ Current Liabilities) measures a company's ability to pay short-term obligations with short-term assets - a liquidity measure."
        },
        {
          id: 3,
          question: "Free Cash Flow is calculated as:",
          options: [
            "Revenue minus Expenses",
            "Net Income minus Taxes",
            "Operating Cash Flow minus Capital Expenditures",
            "Total Assets minus Total Liabilities"
          ],
          correct: 2,
          explanation: "Free Cash Flow = Operating Cash Flow - Capital Expenditures. It shows how much cash a company generates after investing in maintaining/growing its asset base."
        },
        {
          id: 4,
          question: "GDP (Gross Domestic Product) measures:",
          options: [
            "A company's total production",
            "Total value of goods and services produced in an economy",
            "Government spending only",
            "International trade balance"
          ],
          correct: 1,
          explanation: "GDP measures the total value of all goods and services produced within an economy during a specific period - the most comprehensive measure of economic activity."
        },
        {
          id: 5,
          question: "Which is considered a leading economic indicator?",
          options: [
            "Unemployment rate",
            "Corporate profits",
            "Building permits",
            "GDP growth"
          ],
          correct: 2,
          explanation: "Building permits are a leading indicator because they predict future economic activity (construction jobs, spending). Unemployment and corporate profits are lagging indicators."
        }
      ]
    }
  };