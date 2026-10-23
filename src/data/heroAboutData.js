/**
 * Hero & About Section Image API Data
 * Ti-Fact Academy — IT Software Courses
 *
 * Simulates a REST API response structure with images
 * sourced from Unsplash (CDN-ready, no auth required).
 * Replace `source` URLs with your own CDN/backend later.
 */

export const HERO_ABOUT_API = {
  success: true,
  version: "1.0.0",
  academy: "Ti-Fact Academy",
  lastUpdated: "2025-01-01",

  hero: {
    mainImage: {
      src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
      alt: "Students collaborating on software development at laptops in a modern IT classroom",
      width: 900,
      height: 1000,
      credit: "Unsplash – Annie Spratt"
    },
    floatCard1: {
      icon: "bi-laptop",
      value: "3,200+",
      label: "Students Enrolled"
    },
    floatCard2: {
      icon: "bi-patch-check-fill",
      value: "100%",
      label: "Verified Courses"
    },
    avatars: [
      {
        src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=100&h=100&q=80",
        alt: "Student 1"
      },
      {
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
        alt: "Student 2"
      },
      {
        src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&h=100&q=80",
        alt: "Student 3"
      }
    ],
    badge: {
      count: "3,200+",
      countLabel: "learners enrolled",
      subLabel: "at Ti-Fact Academy this year"
    }
  },

  about: {
    primaryImage: {
      src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
      alt: "Software developer writing code on a laptop with dual monitors in a professional IT environment",
      width: 800,
      height: 650,
      credit: "Unsplash – Caspar Camille Rubin"
    },
    secondaryImage: {
      src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=500&h=500&q=80",
      alt: "Close-up of colorful programming code on a monitor screen",
      width: 500,
      height: 500,
      credit: "Unsplash – Artem Sapegin"
    },
    badge: {
      years: "2+",
      label: "Trusted Since",
      since: "2023",
      detail: "500+ graduates"
    }
  }
};

/**
 * Simulates an async API fetch with a small delay.
 * Drop-in replacement when you connect a real backend.
 *
 * @returns {Promise<typeof HERO_ABOUT_API>}
 */
export async function fetchHeroAboutData() {
  // Simulate network latency (50–120 ms)
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 70 + 50));
  return HERO_ABOUT_API;
}
