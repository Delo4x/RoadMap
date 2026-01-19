# TradeMap PRO - Trading Roadmap Builder

A professional web application for traders to build systematic trading roadmaps. Create, structure, and follow your trading strategy with clear step-by-step checklists.

## 🚀 Quick Deploy (Free!)

**Want to share with friends?** See [DEPLOYMENT.md](./DEPLOYMENT.md) for step-by-step instructions to deploy for FREE on:
- ✅ Vercel (Recommended - 2 minutes)
- ✅ Netlify
- ✅ Firebase Hosting
- ✅ GitHub Pages

## Features

- **User Authentication**: Secure login and signup system with user accounts
- **Data Persistence**: All strategies are automatically saved and can be accessed anytime
- **Strategy Management**: Create, edit, delete, and view all your trading strategies
- **Strategy Description & Refinement**: Describe your trading strategy and get an AI-enhanced structured version
- **Trading Style Selection**: Choose from Scalper, Day Trader, Swing Trader, or Position Trader
- **Roadmap Builder**: Create custom trading steps (1-7) with importance ratings (1-5)
- **Pre-Entry Checklist**: Confirm each step before entry with visual checkboxes
- **Score Calculation**: Get a percentage score based on completed steps and their importance
- **Auto-Save**: Strategies are automatically saved as you work
- **Modern 2026 Design**: Dark theme with smooth animations and professional UI

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
TradingRoadMap/
├── src/
│   ├── components/        # Reusable components (Header, etc.)
│   ├── contexts/          # React contexts (AuthContext)
│   ├── pages/            # Page components
│   │   ├── Login.tsx      # Login page
│   │   ├── Signup.tsx    # Signup page
│   │   ├── Dashboard.tsx  # Dashboard with strategy list
│   │   ├── StrategyBuilder.tsx  # Main strategy builder
│   │   ├── Step1Strategy.tsx    # Step 1: Strategy description
│   │   ├── Step2TradingStyle.tsx # Step 2: Trading style
│   │   ├── Step3Roadmap.tsx      # Step 3: Roadmap builder
│   │   └── Step4Checklist.tsx   # Step 4: Pre-entry checklist
│   ├── services/         # API service layer
│   │   └── api.ts        # Data persistence functions
│   ├── types.ts          # TypeScript type definitions
│   ├── App.tsx           # Main app with routing
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── index.html
├── package.json
├── tsconfig.json
└── tailwind.config.js
```

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **React Router** - Routing and navigation
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Lucide React** - Icons
- **LocalStorage** - Data persistence (can be easily swapped with backend API)

## Usage Flow

1. **Sign Up / Login**: Create an account or sign in to access your strategies
2. **Dashboard**: View all your saved strategies or create a new one
3. **Step 1**: Describe your trading strategy in natural language
4. **Step 2**: Select your trading style (Scalper, Day Trader, Swing Trader, Position Trader)
5. **Step 3**: Build your roadmap by adding steps 1-6, with step 7 always being "Entry Execution"
   - Each step has a title, description, and importance rating (1-5)
   - Strategies are auto-saved as you work
6. **Step 4**: Use the pre-entry checklist to confirm each step before entry
   - The score is calculated based on completed steps and their importance
   - Score ≥ 70% = "GOOD SETUP" - Proceed with standard risk
   - Score ≥ 85% = "EXCELLENT SETUP" - Proceed with confidence
7. **Save & Return**: Save your strategy and return to dashboard to manage all strategies

## Data Storage

Currently, the app uses **localStorage** for data persistence. This means:
- Data is stored locally in each user's browser
- Each user's strategies are isolated
- To use a backend API, simply update the functions in `src/services/api.ts`

The API service layer is designed to be easily replaceable with real backend calls.

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions on deploying to free hosting platforms.

**Quick Deploy:**
1. Push code to GitHub ✅
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repo
4. Deploy (takes 2 minutes!)
5. Share the URL with friends

## Version

v2.0.26

## License

MIT