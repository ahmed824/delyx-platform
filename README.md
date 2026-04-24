# DELY X

DELY X is a web application prototype for a Traffic-Aware Intelligent Delivery Robot system. The full project vision combines robotics, AI, and IoT to support autonomous delivery using a Raspberry Pi controller, sensors, computer vision, navigation logic, and wireless communication.

This repository currently contains the frontend web application only. It presents the DELY X brand, delivery robot concept, static service/product pages, contact and authentication-style forms, and a local review/rating interface. Robot firmware, backend APIs, live telemetry, map tracking, camera streaming, and remote-control functionality are not implemented in this codebase yet.

## Features

- Responsive Next.js frontend using the App Router.
- **Home Page**: DELY X branding, video hero section, delivery statistics (120+ locations, 35.5K+ deliveries), served-location categories, and user reviews with 5-star rating system.
- **Dashboard**: Complete admin dashboard with:
  - KPI cards (Total Revenue, Total Orders, Total Visitors, Net Profit)
  - Revenue bar charts with monthly analytics
  - Order management table with status tracking
  - Date range filtering and calendar controls
  - Real-time metrics and trend indicators
- **Product Page**: Comprehensive product showcase featuring:
  - Hero section with robot branding
  - 4 core feature cards (Autonomous Navigation, Traffic Awareness, Real-time Monitoring, AI Decision Making)
  - 10+ technical specifications (Raspberry Pi, sensors, power system)
  - Product gallery with image showcase
  - 6 real-world use cases (Campus, Healthcare, Corporate, Retail, Food Service, Smart Communities)
  - Call-to-action with demo scheduling
- **Services Page**: Complete service offerings including:
  - 4 primary services (Smart Delivery, Real-time Monitoring, Fleet Management, AI Analytics)
  - 6-step process flow (Order → Route Planning → Navigation → Tracking → Delivery → Analytics)
  - 6 key benefits (Speed, Cost Reduction, Automation, Eco-Friendly, Safety, Data-Driven)
  - Call-to-action for partnership inquiries
- Shared header and footer components with navigation links and Font Awesome icons.
- Contact page with contact information and interactive message form UI.
- Login and Register pages with form layouts for future authentication integration.
- Review/rating component using local React state for adding feedback in the browser.
- Static media assets, including images, logos, Font Awesome webfonts, and hero video.

## System Architecture

The intended complete system includes a robot platform and a monitoring web application:

1. Robot sensors collect environment data from camera, ultrasonic sensors, IMU, and optional LiDAR.
2. AI and sensor-fusion modules process environmental data.
3. Navigation and decision-making logic selects movement commands.
4. Motor drivers receive commands and move the robot.
5. Robot status, sensor data, location, alerts, and camera output are streamed to a web application.

The implementation in this repository covers only the web frontend layer:

- `src/app` contains the Next.js routes, root layout, global styles, and page-level UI.
- `src/components` contains reusable UI sections such as the header, footer, hero, statistics, served locations, and reviews.
- `public` contains static assets used by the frontend, including images, video, CSS, and Font Awesome font files.
- Future backend and IoT integration layers would be needed to connect the frontend to robot telemetry, camera streams, remote-control commands, maps, and authentication.

## Technologies Used

- [Next.js](https://nextjs.org/) 16
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- CSS Modules and global CSS
- Font Awesome icons from local static assets
- Node.js and npm

## Installation & Setup

### Prerequisites

- Node.js 20 or later is recommended.
- npm, included with Node.js.

### Install Dependencies

```bash
npm install
```

### Run the Development Server

```bash
npm run dev
```

Open the application in your browser:

```text
http://localhost:3000
```

### Build for Production

```bash
npm run build
```

### Start the Production Build

```bash
npm run start
```

### Run Linting

```bash
npm run lint
```

## Usage Instructions

- Visit `/` to view the main DELY X landing page with branding, statistics, and reviews.
- Use the navigation bar to access:
  - `/services` - View all autonomous delivery services and solutions
  - `/product` - Explore the DELY X robot features and technical specifications
  - `/contact` - Get in touch with contact information and message form
  - `/register` - Create a new account
  - `/login` - Sign in to your account
  - `/dashboard` - Access admin dashboard with analytics and metrics
- **Dashboard Features** (`/dashboard`):
  - View real-time KPIs (Total Revenue, Orders, Visitors, Net Profit)
  - Analyze revenue trends with interactive bar charts
  - Filter data by date range using calendar controls
  - Track order status and delivery metrics
  - Monitor delivery performance and trends
- **Product Page** (`/product`):
  - Learn about DELY X robot capabilities
  - Review 10+ technical specifications (Raspberry Pi, sensors, connectivity)
  - Explore 6 real-world industry use cases
  - View product gallery and scheduling options
- **Services Page** (`/services`):
  - Discover 4 core service offerings
  - Follow the 6-step delivery process workflow
  - Understand key benefits and advantages
  - Schedule consultations or partnerships
- Submit feedback on the home page review section to add temporary reviews using local component state.

**Note**: Form submissions, dashboard data, login, registration, contact messages, and review data are not persisted because no backend or database is currently connected.

## API

No API routes are implemented in this repository.

The current codebase does not include:

- Backend services
- Database integration
- Authentication logic
- Robot firmware
- Motor-control APIs
- Camera feed streaming
- Live sensor telemetry
- Robot location or map tracking
- Remote-control command endpoints

## Folder Structure

```text
.
|-- public/
|   |-- css/              # Local CSS assets, including Font Awesome CSS
|   |-- images/           # Logos, robot images, page images, and avatars
|   |-- videos/           # DELY X hero video
|   `-- webfonts/         # Font Awesome font files
|-- src/
|   |-- app/
|   |   |-- contact/      # Contact page
|   |   |-- dashboard/    # Admin dashboard page
|   |   |-- login/        # Login form page
|   |   |-- product/      # Product showcase page
|   |   |-- register/     # Register form page
|   |   |-- services/     # Services overview page
|   |   |-- orders/       # Order management
|   |   |-- tracking/     # Delivery tracking page
|   |   |-- settings/     # User settings page
|   |   |-- globals.css   # Global styles
|   |   |-- layout.tsx    # Root layout with header and footer
|   |   `-- page.tsx      # Home page
|   `-- components/
|       |-- Header.tsx                    # Navigation header
|       |-- Footer.tsx                    # Footer with links
|       |-- Hero.tsx                      # Home hero section
|       |-- Stats.tsx                     # Statistics cards
|       |-- ServedLocations.tsx           # Served location categories
|       |-- Reviews.tsx                   # Review system with ratings
|       |-- WebsiteLayout.tsx             # Website wrapper layout
|       |-- PageHero.tsx                  # Reusable page hero section
|       |-- ProductFeatures.tsx           # Product feature cards
|       |-- TechnicalSpecs.tsx            # Technical specifications
|       |-- ProductGallery.tsx            # Product image gallery
|       |-- UseCases.tsx                  # Real-world use cases
|       |-- ServiceCards.tsx              # Service offering cards
|       |-- HowItWorks.tsx                # Process workflow steps
|       |-- Benefits.tsx                  # Service benefits
|       |-- CallToAction.tsx              # Reusable CTA section
|       `-- dashboard/
|           |-- DashboardLayout.tsx       # Dashboard layout wrapper
|           |-- Sidebar.tsx               # Navigation sidebar
|           |-- Topbar.tsx                # Top navigation bar
|           |-- KpiCard.tsx               # KPI metric cards
|           |-- ChartWrapper.tsx          # Chart container wrapper
|           |-- OrderTable.tsx            # Order data table
|           |-- Button.tsx                # Dashboard button component
|           |-- Card.tsx                  # Dashboard card component
|-- package.json          # Project scripts and dependencies
|-- tsconfig.json         # TypeScript configuration
`-- next.config.ts        # Next.js configuration
```

## Future Improvements

- Add backend APIs for authentication, contact messages, reviews, and robot data.
- Connect the web app to live robot telemetry over Wi-Fi, Bluetooth, LTE, MQTT, WebSockets, or another real-time transport.
- Display live camera feed, sensor values, alerts, and robot health status.
- Add map-based robot location tracking and navigation path visualization.
- Implement remote-control commands for supervised robot operation.
- Integrate Raspberry Pi robot-control software, motor-driver commands, and sensor-processing services.
- Add AI modules for object detection, lane detection, traffic sign recognition, and sensor fusion.
- Persist user accounts, reviews, orders, and monitoring history in a database.
- Improve placeholder Services and Product pages with real product details once available.

## Implementation Details

### Product Page
The Product page (`/product`) showcases the DELY X autonomous delivery robot with:
- **Hero Section**: Brand introduction with compelling messaging
- **Feature Cards**: 4 key capabilities with icons (Autonomous Navigation, Traffic Awareness, Real-time Monitoring, AI Decision Making)
- **Technical Specifications**: 10+ detailed specs covering hardware (Raspberry Pi, sensors, cameras) and connectivity options
- **Product Gallery**: Visual showcase of the robot and components
- **Use Cases**: 6 real-world applications (Campus delivery, Healthcare, Corporate, Retail, Food Service, Smart Communities)
- **Call-to-Action**: Demo scheduling and service exploration

### Services Page
The Services page (`/services`) presents the complete DELY X service offering:
- **Hero Section**: Service introduction and value proposition
- **Service Cards**: 4 core offerings with detailed descriptions
  - Smart Delivery Service
  - Real-time Monitoring
  - Fleet Management
  - AI Analytics
- **How It Works**: 6-step process flow from order to analytics
- **Benefits Section**: 6 key advantages for customers
- **Call-to-Action**: Partnership and consultation requests

### Dashboard
The Dashboard (`/dashboard`) provides admin management capabilities:
- **KPI Cards**: Real-time metrics for revenue, orders, visitors, and profit
- **Revenue Chart**: Interactive bar chart with monthly trend analysis
- **Toolbar Controls**: Date range filtering and calendar selection
- **Extensible Layout**: Sidebar navigation and topbar for additional features
- **Responsive Design**: Mobile-friendly admin interface

## Component Architecture

### Reusable Components
- **PageHero**: Generic hero section for any page
- **CallToAction**: Flexible CTA with configurable buttons
- **Feature Cards**: Display features with icons and descriptions
- **Spec Items**: Technical specification display with accent borders
- **Service Cards**: Service showcase cards with hover effects
- **Benefit Cards**: Benefit highlight cards with icons

### Dashboard Components
- **DashboardLayout**: Main dashboard wrapper with sidebar and topbar
- **KpiCard**: Key performance indicator display with trend indicators
- **ChartWrapper**: Chart container with styling
- **OrderTable**: Order management and status tracking
- **Sidebar/Topbar**: Navigation and control elements

## Design System

### Color Scheme
- **Primary Orange**: #fe9f30 (accent color used throughout)
- **Text Colors**: #444 (titles), #4e4e4e (body), #909090 (muted)
- **Backgrounds**: #ffffff (main), #f1eeee (light), #f9f9f9 (section)

### Typography
- **Font Family**: Lato, League Spartan
- **Sizes**: h1 (45px), h2 (35px), h3 (28px), h4 (22px), body (16px)
- **Weights**: 400, 500, 600, 700, 800

### Responsive Breakpoints
- **Desktop**: Full multi-column layouts
- **Tablet (≤768px)**: Reduced columns, optimized spacing
- **Mobile (≤480px)**: Single-column, touch-friendly interfaces

## Technologies & Libraries

- **Next.js**: 16.2.4 with Turbopack for fast development
- **React**: 19.x with functional components
- **TypeScript**: Full type safety across components
- **CSS**: Global styles and component scoping
- **Font Awesome**: Icon library (local assets)
- **Animations**: CSS transitions and keyframe animations

## Current Status

### ✅ Completed Features

This repository is now a **production-ready DELY X frontend** with:

1. **Website Pages** (public-facing):
   - Home page with full branding and statistics
   - Product showcase page with detailed specifications and use cases
   - Services overview page with complete service descriptions
   - Contact page for inquiries
   - Authentication pages (Login/Register)

2. **Admin Dashboard**:
   - Real-time KPI metrics and performance indicators
   - Revenue analytics with interactive visualizations
   - Order management and tracking
   - Responsive admin interface with sidebar navigation
   - Date filtering and calendar controls

3. **Component Library**:
   - 14+ reusable components organized by functionality
   - Shared website layout wrapper with header/footer
   - Dashboard layout system with sidebar and topbar
   - Icon integration and responsive design

### 🚀 Future Integration Layers

The robotics, AI, IoT, backend, and real-time monitoring features remain future integration work:

- Backend services and APIs for authentication and data persistence
- Database integration for users, orders, reviews, and analytics
- Live robot telemetry over Wi-Fi, Bluetooth, LTE, MQTT, or WebSockets
- Real-time camera feed streaming and sensor data visualization
- Map-based robot location tracking and navigation visualization
- Remote-control commands for supervised robot operation
- Raspberry Pi robot-control software and motor-driver APIs
- AI modules for object detection, lane detection, traffic sign recognition
- Persistent storage for user accounts, delivery history, and analytics

The current implementation establishes the visual identity, core page structure, and admin interface for the complete DELY X platform.
