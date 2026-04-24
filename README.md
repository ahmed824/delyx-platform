# DELY X

DELY X is a web application prototype for a Traffic-Aware Intelligent Delivery Robot system. The full project vision combines robotics, AI, and IoT to support autonomous delivery using a Raspberry Pi controller, sensors, computer vision, navigation logic, and wireless communication.

This repository currently contains the frontend web application only. It presents the DELY X brand, delivery robot concept, static service/product pages, contact and authentication-style forms, and a local review/rating interface. Robot firmware, backend APIs, live telemetry, map tracking, camera streaming, and remote-control functionality are not implemented in this codebase yet.

## Features

- Responsive Next.js frontend using the App Router.
- Home page with DELY X branding, video hero section, delivery statistics, served-location categories, and user reviews.
- Shared header and footer components with navigation links and Font Awesome icons.
- Static Services and Product pages.
- Contact page with contact information and a static message form UI.
- Login and Register pages with form layouts for future authentication integration.
- Review/rating component using local React state for adding feedback in the browser.
- Static media assets, including images, logos, Font Awesome webfonts, and a hero video.

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

- Visit `/` to view the main DELY X landing page.
- Use the navigation bar to open:
  - `/services` for the Services placeholder page.
  - `/product` for the Product placeholder page.
  - `/contact` for the contact page and message form UI.
  - `/register` for the account creation form UI.
  - `/login` for the sign-in form UI.
- Submit feedback on the home page review section to add a temporary review in local component state.

Form submissions, login, registration, contact messages, and review data are not persisted because no backend or database is currently connected.

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
|   |   |-- login/        # Login form page
|   |   |-- product/      # Product placeholder page
|   |   |-- register/     # Register form page
|   |   |-- services/     # Services placeholder page
|   |   |-- globals.css   # Global styles
|   |   |-- layout.tsx    # Root layout with header and footer
|   |   `-- page.tsx      # Home page
|   `-- components/       # Shared UI components
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

## Current Status

This repository is best understood as the DELY X frontend prototype. It establishes the visual identity and core page structure for the delivery robot platform, while the robotics, AI, IoT, backend, and real-time monitoring features remain future integration work.
