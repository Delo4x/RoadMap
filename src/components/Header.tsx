import { TrendingUp } from 'lucide-react'

interface HeaderProps {
  currentStep: number
}

export default function Header({ currentStep }: HeaderProps) {
  return (
    <header className="w-full px-6 py-4 flex items-center justify-between bg-dark-900/50 backdrop-blur-sm border-b border-teal-500/20">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-lg bg-teal-500 flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-dark-900" />
        </div>
        <div className="flex flex-col">
          <span className="text-white font-semibold text-lg">TradeMap</span>
          <span className="text-gray-400 text-xs">PRO</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                step <= currentStep
                  ? 'bg-teal-500 text-dark-900 shadow-lg shadow-teal-500/50'
                  : 'bg-dark-700 border border-gray-600 text-gray-400'
              }`}
            >
              {step}
            </div>
            {step < 4 && (
              <div
                className={`h-0.5 w-12 transition-all duration-300 ${
                  step < currentStep ? 'bg-teal-500' : 'bg-gray-600'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="text-gray-400 text-sm">v2.0.26</div>
    </header>
  )
}