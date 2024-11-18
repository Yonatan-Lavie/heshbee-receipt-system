# heshbee-receipt-system

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



---
# Step-by-Step Guide to Set Up HashBee Project

## 1. Manual Steps (Third-Party Services)

### **1.1 GitHub Repository**
- [X] Create a new GitHub repository named `heshbee-receipt-system`
- [-] Add a `.gitignore` file for `Node.js` and `Next.js`

### **1.2 Google Drive Client Setup**
- [X] **Client Account Authentication**:
  - [X] The client will need to authenticate their Google account via OAuth2
  - [X] Obtain client consent to access their Google Drive
- [X] Configure a "Sign in with Google" flow for Drive access:
  1. Go to [Google Cloud Console](https://console.cloud.google.com/)
  2. Create a new project or use an existing one
  3. Enable the **Google Drive API** and **Google OAuth Consent Screen**
  4. Set up OAuth2 credentials for a web application

### **1.3 Telegram Bot Setup**
- [X] Create a new bot using BotFather on Telegram
- [X] Obtain the bot token
- [X] Set up a webhook (configured later)

### **1.4 Stripe Integration**
- [] Create a Stripe account (if not already created)
- [] Set up API keys for development (publishable and secret keys)
- [] Create a subscription plan with a trial period

### **1.5 Vercel Hosting**
- [X] Log in to [Vercel](https://vercel.com/)
- [X] Connect the GitHub repository
- [] Set up project environment variables (to be added after backend configuration)

## 2. Command-Line Instructions

### **2.1 Initialize Next.js Project**
[X]
```bash
# Create a new Next.js app
npx create-next-app@latest . --typescript

```

### **2.2 Install Required Libraries**
```bash
# Install core dependencies
npm install axios zod @reduxjs/toolkit react-redux @shadcn/ui tailwindcss postcss autoprefixer next-seo @prisma/client googleapis stripe

# Install database and serverless tools
npm install --save-dev prisma vercel @vercel/node
```

### **2.3 Configure TailwindCSS**
```bash
# Initialize TailwindCSS
npx tailwindcss init -p
```
- [] Update `tailwind.config.js`:
  ```javascript
  module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };
  ```

### **2.4 Set Up Prisma**
```bash
# Initialize Prisma
npx prisma init

# Update schema.prisma to include tables for Users, Receipts, Subscriptions, and Settings
```

### **2.5 Set Up CI/CD**
```bash
# Create a GitHub Actions workflow file
mkdir -p .github/workflows
touch .github/workflows/deploy.yml
```
- [] Add the following to `deploy.yml`:
  ```yaml
  name: Deploy to Vercel

  on:
    push:
      branches:
        - main

  jobs:
    build-and-deploy:
      runs-on: ubuntu-latest
      steps:
        - name: Checkout code
          uses: actions/checkout@v3
        - name: Install Node.js
          uses: actions/setup-node@v3
          with:
            node-version: 18
        - name: Install dependencies
          run: npm install
        - name: Build
          run: npm run build
        - name: Deploy to Vercel
          uses: amondnet/vercel-action@v20
          with:
            vercel-token: ${{ secrets.VERCEL_TOKEN }}
            vercel-project-name: hashbee-receipt-system
            vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
  ```

## 3. Third-Party Activities

### **3.1 Configure Client Google Drive Integration**
- [] Configure OAuth2 consent screen:
  - [] Add your application name, logo, and scopes for Google Drive API
  - [] Define the redirect URI for your application (e.g., `https://<your-vercel-url>/auth/callback`)
- [] Set up a utility file (`lib/googleDrive.ts`) to:
  - [] Handle OAuth2 flow
  - [] Store the user's access and refresh tokens securely (e.g., in PostgreSQL)
  - [] Use Google Drive API for folder creation and file uploads in the client's account

### **3.2 Telegram Bot Webhook**
- [] Use a testing service like [ngrok](https://ngrok.com/) for local development:
  ```bash
  ngrok http 3000
  ```
- [] Set the webhook for the Telegram bot:
  ```bash
  curl -X POST "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook" \
  -d "url=<YOUR_NGROK_URL>/api/telegram-webhook"
  ```

### **3.3 Stripe Configuration**
- [] Store Stripe API keys in `.env.local`:
  ```env
  STRIPE_SECRET_KEY=<your-secret-key>
  STRIPE_PUBLISHABLE_KEY=<your-publishable-key>
  ```
- [] Add a utility file (`lib/stripe.ts`) for Stripe SDK configuration

### **3.4 Supabase Configuration**
- [] Sign in to [Supabase](https://supabase.io/) and create a new project
- [] Obtain the project URL and public API key
- [] Add the configuration to `.env.local`:
  ```env
  NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
  NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
  ```

## 4. Final Project Initialization

1. **Run Database Migrations**:
   ```bash
   npx prisma migrate dev
   ```

2. **Start the Development Server**:
   ```bash
   npm run dev
   ```

3. **Verify Integrations**:
   - [] Test client authentication for Google Drive access
   - [] Upload a test file to the authenticated client's Google Drive
   - [] Process a dummy receipt with Stripe

4. **Push to GitHub**:
   ```bash
   git init
   git remote add origin <your-repo-url>
   git add .
   git commit -m "Initial project setup"
   git push -u origin main
   ```

## 5. Project Structure Setup
```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── dashboard/
│   ├── api/
│   │   ├── auth/
│   │   ├── receipts/
│   │   └── webhooks/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   ├── forms/
│   └── dashboard/
├── lib/
│   ├── telegram/
│   ├── google-drive/
│   └── stripe/
├── store/
│   └── slices/
├── types/
└── utils/
```

After completing these steps, you'll have a fully configured boilerplate with:
- [] Next.js app with TypeScript
- [] Authentication setup
- [] Database configuration
- [] Third-party service integrations
- [] CI/CD pipeline
- [] Project structure ready for development

You can then start building your components and implementing business logic.

Would you like me to provide more details about any specific step or configuration?