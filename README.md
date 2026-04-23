# Restaurant Analytics & Management System

A high-performance, full-stack application designed for restaurant owners to monitor performance, manage locations, and analyze sales data in real-time.

## 🚀 Features

- **Real-time Analytics**: Interactive dashboards with sales, orders, and customer trends.
- **Restaurant Management**: Complete CRUD functionality for managing multiple restaurant branches.
- **Secure Authentication**: Built-in authentication using Laravel Sanctum with a modern sign-in flow.
- **Responsive UI**: A pixel-perfect, mobile-friendly dashboard built with Tailwind CSS 4 and Shadcn UI.
- **Versioned API**: Robust RESTful API with versioning (v1) and auto-generated documentation.

## 🛠️ Technology Stack

### Backend (API)
- **Framework**: [Laravel 12+](https://laravel.com)
- **Language**: PHP 8.2+
- **API Documentation**: [Dedoc Scramble](https://scramble.dedoc.co/)
- **Testing**: [Pest PHP](https://pestphp.com/)
- **Security**: Laravel Sanctum (Token-based Auth)

### Frontend (Client)
- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Language**: TypeScript
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) & [TanStack Query](https://tanstack.com/query)
- **Styling**: Tailwind CSS 4 & Shadcn UI
- **Data Visualization**: [Recharts](https://recharts.org/)

---

## ⚙️ Setup & Installation

### Prerequisites
- PHP 8.2 or higher
- Composer
- Node.js (v20+)
- Bun (recommended) or NPM
- A database (MySQL, SQLite, etc.)

### 1. Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Quick Install & Setup:**
   Laravel is configured with a setup script that handles dependency installation, environment configuration, and migrations:
   ```bash
   composer run setup
   ```
   *Alternatively, follow manual steps:*
   ```bash
   composer install
   cp .env.example .env
   php artisan key:generate
   php artisan migrate --seed
   ```

3. **Start the API Server:**
   ```bash
   php artisan serve
   ```
   The API will be available at `http://localhost:8000`.

### 2. Frontend Setup

1. **Navigate to the client directory:**
   ```bash
   cd client
   ```

2. **Install Dependencies:**
   ```bash
   bun install
   # or
   npm install
   ```

3. **Launch the Development Server:**
   ```bash
   bun dev
   # or
   npm run dev
   ```
   Access the dashboard at `http://localhost:3000`.

---

## 📖 API Documentation

Once the backend is running, you can explore the interactive API documentation at:
- **Local Docs**: `http://localhost:8000/docs/api`

## 🧪 Testing & Quality

### Backend Tests
Run the suite using Pest:
```bash
cd backend
php artisan test
```

### Linting
Maintain code quality with these commands:
```bash
# Backend (Pint)
cd backend
./vendor/bin/pint

# Frontend (ESlint)
cd client
bun run lint
```

## 📂 Project Structure

```text
├── backend/            # Laravel 12 API
│   ├── app/Http/Api    # Versioned API Controllers
│   ├── database/       # Migrations & Seeders
│   └── tests/          # Feature & Unit tests
├── client/             # Next.js 16 Frontend
│   ├── src/app         # App Router Pages
│   ├── src/components  # Shared UI Components
│   └── src/store       # Zustand State Management
└── README.md           # Project Documentation
```

## 📄 License

The MIT License (MIT).
