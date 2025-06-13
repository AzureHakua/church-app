### **Development Tools**
- **ESLint** - Code linting with Next.js and TypeScript rules
- **PostCSS** - CSS processing and optimization
- **Node.js 20.11.0** - Specified runtime environment# CỘNG ĐOÀN THÁNH GIUSE (Saint Joseph Vietnamese Parish) ⛪

A comprehensive church website and donation platform built for the Vietnamese Catholic community in Boston's Northshore area. **Currently live with 1.35k unique visitors monthly** featuring integrated payment processing, dynamic content management, and multilingual support deployed on Cloudflare Pages.

## 🚀 Live Demo

[View Live Site](https://stjosephvietnameseparish.org/) | [View Repository](https://github.com/AzureHakua/church-app)

## ✨ Key Features

### **Community Management**
- **Multilingual Support** - Vietnamese and English content
- **Responsive Design** - Optimized for all devices and screen sizes
- **Mass Schedule Display** - Weekly schedule with multiple language services
- **Clergy & Staff Directory** - Contact information and organizational structure

### **Payment Integration**
- **Stripe Payment Processing** - Secure one-time and recurring donations
- **Multiple Donation Options** - $20, $50, $100 monthly recurring plans
- **PCI Compliance** - Industry-standard security for financial transactions
- **Custom Donation Amounts** - Flexible giving options for parishioners

### **Dynamic Content System**
- **PDF Bulletin Management** - Admin-controlled monthly bulletin uploads
- **YouTube Integration** - Latest sermon/mass videos with API caching
- **Cloudflare R2 Storage** - Serverless file hosting and management
- **Admin Authentication** - Secure content management with bcrypt hashing

### **Advanced Features**
- **Serverless Architecture** - Cloudflare Functions for backend operations
- **State Management** - Zustand for client-side state persistence
- **PDF Rendering** - React-PDF for in-browser document viewing
- **API Integration** - YouTube Data API v3 for live content updates

## 🛠️ Technology Stack

### **Frontend**
- **Next.js 15** - React framework with App Router and static export
- **TypeScript** - Type-safe development with strict configuration
- **Tailwind CSS** - Utility-first styling with custom design system
- **React 19** - Latest React features and concurrent rendering

### **Deployment & Infrastructure**
- **Cloudflare Pages** - Global CDN with edge optimization and automatic deployments
- **Cloudflare Functions** - Serverless API endpoints for backend operations
- **Cloudflare R2** - Object storage for PDF bulletins and media files
- **Custom Domain** - Professional domain with SSL/TLS encryption

### **APIs & Integrations**
- **Stripe API** - Payment processing and subscription management
- **YouTube Data API** - Video content integration with intelligent caching
- **Cloudflare Workers** - Edge computing for enhanced performance

### **State Management & Security**
- **Zustand** - Lightweight state management with persistence
- **bcryptjs** - Password hashing for admin authentication
- **Local Storage** - Session persistence and caching

## 🏗️ Architecture

```
src/
├── app/
│   ├── about/page.tsx          # Saint Joseph teachings (12 characteristics)
│   ├── bulletin/page.tsx       # PDF bulletin viewer with admin upload
│   ├── donate/page.tsx         # Stripe payment integration
│   ├── mass/page.tsx          # Schedule and YouTube integration
│   └── layout.tsx             # Root layout with navigation
├── components/
│   ├── PDFViewer.tsx          # React-PDF document renderer
│   ├── LatestYoutubeVideo.tsx # YouTube API integration
│   ├── Stripe*.tsx            # Payment button components
│   └── Navbar.tsx             # Responsive navigation
├── store/
│   └── auth.ts                # Zustand authentication store
└── functions/
    └── api/
        ├── upload.ts          # Cloudflare Function for file uploads
        └── types.d.ts         # TypeScript definitions
```

## 💳 Payment System Architecture

### **Stripe Integration**
- **Buy Button Components** - Embedded Stripe checkout flows
- **Subscription Management** - Recurring donation handling
- **Security** - Environment-based API key management
- **Multiple Plans** - Tiered giving options ($20, $50, $100/month)

### **Serverless Upload System**
- **Cloudflare R2** - Scalable object storage
- **Admin Authentication** - Secure file upload with password protection
- **PDF Processing** - Document validation and storage

## 🎯 Key Technical Implementations

### **YouTube API Integration**
```typescript
// Cached API requests with localStorage
const CACHE_DURATION = 3600000; // 1 hour
const response = await fetch(
  `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}`
);
```

### **Secure Authentication**
- **bcrypt Hashing** - Password security with salt rounds
- **Session Management** - 24-hour authentication expiry
- **Persistent Storage** - Zustand with localStorage persistence

### **PDF Rendering**
- **React-PDF** - Client-side PDF rendering with worker threads
- **Responsive Design** - Dynamic width adjustment
- **Navigation Controls** - Page-by-page viewing with download option

## 🌐 Deployment & Performance

### **Cloudflare Pages Deployment**
- **Edge Optimization** - Global CDN with 280+ locations
- **Automatic Deployments** - Git-based CI/CD pipeline
- **Custom Domain** - Professional SSL/TLS encryption
- **Zero-Config Scaling** - Automatic traffic handling

### **Performance Optimizations**
- **Edge Caching** - Cloudflare CDN with 17MB cached for optimal delivery
- **Code Splitting** - Route-based lazy loading
- **API Caching** - YouTube data caching to reduce API calls
- **Image Optimization** - WebP conversion and responsive sizing
- **Real Metrics** - 60.58k monthly requests with consistent performance

## 🚀 Getting Started

### Prerequisites
- Node.js 20.11.0+
- Stripe account with API keys
- YouTube Data API key
- Cloudflare account with R2 storage

### Installation

1. **Clone the repository**
```bash
git clone [your-repo-url]
cd church-website
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment setup**
```bash
# Create .env.local file
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_YOUTUBE_API_KEY=AIza...
NEXT_PUBLIC_ADMIN_PASSWORD_HASH=\$2a\$12\$...
```

4. **Generate admin password hash**
```bash
node scripts/generate-password.js
```

5. **Run development server**
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

## 📱 Responsive Design

- **Mobile-First** - Optimized for smartphone users
- **Tablet Support** - Grid layouts adapt to medium screens
- **Desktop Enhancement** - Full-width layouts with advanced features
- **Accessibility** - Semantic HTML and screen reader support

## 🔒 Security Features

- **Environment Variables** - Secure API key management
- **Password Hashing** - bcrypt with 12 salt rounds
- **HTTPS Enforcement** - Secure data transmission
- **Input Validation** - File type and size restrictions

## 📊 Real-World Impact & Performance Metrics

**Live Production Analytics (30-day period):**
- **1.35k Unique Visitors** - Consistent community engagement
- **60.58k Total Requests** - High user interaction and content consumption
- **468 MB Data Served** - Rich media content including PDFs and videos
- **3.73% Cache Hit Rate** - Optimized for dynamic content delivery
- **17 MB Cached Data** - Efficient content delivery optimization

**Business & Technical Impact:**
- **Revenue Generation** - Processing real donations through secure Stripe integration
- **Community Engagement** - Serving Vietnamese Catholic diaspora in Boston area
- **Full-Stack Architecture** - Frontend, serverless backend, and database integration
- **Enterprise-Grade Infrastructure** - Cloudflare's global network ensuring reliable access
- **Scalable Design** - Handling 2k+ requests daily with sub-second response times
- **Content Management** - Streamlined workflow for clergy to update bulletins and announcements
- **Cross-Cultural Communication** - Serving Vietnamese, English, and Spanish-speaking congregants

## 🎨 Design Highlights

- **Cultural Sensitivity** - Vietnamese language support and religious imagery
- **User Experience** - Intuitive navigation for diverse age groups
- **Visual Hierarchy** - Clear information organization
- **Brand Consistency** - Religious theme with modern web standards

## 🔧 Development Highlights

- **TypeScript Strict Mode** - Enhanced type safety
- **Component Architecture** - Reusable, maintainable components
- **Error Handling** - Comprehensive error states and user feedback
- **Performance Monitoring** - Optimized loading and caching strategies

---

*This project showcases advanced full-stack development including payment processing, serverless architecture, and real-world deployment for a live community website serving Vietnamese Catholic parishioners.*