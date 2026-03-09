import Link from "next/link";
import { ThemeToggle } from "@/components/ui/themeToggle/themeToggle";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg-primary)]">
      {/* Header */}
      <header className="w-full px-6 py-4 border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[var(--color-primary-600)]">
            Next.js Template
          </h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/login"
              className="px-4 py-2 bg-[var(--color-primary-600)] text-white rounded-lg hover:bg-[var(--color-primary-700)] transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-[var(--color-text-primary)] mb-6">
            Production-Ready
            <span className="text-[var(--color-primary-600)]"> Next.js </span>
            Template
          </h2>
          <p className="text-lg md:text-xl text-[var(--color-text-secondary)] mb-10 max-w-2xl mx-auto">
            A complete starter template with authentication, form validation,
            theming, and scalable architecture. Built with Next.js, TypeScript,
            Tailwind CSS, Redux Toolkit, and more.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="px-8 py-4 bg-[var(--color-primary-600)] text-white rounded-lg font-semibold hover:bg-[var(--color-primary-700)] transition-colors shadow-lg hover:shadow-xl"
            >
              Get Started
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg font-semibold hover:bg-[var(--color-bg-secondary)] transition-colors"
            >
              View on GitHub
            </a>
          </div>

          {/* Features */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Authentication",
                description: "Complete auth flow with protected routes and middleware",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
              },
              {
                title: "Form Validation",
                description: "Formik + Yup integration for robust form handling",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: "Dark Mode",
                description: "Built-in dark/light theme switching with next-themes",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ),
              },
              {
                title: "State Management",
                description: "Redux Toolkit for global state management",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                ),
              },
              {
                title: "SCSS Support",
                description: "Sass/SCSS with mixins, variables, and theme files",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                ),
              },
              {
                title: "Type Safe",
                description: "Full TypeScript support with proper type definitions",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:border-[var(--color-primary-300)] transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-[var(--color-primary-100)] text-[var(--color-primary-600)] flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-[var(--color-text-primary)] mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full px-6 py-8 border-t border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto text-center text-[var(--color-text-secondary)]">
          <p>&copy; {new Date().getFullYear()} Next.js Template. Built with Next.js and Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
}
