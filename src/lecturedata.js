// Enhanced lecturedata.js - 3 lectures per category with focused content
export const lectureData = {
    categories: {
      "basics": {
        title: "Trading Basics", 
        colorTheme: "cyan-blue",
        icon: "📚",
        lectures: [
          {
            id: "technical_analysis_intro",
            title: "What is Technical Analysis?",
            subtitle: "Tap to read",
            hasIllustration: false,
            encryptedContent: `!h1"What is Technical Analysis?"
  !tldr"Technical analysis studies price movements and volume to predict future market directions. It assumes all market information is already reflected in the current price."
  !difficulty"Beginner"
  !time"8 min read"
  !h2"The Foundation of Chart Trading"
  !p"Technical analysis is the study of market action, primarily through the use of charts, for the purpose of forecasting future price trends. Unlike fundamental analysis, technical analysis believes that all relevant information is already priced into the market."
  !expand_start"Core Principles"
  !h3"1. Price Discounts Everything"
  !p"Every factor that affects price - economic, political, psychological - is already reflected in the market price."
  !h3"2. Price Moves in Trends"
  !p"Markets don't move randomly. Once a trend is established, it's more likely to continue than to reverse."
  !h3"3. History Repeats Itself"
  !p"Human emotions drive market behavior, creating predictable patterns that repeat over time."
  !expand_end
  !h2"Why Technical Analysis Works"
  !p"Markets are driven by two primary emotions: fear and greed. These emotions create predictable patterns that repeat over time, making technical analysis effective. When enough traders use the same signals, their collective actions create the predicted price movements."
  !expand_start"Types of Charts"
  !h3"Candlestick Charts"
  !p"Show open, high, low, close with visual body representation. Most popular among traders."
  !h3"Line Charts"
  !p"Show closing prices only. Simple but limited information."
  !h3"Bar Charts"
  !p"Show OHLC data but less visual than candlesticks."
  !expand_end
  !warning"Technical analysis provides probabilities, not certainties. Always use proper risk management."`
          },
          {
            id: "market_structure",
            title: "Understanding Market Structure",
            subtitle: "Tap to read", 
            hasIllustration: false,
            encryptedContent: `!h1"Understanding Market Structure"
  !tldr"Market structure shows how price moves in trends, creating higher highs/lows in uptrends and lower highs/lows in downtrends. Essential for timing trades."
  !difficulty"Beginner"
  !time"10 min read"
  !h2"How Markets Move"
  !p"Every market moves in a structured way, creating patterns that help traders identify the current trend and potential reversal points. This structure is based on support and resistance levels."
  !h2"Trend Types"
  !p"Markets can only do three things: go up, go down, or move sideways. Understanding which phase you're in is crucial for successful trading."
  !expand_start"Uptrend Structure"
  !h3"Key Features"
  !list"Higher Highs: Each peak is higher than the previous|Higher Lows: Each valley is higher than the previous|Rising trendline connects the lows|Buyers are in control"
  !expand_end
  !expand_start"Downtrend Structure"
  !h3"Key Features"  
  !list"Lower Highs: Each peak is lower than the previous|Lower Lows: Each valley is lower than the previous|Falling trendline connects the highs|Sellers are in control"
  !expand_end
  !h2"Support and Resistance"
  !p"Support is like a floor that price bounces off. Resistance is like a ceiling that prevents price from going higher. When these levels break, they often switch roles - old support becomes new resistance and vice versa."
  !tip"The trend is your friend until it ends. Always trade in the direction of the established trend."
  !warning"Never fight the overall market structure. If the major trend is down, focus on short trades during rallies."`
          },
          {
            id: "risk_management_basics",
            title: "Risk Management Fundamentals",
            subtitle: "Tap to read",
            hasIllustration: false,
            encryptedContent: `!h1"Risk Management Fundamentals"
  !tldr"Risk management is more important than picking winning trades. The 1% rule, position sizing, and stop losses protect your capital and ensure long-term success."
  !difficulty"Beginner"
  !time"12 min read"
  !h2"The Most Important Trading Skill"
  !p"Risk management separates profitable traders from those who blow up their accounts. You can be wrong on 60% of your trades and still be profitable with proper risk management."
  !expand_start"The 1% Rule"
  !h3"Core Principle"
  !p"Never risk more than 1-2% of your total trading capital on any single trade. This ensures that even a string of losses won't destroy your account."
  !h3"Example"
  !p"$10,000 account = maximum $100-200 risk per trade. If your stop loss is hit, you lose no more than this amount."
  !expand_end
  !h2"Position Sizing Formula"
  !p"Position Size = Account Risk ÷ (Entry Price - Stop Loss Price). This formula ensures you never exceed your risk limit, regardless of how far your stop loss is from your entry."
  !h2"Stop Loss Strategies"
  !p"Technical stops work best - place them below support for long trades and above resistance for short trades. Percentage stops are simple but ignore market structure."
  !expand_start"Risk-Reward Ratios"
  !h3"Minimum 1:2 Ratio"
  !p"For every $1 you risk, aim to make at least $2. This allows you to be profitable even with a 40% win rate."
  !h3"Trade Management"
  !p"Move stop to breakeven when trade reaches 1:1. Consider taking partial profits and let winners run to full targets."
  !expand_end
  !warning"Without proper risk management, even the best trading strategy will eventually fail. Protect your capital first, profits second."`
          },
          {
            id: "support_resistance",
            title: "Support & Resistance", 
            subtitle: "Tap to read",
            hasIllustration: false,
            encryptedContent: `!h1"Support and Resistance Levels"
  !tldr"Support acts as a floor preventing further decline, resistance acts as a ceiling preventing further advance. These levels become self-fulfilling as traders watch them."
  !difficulty"Beginner"
  !time"9 min read"
  !h2"The Foundation of Price Action"
  !p"Support and resistance are the most fundamental concepts in technical analysis. They represent psychological price levels where buying and selling interest creates significant activity."
  !expand_start"Understanding Support"
  !h3"What is Support?"
  !list"Price level where buying interest emerges|Acts as a 'floor' for falling prices|Previous lows often become support|Round numbers (100, 50) act as support"
  !h3"Types of Support"
  !list"Horizontal: Previous lows and reaction lows|Trend line: Rising line connecting higher lows|Moving averages: Dynamic support levels|Psychological: Round numbers, previous highs"
  !expand_end
  !h2"Understanding Resistance" 
  !p"Resistance works opposite to support - it's where selling interest emerges to prevent further price advances. Previous highs, trend lines, and psychological levels all act as resistance."
  !expand_start"Key Principles"
  !h3"Role Reversal"
  !list"Broken support becomes resistance|Broken resistance becomes support|The more times tested, the stronger|Volume confirms breaks"
  !h3"Multiple Touches"
  !list"Each test makes level stronger|Third touch often breaks|False breaks are common|Wait for confirmation"
  !expand_end
  !h2"Trading Support and Resistance"
  !p"Buy near support with stops below. Sell near resistance with stops above. When levels break decisively with volume, they often become the opposite - old support becomes new resistance."
  !tip"The more times a level is tested, the more significant it becomes."
  !warning"False breakouts are common. Always wait for confirmation with volume and follow-through."`
          },
          {
            id: "chart_patterns_intro", 
            title: "Chart Patterns Basics",
            subtitle: "Tap to read",
            hasIllustration: false,
            encryptedContent: `!h1"Introduction to Chart Patterns"
  !tldr"Chart patterns are formations created by price movements that tend to repeat and provide predictable outcomes. They reflect market psychology and help predict future direction."
  !difficulty"Intermediate" 
  !time"11 min read"
  !h2"The Language of Charts"
  !p"Chart patterns are visual representations of market psychology. They show the battle between buyers and sellers, and often predict which side will win the next round."
  !expand_start"Pattern Categories"
  !h3"Continuation Patterns"
  !list"Flags: Brief pauses in strong trends|Pennants: Small triangular consolidations|Rectangles: Sideways trading ranges|Wedges: Narrowing price ranges"
  !h3"Reversal Patterns"
  !list"Head and Shoulders: Three-peak reversal|Double Tops/Bottoms: Two-peak reversal|Triangles: Narrowing price action|Cup and Handle: Rounded bottom formation"
  !expand_end
  !h2"Pattern Recognition"
  !p"Look for clear structure with defined boundaries. Volume often decreases during pattern formation and increases on breakout. The longer the pattern takes to form, the more significant the eventual move."
  !h2"Trading Chart Patterns"
  !p"Enter on confirmed breakouts with volume. Measure the pattern height to estimate price targets. Place stops inside the pattern to limit risk if the breakout fails."
  !expand_start"Success Factors"
  !h3"What Makes Patterns Reliable"
  !list"Clear, well-defined boundaries|Volume decreases during formation|Strong volume on breakout|Longer formation = bigger move|Appears after significant trend"
  !expand_end
  !tip"Always wait for volume confirmation on breakouts - many false breakouts occur without volume."
  !warning"Not all patterns complete successfully. Always use stop losses and proper risk management."`
          },
          {
            id: "psychology_trading",
            title: "Trading Psychology", 
            subtitle: "Tap to read",
            hasIllustration: false,
            encryptedContent: `!h1"Trading Psychology Fundamentals"
  !tldr"Emotions are the biggest enemy of successful trading. Fear, greed, hope, and revenge trading destroy more accounts than bad strategies. Master your mind first."
  !difficulty"Intermediate"
  !time"13 min read"
  !h2"The Mental Game"
  !p"Trading is 80% psychology and 20% strategy. You can have the best system in the world, but if you can't control your emotions, you'll lose money consistently."
  !expand_start"The Four Enemies"
  !h3"Fear"
  !list"Fear of losing money|Fear of missing out (FOMO)|Fear of being wrong|Causes early exits and missed opportunities"
  !h3"Greed" 
  !list"Taking excessive risk for bigger profits|Not taking profits when targets hit|Overleveraging positions|Leads to blown accounts"
  !h3"Hope"
  !list"Hoping losing trades will turn around|Not cutting losses when stops hit|Adding to losing positions|Turns small losses into big ones"
  !h3"Revenge Trading"
  !list"Trading to 'get back' at the market|Increasing size after losses|Abandoning strategy after bad trades|Guaranteed way to lose everything"
  !expand_end
  !h2"Building Mental Discipline"
  !p"Follow your trading plan religiously. Keep a trading journal to identify emotional patterns. Take breaks after big losses. Remember that losing is part of trading - focus on the process, not individual trades."
  !expand_start"Practical Solutions"
  !h3"Risk Management"
  !list"Never risk more than you can afford to lose|Use position sizing to control emotions|Set stops before entering trades|Take partial profits to reduce stress"
  !h3"Mental Preparation"
  !list"Accept that losses are normal|Focus on long-term performance|Develop pre-market routines|Practice meditation or mindfulness"
  !expand_end
  !warning"Your biggest enemy in trading is yourself. Master your emotions or they will master your account."`
          }
        ]
      },
      "bullish_patterns": {
        title: "Bullish Candlesticks",
        colorTheme: "green-blue",
        icon: "📈",
        lectures: [
          {
            id: "hammer_pattern",
            title: "Hammer Pattern",
            subtitle: "Tap to read",
            hasIllustration: true,
            illustrationType: "candlestick",
            candlestickData: {
              candles: [{open: 102, close: 104, high: 105, low: 96, x: 200}],
              
              animationSteps: ["Market opens, bears push down", "Price reaches session low", "Bulls step in strongly", "Hammer complete - bullish signal"]
            },
            encryptedContent: `!h1"The Hammer Pattern"
  !tldr"Single candle with long lower shadow at downtrend bottom. Shows buyers stepping in at lower prices, signaling potential bullish reversal."
  !difficulty"Beginner"
  !time"6 min read"
  !h2"Anatomy of a Hammer"
  !p"The hammer gets its name from its appearance - a small body with a long handle. It's one of the most reliable single-candle reversal patterns when it appears after a decline."
  !expand_start"Pattern Requirements"
  !h3"Visual Characteristics"
  !list"Small real body (can be green or red)|Long lower shadow (at least 2x body size)|Little to no upper shadow|Must appear after a downtrend"
  !expand_end
  !h2"The Story Behind the Pattern"
  !p"The market opens and immediately sells off, continuing the downtrend. Bears push price significantly lower during the session, but then buyers step in aggressively, driving price back up near the opening level."
  !h2"Trading the Hammer"
  !p"Conservative traders wait for bullish confirmation the next day. Aggressive traders buy above the hammer's high. Always place stop loss below the hammer's low to limit risk."
  !expand_start"Key Success Factors"
  !h3"What Makes It Stronger"
  !list"Longer lower shadow relative to body|Higher volume on the hammer day|Appears at significant support levels|Follows extended downtrend"
  !expand_end
  !tip"The longer the lower shadow, the more bullish the signal becomes."
  !warning"Always wait for confirmation. A single hammer doesn't guarantee reversal - look for follow-through buying."`
          },
          {
            id: "bullish_engulfing",
            title: "Bullish Engulfing",
            subtitle: "Tap to read",
            hasIllustration: true,
            illustrationType: "candlestick",
            candlestickData: {
              candles: [
                {open: 102, close: 98, high: 103, low: 97, x: 180},
                {open: 97, close: 106, high: 107, low: 96, x: 220}
              ],
              labels: {pattern: "Bullish Engulfing", description: "Large green candle engulfs previous red"},
              animationSteps: ["Day 1: Bears maintain control", "Day 2: Bulls overwhelm bears", "Complete engulfment shown", "Strong bullish reversal signal"]
            },
            encryptedContent: `!h1"Bullish Engulfing Pattern"
  !tldr"Two-candle pattern where large green candle completely engulfs previous red candle. Shows dramatic shift from selling to buying pressure."
  !difficulty"Beginner"
  !time"8 min read"
  !h2"Complete Market Reversal"
  !p"The bullish engulfing pattern shows a complete change in market sentiment from bearish to bullish in just two trading sessions. It's one of the strongest reversal signals when properly formed."
  !h2"Pattern Formation"
  !p"Day 1: Bears are in control, price closes lower continuing the downtrend. Day 2: Market opens with continued selling but buyers quickly overwhelm sellers, driving price significantly higher and completely engulfing the previous day's body."
  !expand_start"Pattern Requirements"
  !h3"First Candle"
  !list"Must be bearish (red)|Part of existing downtrend|Shows continued selling pressure|Can be any size"
  !h3"Second Candle"
  !list"Must be bullish (green)|Opens at or below previous close|Body completely engulfs first candle|Closes well above previous open"
  !expand_end
  !h2"Trading Strategy"
  !p"Enter long when the engulfing candle closes or on a break above its high. Place stop loss below the low of the engulfing candle. Target previous resistance levels or use 1:2 risk-reward ratio."
  !expand_start"Reliability Factors"
  !h3"Stronger Signals"
  !list"Larger size difference between candles|Higher volume on engulfing day|Appears at major support levels|Follows extended downtrend|Gap down opening strengthens pattern"
  !expand_end
  !warning"Beware of false signals in choppy, sideways markets. Engulfing patterns work best after clear trends."`
          },
          {
            id: "morning_star",
            title: "Morning Star",
            subtitle: "Tap to read",
            hasIllustration: true,
            illustrationType: "candlestick",
            candlestickData: {
              candles: [
                {open: 105, close: 98, high: 106, low: 97, x: 160},
                {open: 96, close: 97, high: 99, low: 94, x: 200},
                {open: 98, close: 108, high: 109, low: 97, x: 240}
              ],
              labels: {pattern: "Morning Star", description: "Three-candle bullish reversal pattern"},
              animationSteps: ["Day 1: Bears dominate with strong selling", "Day 2: Market shows indecision, gap down", "Day 3: Bulls take control with strong buying", "Pattern complete - strong reversal signal"]
            },
            encryptedContent: `!h1"Morning Star Pattern"
  !tldr"Three-candle bullish reversal featuring large red candle, small indecision candle (star), and large green confirmation candle. Marks major bottoms."
  !difficulty"Intermediate"
  !time"10 min read"
  !h2"The Dawn of a New Trend"
  !p"Like the morning star (Venus) that appears before dawn, this pattern often signals the end of a dark period for prices and the beginning of a new uptrend."
  !expand_start"Three-Candle Structure"
  !h3"First Candle: Continued Decline"
  !list"Large bearish candle|Continuation of downtrend|Strong selling pressure|Bears firmly in control"
  !h3"Second Candle: The Star"
  !list"Small-bodied candle|Gaps down from first candle|Shows market indecision|Can be doji, spinning top, or small candle"
  !h3"Third Candle: The Confirmation"
  !list"Large bullish candle|Closes well into first candle's body|Confirms reversal|Strong buying pressure"
  !expand_end
  !h2"Market Psychology"
  !p"Day 1: Bears dominate with heavy selling. Day 2: Market shows uncertainty, selling pressure weakens. Day 3: Bulls finally step in with conviction, overwhelming remaining sellers."
  !h2"Trading the Pattern"
  !p"Enter long when the third candle closes or wait for additional confirmation. Place stop loss below the star (second candle) low. Target 50% retracement of recent decline or previous resistance levels."
  !expand_start"Ideal Volume Pattern"
  !h3"Volume Confirmation"
  !list"High volume on first candle (selling climax)|Low volume on star (indecision)|High volume on third candle (buying conviction)"
  !expand_end
  !tip"The gap between candles strengthens the signal, showing rejection of lower prices."
  !warning"Wait for the pattern to complete before trading. Many traders enter too early and get stopped out."`
          },
          {
            id: "doji_patterns",
            title: "Doji Patterns",
            subtitle: "Tap to read",
            hasIllustration: true,
            illustrationType: "candlestick",
            candlestickData: {
              candles: [{open: 100, close: 100, high: 105, low: 95, x: 200}],
              animationSteps: ["Market opens with uncertainty", "Bulls and bears battle evenly", "Indecision creates long wicks", "Doji complete - potential reversal"]
            },
            encryptedContent: `!h1"Doji Candlestick Patterns"
  !tldr"Doji candles have virtually no body, showing indecision between buyers and sellers. They often signal potential reversals, especially at key levels."
  !difficulty"Beginner"
  !time"7 min read"
  !h2"The Indecision Candle"
  !p"A doji occurs when a market opens and closes at virtually the same price, creating a candle with no real body. This shows perfect balance between buying and selling pressure."
  !expand_start"Types of Doji"
  !h3"Standard Doji"
  !list"Equal upper and lower shadows|Perfect indecision|Most common type|Signals potential reversal"
  !h3"Gravestone Doji"
  !list"Long upper shadow, no lower shadow|Bearish at tops|Shows rejection of higher prices|Strong reversal signal"
  !h3"Dragonfly Doji"
  !list"Long lower shadow, no upper shadow|Bullish at bottoms|Shows rejection of lower prices|Strong reversal signal"
  !h3"Long-Legged Doji"
  !list"Very long shadows on both sides|Extreme indecision|High volatility during session|Powerful reversal signal"
  !expand_end
  !h2"Trading Doji Patterns"
  !p"Doji are most powerful at key support or resistance levels. Wait for confirmation the next day before trading. A doji after a long trend is more significant than one in a sideways market."
  !expand_start"Context Matters"
  !h3"Bullish Context"
  !list"Appears at support levels|After extended downtrends|Following oversold conditions|Look for bullish confirmation"
  !h3"Bearish Context"
  !list"Appears at resistance levels|After extended uptrends|Following overbought conditions|Look for bearish confirmation"
  !expand_end
  !tip"The longer the shadows relative to recent candles, the more significant the doji becomes."
  !warning"Doji in the middle of trends are less reliable. Focus on doji at key turning points."`
          },
          {
            id: "piercing_pattern",
            title: "Piercing Pattern",
            subtitle: "Tap to read", 
            hasIllustration: true,
            illustrationType: "candlestick",
            candlestickData: {
              candles: [
                {open: 105, close: 98, high: 106, low: 97, x: 180},
                {open: 96, close: 103, high: 104, low: 95, x: 220}
              ],
              labels: {pattern: "Piercing Pattern", description: "Green candle pierces into red candle body"},
              animationSteps: ["Day 1: Bears maintain selling pressure", "Day 2: Bulls step in aggressively", "Green candle pierces red body", "Bullish reversal signal confirmed"]
            },
            encryptedContent: `!h1"The Piercing Pattern"
  !tldr"Two-candle bullish reversal where second green candle opens below previous close but closes above midpoint of red candle's body."
  !difficulty"Intermediate"
  !time"8 min read"
  !h2"Piercing Through the Darkness"
  !p"The piercing pattern shows buyers stepping in during apparent weakness. The second candle 'pierces' into the first candle's body, showing a shift from selling to buying pressure."
  !expand_start"Pattern Requirements"
  !h3"First Candle"
  !list"Must be bearish (red)|Part of existing downtrend|Shows continued selling pressure|Should be significant sized body"
  !h3"Second Candle"
  !list"Must be bullish (green)|Opens below previous close (gap down)|Closes above midpoint of first candle|Higher volume strengthens signal"
  !expand_end
  !h2"The 50% Rule"
  !p"For a true piercing pattern, the second candle must close above the midpoint (50%) of the first candle's body. The deeper the penetration, the more bullish the signal becomes."
  !h2"Trading Strategy"
  !p"Enter long when the piercing candle closes or on a break above its high. Place stop loss below the low of the piercing candle. Target previous resistance or measured moves."
  !expand_start"Reliability Factors"
  !h3"Stronger Signals"
  !list"Deeper penetration (70%+ better than 50%)|Gap down opening followed by strong close|Higher volume on second day|Appears at significant support levels"
  !expand_end
  !tip"The piercing pattern is more reliable when it appears after an extended downtrend rather than in choppy markets."
  !warning"Watch for follow-through buying the next day. Without confirmation, the pattern may fail."`
          },
          {
            id: "three_white_soldiers",
            title: "Three White Soldiers",
            subtitle: "Tap to read",
            hasIllustration: true, 
            illustrationType: "candlestick",
            candlestickData: {
              candles: [
                {open: 95, close: 102, high: 103, low: 94, x: 160},
                {open: 101, close: 108, high: 109, low: 100, x: 200}, 
                {open: 107, close: 115, high: 116, low: 106, x: 240}
              ],
              labels: {pattern: "Three White Soldiers", description: "Three consecutive bullish candles marching higher"},
              animationSteps: ["Day 1: Bulls establish control", "Day 2: Continued buying pressure", "Day 3: Strong bullish momentum", "Pattern complete - uptrend confirmed"]
            },
            encryptedContent: `!h1"Three White Soldiers Pattern"
  !tldr"Three consecutive long green candles with small wicks, each closing near its high. Shows strong, sustained buying pressure and bullish momentum."
  !difficulty"Intermediate"
  !time"9 min read"
  !h2"The Army of Bulls"
  !p"Three white soldiers represent an army of buyers marching steadily higher. This powerful bullish pattern shows three consecutive days of strong buying pressure with minimal selling."
  !expand_start"Pattern Characteristics"
  !h3"Candle Requirements"
  !list"Three consecutive long green candles|Each closes at or near its high|Small upper and lower shadows|Each opens within previous candle's body"
  !h3"Progression"
  !list"First soldier: Bulls take control|Second soldier: Buying continues|Third soldier: Strong momentum confirmed|Each candle similar in size"
  !expand_end
  !h2"Market Context"
  !p"Most powerful when appearing after a downtrend or at support levels. Shows a clear shift from bearish to bullish sentiment with sustained buying interest over three sessions."
  !h2"Trading the Pattern"
  !p"Enter long during the third candle or on pullbacks after pattern completion. Place stops below the low of the first soldier. Target measured moves or previous resistance levels."
  !expand_start"Success Factors"
  !h3"Ideal Conditions"
  !list"Appears after significant decline|Increasing volume on each candle|Similar sized candles (uniformity)|Minimal upper shadows|Opens near previous close"
  !expand_end
  !expand_start"Warning Signs"
  !h3"Potential Weakness"
  !list"Third candle much larger (exhaustion)|Long upper shadows (resistance)|Decreasing volume|Appears after extended uptrend"
  !expand_end
  !tip"The pattern is stronger when volume increases with each successive candle."
  !warning"Be cautious of three white soldiers appearing after a long uptrend - may signal exhaustion rather than continuation."`
          }
        ]
      },
      "bearish_patterns": {
        title: "Bearish Candlesticks",
        colorTheme: "rose-pink",
        icon: "📉",
        lectures: [
          {
            id: "shooting_star",
            title: "Shooting Star",
            subtitle: "Tap to read",
            hasIllustration: true,
            illustrationType: "candlestick",
            candlestickData: {
              candles: [{open: 98, close: 96, high: 110, low: 95, x: 200}],
              
              animationSteps: ["Market opens, bulls push up", "Price reaches session high", "Bears step in strongly", "Shooting star complete - bearish signal"]
            },
            encryptedContent: `!h1"The Shooting Star Pattern"
  !tldr"Single candle with long upper shadow at uptrend top. Shows sellers stepping in at higher prices, indicating potential bearish reversal."
  !difficulty"Beginner"
  !time"6 min read"
  !h2"A Star Falls from the Sky"
  !p"The shooting star shows initial buying enthusiasm that gets completely rejected by sellers. Like a shooting star that burns brightly before falling, this pattern often marks the end of upward momentum."
  !expand_start"Pattern Recognition"
  !h3"Visual Characteristics"
  !list"Small real body at the bottom|Long upper shadow (at least 2x body size)|Little to no lower shadow|Must appear after uptrend"
  !expand_end
  !h2"The Day's Story"
  !p"Market opens and initially continues the uptrend. Bulls push prices significantly higher during the session, but sellers step in aggressively at higher prices. The session closes near the opening level, erasing most gains."
  !h2"Trading Strategy"
  !p"Conservative approach: Wait for bearish confirmation the next day. Standard entry: Short below the shooting star's low. Always place stop loss above the upper shadow to protect against false signals."
  !expand_start"Reliability Factors"
  !h3"Stronger Signals"
  !list"Longer upper shadow relative to body|Red body more bearish than green|Higher volume on rejection|Appears at resistance levels|Follows extended uptrend"
  !expand_end
  !tip"A shooting star with a red body is more bearish than one with a green body."
  !warning"Never short a shooting star without confirmation. Strong uptrends can continue despite temporary rejections."`
          },
          {
            id: "bearish_engulfing",
            title: "Bearish Engulfing",
            subtitle: "Tap to read",
            hasIllustration: true,
            illustrationType: "candlestick",
            candlestickData: {
              candles: [
                {open: 98, close: 102, high: 103, low: 97, x: 180},
                {open: 103, close: 94, high: 104, low: 93, x: 220}
              ],
              labels: {pattern: "Bearish Engulfing", description: "Large red candle engulfs previous green"},
              animationSteps: ["Day 1: Bulls maintain control", "Day 2: Bears overwhelm bulls", "Complete engulfment shown", "Strong bearish reversal signal"]
            },
            encryptedContent: `!h1"Bearish Engulfing Pattern"
  !tldr"Two-candle pattern where large red candle completely engulfs previous green candle. Shows dramatic shift from buying to selling pressure."
  !difficulty"Beginner"
  !time"8 min read"
  !h2"When Bulls Get Overwhelmed"
  !p"The bearish engulfing pattern represents a complete shift in market sentiment from bullish to bearish in just two trading sessions. It often marks significant market tops when properly formed."
  !h2"Formation Process"
  !p"Day 1: Bulls are in control, price closes higher continuing the uptrend. Day 2: Market opens with continued buying (often gapping up) but sellers quickly overwhelm buyers, driving price significantly lower."
  !expand_start"Pattern Requirements"
  !h3"First Candle"
  !list"Must be bullish (green)|Part of existing uptrend|Shows continued buying pressure|Can be any size"
  !h3"Second Candle"
  !list"Must be bearish (red)|Opens at or above previous close|Body completely engulfs first candle|Closes well below previous open"
  !expand_end
  !h2"Trading Approach"
  !p"Enter short when the engulfing candle closes or on break below its low. Place stop loss above the high of the engulfing candle. Target previous support levels or maintain minimum 1:2 risk-reward ratio."
  !expand_start"Key Success Factors"
  !h3"Stronger Signals"
  !list"Gap up opening followed by reversal|Larger size difference between candles|Higher volume on engulfing day|Appears at resistance levels|Follows extended uptrend"
  !expand_end
  !warning"Be cautious of bearish engulfing in strong uptrends - they may just be temporary corrections."`
          },
          {
            id: "evening_star",
            title: "Evening Star",
            subtitle: "Tap to read",
            hasIllustration: true,
            illustrationType: "candlestick",
            candlestickData: {
              candles: [
                {open: 95, close: 105, high: 106, low: 94, x: 160},
                {open: 107, close: 106, high: 109, low: 104, x: 200},
                {open: 105, close: 92, high: 106, low: 91, x: 240}
              ],
              labels: {pattern: "Evening Star", description: "Three-candle bearish reversal pattern"},
              animationSteps: ["Day 1: Bulls dominate with strong buying", "Day 2: Market shows indecision, gap up", "Day 3: Bears take control with strong selling", "Pattern complete - strong reversal signal"]
            },
            encryptedContent: `!h1"Evening Star Pattern"
  !tldr"Three-candle bearish reversal featuring large green candle, small indecision candle (star), and large red confirmation candle. Marks major tops."
  !difficulty"Intermediate"
  !time"10 min read"
  !h2"The End of a Bright Day"
  !p"Like the evening star that appears as daylight fades, this pattern often signals the end of a bullish period and the beginning of a decline. It's the bearish counterpart to the morning star."
  !expand_start"Three-Candle Structure"
  !h3"First Candle: Continued Advance"
  !list"Large bullish candle|Continuation of uptrend|Strong buying pressure|Bulls firmly in control"
  !h3"Second Candle: The Evening Star"
  !list"Small-bodied candle|Gaps up from first candle|Shows market indecision|Can be doji, spinning top, or small candle"
  !h3"Third Candle: The Decline"
  !list"Large bearish candle|Closes well into first candle's body|Confirms reversal|Strong selling pressure"
  !expand_end
  !h2"Psychology Behind the Pattern"
  !p"Day 1: Bulls maintain complete control with strong buying. Day 2: Market opens with gap up but buying pressure weakens, creating uncertainty. Day 3: Sellers step in with conviction, overwhelming remaining buyers."
  !h2"Trading the Evening Star"
  !p"Enter short when the third candle closes or wait for additional confirmation. Place stop loss above the star (second candle) high. Target 50% retracement of recent advance or previous support levels."
  !expand_start"Volume Confirmation"
  !h3"Ideal Pattern"
  !list"High volume on first candle (buying climax)|Low volume on star (indecision)|High volume on third candle (selling conviction)"
  !expand_end
  !tip"The gap between first and second candle strengthens the signal, showing rejection of higher prices."
  !warning"Evening stars at minor tops may only result in corrections, not major reversals. Consider the bigger picture."`
          },
          {
            id: "hanging_man",
            title: "Hanging Man",
            subtitle: "Tap to read",
            hasIllustration: true,
            illustrationType: "candlestick", 
            candlestickData: {
              candles: [{open: 98, close: 96, high: 99, low: 88, x: 200}],
              animationSteps: ["Market opens, bulls initially strong", "Price pushed significantly lower", "Bulls recover some ground", "Hanging man complete - bearish warning"]
            },
            encryptedContent: `!h1"The Hanging Man Pattern"
  !tldr"Single candle with long lower shadow at uptrend top. Looks identical to hammer but appears after rise, warning of potential bearish reversal."
  !difficulty"Beginner"
  !time"6 min read"
  !h2"The Ominous Warning"
  !p"The hanging man gets its name from its appearance - like a person hanging by their neck. Despite looking identical to a hammer, its position at the top of an uptrend gives it bearish implications."
  !expand_start"Pattern Characteristics"
  !h3"Visual Features"
  !list"Small real body at the top|Long lower shadow (2x+ body size)|Little to no upper shadow|Must appear after uptrend"
  !h3"Color Significance"
  !list"Red body is more bearish|Green body still bearish but weaker|Position matters more than color|Confirmation needed regardless"
  !expand_end
  !h2"The Market Story"
  !p"Market opens continuing the uptrend, but sellers emerge, driving price significantly lower. Bulls manage to push price back near the open, but the selling pressure shown by the long lower shadow is a warning sign."
  !h2"Trading the Hanging Man"
  !p"Never short on the hanging man candle alone - wait for bearish confirmation. Enter short below the low of the confirmation candle. Place stop above the hanging man's high."
  !expand_start"Confirmation Required"
  !h3"Bearish Confirmation"
  !list"Next day opens with gap down|Red candle follows hanging man|Close below hanging man's low|Higher volume on confirmation"
  !expand_end
  !tip"A hanging man with a red body is more bearish than one with a green body."
  !warning"Without confirmation, a hanging man may just be a normal pullback in an uptrend. Always wait for follow-through selling."`
          },
          {
            id: "dark_cloud_cover",
            title: "Dark Cloud Cover",
            subtitle: "Tap to read",
            hasIllustration: true,
            illustrationType: "candlestick",
            candlestickData: {
              candles: [
                {open: 95, close: 102, high: 103, low: 94, x: 180},
                {open: 105, close: 99, high: 106, low: 98, x: 220}
              ],
              labels: {pattern: "Dark Cloud Cover", description: "Red candle penetrates into green candle body"},
              animationSteps: ["Day 1: Bulls maintain strong control", "Day 2: Bears step in aggressively", "Red candle penetrates green body", "Bearish reversal signal confirmed"]
            },
            encryptedContent: `!h1"Dark Cloud Cover Pattern"
  !tldr"Two-candle bearish reversal where second red candle opens above previous high but closes below midpoint of green candle's body."
  !difficulty"Intermediate"
  !time"8 min read"
  !h2"Clouds Gathering"
  !p"Dark cloud cover represents storm clouds gathering over a sunny market. The pattern shows initial strength followed by aggressive selling that penetrates deep into the previous candle's gains."
  !expand_start"Pattern Requirements"
  !h3"First Candle"
  !list"Must be bullish (green)|Part of existing uptrend|Strong buying pressure|Significant sized body"
  !h3"Second Candle"
  !list"Must be bearish (red)|Opens above previous high (gap up)|Closes below midpoint of first candle|Higher volume strengthens signal"
  !expand_end
  !h2"The 50% Penetration Rule"
  !p"For a true dark cloud cover, the second candle must close below the midpoint of the first candle's body. Deeper penetration (70%+) creates a stronger bearish signal."
  !h2"Trading Strategy"
  !p"Enter short when the dark cloud candle closes or on a break below its low. Place stop loss above the high of the dark cloud candle. Target previous support levels."
  !expand_start"Market Psychology"
  !h3"What It Reveals"
  !list"Bulls lose control at new highs|Bears step in aggressively|Gap up gets completely reversed|Shift from buying to selling pressure"
  !expand_end
  !tip"Dark cloud cover is most reliable when it appears at resistance levels or after extended uptrends."
  !warning"Watch for follow-through selling. Without confirmation, the pattern may be just a temporary correction."`
          },
          {
            id: "three_black_crows",
            title: "Three Black Crows",
            subtitle: "Tap to read",
            hasIllustration: true,
            illustrationType: "candlestick",
            candlestickData: {
              candles: [
                {open: 115, close: 108, high: 116, low: 107, x: 160},
                {open: 109, close: 102, high: 110, low: 101, x: 200},
                {open: 103, close: 95, high: 104, low: 94, x: 240}
              ],
              labels: {pattern: "Three Black Crows", description: "Three consecutive bearish candles flying lower"},
              animationSteps: ["Day 1: Bears establish control", "Day 2: Continued selling pressure", "Day 3: Strong bearish momentum", "Pattern complete - downtrend confirmed"]
            },
            encryptedContent: `!h1"Three Black Crows Pattern"
  !tldr"Three consecutive long red candles with small wicks, each closing near its low. Shows strong, sustained selling pressure and bearish momentum."
  !difficulty"Intermediate"
  !time"9 min read"
  !h2"The Flock of Doom"
  !p"Three black crows represent a flock of doom descending on the market. This powerful bearish pattern shows three consecutive days of strong selling pressure with minimal buying."
  !expand_start"Pattern Characteristics"
  !h3"Candle Requirements"
  !list"Three consecutive long red candles|Each closes at or near its low|Small upper and lower shadows|Each opens within previous candle's body"
  !h3"Progression"
  !list"First crow: Bears take control|Second crow: Selling continues|Third crow: Strong momentum confirmed|Each candle similar in size"
  !expand_end
  !h2"Market Context"
  !p"Most powerful when appearing after an uptrend or at resistance levels. Shows a clear shift from bullish to bearish sentiment with sustained selling interest over three sessions."
  !h2"Trading the Pattern"
  !p"Enter short during the third candle or on rallies after pattern completion. Place stops above the high of the first crow. Target measured moves or previous support levels."
  !expand_start"Success Factors"
  !h3"Ideal Conditions"
  !list"Appears after significant advance|Increasing volume on each candle|Similar sized candles (uniformity)|Minimal lower shadows|Opens near previous close"
  !expand_end
  !expand_start"Warning Signs"
  !h3"Potential Weakness"
  !list"Third candle much larger (exhaustion)|Long lower shadows (support)|Decreasing volume|Appears after extended downtrend"
  !expand_end
  !tip"The pattern is stronger when volume increases with each successive candle."
  !warning"Be cautious of three black crows appearing after a long downtrend - may signal exhaustion rather than continuation."`
          }
        ]
      },
      "technical_indicators": {
        title: "Technical Indicators",
        colorTheme: "purple-blue",
        icon: "📊",
        lectures: [
          {
            id: "moving_averages",
            title: "Moving Averages",
            subtitle: "Tap to read",
            hasIllustration: false,
            encryptedContent: `!h1"Moving Averages"
  !tldr"Moving averages smooth price data to identify trends and generate trading signals. They are the foundation of technical analysis and trend-following strategies."
  !difficulty"Beginner"
  !time"10 min read"
  !h2"The Foundation of Technical Analysis"
  !p"Moving averages smooth out price data to create a single flowing line that makes it easier to identify the direction of the trend. They're one of the most widely used technical indicators."
  !expand_start"Types of Moving Averages"
  !h3"Simple Moving Average (SMA)"
  !list"Calculates average price over specific periods|All periods weighted equally|Slower to react to price changes|Good for long-term trend identification"
  !h3"Exponential Moving Average (EMA)"
  !list"Gives more weight to recent prices|Faster reaction to price changes|Better for short-term trading|Reduces lag compared to SMA"
  !expand_end
  !h2"Popular Periods and Uses"
  !p"Short-term traders use 5, 10, 20 period MAs for quick signals. Swing traders prefer 20, 50 MAs. Long-term investors watch the 200 MA - above it is bullish, below is bearish."
  !h2"Trading Strategies"
  !p"Price above MA indicates uptrend, below indicates downtrend. MAs act as dynamic support and resistance. Golden Cross (50 MA above 200 MA) is bullish, Death Cross (50 MA below 200 MA) is bearish."
  !expand_start"MA Crossover System"
  !h3"Fast vs Slow MA"
  !list"Fast MA crossing above slow MA = Buy signal|Fast MA crossing below slow MA = Sell signal|Popular combinations: 10/20, 20/50, 50/200|Wait for decisive breaks to avoid whipsaws"
  !expand_end
  !tip"Use EMA for faster signals, SMA for stable trends. Combine with price action for best results."
  !warning"Moving averages lag price action and give false signals in sideways markets."`
          },
          {
            id: "rsi_indicator",
            title: "RSI (Relative Strength Index)",
            subtitle: "Tap to read",
            hasIllustration: false,
            encryptedContent: `!h1"RSI - Relative Strength Index"
  !tldr"RSI measures momentum to identify overbought (>70) and oversold (<30) conditions. Essential oscillator for timing entries and spotting divergences."
  !difficulty"Beginner"
  !time"9 min read"
  !h2"Measuring Market Momentum"
  !p"RSI is a momentum oscillator that measures the speed and magnitude of price changes. It oscillates between 0 and 100, helping traders identify overbought and oversold conditions."
  !h2"Understanding RSI Levels"
  !p"RSI above 70 suggests overbought conditions (potential sell signal). RSI below 30 suggests oversold conditions (potential buy signal). RSI around 50 indicates neutral momentum."
  !expand_start"RSI Trading Strategies"
  !h3"Overbought/Oversold"
  !list"Buy when RSI drops below 30 and turns up|Sell when RSI rises above 70 and turns down|Wait for confirmation before entering|Works best in ranging markets"
  !h3"Centerline Crossovers"
  !list"RSI above 50 indicates bullish momentum|RSI below 50 indicates bearish momentum|Crossovers provide trend change signals|Combine with price action for confirmation"
  !expand_end
  !h2"Divergence Trading"
  !p"RSI divergence is one of the most reliable reversal signals. Bullish divergence occurs when price makes lower lows but RSI makes higher lows. Bearish divergence is when price makes higher highs but RSI makes lower highs."
  !expand_start"Advanced RSI Techniques"
  !h3"Multiple Timeframes"
  !list"Use daily RSI for overall bias|Use hourly RSI for entry timing|Align signals across timeframes|Higher timeframe takes precedence"
  !h3"RSI Trendlines"
  !p"Draw trendlines on RSI just like price charts. RSI trendline breaks often precede price breaks."
  !expand_end
  !warning"RSI can remain overbought/oversold for extended periods in strong trends. Don't fight the trend based on RSI alone."`
          },
          {
            id: "macd_indicator",
            title: "MACD",
            subtitle: "Tap to read",
            hasIllustration: false,
            encryptedContent: `!h1"MACD - Moving Average Convergence Divergence"
  !tldr"MACD tracks relationship between two moving averages to identify trend changes and momentum shifts. Consists of MACD line, signal line, and histogram."
  !difficulty"Intermediate"
  !time"11 min read"
  !h2"The Trend Following Oscillator"
  !p"MACD is both a trend-following and momentum indicator. It shows the relationship between two moving averages of a security's price, making it excellent for identifying trend changes."
  !expand_start"MACD Components"
  !h3"MACD Line"
  !list"12 EMA minus 26 EMA|Positive values indicate upward momentum|Negative values indicate downward momentum|Zero line crossovers are significant"
  !h3"Signal Line"
  !list"9-period EMA of MACD line|Provides buy/sell signals|Crossovers indicate momentum changes|Smoother but more lagging"
  !h3"Histogram"
  !list"MACD line minus signal line|Shows momentum acceleration/deceleration|Provides earliest signals|Peaks and valleys predict crossovers"
  !expand_end
  !h2"MACD Trading Signals"
  !p"Most common signal: MACD crossing above signal line suggests bullish momentum, crossing below suggests bearish momentum. Zero line crossovers confirm trend direction changes."
  !h2"Divergence Analysis"
  !p"MACD divergence is highly reliable. When price makes new highs/lows but MACD doesn't confirm, it often signals trend reversal. Always wait for price confirmation before acting."
  !expand_start"MACD Strategies"
  !h3"Signal Line Crossovers"
  !list"MACD above signal = Bullish|MACD below signal = Bearish|Most common MACD strategy|Works best in trending markets"
  !h3"Histogram Analysis"
  !list"Histogram turning up from negative = Early bullish signal|Histogram turning down from positive = Early bearish signal|Provides signals before line crossovers|Combine with price patterns"
  !expand_end
  !tip"Watch histogram peaks and valleys for early signals of momentum changes."
  !warning"MACD generates false signals in sideways markets. Always confirm with price action and trend analysis."`
          },
          {
            id: "bollinger_bands",
            title: "Bollinger Bands",
            subtitle: "Tap to read",
            hasIllustration: false,
            encryptedContent: `!h1"Bollinger Bands"
  !tldr"Bollinger Bands consist of a moving average with upper and lower bands based on standard deviation. They expand during volatility and contract during calm periods."
  !difficulty"Intermediate"
  !time"10 min read"
  !h2"The Volatility Indicator"
  !p"Bollinger Bands dynamically adjust to market volatility, widening when price swings increase and narrowing when volatility decreases. They provide both trend and volatility information."
  !expand_start"Band Components"
  !h3"Middle Band"
  !list"20-period simple moving average|Acts as dynamic support/resistance|Trend direction indicator|Price tends to return to middle"
  !h3"Upper Band"
  !list"Middle band + (2 × standard deviation)|Dynamic resistance level|Overbought indication when touched|Breakouts signal strong moves"
  !h3"Lower Band"
  !list"Middle band - (2 × standard deviation)|Dynamic support level|Oversold indication when touched|Breakdowns signal strong moves"
  !expand_end
  !h2"Reading Bollinger Bands"
  !p"Price touching upper band suggests overbought conditions, while touching lower band suggests oversold. However, in strong trends, price can 'walk the bands' for extended periods."
  !expand_start"Key Signals"
  !h3"Band Squeeze"
  !list"Bands contract to narrow range|Indicates low volatility|Often precedes big moves|Volatility breakout expected"
  !h3"Band Expansion"
  !list"Bands widen significantly|High volatility period|Strong directional move|Trend continuation likely"
  !h3"Band Walk"
  !list"Price stays near upper/lower band|Strong trending condition|Don't fade the move|Wait for return to middle band"
  !expand_end
  !h2"Trading Strategies"
  !p"In ranging markets, buy near lower band and sell near upper band. In trending markets, use band touches as continuation signals. Squeezes often lead to explosive moves in either direction."
  !tip"The squeeze is one of the most reliable setups - low volatility usually precedes high volatility."
  !warning"Don't assume band touches mean immediate reversals. In strong trends, price can stay overbought or oversold for long periods."`
          },
          {
            id: "stochastic_oscillator",
            title: "Stochastic Oscillator",
            subtitle: "Tap to read", 
            hasIllustration: false,
            encryptedContent: `!h1"Stochastic Oscillator"
  !tldr"Stochastic compares closing price to recent trading range. Values above 80 indicate overbought conditions, below 20 indicate oversold conditions."
  !difficulty"Beginner"
  !time"8 min read"
  !h2"Momentum and Position"
  !p"The Stochastic Oscillator measures where the current close is relative to the recent high-low range. It shows momentum and helps identify potential reversal points."
  !expand_start"Stochastic Components"
  !h3"%K Line (Fast Stochastic)"
  !list"Raw calculation of current position|More sensitive to price changes|Oscillates between 0 and 100|Main signal line"
  !h3"%D Line (Slow Stochastic)"
  !list"3-period moving average of %K|Smoother, less whipsaw|Signal line crossovers|Confirmation line"
  !expand_end
  !h2"Overbought and Oversold"
  !p"Stochastic above 80 suggests overbought conditions - potential selling opportunity. Below 20 suggests oversold conditions - potential buying opportunity. However, momentum can stay extreme during strong trends."
  !expand_start"Trading Signals"
  !h3"Signal Line Crossovers"
  !list"%K crossing above %D = Bullish signal|%K crossing below %D = Bearish signal|Most common trading method|Works best in ranging markets"
  !h3"Divergence Signals"
  !list"Price makes new high/low but Stochastic doesn't|Strong reversal indication|Look for confirmation in price action|More reliable than overbought/oversold"
  !expand_end
  !h2"Best Practices"
  !p"Use longer periods (14, 21) for less noise. Combine with trend analysis - only take oversold signals in uptrends and overbought signals in downtrends. Watch for divergences as they often precede reversals."
  !tip"Stochastic works best in sideways, ranging markets. In strong trends, it can stay overbought or oversold for extended periods."
  !warning"Don't rely solely on overbought/oversold readings - always consider the overall trend direction."`
          },
          {
            id: "volume_indicators",
            title: "Volume Analysis",
            subtitle: "Tap to read",
            hasIllustration: false,
            encryptedContent: `!h1"Volume Analysis and Indicators"
  !tldr"Volume confirms price movements and reveals the strength behind market moves. High volume validates breakouts while low volume suggests weak moves."
  !difficulty"Intermediate"
  !time"11 min read"
  !h2"Volume: The Truth Teller"
  !p"Volume is the number of shares or contracts traded during a given period. It reveals the conviction behind price movements and helps distinguish between genuine moves and false signals."
  !expand_start"Volume Principles"
  !h3"Volume and Price Relationship"
  !list"Rising prices + rising volume = Strong uptrend|Falling prices + rising volume = Strong downtrend|Price moves without volume = Weak/suspicious|Volume leads price = Early warning"
  !h3"Breakout Confirmation"
  !list"Valid breakouts need volume surge|Low volume breakouts often fail|Volume should be 50%+ above average|Sustained volume maintains moves"
  !expand_end
  !h2"Key Volume Indicators"
  !p"Volume Moving Average shows average trading activity. On Balance Volume (OBV) accumulates volume on up days and subtracts on down days. Volume Rate of Change shows volume momentum."
  !expand_start"Volume Patterns"
  !h3"Climax Volume"
  !list"Extremely high volume at turning points|Often marks tops and bottoms|Exhaustion of buying/selling|Reversal likely after climax"
  !h3"Accumulation/Distribution"
  !list"Steady volume increase during consolidation|Smart money quietly positioning|Breakout likely when complete|Watch for volume spikes"
  !expand_end
  !h2"Trading with Volume"
  !p"Enter trades when volume confirms the direction. Avoid trading breakouts without volume confirmation. Use volume divergence to spot potential reversals before they happen."
  !expand_start"Volume Strategies"
  !h3"Breakout Trading"
  !list"Wait for volume surge on breakout|Volume should exceed recent average|Higher volume = higher probability|Exit if volume doesn't sustain"
  !h3"Reversal Spotting"
  !list"Watch for decreasing volume in trends|Volume divergence warns of weakness|Climax volume often marks turning points|Combine with price action signals"
  !expand_end
  !tip"Volume often leads price - watch for volume increases before major moves begin."
  !warning"Price can move significantly on low volume, but these moves are often temporary and reverse quickly."`
          }
        ]
      },
      "fundamental_analysis": {
        title: "Fundamental Analysis",
        colorTheme: "yellow-amber",
        icon: "🏦",
        lectures: [
          {
            id: "economic_indicators",
            title: "Economic Indicators",
            subtitle: "Tap to read",
            hasIllustration: false,
            encryptedContent: `!h1"Economic Indicators"
  !tldr"Economic indicators reveal the health of an economy and influence market movements. Leading indicators predict future activity, lagging indicators confirm trends."
  !difficulty"Intermediate"
  !time"12 min read"
  !h2"The Pulse of the Economy"
  !p"Economic indicators are key statistics that help traders understand the current state and future direction of an economy. They drive major market movements and investment decisions."
  !expand_start"Types of Indicators"
  !h3"Leading Indicators"
  !list"Stock market performance|Consumer confidence|Manufacturing orders|Building permits|Predict future economic activity"
  !h3"Lagging Indicators"
  !list"Unemployment rate|Corporate profits|Interest rates|Confirm trends already in progress"
  !h3"Coincident Indicators"
  !list"GDP|Industrial production|Personal income|Move with the economy"
  !expand_end
  !h2"Key Economic Reports"
  !p"Employment data (Non-Farm Payrolls) is the most watched monthly report. GDP measures total economic output quarterly. Inflation indicators (CPI, PPI) affect Federal Reserve policy decisions."
  !h2"Market Impact"
  !p"Economic data affects different markets differently. Strong employment and GDP data typically boost stocks and strengthen currency. High inflation concerns bond investors and may lead to higher interest rates."
  !expand_start"Trading Economic News"
  !h3"Before the Release"
  !list"Know the consensus forecast|Understand market expectations|Position appropriately|Be ready for volatility"
  !h3"After the Release"
  !list"Compare actual vs expected|Watch initial market reaction|Look for follow-through|Consider longer-term implications"
  !expand_end
  !tip"Markets often move more on expectations than actual numbers. The surprise factor matters most."
  !warning"Economic releases can cause extreme volatility. Use proper risk management and avoid overleveraging."`
          },
          {
            id: "financial_statements",
            title: "Reading Financial Statements",
            subtitle: "Tap to read",
            hasIllustration: false,
            encryptedContent: `!h1"Reading Financial Statements"
  !tldr"Financial statements reveal company health through income statement (profitability), balance sheet (financial position), and cash flow statement (cash management)."
  !difficulty"Intermediate"
  !time"14 min read"
  !h2"The Language of Business"
  !p"Financial statements are formal records of a company's business activities. They provide crucial insights into performance, financial health, and future prospects for investors and traders."
  !expand_start"Income Statement"
  !h3"Key Components"
  !list"Revenue: Money from business operations|Cost of Goods Sold: Direct production costs|Gross Profit: Revenue minus COGS|Operating Income: Gross profit minus expenses|Net Income: Final profit after all costs"
  !h3"What to Analyze"
  !list"Revenue growth year-over-year|Gross margin trends (pricing power)|Operating margin (efficiency)|Net margin (overall profitability)|Earnings per share growth"
  !expand_end
  !h2"Balance Sheet Analysis"
  !p"The balance sheet shows what a company owns (assets) and owes (liabilities) at a specific point in time. The difference is shareholders' equity - the company's net worth."
  !h2"Cash Flow Statement"
  !p"Shows actual cash generated from operations, investing, and financing activities. A company can show profits but still go bankrupt if it runs out of cash. Operating cash flow should be consistently positive."
  !expand_start"Key Financial Ratios"
  !h3"Profitability"
  !list"Return on Equity (ROE): Net income / shareholders' equity|Return on Assets (ROA): Net income / total assets|Gross Margin: Gross profit / revenue|Net Margin: Net income / revenue"
  !h3"Liquidity"
  !list"Current Ratio: Current assets / current liabilities|Quick Ratio: (Current assets - inventory) / current liabilities|Cash Ratio: Cash / current liabilities"
  !h3"Leverage"
  !list"Debt-to-Equity: Total debt / shareholders' equity|Interest Coverage: Operating income / interest expense|Debt-to-Assets: Total debt / total assets"
  !expand_end
  !tip"Compare ratios to industry averages and competitors for meaningful context."
  !warning"Financial statements can be manipulated. Always cross-reference with cash flow and look for red flags."`
          },
          {
            id: "valuation_methods",
            title: "Stock Valuation Methods",
            subtitle: "Tap to read",
            hasIllustration: false,
            encryptedContent: `!h1"Stock Valuation Methods"
  !tldr"Stock valuation determines fair value using P/E ratios, DCF analysis, and comparative metrics. Helps identify undervalued and overvalued opportunities."
  !difficulty"Advanced"
  !time"16 min read"
  !h2"Determining What Stocks Are Worth"
  !p"Stock valuation determines the intrinsic value of a company's shares. Various methods help investors decide whether a stock is undervalued, fairly valued, or overvalued in the current market."
  !expand_start"Price-to-Earnings Analysis"
  !h3"Understanding P/E Ratio"
  !list"P/E = Stock Price / Earnings per Share|Shows how much investors pay for each dollar of earnings|Higher P/E = higher growth expectations|Lower P/E = value opportunity or problems"
  !h3"P/E Interpretation"
  !list"P/E 10-15: Generally reasonable|P/E 15-25: Moderate to high expectations|P/E >25: High growth expectations|P/E <10: Value opportunity or declining business"
  !h3"Types of P/E"
  !list"Trailing P/E: Based on past 12 months|Forward P/E: Based on estimated earnings|Compare within same industry only"
  !expand_end
  !h2"Discounted Cash Flow (DCF)"
  !p"DCF calculates present value of future cash flows to determine intrinsic value. It projects future free cash flows, discounts them to present value using the company's cost of capital, and adds terminal value."
  !h2"Comparative Valuation"
  !p"Compare similar companies using Price-to-Book (P/B), Price-to-Sales (P/S), and Enterprise Value ratios. PEG ratio combines P/E with growth rate - PEG below 1.0 may indicate undervaluation relative to growth."
  !expand_start"Putting It Together"
  !h3"Multiple Approaches"
  !list"Use several methods to triangulate fair value|Look for convergence of different metrics|No single method is perfect|Always maintain margin of safety"
  !h3"Quality Assessment"
  !list"Strong competitive position|Sustainable business model|Competent management|Growing market opportunity|Financial strength and stability"
  !expand_end
  !tip"Always compare P/E ratios within the same industry as different sectors have different normal ranges."
  !warning"All valuation methods have limitations. Use multiple approaches and maintain a margin of safety when investing."`
          },
          {
            id: "sector_analysis",
            title: "Sector Analysis",
            subtitle: "Tap to read",
            hasIllustration: false,
            encryptedContent: `!h1"Sector and Industry Analysis"
  !tldr"Sector analysis examines broad market segments while industry analysis focuses on specific business types. Economic cycles affect sectors differently."
  !difficulty"Intermediate"
  !time"11 min read"
  !h2"Understanding Market Segments"
  !p"Sector analysis helps investors understand how different parts of the economy perform under various conditions and identify the best areas for investment opportunities."
  !expand_start"Major Market Sectors"
  !h3"Growth Sectors"
  !list"Technology: Software, hardware, semiconductors|Healthcare: Pharmaceuticals, biotechnology|Consumer Discretionary: Retail, entertainment|Communication Services: Telecom, media, internet"
  !h3"Defensive Sectors"
  !list"Consumer Staples: Food, beverages, household products|Utilities: Electric, gas, water companies|Healthcare: Essential medical services|Real Estate: REITs with stable income"
  !h3"Cyclical Sectors"
  !list"Financials: Banks, insurance, investment firms|Energy: Oil, gas, renewable energy|Materials: Mining, chemicals, metals|Industrials: Manufacturing, transportation"
  !expand_end
  !h2"Sector Rotation Strategy"
  !p"Different sectors outperform at different stages of the economic cycle. Early cycle favors technology and consumer discretionary. Mid-cycle benefits industrials and materials. Late cycle sees energy and utilities perform well."
  !h2"Analysis Framework"
  !p"Use Porter's Five Forces to analyze industry competition: threat of new entrants, supplier power, buyer power, substitute threats, and competitive rivalry. Consider industry life cycle stage and regulatory environment."
  !expand_start"Sector Investment Tools"
  !h3"Sector ETFs"
  !list"Technology: XLK, QQQ|Healthcare: XLV|Financials: XLF|Energy: XLE|Utilities: XLU|Consumer Staples: XLP"
  !h3"Relative Strength"
  !list"Compare sector performance to overall market|Identify leaders and laggards|Use sector rotation indicators|Monitor economic data for timing"
  !expand_end
  !tip"Understanding sector rotation helps time investments and optimize portfolio allocation."
  !warning"Sector concentration risk can be dangerous. Diversify across sectors based on economic cycle and market conditions."`
          },
          {
            id: "earnings_analysis",
            title: "Earnings Analysis",
            subtitle: "Tap to read",
            hasIllustration: false,
            encryptedContent: `!h1"Analyzing Corporate Earnings"
  !tldr"Earnings reports reveal company performance and future prospects. Revenue growth, profit margins, and guidance drive stock prices significantly."
  !difficulty"Intermediate"
  !time"12 min read"
  !h2"The Quarterly Report Card"
  !p"Earnings reports are released quarterly and provide a comprehensive look at a company's financial performance. Markets often react strongly to earnings surprises and management guidance."
  !expand_start"Key Earnings Metrics"
  !h3"Earnings Per Share (EPS)"
  !list"Net income divided by shares outstanding|Most watched metric by analysts|Compare actual vs. expected|Growth rate is crucial"
  !h3"Revenue Growth"
  !list"Top-line growth indicates business expansion|More important than earnings manipulation|Organic vs. acquisition growth|Sustainability of growth rate"
  !h3"Profit Margins"
  !list"Gross margin: Pricing power and efficiency|Operating margin: Management effectiveness|Net margin: Overall profitability|Trend direction matters most"
  !expand_end
  !h2"Earnings Guidance"
  !p"Management's forward-looking statements about expected performance often matter more than historical results. Raised guidance typically boosts stock prices, while lowered guidance causes selling."
  !expand_start"Trading Earnings"
  !h3"Pre-Earnings Setup"
  !list"Analyze consensus estimates|Check options implied volatility|Review recent guidance|Position size carefully"
  !h3"Post-Earnings Reaction"
  !list"Initial reaction can be misleading|Listen to conference call|Focus on guidance changes|Watch for sustained moves"
  !expand_end
  !h2"Earnings Quality"
  !p"Not all earnings are created equal. Look for sustainable, high-quality earnings from core operations rather than one-time gains or accounting manipulations."
  !tip"Often the guidance and commentary matter more than the actual numbers reported."
  !warning"Earnings reactions can be volatile and unpredictable. Use appropriate position sizing and risk management."`
          },
          {
            id: "fed_policy_markets",
            title: "Federal Reserve & Markets",
            subtitle: "Tap to read", 
            hasIllustration: false,
            encryptedContent: `!h1"Federal Reserve Policy and Market Impact"
  !tldr"The Federal Reserve's monetary policy decisions significantly impact all financial markets. Interest rate changes affect valuations, economic growth, and investor behavior."
  !difficulty"Advanced"
  !time"14 min read"
  !h2"The Central Bank's Influence"
  !p"The Federal Reserve is the most influential institution in financial markets. Their decisions on interest rates, money supply, and economic policy drive market movements across all asset classes."
  !expand_start"Fed Policy Tools"
  !h3"Federal Funds Rate"
  !list"Rate banks charge each other for overnight loans|Primary tool for economic influence|Higher rates slow growth, lower rates stimulate|Changes affect all interest rates"
  !h3"Quantitative Easing (QE)"
  !list"Large-scale asset purchases|Increases money supply|Lowers long-term interest rates|Supports asset prices"
  !h3"Forward Guidance"
  !list"Communication about future policy|Manages market expectations|Can be more powerful than actual rate changes|Markets hang on every word"
  !expand_end
  !h2"Market Reactions"
  !p"Rising rates typically hurt growth stocks and bonds while helping financials and value stocks. Falling rates boost growth stocks and real estate but hurt savers and banks."
  !expand_start"Sector Impact"
  !h3"Rate Increases"
  !list"Banks and financials benefit|Growth/tech stocks suffer|Bond prices fall|Dollar typically strengthens"
  !h3"Rate Decreases"
  !list"Growth stocks outperform|Real estate and utilities rally|Bond prices rise|Commodities may strengthen"
  !expand_end
  !h2"Trading Fed Meetings"
  !p"FOMC meetings occur 8 times per year and can create significant volatility. Markets often price in expectations beforehand, so surprises in either direction or guidance changes drive the biggest moves."
  !expand_start"Fed Calendar Events"
  !h3"FOMC Meetings"
  !list"Rate decisions released at 2 PM ET|Press conference follows at 2:30 PM|Meeting minutes released 3 weeks later|Beige Book shows regional economic conditions"
  !h3"Fed Chair Testimony"
  !list"Semiannual Congressional testimony|Jackson Hole symposium speech|Various speaking engagements|Markets parse every word for policy clues"
  !expand_end
  !tip"The Fed often telegraphs policy changes well in advance. Pay attention to the dot plot and meeting minutes."
  !warning"Fed meetings can create extreme volatility. Avoid over-leveraging positions ahead of major announcements."`
          },
          {
            id: "global_economics",
            title: "Global Economic Factors",
            subtitle: "Tap to read",
            hasIllustration: false,
            encryptedContent: `!h1"Global Economic Factors Affecting Markets"
  !tldr"Global economics increasingly drive market movements. Currency fluctuations, trade policies, geopolitical events, and central bank actions worldwide impact investments."
  !difficulty"Advanced"
  !time"13 min read"
  !h2"The Interconnected World"
  !p"Modern markets are globally interconnected. Events in one country can rapidly affect markets worldwide through trade relationships, currency movements, and investor sentiment."
  !expand_start"Major Global Factors"
  !h3"Currency Movements"
  !list"Strong dollar hurts U.S. exports and multinationals|Weak dollar benefits exporters and commodities|Currency wars can destabilize markets|Central bank interventions matter"
  !h3"Trade Relationships"
  !list"Trade wars impact specific sectors heavily|Tariffs affect input costs and margins|Supply chain disruptions cause volatility|Free trade agreements boost affected industries"
  !h3"Geopolitical Events"
  !list"Wars and conflicts create safe-haven flows|Political instability affects regional markets|Brexit-type events cause sustained uncertainty|Energy supply disruptions impact commodities"
  !expand_end
  !h2"Key Global Players"
  !p"The European Central Bank, Bank of Japan, and People's Bank of China all influence global markets. Economic data from major economies like China, EU, and Japan can move U.S. markets significantly."
  !expand_start"Economic Relationships"
  !h3"China Impact"
  !list"Manufacturing data affects commodity prices|Consumer demand drives luxury goods|Real estate troubles impact global banks|COVID policies affect supply chains"
  !h3"European Factors"
  !list"ECB policy affects Euro and bond yields|Energy dependence creates vulnerabilities|Brexit continues to create uncertainty|Banking sector stress spreads globally"
  !expand_end
  !h2"Trading Global Events"
  !p"Stay informed about major global events and their potential market impacts. Consider time zone differences when planning trades around overseas announcements."
  !expand_start"Global Trading Strategies"
  !h3"Currency Hedging"
  !list"Multinational companies affected by FX|Consider currency-hedged ETFs|Dollar strength/weakness themes|Carry trade opportunities"
  !h3"Safe Haven Assets"
  !list"Gold, Swiss Franc, Japanese Yen|U.S. Treasuries during global stress|Volatility spikes during uncertainty|Quality flight during crises"
  !expand_end
  !tip"Major global events often create opportunities in safe-haven assets and currencies."
  !warning"Global events can cause sudden, dramatic market moves. Maintain appropriate diversification and risk management."`
          }
        ]
      }
    }
  };