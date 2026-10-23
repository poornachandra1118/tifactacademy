/**
 * Reviews & Student Stories API Data
 * Provided for Ti-Fact Academy
 */

export const REVIEWS_DATA = {
  success: true,
  academy: "Ti-Fact Academy",
  totalReviews: 6,
  reviews: [
    {
      id: "REV001",
      studentId: "STD001",
      studentName: "Aarav Sharma",
      studentProfile: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      courseId: "FS001",
      courseName: "Full Stack Web Development",
      rating: 5,
      reviewTitle: "Excellent course for beginners",
      reviewText: "The course helped me understand frontend and backend development. The practical projects made it easier to apply what I learned.",
      reviewDate: "2026-09-15",
      verifiedPurchase: true,
      status: "published"
    },
    {
      id: "REV002",
      studentId: "STD002",
      studentName: "Priya Reddy",
      studentProfile: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      courseId: "FS002",
      courseName: "Java Full Stack Development",
      rating: 4,
      reviewTitle: "Good practical learning experience",
      reviewText: "The Java and Spring Boot modules were helpful. I especially enjoyed building REST APIs and connecting them to a database.",
      reviewDate: "2026-09-20",
      verifiedPurchase: true,
      status: "published"
    },
    {
      id: "REV003",
      studentId: "STD003",
      studentName: "Rahul Kumar",
      studentProfile: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
      courseId: "ST001",
      courseName: "Software Testing Fundamentals",
      rating: 5,
      reviewTitle: "Clear and easy to understand",
      reviewText: "The lessons on test cases, defect reporting, and the software testing life cycle were well structured and easy to follow.",
      reviewDate: "2026-09-22",
      verifiedPurchase: true,
      status: "published"
    },
    {
      id: "REV004",
      studentId: "STD004",
      studentName: "Sneha Patel",
      studentProfile: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
      courseId: "ST002",
      courseName: "Automation Testing with Selenium",
      rating: 3,
      reviewTitle: "Useful course with room to improve",
      reviewText: "The Selenium basics and automation examples were useful. I would appreciate more advanced real-world projects and additional practice exercises.",
      reviewDate: "2026-09-25",
      verifiedPurchase: true,
      status: "published"
    },
    {
      id: "REV005",
      studentId: "STD005",
      studentName: "Vikram Rao",
      studentProfile: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
      courseId: "DS001",
      courseName: "Data Science with Python",
      rating: 5,
      reviewTitle: "Great hands-on projects",
      reviewText: "I learned Python data analysis, visualization, and machine learning fundamentals. Working with datasets helped me understand the concepts better.",
      reviewDate: "2026-09-28",
      verifiedPurchase: true,
      status: "published"
    },
    {
      id: "REV006",
      studentId: "STD006",
      studentName: "Ananya Verma",
      studentProfile: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&q=80",
      courseId: "DS002",
      courseName: "Data Analytics with SQL and Power BI",
      rating: 4,
      reviewTitle: "Helpful for learning dashboards",
      reviewText: "The SQL queries and Power BI dashboard modules gave me a better understanding of data analysis and business reporting.",
      reviewDate: "2026-10-02",
      verifiedPurchase: true,
      status: "published"
    }
  ]
};

export const ALL_REVIEWS = REVIEWS_DATA.reviews;
