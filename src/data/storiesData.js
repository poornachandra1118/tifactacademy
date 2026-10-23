/**
 * Student Stories API Data
 * Ti-Fact Academy — "Watch Story" modal carousel
 * Each story contains one YouTube embed video per slide.
 * Videos auto-stop when the user moves to a different story.
 */

export const STORIES_DATA = {
  success: true,
  modalTitle: "Student Success Stories",
  modalSubtitle: "Real learners. Real transformations. Real careers.",
  stories: [
    {
      id: "story-01",
      studentName: "Arjun Mehta",
      role: "Full Stack Developer",
      company: "TechNova Solutions",
      batch: "Full Stack Web Development · Batch 2024",
      quote:
        "Ti-Fact Academy's hands-on curriculum gave me the confidence to build real projects. Within 3 months of completing the course I landed my first developer role.",
      thumbnail:
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=900&q=80",
      thumbnailAlt: "Arjun Mehta – Full Stack Developer",
      /**
       * Replace the videoId below with a real YouTube video ID.
       * Format: https://www.youtube.com/embed/<VIDEO_ID>?rel=0&modestbranding=1
       */
      videoId: "dQw4w9WgXcQ",
      videoLabel: "Arjun Mehta's success story at Ti-Fact Academy",
    },
    {
      id: "story-02",
      studentName: "Priya Reddy",
      role: "Data Analyst",
      company: "FinEdge Analytics",
      batch: "Data Science & AI · Batch 2024",
      quote:
        "The instructors explained every concept with real-world datasets. I went from zero Python knowledge to writing production pipelines in just 4 months.",
      thumbnail:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80",
      thumbnailAlt: "Priya Reddy – Data Analyst",
      videoId: "dQw4w9WgXcQ",
      videoLabel: "Priya Reddy's success story at Ti-Fact Academy",
    },
    {
      id: "story-03",
      studentName: "Ravi Kumar",
      role: "Software Test Engineer",
      company: "QualityFirst Tech",
      batch: "Software Testing (Manual + Automation) · Batch 2025",
      quote:
        "I had no prior IT background. Ti-Fact's mentors guided me step by step. Today I'm a certified test engineer with a stable career in a top IT firm.",
      thumbnail:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=80",
      thumbnailAlt: "Ravi Kumar – Software Test Engineer",
      videoId: "dQw4w9WgXcQ",
      videoLabel: "Ravi Kumar's success story at Ti-Fact Academy",
    },
  ],
};
