# 🚀 Faisal Akbar - Personal Portfolio

A modern, responsive, and feature-rich personal portfolio website built with Next.js 15, TypeScript, and Tailwind CSS v4. Showcasing professional experience, projects, blog posts, and skills in a clean, elegant design.

---

Live Demo: [Faisal Akbar Portfolio](https://b5a7-client.vercel.app/)

## 🧱 Features

- **Modern Design**: Clean, responsive UI with dark/light mode support
- **Blog System**: Full-featured blog with rich text editor
- **Project Showcase**: Dynamic project gallery with detailed project pages
- **Dashboard**: Admin panel for managing blogs and projects
- **Authentication**: Secure login system with JWT tokens
- **Contact Form**: Email integration using EmailJS
- **SEO Optimized**: Meta tags, Open Graph, and Twitter cards
- **Performance**: Optimized with Next.js 15, SSR, SSG, and modern React patterns
- **TypeScript**: Full type safety using type script and zod for validation
- **Responsive**: Mobile-first design with Tailwind CSS v4

## 🧩 Tech Stack

- **Next.js 15** — React framework with App Router
- **TypeScript** — Type safety and better developer experience
- **Tailwind CSS v4** — Utility-first styling
- **shadcn/ui** — Modern UI components
- **Framer Motion** — Smooth animations and transitions
- **React Hook Form + Zod** — Form handling and validation
- **Quill** — Rich text editor for blog posts
- **EmailJS** — Contact form email integration

---

## 🛠️ Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/faisal-akbar/b5a7-client.git
cd b5a7-client

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local

# 4. Update .env.local with your configuration
NEXT_PUBLIC_API_URL=your_api_url #http://localhost:5000/api/v1
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

# 5. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📁 Project Structure

```
.
├── app/
│   ├── (CommonLayout)/          # Public pages layout
│   │   ├── about/              # About page
│   │   ├── blogs/              # Blog listing and individual posts
│   │   ├── contact/            # Contact page
│   │   ├── login/              # Authentication
│   │   ├── projects/           # Project showcase
│   │   └── page.tsx            # Homepage
│   ├── (DashboardLayout)/      # Admin dashboard layout
│   │   └── dashboard/          # Admin panel
│   │       ├── blogs/          # Blog management
│   │       └── projects/       # Project management
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── siteMetaData.ts         # Site configuration
├── components/
│   ├── modules/                # Feature components
│   │   ├── auth/               # Authentication components
│   │   ├── dashboard/          # Admin dashboard components
│   │   ├── BlogCard.tsx        # Blog card component
│   │   ├── ContactForm.tsx     # Contact form
│   │   ├── Navbar.tsx          # Navigation
│   │   ├── ProjectCard.tsx     # Project card component
│   │   └── ...
│   └── ui/                     # Reusable UI components
│       ├── button.tsx
│       ├── card.tsx
│       ├── form.tsx
│       └── ...
├── services/                   # API services
│   ├── AuthService/
│   ├── Blog/
│   └── Project/
├── types/                      # TypeScript type definitions
├── lib/                        # Utility functions
├── hooks/                      # Custom React hooks
└── public/                     # Static assets
```

---

## 🎨 Key Features

### Homepage

- Hero section with professional introduction
- Skills showcase with interactive badges
- Recent projects carousel
- Latest blog posts grid
- Contact form integration

### About Page

- Professional timeline
- Skills and technologies
- Personal story and passion
- Favorite books section
- Contact information

### Blog Section

- Rich text editor with Quill
- SEO-optimized blog posts
- Reading time and views
- Tag support
- Image optimization

### Project Showcase

- Dynamic project gallery
- Detailed project pages
- Technology stack display
- Live demo and GitHub links
- Image optimization

### Admin Dashboard

- Secure authentication
- Blog management (CRUD operations)
- Project management (CRUD operations)
- Rich text editor for blog and project creation
- Image upload and management

---

### Site Metadata

`app/siteMetaData.ts` contains the site metadata for the portfolio.
