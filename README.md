# ⚡ My Personal Portfolio

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

A modern, high-performance personal portfolio website designed to showcase projects, skills, and professional experience. Built with the latest web technologies to ensure speed, accessibility, and a seamless user experience.

## 🚀 Features

- **Dynamic Content Management**: robust admin dashboard to manage projects, skills, and work experiences effortlessly.
- **Secure Authentication**: Protected admin routes powered by **NextAuth.js**.
- **Visual Media Management**: Integrated **Cloudinary** support for drag-and-drop image uploads.
- **Interactive Contact Form**: Real-time email notifications using **Nodemailer**.
- **Responsive & Adaptive**: Mobile-first design that looks stunning on all devices.
- **Modern UI/UX**: Sleek dark mode, smooth transitions, and glassmorphism effects using **Tailwind CSS**.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com), [Framer Motion](https://www.framer.com/motion/)
- **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose)
- **Authentication**: [NextAuth.js v5](https://authjs.dev/)
- **Cloud Storage**: [Cloudinary](https://cloudinary.com/)
- **Forms**: [React Hook Form](https://react-hook-form.com/)

## 🏁 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

Ensure you have the following installed/set up:

- **Node.js** (v18 or higher)
- **MongoDB** (Local or Atlas URI)
- **Cloudinary** Account
- **Gmail** Account (for Nodemailer)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd my-portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a new `.env.local` file by copying the example file.

   ```bash
   cp .env.example .env.local
   ```

   Open `.env.local` and fill in your specific credentials (database URI, API keys, etc.).

4. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

- `/src/app`: App Router pages and API routes.
- `/src/components`: Reusable UI components.
- `/src/lib`: Utility functions, database connection, and service configurations.
- `/src/models`: Mongoose database schemas.

## 🚢 Deployment

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

Made with ❤️ by Ravi Agrahari
