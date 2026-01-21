import { useState, useEffect } from 'react'
import { Plus, TrendingUp, Trash2, Calendar, LogOut } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { getStrategies, deleteStrategy, type SavedStrategy } from '../services/api'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [strategies, setStrategies] = useState<SavedStrategy[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    loadStrategies()
  }, [user, navigate])

  const loadStrategies = async () => {
    if (!user) return
    setIsLoading(true)
    const data = await getStrategies(user.id)
    setStrategies(data)
    setIsLoading(false)
  }

  const handleDelete = async (strategyId: string) => {
    if (!user) return
    if (!confirm('Are you sure you want to delete this strategy?')) return
    
    await deleteStrategy(user.id, strategyId)
    loadStrategies()
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="min-h-screen">
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

        <div className="flex items-center gap-4">
          <span className="text-gray-300">Welcome, {user?.name}</span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-dark-700 border border-gray-600 rounded-lg text-gray-300 hover:bg-dark-600 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent mb-2">
              My Trading Roadmaps
            </h1>
            <p className="text-gray-400">Manage and access your saved trading strategies</p>
          </div>
          <button
            onClick={() => navigate('/builder')}
            className="px-6 py-3 bg-teal-500 hover:bg-teal-600 rounded-xl text-white font-semibold transition-all flex items-center gap-2 shadow-lg shadow-teal-500/50"
          >
            <Plus className="w-5 h-5" />
            New Strategy
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            <p className="text-gray-400 mt-4">Loading strategies...</p>
          </div>
        ) : strategies.length === 0 ? (
          <div className="bg-dark-800 rounded-2xl border border-teal-500/30 p-12 text-center">
            <TrendingUp className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">No strategies yet</h3>
            <p className="text-gray-400 mb-6">Create your first trading roadmap to get started</p>
            <button
              onClick={() => navigate('/builder')}
              className="px-6 py-3 bg-teal-500 hover:bg-teal-600 rounded-xl text-white font-semibold transition-all inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Strategy
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {strategies.map((strategy) => (
              <div
                key={strategy.id}
                className="bg-dark-800 rounded-xl border border-teal-500/30 p-6 hover:border-teal-500/50 transition-all cursor-pointer group"
                onClick={() => navigate(`/builder/${strategy.id}`)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-teal-400 transition-colors">
                      {strategy.name}
                    </h3>
                    {strategy.tradingStyle && (
                      <span className="inline-block px-2 py-1 bg-teal-500/20 text-teal-400 text-xs rounded-lg">
                        {strategy.tradingStyle.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete(strategy.id)
                    }}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {strategy.refinedDescription || strategy.originalDescription}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(strategy.updatedAt)}
                  </div>
                  <span>{strategy.roadmap.length} steps</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="text-center py-6 text-gray-500 text-sm">
        TradeMap PRO — Systematic Trading for Serious Traders
      </footer>
    </div>
  )
}