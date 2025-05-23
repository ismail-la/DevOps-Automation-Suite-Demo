# DevOps Automation Suite Demo

A comprehensive platform for infrastructure provisioning, CI/CD pipeline management, and system monitoring built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Infrastructure as Code** - One-click provisioning of environments
- **CI/CD Pipeline Management** - Monitor and manage deployment pipelines
- **Monitoring Dashboard** - Visualize system performance metrics
- **Dark/Light Mode Support** - Toggle between themes
- **Responsive Design** - Works on mobile, tablet, and desktop

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- shadcn/ui Components
- Recharts for data visualization

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/devops-suite-demo.git
cd devops-suite-demo
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This project can be easily deployed to Vercel:

1. Push your code to a GitHub repository.
2. Visit [Vercel](https://vercel.com) and create a new project.
3. Import your repository and deploy.

Alternatively, you can build and export the site:

```bash
npm run build
```

## Project Structure

```
devops-suite-demo/
├── app/               # Next.js app directory
│   ├── api/           # API routes
│   ├── dashboard/     # Dashboard page
│   ├── provision/     # Provisioning page
│   ├── status/        # Status page
│   ├── globals.css    # Global styles
│   ├── layout.tsx     # Root layout
│   └── page.tsx       # Home page
├── components/        # React components
│   ├── ui/            # shadcn/ui components
│   ├── feature-card.tsx
│   ├── header.tsx
│   ├── page-header.tsx
│   └── theme-provider.tsx
├── lib/              # Utility functions
│   └── utils.ts
├── public/           # Static assets
├── .eslintrc.json
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## Future Enhancements

- **User Authentication** - Add authentication and user roles
- **Real-time Updates** - Implement WebSockets for live status updates
- **Notification System** - Alert system for critical events
- **Audit Logs** - Track all infrastructure changes
- **Expanded Metrics** - Add more detailed performance metrics