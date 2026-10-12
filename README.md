# 🍽️ RestoAnalytics (Kitchen Spur) — Executive Restaurant Intelligence & Management Suite

A high-performance, full-stack enterprise analytics platform built for multi-unit restaurant operators, hospitality management groups, and executive decision-makers. Features real-time revenue intelligence, unit performance attribution, interactive transaction ledgers, and temporal peak load forecasting localized for the Indian hospitality sector (INR `₹`).

---

## 📸 Key Design & Architecture Highlights

- **Executive Dark Fintech Theme**: Sleek obsidian background (`#0b0c10`), crisp glassmorphic panels, ambient gradient lighting, and high-contrast typography.
- **Indian Market Localization (🇮🇳 INR `₹`)**: All metrics, order totals, and average tickets formatted in Indian Rupees with regional locale standards.
- **3D Card Visualizers**: Interactive showcases featuring live operational badges, performance metrics, and responsive telemetry.
- **High-Contrast Selection**: High-end inverted white selection styling (`selection:bg-white selection:text-zinc-950`).
- **Dynamic Date Windows**: Rapid 7-day, 14-day, and 30-day timeline presets alongside custom date range pickers anchored to current operational dates (**October 2026**).

---

## 🚀 Core Features

### 1. Executive Dashboard (`/dashboard`)
- **Hero KPI Ribbon**: Instant visibility into total gross revenue, transaction counts, and network-wide Average Order Value (AOV).
- **Market Leaderboard**: Ranked performance cards highlighting top-grossing properties and market runners-up.
- **Multi-Chart Analytics Suite**:
  - **Daily Order Volume**: Smooth spline area chart tracking transaction throughput over time.
  - **Revenue Streams**: Gradient bar chart showing gross collections by date.
  - **Average Ticket Metric (AOV)**: Gauge tracking spend per table/order.
  - **Temporal Peak Visualizer**: 24-hour hourly distribution with golden peak glow highlighting prime dining hours.
- **Interactive Transaction Ledger**: Multi-filter live table with search, status pills (Completed, In Progress, Cancelled), and date attribution.

### 2. Multi-Unit Restaurant Directory (`/restaurants`)
- **Dual View Modes**: Switch seamlessly between **Executive Card Grid** and dense **Audit Table** layouts.
- **Dynamic Search & Filtering**: Filter across cuisines (*North Indian, Japanese, Italian, American*) and metropolitan locations (*Bangalore, Mumbai, Delhi, Hyderabad*).
- **Sortable Columns**: Instant client-side sorting by establishment name, cuisine, city, or guest rating.

### 3. Unit-Level Deep Dive (`/restaurants/[id]`)
- **Isolated Branch Analytics**: Unit-specific metrics, timeline comparisons, hourly peak analysis, and store-specific order books.
- **Breadcrumb Navigation & Live Status**: Instant breadcrumb routing back to the directory with active outlet telemetry.

### 4. Enterprise Authentication (`/sign-in`)
- **Split 3D Showcase**: Tilted glassmorphic preview cards on the left panel showcasing revenue trends and security compliance.
- **One-Click Demo Fill**: Dedicated button to instantly load test administrator credentials (`admin@resto.dev`).
- **Resilient Error Handling**: Type-safe error diagnostics for 401 invalid credentials, server downtime, and network disconnections.

---

## 🛠️ Technology Stack

### Frontend (Client)
| Technology | Description |
| :--- | :--- |
| **Framework** | [Next.js 16 (Turbopack, App Router)](https://nextjs.org/) |
| **Language** | TypeScript (Strict Type Safety) |
| **Styling** | Tailwind CSS 4, Vanilla CSS Design System, Glassmorphic UI |
| **State Management** | [Zustand](https://github.com/pmndrs/zustand) (Persistent Session Auth) |
| **Server State / Cache** | [TanStack Query v5](https://tanstack.com/query) |
| **Data Visualization** | [Recharts](https://recharts.org/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Runtime / Package Mgr** | [Bun](https://bun.sh/) |

### Backend (API)
| Technology | Description |
| :--- | :--- |
| **Framework** | [Laravel 12](https://laravel.com/) |
| **Language** | PHP 8.2+ |
| **Authentication** | Laravel Sanctum (Token-based API authentication) |
| **Database** | MySQL (`restaurant_dashboard`) |
| **API Documentation** | [Dedoc Scramble](https://scramble.dedoc.co/) |
| **Testing** | [Pest PHP](https://pestphp.com/) |

---

## 🔐 Demo Credentials

Use the following credentials to access the admin portal:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Platform Administrator** | `admin@resto.dev` | `admin@resto.dev` |

*(Alternatively, click the **"Fill Demo Admin"** button directly on the sign-in screen to populate these credentials automatically.)*

---

## ⚙️ Setup & Installation

### Prerequisites
- **PHP**: 8.2 or higher
- **Composer**
- **Node.js**: v20+ or **Bun** (recommended)
- **MySQL**: 8.0+

---

### 1. Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install Composer dependencies:**
   ```bash
   composer install
   ```

3. **Configure Environment Variables:**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Configure MySQL Database in `.env`:**
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=restaurant_dashboard
   DB_USERNAME=root
   DB_PASSWORD=
   ```

5. **Run Migrations & Seed Sample Data (October 2026 data):**
   ```bash
   php artisan migrate:fresh --seed
   ```

6. **Start the API Server:**
   ```bash
   # Run on port 8080 (or port 8000 if available)
   php -S 127.0.0.1:8080 -t public
   ```
   > The API is accessible at `http://127.0.0.1:8080`.

---

### 2. Frontend Setup

1. **Navigate to the client directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   bun install
   # or
   npm install
   ```

3. **Verify API Configuration in [`client/src/api/axios.ts`](file:///e:/code/study/prep-month/kitchen-spur-assesment/client/src/api/axios.ts):**
   ```typescript
   export const API_BASE_URL = 'http://localhost:8080';
   ```

4. **Start the Development Server:**
   ```bash
   bun run dev
   # or
   npm run dev
   ```
   > Access the application at **`http://localhost:3000`**.

5. **Run Production Build Verification:**
   ```bash
   bun run build
   ```

---

## 📡 Core API Endpoints

All endpoints are versioned under `/api/v1` and protected by Laravel Sanctum (except authentication):

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/v1/auth/sign-in` | Authenticate user and issue Sanctum token |
| `POST` | `/api/v1/auth/sign-out` | Revoke current user token |
| `GET` | `/api/v1/restaurants` | List all restaurants with search, cuisine, and city filters |
| `GET` | `/api/v1/restaurants/{id}` | Get single restaurant details |
| `GET` | `/api/v1/analytics/top-revenue` | Get ranked top restaurants by gross revenue for a date range |
| `GET` | `/api/v1/analytics/{id}/summary` | Get restaurant order volume, daily revenue, AOV, and peak hours |
| `GET` | `/api/v1/orders` | List order transactions with restaurant and status filtering |

Interactive Swagger / Scramble documentation is available at:
- `http://127.0.0.1:8080/docs/api`

---

## 📂 Project Structure

```text
kitchen-spur-assesment/
├── backend/                              # Laravel 12 API Application
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Api/v1/                   # Versioned REST Controllers
│   │   │   │   ├── AuthController.php
│   │   │   │   ├── RestaurantController.php
│   │   │   │   └── AnalyticsController.php
│   │   │   └── Requests/                 # Form Validation Requests
│   │   └── Models/                       # Eloquent Models (Restaurant, Order, User)
│   ├── database/
│   │   ├── migrations/                   # Database Schemas
│   │   └── seeders/                      # Order & Restaurant Seeders (Oct 2026)
│   └── routes/
│       └── api.php                       # Versioned API Routes
│
├── client/                               # Next.js 16 Web Application
│   ├── src/
│   │   ├── api/                          # Axios API Client & Interceptors
│   │   ├── app/                          # App Router
│   │   │   ├── (dashboard)/
│   │   │   │   ├── dashboard/page.tsx    # Executive Analytics Overview
│   │   │   │   ├── restaurants/page.tsx  # Branch Directory (Grid & Table)
│   │   │   │   ├── restaurants/[id]/     # Unit-level Performance Analytics
│   │   │   │   └── layout.tsx            # Protected Dashboard Layout & Navbar
│   │   │   ├── sign-in/page.tsx          # 3D Tilt Split Sign-in Page
│   │   │   ├── layout.tsx                # Root Layout (Dark Shell)
│   │   │   └── globals.css               # Design Tokens & Selection Colors
│   │   ├── components/
│   │   │   ├── analytics-overview/       # Recharts Metrics & Gauges
│   │   │   │   ├── revenue-metrics-chart.tsx
│   │   │   │   ├── revenue-stream-visualizer.tsx
│   │   │   │   ├── operational-value-metric.tsx
│   │   │   │   └── temporal-peak-visualizer.tsx
│   │   │   └── common/                   # Shared UI Components
│   │   │       ├── navbar.tsx            # Executive Header & User Profile
│   │   │       ├── footer.tsx            # System Status Footer
│   │   │       ├── resto-logo.tsx        # Unified Brand Badge
│   │   │       ├── date-picker.tsx       # Timeline Range Popover
│   │   │       └── transaction-ledger.tsx# Orders Ledger Table
│   │   ├── hooks/                        # TanStack Query Custom Hooks
│   │   ├── stores/                       # Zustand Auth & State Stores
│   │   └── types/                        # TypeScript Interfaces & Models
│
└── README.md                             # Project Documentation
```

---

## 🧪 Testing & Code Quality

### Backend (PHP / Pest)
```bash
cd backend
php artisan test
```

### Backend Code Formatting (Laravel Pint)
```bash
cd backend
./vendor/bin/pint
```

### Frontend Typecheck & Build
```bash
cd client
bun run build
```

---

## 📄 License
This project is licensed under the MIT License.
