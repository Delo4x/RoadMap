
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
