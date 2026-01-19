import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import type { StrategyData } from '../types'

interface Step1StrategyProps {
  strategyData: StrategyData
  updateStrategy: (updates: Partial<StrategyData>) => void
  onNext: () => void
}

export default function Step1Strategy({ strategyData, updateStrategy, onNext }: Step1StrategyProps) {
  const [inputValue, setInputValue] = useState(strategyData.originalDescription)
  const [isRefining, setIsRefining] = useState(false)

  const refineStrategy = () => {
    if (!inputValue.trim()) return

    setIsRefining(true)
    updateStrategy({ originalDescription: inputValue })

    // Simulate AI refinement
    setTimeout(() => {
      const refined = refineStrategyText(inputValue)
      const name = extractStrategyName(inputValue)
      updateStrategy({
        refinedDescription: refined,
        refinedName: name,
      })
      setIsRefining(false)
    }, 1500)
  }

  const handleNext = () => {
    if (strategyData.refinedDescription) {
      onNext()
    }
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
          Build Your Trading Roadmap
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Create a systematic approach to every trade. Define your strategy, set your criteria, and never miss a step again.
        </p>
      </div>

      <div className="bg-dark-800 rounded-2xl border border-teal-500/30 p-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-4">Describe Your Trading Strategy</h2>
        <p className="text-gray-400 mb-6">
          Tell us about your strategy in your own words. We'll help you structure it into a clear roadmap.
        </p>

        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Example: I trade breakouts from consolidation patterns on the 15-minute chart. I look for volume confirmation and only enter after a retest of the breakout level..."
          className="w-full h-40 bg-dark-700 border border-gray-600 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50 transition-all resize-none"
        />

        <button
          onClick={refineStrategy}
          disabled={!inputValue.trim() || isRefining}
          className="mt-6 px-6 py-3 bg-dark-700 border border-teal-500 rounded-xl text-white font-semibold hover:bg-teal-500/10 hover:border-teal-400 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Sparkles className="w-5 h-5 text-teal-400" />
          {isRefining ? 'Refining...' : 'Refine & Structure'}
        </button>

        {strategyData.refinedDescription && (
          <div className="mt-8 p-6 bg-dark-700/50 rounded-xl border border-teal-500/20 animate-slide-up">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-teal-400" />
              <h3 className="text-xl font-bold text-white">Refined Strategy</h3>
            </div>
            {strategyData.refinedName && (
              <h4 className="text-lg font-semibold text-teal-400 mb-3">
                {strategyData.refinedName}
              </h4>
            )}
            <p className="text-gray-300 mb-4">{strategyData.refinedDescription}</p>
            <p className="text-gray-400 text-sm mb-6">Key elements include:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Clear entry and exit criteria</li>
              <li>Risk management parameters</li>
              <li>Market condition filters</li>
              <li>Time-based execution rules</li>
            </ul>

            <button
              onClick={handleNext}
              className="mt-6 w-full px-6 py-4 bg-teal-500 hover:bg-teal-600 rounded-xl text-white font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-500/50"
            >
              Continue to Trading Style
              <span>→</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function refineStrategyText(text: string): string {
  // Simple refinement logic - in production, this would use AI/ML
  const upperText = text.toUpperCase()
  if (upperText.includes('BREAKOUT')) {
    return `This strategy focuses on identifying high-probability setups through systematic analysis of breakout patterns. Key elements include: Clear identification of consolidation zones, volume confirmation for breakouts, retest validation before entry, and precise entry/exit criteria based on price action confirmation. The strategy emphasizes risk management through predefined stop-loss levels and position sizing based on volatility metrics.`
  }
  
  return `This strategy focuses on identifying high-probability setups through systematic analysis. Key elements include: Clear entry and exit criteria based on technical indicators, comprehensive risk management parameters that protect capital while allowing for optimal position sizing, market condition filters that ensure trades are taken only in favorable environments, and time-based execution rules that align with your trading schedule and market sessions.`
}

function extractStrategyName(text: string): string {
  // Extract strategy name - look for all caps or quoted text
  const lines = text.split('\n')
  const firstLine = lines[0].trim()
  
  if (firstLine === firstLine.toUpperCase() && firstLine.length < 50) {
    return firstLine
  }
  
  // Check for common patterns
  const patterns = [
    /([A-Z][A-Z\s]+)/,
    /"([^"]+)"/,
    /'([^']+)'/,
  ]
  
  for (const pattern of patterns) {
    const match = text.match(pattern)
    if (match && match[1].length < 50) {
      return match[1].toUpperCase()
    }
  }
  
  // Default: take first few words
  const words = text.split(' ').slice(0, 4).join(' ')
  return words.toUpperCase()
}