# SkillArena - Gamified Learning & Game Testing Platform

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-purple.svg)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-2.39.0-green.svg)](https://supabase.com/)

## 🎮 Project Description

SkillArena is a comprehensive, AI-powered gamified learning platform that transforms the way people learn game development, programming, and technical skills. The platform combines interactive tutorials, hands-on skill development, professional game testing opportunities, and a vibrant marketplace for digital assets and educational resources.

### 🌟 Vision

To create the world's most engaging and effective platform for learning game development and programming skills while providing real-world experience through professional game testing opportunities.

## ✨ Key Features and Functionality

### 🎯 Core Learning Features
- **Interactive Skills System**: 100+ comprehensive skill tracks across multiple categories
- **Hands-on Tutorials**: Step-by-step interactive tutorials with live code editors
- **AI-Powered Assistant**: 24/7 AI support for learning guidance and problem-solving
- **Progress Tracking**: Detailed analytics and progress visualization
- **Gamification**: XP system, badges, achievements, and leaderboards

### 🎮 Game Testing Platform
- **Professional Testing**: 100+ game testing methods and scenarios
- **Real Earnings**: Monetize your testing skills with partner studios
- **Quality Assurance**: Comprehensive bug reporting and performance testing tools
- **Studio Partnerships**: Direct connections with game development studios

### 🛒 Digital Marketplace
- **100,000+ Products**: Extensive catalog of development tools, assets, and resources
- **Educational Content**: Premium courses, tutorials, and certification programs
- **Digital Assets**: 3D models, textures, audio, and game development resources
- **Secure Transactions**: Stripe-powered payment processing

### 🏆 Community & Competition
- **Challenges**: 100+ coding and game development challenges
- **Leaderboards**: Global and category-specific rankings
- **Community Forums**: Connect with fellow developers and learners
- **Team Collaboration**: Team workspaces and project collaboration tools

### 📜 Certification System
- **Industry Recognition**: Professional certificates recognized by top studios
- **Blockchain Verification**: Tamper-proof credential verification
- **Portfolio Integration**: Showcase achievements and skills
- **Career Advancement**: Direct job placement assistance

## 🛠 Technologies/Languages Used

### Frontend
- **React 18.3.1** - Modern React with hooks and concurrent features
- **TypeScript 5.5.3** - Type-safe development
- **Vite 5.4.2** - Lightning-fast build tool and dev server
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Lucide React 0.344.0** - Beautiful, customizable icons

### Backend & Database
- **Supabase 2.39.0** - Backend-as-a-Service with PostgreSQL
- **PostgreSQL** - Robust relational database
- **Row Level Security (RLS)** - Advanced security policies
- **Real-time subscriptions** - Live data updates

### Payment & Subscriptions
- **Stripe 14.12.0** - Payment processing and subscription management
- **Stripe Checkout** - Secure payment flows
- **Stripe Webhooks** - Real-time payment event handling

### Development Tools
- **ESLint** - Code linting and quality assurance
- **PostCSS & Autoprefixer** - CSS processing and vendor prefixes
- **GitHub Actions** - CI/CD pipeline (when configured)

### AI & Machine Learning
- **OpenAI Integration** - AI-powered learning assistant
- **Natural Language Processing** - Intelligent content understanding

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.0.0 or higher)
- **npm** (version 8.0.0 or higher) or **yarn**
- **Git** for version control
- **Modern web browser** (Chrome, Firefox, Safari, Edge)

## 🚀 Installation Instructions

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/skillarena.git
cd skillarena
```

### Step 2: Install Dependencies

```bash
npm install
# or
yarn install
```

### Step 3: Environment Configuration

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Configure the following environment variables:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# OpenAI Configuration (Optional)
OPENAI_API_KEY=your_openai_api_key
```

### Step 4: Database Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Run the database migrations:

```bash
npx supabase db push
```

3. Set up Row Level Security policies (included in migrations)

### Step 5: Stripe Configuration

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Configure your products and pricing in the Stripe Dashboard
3. Update the `stripe-config.ts` file with your product IDs
4. Set up webhook endpoints for payment processing

### Step 6: Start Development Server

```bash
npm run dev
# or
yarn dev
```

Visit `http://localhost:5173` to see the application running.

## 📖 Usage Instructions

### Getting Started

1. **Sign Up/Login**: Create an account or use the trial mode (F1 key)
2. **Explore Dashboard**: Navigate through your personalized learning dashboard
3. **Choose Learning Path**: Select skills, tutorials, or challenges based on your goals
4. **Track Progress**: Monitor your XP, badges, and skill completion
5. **Join Community**: Participate in forums and team collaboration

### Code Examples

#### Basic Component Usage

```typescript
import { useState, useEffect } from 'react';
import { supabaseService } from './services/supabase';

function SkillProgress() {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const loadProgress = async () => {
      const user = await supabaseService.getCurrentUser();
      // Load user progress
    };
    loadProgress();
  }, []);

  return (
    <div className="progress-bar">
      <div 
        className="progress-fill" 
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
```

#### Subscription Management

```typescript
import { subscriptionService } from './services/subscriptionService';

// Check feature access
const hasAccess = await subscriptionService.checkFeatureAccess('premiumTutorials');

// Get current subscription
const subscription = await subscriptionService.getCurrentUserSubscription();
```

#### Stripe Payment Integration

```typescript
import { stripeService } from './services/stripe';

// Create checkout session
const handlePurchase = async (priceId: string) => {
  try {
    await stripeService.purchaseProduct(priceId, 'subscription');
  } catch (error) {
    console.error('Payment failed:', error);
  }
};
```

## ⚙️ Configuration Details

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | Yes |
| `STRIPE_SECRET_KEY` | Stripe secret key | Yes |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | Yes |
| `OPENAI_API_KEY` | OpenAI API key for AI features | No |

### Subscription Tiers

The application supports three subscription tiers:

1. **Freemium** - Basic access with limitations
2. **Premium Individual** - Full access for individual learners
3. **Teams & Enterprise** - Advanced features for organizations

### Database Schema

Key tables include:
- `users` - User profiles and settings
- `stripe_customers` - Stripe customer mappings
- `stripe_subscriptions` - Subscription data
- `stripe_orders` - One-time purchase records

## 📚 API Documentation

### Supabase Edge Functions

#### Stripe Checkout

```typescript
POST /functions/v1/stripe-checkout
Headers: Authorization: Bearer <jwt_token>
Body: {
  price_id: string,
  success_url: string,
  cancel_url: string,
  mode: 'subscription' | 'payment'
}
```

#### Stripe Webhook

```typescript
POST /functions/v1/stripe-webhook
Headers: stripe-signature: <signature>
Body: <stripe_event_payload>
```

### Frontend Services

#### SupabaseService

```typescript
class SupabaseService {
  async signUp(email: string, password: string, fullName?: string)
  async signIn(email: string, password: string)
  async signOut()
  async getCurrentUser(): Promise<SupabaseUser | null>
  async getUserSubscription(): Promise<UserSubscription | null>
}
```

#### SubscriptionService

```typescript
class SubscriptionService {
  async getCurrentUserSubscription(): Promise<UserSubscriptionData>
  async checkFeatureAccess(feature: string): Promise<{hasAccess: boolean, reason?: string}>
  async checkUsageLimit(limitType: string): Promise<{withinLimit: boolean, remaining: number}>
}
```

## 📦 Dependencies and Requirements

### Production Dependencies

```json
{
  "@stripe/stripe-js": "^2.4.0",
  "@supabase/supabase-js": "^2.39.0",
  "lucide-react": "^0.344.0",
  "openai": "^4.24.1",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "stripe": "^14.12.0"
}
```

### Development Dependencies

```json
{
  "@vitejs/plugin-react": "^4.3.1",
  "autoprefixer": "^10.4.18",
  "eslint": "^9.9.1",
  "postcss": "^8.4.35",
  "tailwindcss": "^3.4.1",
  "typescript": "^5.5.3",
  "vite": "^5.4.2"
}
```

### System Requirements

- **Node.js**: 18.0.0+
- **Browser Support**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Memory**: 4GB RAM minimum, 8GB recommended
- **Storage**: 1GB free space for development

## 🤝 Contributing Guidelines

We welcome contributions! Please follow these guidelines:

### Getting Started

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Add tests if applicable
5. Run the test suite: `npm test`
6. Commit your changes: `git commit -m 'Add amazing feature'`
7. Push to the branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

### Code Standards

- Follow TypeScript best practices
- Use ESLint configuration provided
- Write meaningful commit messages
- Include JSDoc comments for complex functions
- Maintain test coverage above 80%

### Pull Request Process

1. Update README.md with details of changes if needed
2. Update version numbers following SemVer
3. Ensure all tests pass
4. Get approval from at least two maintainers
5. Squash commits before merging

### Reporting Issues

Please use GitHub Issues to report bugs or request features:

- Use clear, descriptive titles
- Include steps to reproduce
- Provide environment details
- Add screenshots if applicable

## 📄 License Information

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 SkillArena

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

## 📞 Contact Information/Support

### Development Team

- **Lead Developer**: [Your Name](mailto:dev@skillarena.com)
- **Project Manager**: [PM Name](mailto:pm@skillarena.com)
- **DevOps Engineer**: [DevOps Name](mailto:devops@skillarena.com)

### Support Channels

- **Documentation**: [docs.skillarena.com](https://docs.skillarena.com)
- **Community Discord**: [discord.gg/skillarena](https://discord.gg/skillarena)
- **GitHub Issues**: [GitHub Issues](https://github.com/your-username/skillarena/issues)
- **Email Support**: [support@skillarena.com](mailto:support@skillarena.com)

### Business Inquiries

- **Partnerships**: [partnerships@skillarena.com](mailto:partnerships@skillarena.com)
- **Enterprise Sales**: [enterprise@skillarena.com](mailto:enterprise@skillarena.com)
- **Media Inquiries**: [media@skillarena.com](mailto:media@skillarena.com)

## 🙏 Acknowledgments

### Open Source Libraries

- **React Team** - For the amazing React framework
- **Vercel** - For the lightning-fast Vite build tool
- **Supabase** - For the incredible backend-as-a-service platform
- **Stripe** - For secure and reliable payment processing
- **Tailwind Labs** - For the utility-first CSS framework

### Contributors

- All our amazing contributors who have helped shape this project
- The open-source community for inspiration and support
- Beta testers and early adopters for valuable feedback

### Special Thanks

- **Game Development Studios** - For partnering with us for testing opportunities
- **Educational Institutions** - For validating our learning approach
- **Our Users** - For making this platform a success

### Resources

- [React Documentation](https://reactjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Supabase Guides](https://supabase.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

<div align="center">

**Built with ❤️ by the SkillArena Team**

[Website](https://skillarena.com) • [Documentation](https://docs.skillarena.com) • [Community](https://discord.gg/skillarena) • [Twitter](https://twitter.com/skillarena)

</div>