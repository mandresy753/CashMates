# CashMate - Smart Financial Management App

CashMate is a modern, full-featured financial management application built with React, TypeScript, and Supabase. Track your expenses, manage income, and gain insights into your financial habits with beautiful visualizations and an intuitive interface.

## 🚀 Features

### Core Functionality
- **Beautiful Landing Page** - Compelling introduction with smooth animations
- **User Authentication** - Secure registration and login with JWT
- **Interactive Dashboard** - Visual analytics with charts and key metrics
- **Expense Tracking** - Add, edit, delete, and categorize expenses
- **Income Management** - Track multiple income sources
- **Advanced Filtering** - Filter by date, category, amount, and search terms
- **Real-time Statistics** - Live updates of financial metrics

### User Experience
- **Dark/Light Mode** - Seamless theme switching
- **Responsive Design** - Perfect on mobile, tablet, and desktop
- **Smooth Animations** - Framer Motion powered interactions
- **Profile Management** - Update personal information and settings
- **Intuitive Icons** - Clear visual indicators for all actions

### Technical Features
- **Modern Architecture** - React 18 with TypeScript
- **Supabase Backend** - Real-time database and authentication
- **Interactive Charts** - Recharts for beautiful data visualization
- **Form Management** - React Hook Form with validation
- **State Management** - Custom hooks for clean data flow

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (Database + Auth)
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Forms**: React Hook Form
- **Routing**: React Router v6
- **Icons**: Heroicons
- **Build Tool**: Vite
- **Deployment**: Bolt Hosting

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js (v16 or higher)
- npm or yarn
- A Supabase account and project

## 🚀 Quick Start

### 1. Setup Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings → API to get your project URL and anon key
3. Click "Connect to Supabase" in the top right corner of this app
4. The database schema will be automatically created

### 2. Run the Application

The app is ready to run! The development server is already configured.

```bash
# The dev server is already running
# Visit the app in your browser
```

### 3. Start Using CashMate

1. Visit the landing page and explore the features
2. Click "Start Your Journey" to create an account
3. Sign in and start tracking your finances!

## 📊 Database Schema

The app automatically creates the following tables:

### Users Table
- `id` (UUID, Primary Key)
- `email` (Text, Unique)
- `name` (Text)
- `profile_picture_path` (Text, Optional)
- `created_at` (Timestamp)

### Transactions Table
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key)
- `type` (Text: 'income' | 'expense')
- `amount` (Decimal)
- `category` (Text)
- `description` (Text, Optional)
- `date` (Date)
- `created_at` (Timestamp)

### Categories (Predefined)
- Food & Dining 🍽️
- Transportation 🚗
- Shopping 🛍️
- Entertainment 🎬
- Bills & Utilities 📱
- Healthcare 🏥
- Education 📚
- Travel ✈️
- Salary 💰
- Freelance 💻
- Investment 📈
- Gift 🎁

## 🎨 Design System

### Colors
- **Primary**: Blue (#3B82F6)
- **Secondary**: Purple (#8B5CF6)
- **Success**: Green (#10B981)
- **Warning**: Orange (#F59E0B)
- **Error**: Red (#EF4444)
- **Neutral**: Gray scales

### Typography
- **Headings**: 120% line height, bold weights
- **Body**: 150% line height, regular weight
- **Maximum**: 3 font weights used consistently

### Spacing
- **System**: 8px base unit
- **Consistent**: All elements use multiples of 8px

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

### Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Navbar.tsx       # Navigation bar
│   ├── TransactionForm.tsx # Add/edit transaction modal
│   └── ProtectedRoute.tsx  # Route protection
├── hooks/               # Custom React hooks
│   ├── useAuth.ts       # Authentication logic
│   ├── useTransactions.ts # Transaction management
│   └── useTheme.ts      # Theme management
├── lib/                 # Utilities and configuration
│   └── supabase.ts      # Supabase client and types
├── pages/               # Page components
│   ├── LandingPage.tsx  # Home/marketing page
│   ├── LoginPage.tsx    # User login
│   ├── RegisterPage.tsx # User registration
│   ├── Dashboard.tsx    # Main dashboard
│   ├── ExpensesPage.tsx # Expense management
│   ├── IncomesPage.tsx  # Income management
│   └── SettingsPage.tsx # User settings
└── App.tsx              # Main application component
```

## 🔒 Security Features

- **Row Level Security (RLS)** - Users can only access their own data
- **JWT Authentication** - Secure token-based authentication
- **Input Validation** - Client and server-side validation
- **Protected Routes** - Authenticated access only
- **HTTPS Only** - Secure communication

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🎯 Key Features Walkthrough

### Landing Page
- Compelling hero section with CashMate branding
- Feature highlights with icons and descriptions
- Call-to-action buttons for registration/login
- Smooth scroll animations and micro-interactions

### Dashboard
- Financial overview with key metrics cards
- Interactive donut chart for expense categories
- 7-day trend line chart for income vs expenses
- Quick action buttons for adding transactions
- Recent transactions list with category icons

### Expense/Income Management
- Comprehensive list view with pagination
- Advanced filtering by date, category, and amount
- Search functionality across descriptions
- In-line editing and deletion with confirmations
- Visual feedback for all interactions

### Settings
- Profile management with photo upload support
- Theme toggle with smooth transitions
- Account information display
- Secure sign-out functionality

## 🤝 Contributing

This is a demonstration application. For production use, consider:

1. Adding comprehensive error handling
2. Implementing data export/import
3. Adding budget planning features
4. Creating financial reports
5. Adding notification system

## 📄 License

This project is created for demonstration purposes. Feel free to use it as a reference for your own financial management applications.

## 🎉 Getting Started

Ready to take control of your finances? Click the "Connect to Supabase" button in the top right corner to set up your database, then start tracking your money with CashMate!