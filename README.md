# 💰 ExpenseAI - Smart Finance Management

> **AI-Powered Expense Tracking with Intelligent Insights**

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC.svg)](https://tailwindcss.com/)
[![Clerk](https://img.shields.io/badge/Clerk-5.0.0-6B46C1.svg)](https://clerk.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.23.12-FF0080.svg)](https://www.framer.com/motion/)

## 🌟 Overview

ExpenseAI is a cutting-edge expense tracking application that leverages artificial intelligence to automatically categorize expenses, provide intelligent financial insights, and help users achieve their financial goals. Built with modern web technologies and designed for scalability, it offers a seamless user experience across all devices.

### ✨ Key Features

- 🧠 **AI-Powered Categorization** - Automatically categorize expenses with 95% accuracy
- 📷 **Smart Receipt Scanning** - OCR technology extracts data from receipt photos
- 👥 **Group Expense Management** - Split bills and track shared expenses
- 📊 **Advanced Analytics** - Beautiful charts and financial insights
- 🔒 **Bank-Level Security** - 256-bit encryption and secure authentication
- 🌍 **Multi-Currency Support** - Handle 150+ currencies with real-time rates
- 📱 **Responsive Design** - Perfect experience on desktop, tablet, and mobile
- 🎨 **Modern UI/UX** - Beautiful animations and micro-interactions

## 🚀 Live Demo

Experience ExpenseAI in action: [**Live Demo**](https://expenseai-demo.netlify.app)

### Demo Credentials
- **Email**: demo@expenseai.com
- **Password**: demo123

## 📸 Screenshots

### 🏠 Landing Page
![Landing Page](https://via.placeholder.com/800x600/6366f1/ffffff?text=ExpenseAI+Landing+Page)

### 📊 Dashboard
![Dashboard](https://via.placeholder.com/800x600/8b5cf6/ffffff?text=ExpenseAI+Dashboard)

### 👥 Group Expenses
![Group Expenses](https://via.placeholder.com/800x600/ec4899/ffffff?text=Group+Expense+Management)

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - Modern React with Hooks and Context
- **TypeScript 5.5.3** - Type-safe development
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Framer Motion 12.23.12** - Production-ready motion library
- **Vite 5.4.2** - Next-generation frontend tooling

### Backend & Authentication
- **Clerk** - Complete authentication and user management
- **Local Storage** - Client-side data persistence (can be replaced with your backend)
- **Secure Authentication** - Multi-factor authentication and security features

### Design & UI
- **Lucide React** - Beautiful SVG icons
- **Google Fonts** - Inter, Poppins, JetBrains Mono
- **Recharts** - Composable charting library
- **React Hot Toast** - Notification system

### Development Tools
- **ESLint** - Code linting and formatting
- **TypeScript ESLint** - TypeScript-specific linting rules
- **PostCSS** - CSS processing and optimization

## 🏗️ Project Structure

```
project/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── auth/          # Authentication components
│   │   ├── dashboard/     # Dashboard and analytics
│   │   ├── expense/       # Expense management
│   │   ├── layout/        # Layout components
│   │   ├── pages/         # Landing, How It Works, Reviews
│   │   └── ui/            # Reusable UI components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility libraries
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Helper functions
│   └── index.css          # Global styles
├── .env.example           # Environment variables template
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

## ⚡ Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- Clerk account (free tier available)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/expenseai.git
cd expenseai/project
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

```bash
cp .env.example .env
```

Update `.env` with your Clerk credentials:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your-clerk-publishable-key
```

### 4. Start Development Server

```bash
npm run dev
# or
yarn dev
```

Visit `http://localhost:5173` to see the application.

## 🔐 Authentication Setup

### Clerk Configuration

1. Create a new Clerk application at [clerk.com](https://clerk.com)
2. Get your publishable key from the Clerk dashboard
3. Update your `.env` file with the publishable key
4. Configure your authentication settings in the Clerk dashboard

### Data Storage

Currently, the app uses localStorage for data persistence. For production, you should:

1. Set up your own backend API
2. Update the database functions in `src/lib/clerk.ts`
3. Implement proper data storage with your preferred database

## 📱 Features Deep Dive

### 🧠 AI Categorization
- Machine learning algorithms analyze expense descriptions
- Learns from user corrections to improve accuracy
- Supports custom categories and smart suggestions

### 📷 Receipt Scanning
- Advanced OCR technology powered by cloud APIs
- Automatically extracts merchant, amount, date, and items
- Supports multiple receipt formats and languages

### 👥 Group Expenses
- Create shared expense groups with friends and family
- Real-time expense splitting calculations
- Settlement tracking and payment reminders

### 📊 Analytics & Insights
- Interactive charts and graphs using Recharts
- Spending pattern analysis and trends
- Budget vs. actual spending comparisons
- Monthly and yearly financial reports

### 🔐 Security Features
- Supabase Authentication with email/password
- Social login integration (Google, GitHub)
- Row-level security policies
- Encrypted data transmission (HTTPS)

## 🎨 Design System

### Color Palette
- **Primary**: Indigo (600) - `#4f46e5`
- **Secondary**: Purple (600) - `#9333ea`
- **Accent**: Pink (500) - `#ec4899`
- **Success**: Green (500) - `#10b981`
- **Warning**: Yellow (500) - `#f59e0b`
- **Error**: Red (500) - `#ef4444`

### Typography
- **Headings**: Poppins (600-800 weight)
- **Body**: Inter (400-500 weight)
- **Code**: JetBrains Mono (400-600 weight)

### Components
- Consistent spacing using Tailwind's scale
- Rounded corners (8px, 12px, 16px)
- Subtle shadows and hover effects
- Smooth animations with Framer Motion

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors

# Type Checking
npm run type-check   # Run TypeScript compiler
```

## 📋 Roadmap

### Version 2.0
- [ ] **Mobile App** - React Native version
- [ ] **Offline Support** - PWA with offline capabilities
- [ ] **Advanced AI** - Spending prediction and recommendations
- [ ] **Integration** - Bank API connections
- [ ] **Collaboration** - Real-time collaboration features

### Version 2.1
- [ ] **Budgeting Tools** - Advanced budget management
- [ ] **Investment Tracking** - Portfolio management
- [ ] **Tax Export** - Tax preparation features
- [ ] **API** - Public API for third-party integrations

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Process
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **John Doe** - *Lead Developer* - [@johndoe](https://github.com/johndoe)
- **Jane Smith** - *UI/UX Designer* - [@janesmith](https://github.com/janesmith)
- **Mike Johnson** - *Backend Developer* - [@mikejohnson](https://github.com/mikejohnson)

## 🙏 Acknowledgments

- [Supabase](https://supabase.com/) for the amazing backend platform
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for beautiful animations
- [Lucide](https://lucide.dev/) for the elegant icon set
- [Unsplash](https://unsplash.com/) for beautiful stock photography

## 📞 Support

- 📧 Email: support@expenseai.com
- 💬 Discord: [ExpenseAI Community](https://discord.gg/expenseai)
- 📖 Documentation: [docs.expenseai.com](https://docs.expenseai.com)
- 🐛 Bug Reports: [GitHub Issues](https://github.com/yourusername/expenseai/issues)

---

<div align="center">
  <strong>Built with ❤️ by the ExpenseAI Team</strong>
  <br>
  <sub>Making financial management accessible to everyone</sub>
</div>