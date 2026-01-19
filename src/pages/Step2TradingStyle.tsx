import { Zap, BarChart3, TrendingUp, Target } from 'lucide-react'
import type { TradingStyle } from '../types'

interface Step2TradingStyleProps {
  tradingStyle: TradingStyle
  onSelect: (style: TradingStyle) => void
  onBack: () => void
}

const tradingStyles = [
  {
    id: 'scalper' as TradingStyle,
    name: 'Scalper',
    description: 'Quick trades, seconds to minutes. High frequency, small profits.',
    icon: Zap,
    color: 'from-yellow-500 to-orange-500',
  },
  {
    id: 'day-trader' as TradingStyle,
    name: 'Day Trader',
    description: 'Intraday positions. All trades closed before market close.',
    icon: BarChart3,
    color: 'from-blue-500 to-purple-500',
  },
  {
    id: 'swing-trader' as TradingStyle,
    name: 'Swing Trader',
    description: 'Hold positions for days to weeks. Capture larger moves.',
    icon: TrendingUp,
    color: 'from-teal-500 to-cyan-500',
  },
  {
    id: 'position-trader' as TradingStyle,
    name: 'Position Trader',
    description: 'Long-term holds. Weeks to months based on fundamentals.',
    icon: Target,
    color: 'from-pink-500 to-rose-500',
  },
]

export default function Step2TradingStyle({ tradingStyle, onSelect, onBack }: Step2TradingStyleProps) {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
          What's Your Trading Style?
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Select the style that best matches your trading approach.
        </p>
      </div>

      <div className="bg-dark-800 rounded-2xl border border-teal-500/30 p-8 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {tradingStyles.map((style) => {
            const Icon = style.icon
            const isSelected = tradingStyle === style.id
            
            return (
              <button
                key={style.id}
                onClick={() => onSelect(style.id)}
                className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                  isSelected
                    ? 'border-teal-500 bg-teal-500/10 shadow-lg shadow-teal-500/20'
                    : 'border-gray-600 bg-dark-700 hover:border-teal-500/50 hover:bg-dark-700/50'
                }`}
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${style.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{style.name}</h3>
                <p className="text-gray-400">{style.description}</p>
              </button>
            )
          })}
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-dark-700 border border-gray-600 rounded-xl text-white font-semibold hover:bg-dark-600 transition-all"
          >
            ← Back
          </button>
          
          <button
            onClick={() => onSelect(tradingStyle)}
            disabled={!tradingStyle}
            className="px-8 py-4 bg-teal-500 hover:bg-teal-600 rounded-xl text-white font-semibold transition-all flex items-center gap-2 shadow-lg shadow-teal-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Build Your Roadmap
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  )
}