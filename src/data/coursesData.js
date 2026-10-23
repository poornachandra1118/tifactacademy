/**
 * Courses and Categories API Data
 * Provided for Ti-Fact Academy
 */

export const ACADEMY_DATA = {
  success: true,
  academy: "Ti-Fact Academy",
  categories: [
    {
      id: "fullstack",
      name: "Full Stack Development",
      slug: "fullstack",
      description: "Learn to build complete web applications using frontend and backend technologies.",
      icon: "code",
      courses: [
        {
          id: "FS001",
          title: "Python Full Stack Development",
          slug: "full-stack-web-development",
          description: "Learn frontend, backend, database integration, and deployment.",
          thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
          thumbnailAlt: "Web developer working on code at a laptop",
          level: "Beginner to Advanced",
          duration: "4 Months",
          mode: "Online",
          price: 18000,
          currency: "INR",
          technologies: [
            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "Python",
            "Django",
            "SQL"
          ],
          modules: [
            "HTML and CSS Fundamentals",
            "JavaScript Programming",
            "React Development",
            "Backend Development with Python",
            "REST API Development",
            "Database Management",
            "Full Stack Projects",
            "Deployment"
          ],
          instructor: {
            "name": "Instructor Name",
            "experience": "5+ years"
          },
          features: [
            "Hands-on Projects",
            "Live Online Classes",
            "Practical Assignments",
            "Career Guidance"
          ],
          certificateAvailable: true,
          rating: 4.8,
          enrolledStudents: 250,
          featured: true,
          status: "active"
        },
        {
          id: "FS002",
          title: "Java Full Stack Development",
          slug: "java-full-stack-development",
          description: "Build web applications using Java, Spring Boot, frontend technologies, and databases.",
          thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
          thumbnailAlt: "Laptop displaying a software development workspace",
          level: "Intermediate",
          duration: "5 Months",
          mode: "Online",
          price: 18000,
          currency: "INR",
          technologies: [
            "Java",
            "Spring Boot",
            "HTML",
            "CSS",
            "JavaScript",
            "MySQL",
            "React"
          ],
          modules: [
            "Core Java",
            "Object-Oriented Programming",
            "SQL and Database Design",
            "Spring Boot",
            "REST APIs",
            "Frontend Integration",
            "Project Development"
          ],
          instructor: {
            "name": "Instructor Name",
            "experience": "4+ years"
          },
          features: [
            "Project-Based Learning",
            "Online Training",
            "Assignments"
          ],
          certificateAvailable: true,
          rating: 4.7,
          enrolledStudents: 180,
          featured: false,
          status: "active"
        }
      ]
    },
    {
      id: "testing",
      name: "Software Testing",
      slug: "testing",
      description: "Develop software quality assurance and testing automation skills.",
      icon: "bug",
      courses: [
        {
          id: "ST001",
          title: "Software Testing Fundamentals",
          slug: "software-testing-fundamentals",
          description: "Learn manual testing, test case design, defect tracking, and software testing processes.",
          thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
          thumbnailAlt: "Computer and digital tools used for software learning",
          level: "Beginner",
          duration: "2 Months",
          mode: "Online",
          price: 10000,
          currency: "INR",
          technologies: [
            "Manual Testing",
            "SDLC",
            "STLC",
            "JIRA",
            "SQL"
          ],
          modules: [
            "Software Testing Fundamentals",
            "Software Development Life Cycle",
            "Software Testing Life Cycle",
            "Test Case Design",
            "Bug Reporting",
            "Defect Life Cycle",
            "Database Testing"
          ],
          instructor: {
            "name": "Instructor Name",
            "experience": "4+ years"
          },
          features: [
            "Practical Test Cases",
            "Real-World Scenarios",
            "Assignments"
          ],
          certificateAvailable: true,
          rating: 4.6,
          enrolledStudents: 150,
          featured: false,
          status: "active"
        },
        {
          id: "ST002",
          title: "Automation Testing with Selenium",
          slug: "automation-testing-selenium",
          description: "Learn browser automation and automated testing frameworks for web applications.",
          thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80",
          thumbnailAlt: "Programming code displayed on a computer screen",
          level: "Intermediate",
          duration: "3 Months",
          mode: "Online",
          price: 15000,
          currency: "INR",
          technologies: [
            "Java",
            "Selenium WebDriver",
            "TestNG",
            "Maven",
            "Git"
          ],
          modules: [
            "Automation Testing Fundamentals",
            "Java for Test Automation",
            "Selenium WebDriver",
            "Locators and Web Elements",
            "TestNG Framework",
            "Page Object Model",
            "Automation Framework Development"
          ],
          instructor: {
            "name": "Instructor Name",
            "experience": "5+ years"
          },
          features: [
            "Automation Projects",
            "Framework Development",
            "Hands-on Practice"
          ],
          certificateAvailable: true,
          rating: 4.8,
          enrolledStudents: 120,
          featured: true,
          status: "active"
        }
      ]
    },
    {
      id: "data-science",
      name: "Data Science",
      slug: "data-science",
      description: "Learn to analyze data, develop predictive models, and extract meaningful insights.",
      icon: "chart",
      courses: [
        {
          id: "DS001",
          title: "Data Science with Python",
          slug: "data-science-python",
          description: "Explore Python programming, data analysis, visualization, and machine learning fundamentals.",
          thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
          thumbnailAlt: "Data analytics dashboard with charts and visualizations",
          level: "Beginner to Intermediate",
          duration: "5 Months",
          mode: "Online",
          price: 20000,
          currency: "INR",
          technologies: [
            "Python",
            "NumPy",
            "Pandas",
            "Matplotlib",
            "Seaborn",
            "Scikit-learn",
            "SQL"
          ],
          modules: [
            "Python Programming",
            "Statistics Fundamentals",
            "Data Cleaning",
            "Exploratory Data Analysis",
            "Data Visualization",
            "SQL for Data Science",
            "Machine Learning Fundamentals",
            "Capstone Project"
          ],
          instructor: {
            "name": "Instructor Name",
            "experience": "5+ years"
          },
          features: [
            "Real-World Datasets",
            "Hands-on Projects",
            "Capstone Project",
            "Practical Assignments"
          ],
          certificateAvailable: true,
          rating: 4.9,
          enrolledStudents: 200,
          featured: true,
          status: "active"
        },
        {
          id: "DS002",
          title: "Data Analytics with SQL and Power BI",
          slug: "data-analytics-sql-power-bi",
          description: "Learn to query databases, analyze business data, and build interactive dashboards.",
          thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
          thumbnailAlt: "Business data analytics dashboard on a computer",
          level: "Beginner",
          duration: "3 Months",
          mode: "Online",
          price: 14000,
          currency: "INR",
          technologies: [
            "SQL",
            "Microsoft Excel",
            "Power BI",
            "Data Visualization"
          ],
          modules: [
            "Data Analytics Fundamentals",
            "Excel for Data Analysis",
            "SQL Queries",
            "Data Cleaning",
            "Power BI Fundamentals",
            "Dashboard Development",
            "Business Intelligence Project"
          ],
          instructor: {
            "name": "Instructor Name",
            "experience": "4+ years"
          },
          features: [
            "Dashboard Projects",
            "Business Case Studies",
            "Hands-on Exercises"
          ],
          certificateAvailable: true,
          rating: 4.7,
          enrolledStudents: 160,
          featured: false,
          status: "active"
        }
      ]
    }
  ]
};

// Flattened list of all 6 courses with category info attached
export const ALL_COURSES = ACADEMY_DATA.categories.flatMap((category) =>
  category.courses.map((course) => ({
    ...course,
    categoryId: category.id,
    categoryName: category.name,
    categorySlug: category.slug,
  }))
);
