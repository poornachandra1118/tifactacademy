import React, { useState, useEffect, useRef, useMemo } from 'react';
import { burstConfetti } from '../utils/confetti';
import { submitToGoogle } from '../utils/googleSubmission';
import { useHeroAboutData } from '../utils/useHeroAboutData';
import StoryModal from '../components/StoryModal';
import CourseDetailsModal from '../components/CourseDetailsModal';
import { ALL_COURSES, ACADEMY_DATA } from '../data/coursesData';
import { ALL_INSTRUCTORS } from '../data/instructorsData';
import { ALL_REVIEWS } from '../data/reviewsData';
import { CONTACT_INFO } from '../data/contactData';
import { WHY_TIFACT } from '../data/whyData';

/* ── Skeleton shimmer helper ── */
function ImgSkeleton({ style = {}, className = '' }) {
  return (
    <div
      className={className}
      style={{
        background: 'linear-gradient(90deg, #e0e7ff 25%, #c7d2fe 50%, #e0e7ff 75%)',
        backgroundSize: '200% 100%',
        animation: 'skeletonShimmer 1.4s ease-in-out infinite',
        borderRadius: 'inherit',
        ...style
      }}
    />
  );
}

export default function Home() {
  const { data: apiData, loading: apiLoading } = useHeroAboutData();
  const hero = apiData?.hero;
  const about = apiData?.about;

  const [storyOpen, setStoryOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactError, setContactError] = useState('');
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    mobile: '',
    course: '',
    message: ''
  });
  const [formValidated, setFormValidated] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Courses circular carousel state
  const COURSE_COUNT = ALL_COURSES.length; // 6 courses
  const extendedCourses = useMemo(
    () => [...ALL_COURSES, ...ALL_COURSES, ...ALL_COURSES],
    []
  );
  const [carouselIndex, setCarouselIndex] = useState(COURSE_COUNT); // Start at index 6 (middle set)
  const [isTransitioning, setIsTransitioning] = useState(true);
  const isSlidingRef = useRef(false);
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  // Responsive items per view: 3 on desktop (lg+), 2 on tablet (md), 1 on mobile
  const [itemsPerView, setItemsPerView] = useState(() => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 992) return 2;
    return 3;
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsPerView(1);
      else if (window.innerWidth < 992) setItemsPerView(2);
      else setItemsPerView(3);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNextCourse = () => {
    if (isSlidingRef.current) return;
    isSlidingRef.current = true;
    setIsTransitioning(true);
    setCarouselIndex((prev) => prev + 1);
  };

  const handlePrevCourse = () => {
    if (isSlidingRef.current) return;
    isSlidingRef.current = true;
    setIsTransitioning(true);
    setCarouselIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    isSlidingRef.current = false;
    if (carouselIndex >= COURSE_COUNT * 2) {
      setIsTransitioning(false);
      setCarouselIndex((prev) => prev - COURSE_COUNT);
    } else if (carouselIndex < COURSE_COUNT) {
      setIsTransitioning(false);
      setCarouselIndex((prev) => prev + COURSE_COUNT);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      isSlidingRef.current = false;
    }, 550);
    return () => clearTimeout(timer);
  }, [carouselIndex]);

  const activeCourseIndex = ((carouselIndex % COURSE_COUNT) + COURSE_COUNT) % COURSE_COUNT;

  const handleDotClick = (targetIdx) => {
    if (isSlidingRef.current) return;
    isSlidingRef.current = true;
    setIsTransitioning(true);
    const diff = targetIdx - activeCourseIndex;
    setCarouselIndex((prev) => prev + diff);
  };

  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartXRef.current - touchEndXRef.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNextCourse();
      } else {
        handlePrevCourse();
      }
    }
  };

  const handleCourseEnquiry = (course) => {
    setContactData((prev) => ({
      ...prev,
      course: course.title,
      message:
        prev.message ||
        `I would like to enquire about the ${course.title} course (${course.duration || '6 Months'}). Please share details on syllabus, upcoming batch timings, and admission.`
    }));
    setSelectedCourse(null);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Instructors circular carousel state
  const INSTRUCTOR_COUNT = ALL_INSTRUCTORS.length; // 6 instructors
  const extendedInstructors = useMemo(
    () => [...ALL_INSTRUCTORS, ...ALL_INSTRUCTORS, ...ALL_INSTRUCTORS],
    []
  );
  const [instCarouselIndex, setInstCarouselIndex] = useState(INSTRUCTOR_COUNT); // Start at index 6
  const [isInstTransitioning, setIsInstTransitioning] = useState(true);
  const isInstSlidingRef = useRef(false);
  const touchInstStartXRef = useRef(0);
  const touchInstEndXRef = useRef(0);

  const [instItemsPerView, setInstItemsPerView] = useState(() => {
    if (typeof window === 'undefined') return 4;
    if (window.innerWidth < 576) return 1;
    if (window.innerWidth < 992) return 2;
    if (window.innerWidth < 1200) return 3;
    return 4;
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 576) setInstItemsPerView(1);
      else if (window.innerWidth < 992) setInstItemsPerView(2);
      else if (window.innerWidth < 1200) setInstItemsPerView(3);
      else setInstItemsPerView(4);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNextInstructor = () => {
    if (isInstSlidingRef.current) return;
    isInstSlidingRef.current = true;
    setIsInstTransitioning(true);
    setInstCarouselIndex((prev) => prev + 1);
  };

  const handlePrevInstructor = () => {
    if (isInstSlidingRef.current) return;
    isInstSlidingRef.current = true;
    setIsInstTransitioning(true);
    setInstCarouselIndex((prev) => prev - 1);
  };

  const handleInstTransitionEnd = () => {
    isInstSlidingRef.current = false;
    if (instCarouselIndex >= INSTRUCTOR_COUNT * 2) {
      setIsInstTransitioning(false);
      setInstCarouselIndex((prev) => prev - INSTRUCTOR_COUNT);
    } else if (instCarouselIndex < INSTRUCTOR_COUNT) {
      setIsInstTransitioning(false);
      setInstCarouselIndex((prev) => prev + INSTRUCTOR_COUNT);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      isInstSlidingRef.current = false;
    }, 550);
    return () => clearTimeout(timer);
  }, [instCarouselIndex]);

  const activeInstructorIndex =
    ((instCarouselIndex % INSTRUCTOR_COUNT) + INSTRUCTOR_COUNT) % INSTRUCTOR_COUNT;

  const handleInstDotClick = (targetIdx) => {
    if (isInstSlidingRef.current) return;
    isInstSlidingRef.current = true;
    setIsInstTransitioning(true);
    const diff = targetIdx - activeInstructorIndex;
    setInstCarouselIndex((prev) => prev + diff);
  };

  const handleInstTouchStart = (e) => {
    touchInstStartXRef.current = e.touches[0].clientX;
  };

  const handleInstTouchMove = (e) => {
    touchInstEndXRef.current = e.touches[0].clientX;
  };

  const handleInstTouchEnd = () => {
    const diff = touchInstStartXRef.current - touchInstEndXRef.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNextInstructor();
      } else {
        handlePrevInstructor();
      }
    }
  };

  const heroRef = useRef(null);
  const glowRef = useRef(null);
  const statsRef = useRef(null);
  const causesRef = useRef(null);

  // Mouse follow glow in Hero
  useEffect(() => {
    const heroEl = heroRef.current;
    const glowEl = glowRef.current;
    if (!heroEl || !glowEl || !window.matchMedia('(pointer:fine)').matches) return;

    const handleMouseMove = (e) => {
      const rect = heroEl.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glowEl.style.transform = `translate(${(x - 260) * 0.15}px, ${(y - 260) * 0.15}px)`;
    };

    heroEl.addEventListener('mousemove', handleMouseMove);
    return () => heroEl.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animated counters on intersection
  useEffect(() => {
    const statSection = statsRef.current;
    if (!statSection) return;

    const counters = statSection.querySelectorAll('.counter');
    const counted = new WeakSet();

    const animateCounter = (el) => {
      const target = parseInt(el.getAttribute('data-target'), 10);
      const duration = 1800;
      let startTime = null;

      const step = (ts) => {
        if (!startTime) startTime = ts;
        const progress = Math.min((ts - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.floor(eased * target);
        el.textContent = value.toLocaleString();
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target.toLocaleString();
      };
      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !counted.has(entry.target)) {
            counted.add(entry.target);
            animateCounter(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    counters.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  // Cause progress bars animation on intersection
  useEffect(() => {
    const causesSection = causesRef.current;
    if (!causesSection) return;

    const bars = causesSection.querySelectorAll('.cause-progress-fill');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const progress = el.getAttribute('data-progress');
            el.style.width = progress + '%';
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.2 }
    );

    bars.forEach((b) => observer.observe(b));
    return () => observer.disconnect();
  }, []);

  // Testimonial auto carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === 0 ? 1 : 0));
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleDonateClick = (e) => {
    burstConfetti(e.currentTarget);
    const causes = document.getElementById('causes');
    if (causes) causes.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormValidated(true);
    setContactError('');

    const trimmedName = contactData.name.trim();
    const trimmedEmail = contactData.email.trim();
    const trimmedMobile = contactData.mobile.trim();
    const selectedCourse = contactData.course;
    const trimmedMessage = contactData.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMobile || !selectedCourse || !trimmedMessage) {
      setContactError('Please fill in all required fields (Full Name, Email, Mobile Number, Course, and Message).');
      return;
    }

    if (!trimmedEmail.includes('@') || !trimmedEmail.includes('.')) {
      setContactError('Please enter a valid email address.');
      return;
    }

    if (trimmedMobile.replace(/\D/g, '').length < 10) {
      setContactError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setContactSubmitting(true);

    try {
      const res = await submitToGoogle({
        formType: 'enquiry',
        fullName: trimmedName,
        name: trimmedName,
        email: trimmedEmail,
        emailAddress: trimmedEmail,
        mail: trimmedEmail,
        mobile: trimmedMobile,
        mobileNumber: trimmedMobile,
        phone: trimmedMobile,
        phoneNumber: trimmedMobile,
        contactNumber: trimmedMobile,
        course: selectedCourse,
        selectedCourse: selectedCourse,
        courseName: selectedCourse,
        courseTitle: selectedCourse,
        // Separate Subject field (clean, no mobile number concatenated)
        subject: `Course Enquiry: ${selectedCourse}`,
        // Separate Message field (clean user message)
        message: trimmedMessage,
        rawMessage: trimmedMessage,
        academy: 'Ti-Fact Academy',
        submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      });

      if (res.success) {
        try {
          const stored = JSON.parse(localStorage.getItem('tifact_course_enquiries') || '[]');
          stored.unshift({
            id: res.submissionId || `ENQ_${Date.now()}`,
            fullName: trimmedName,
            email: trimmedEmail,
            mobile: trimmedMobile,
            course: selectedCourse,
            message: trimmedMessage,
            timestamp: new Date().toISOString()
          });
          localStorage.setItem('tifact_course_enquiries', JSON.stringify(stored));
        } catch {
          // ignore localStorage error
        }

        burstConfetti(e.currentTarget || document.getElementById('contactForm'));
        setContactSubmitted(true);
        setContactData({ name: '', email: '', mobile: '', course: '', message: '' });
        setFormValidated(false);
      } else {
        setContactError(res.error || 'Failed to submit enquiry. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setContactError('A network error occurred. Please try again.');
    } finally {
      setContactSubmitting(false);
    }
  };

  return (
    <>
      {/* ============================================
           HERO
      ============================================ */}
      <header className="hero" id="home" ref={heroRef}>
        <div className="hero-glow" ref={glowRef}></div>
        <span className="blob blob-1"></span>
        <span className="blob blob-2"></span>
        <span className="blob blob-3"></span>
        <div className="container position-relative">
          <div className="row align-items-center g-5">
            <div className="col-lg-6" data-aos="fade-right">
              <span className="eyebrow">
                <i className="bi bi-stars"></i> 128,400+ Lives Touched This Year
              </span>
              <h1 className="hero-title mt-4">
                Invest in knowledge today,{' '}
                <span className="accent-underline">
                  innovate
                  <svg viewBox="0 0 200 14" preserveAspectRatio="none">
                    <path
                      d="M2 10 Q 50 2 100 8 T 198 6"
                      stroke="#F59E0B"
                      strokeWidth="5"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>{' '}
                the world tomorrow.
              </h1>
              <p className="hero-lead mt-4">
                Ti-Fact Academy transforms curiosity into skills and dreams into possibilities &mdash; empowering aspiring learners with innovative IT education, hands-on software training, and the confidence to build tomorrow&rsquo;s technology. Every skill learned today is a new opportunity for a brighter future.
              </p>
              <div className="d-flex flex-wrap gap-3 mt-4">
                <button
                  type="button"
                  className="btn-hw-primary"
                  id="heroDonateBtn"
                  onClick={handleDonateClick}
                >
                  Enroll Now <i className="bi bi-arrow-right"></i>
                </button>
                <button
                  type="button"
                  className="btn-hw-outline"
                  onClick={() => setStoryOpen(true)}
                >
                  <i className="bi bi-play-circle me-1"></i> Watch Story
                </button>
              </div>
              <div className="d-flex align-items-center gap-3 mt-5">
                <div className="hero-avatars">
                  {apiLoading
                    ? [1, 2, 3].map((k) => (
                      <span
                        key={k}
                        style={{
                          display: 'inline-block',
                          width: 38, height: 38,
                          borderRadius: '50%',
                          background: 'linear-gradient(90deg,#e0e7ff 25%,#c7d2fe 50%,#e0e7ff 75%)',
                          backgroundSize: '200% 100%',
                          animation: 'skeletonShimmer 1.4s ease-in-out infinite',
                          marginLeft: k === 1 ? 0 : -14,
                          border: '2.5px solid #fff'
                        }}
                      />
                    ))
                    : (hero?.avatars || []).map((av, i) => (
                      <img key={i} src={av.src} alt={av.alt} />
                    ))
                  }
                </div>
                <div>
                  <div className="fw-bold font-display" style={{ fontSize: '.9rem' }}>
                    {hero?.badge?.count || '3,200+'} learners
                  </div>
                  <div className="text-muted" style={{ fontSize: '.8rem' }}>
                    {hero?.badge?.subLabel || 'enrolled at Ti-Fact Academy'}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-left" data-aos-delay="120">
              <div className="hero-media">
                <div className="hero-media-frame">
                  {apiLoading ? (
                    <ImgSkeleton style={{ width: '100%', height: '100%', minHeight: 380 }} />
                  ) : (
                    <img
                      src={hero?.mainImage?.src}
                      alt={hero?.mainImage?.alt || 'IT students learning software development'}
                      loading="eager"
                      width={hero?.mainImage?.width || 900}
                      height={hero?.mainImage?.height || 1000}
                    />
                  )}
                </div>
                <div className="float-card float-card-1">
                  <span className="fc-icon">
                    <i className={`bi ${hero?.floatCard1?.icon || 'bi-laptop'}`}></i>
                  </span>
                  <div>
                    <div className="fc-val">{hero?.floatCard1?.value || '3,200+'}</div>
                    <div className="fc-label">{hero?.floatCard1?.label || 'Students Enrolled'}</div>
                  </div>
                </div>
                <div className="float-card float-card-2">
                  <span className="fc-icon">
                    <i className={`bi ${hero?.floatCard2?.icon || 'bi-patch-check-fill'}`}></i>
                  </span>
                  <div>
                    <div className="fc-val">{hero?.floatCard2?.value || '100%'}</div>
                    <div className="fc-label">{hero?.floatCard2?.label || 'Verified Courses'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ============================================
           IMPACT STATS
      ============================================ */}
      <section className="section-pad pt-0" id="impact" ref={statsRef}>
        <div className="container">
          <div className="stats-band" data-aos="zoom-in">
            <div className="row g-0">
              <div className="col-6 col-md-3 stat-item">
                <div className="stat-num">
                  <span className="counter" data-target="184000">0</span>+
                </div>
                <div className="stat-label">Meals Served</div>
              </div>
              <div className="col-6 col-md-3 stat-item">
                <div className="stat-num">
                  <span className="counter" data-target="52300">0</span>+
                </div>
                <div className="stat-label">Children Helped</div>
              </div>
              <div className="col-6 col-md-3 stat-item">
                <div className="stat-num">
                  <span className="counter" data-target="3800">0</span>+
                </div>
                <div className="stat-label">Active Volunteers</div>
              </div>
              <div className="col-6 col-md-3 stat-item">
                <div className="stat-num">
                  $<span className="counter" data-target="2400000">0</span>
                </div>
                <div className="stat-label">Funds Raised</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
           ABOUT
      ============================================ */}
      <section className="section-pad" id="about">
        <div className="container contact-card about-card">
          <div className="row align-items-center g-5">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="about-collage">
                <div className="about-badge">
                  <div className="ab-ring"><span>{about?.badge?.years || '2+'}</span></div>
                  <div>
                    <div className="fw-bold font-display" style={{ fontSize: '.9rem' }}>
                      {about?.badge?.label || 'Trusted Since'}
                    </div>
                    <div className="text-muted" style={{ fontSize: '.78rem' }}>
                      {about?.badge?.since || '2023'} &middot; {about?.badge?.detail || '500+ graduates'}
                    </div>
                  </div>
                </div>
                <div className="img-a">
                  {apiLoading ? (
                    <ImgSkeleton style={{ width: '100%', aspectRatio: '800/650' }} />
                  ) : (
                    <img
                      src={about?.primaryImage?.src}
                      alt={about?.primaryImage?.alt || 'Software developer writing code on a laptop'}
                      loading="lazy"
                      width={about?.primaryImage?.width || 800}
                      height={about?.primaryImage?.height || 650}
                    />
                  )}
                </div>
                <div className="img-b">
                  {apiLoading ? (
                    <ImgSkeleton style={{ width: '100%', aspectRatio: '1/1' }} />
                  ) : (
                    <img
                      src={about?.secondaryImage?.src}
                      alt={about?.secondaryImage?.alt || 'Programming code on a monitor screen'}
                      loading="lazy"
                      width={about?.secondaryImage?.width || 500}
                      height={about?.secondaryImage?.height || 500}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <span className="eyebrow">
                <i className="bi bi-flag-fill"></i> Our Story
              </span>
              <h2 className="section-title mt-3 mb-3" style={{ fontSize: 'clamp(1.7rem,3vw,2.4rem)' }}>
                We believe every learner deserves the opportunity to build a future through technology
              </h2>
              <p className="section-sub">
                Ti-Fact Academy began with a simple vision: to make quality IT education accessible to every aspiring learner. Today, we&rsquo;re building a learning community where curiosity grows into knowledge, skills open doors to opportunity, and tomorrow&rsquo;s innovators gain the confidence to shape the digital world &mdash; never losing sight of the dreams behind every learner.
              </p>
              <ul className="about-list mt-3">
                <li>
                  <span className="ic"><i className="bi bi-eye-fill"></i></span>
                  <div>
                    <strong>Full Learning Transparency</strong>
                    <div className="text-muted small">Track your learning journey from your first lesson to hands-on projects and real-world skills.</div>
                  </div>
                </li>
                <li>
                  <span className="ic"><i className="bi bi-patch-check-fill"></i></span>
                  <div>
                    <strong>Expert-Led IT Training</strong>
                    <div className="text-muted small">Learn through structured courses, practical projects, and industry-relevant technologies designed to help you build valuable skills and prepare for your future in software development</div>
                  </div>
                </li>
                <li>
                  <span className="ic"><i className="bi bi-globe-americas"></i></span>
                  <div>
                    <strong>Learn From Anywhere</strong>
                    <div className="text-muted small">Ti-Fact Academy brings quality IT education to learners everywhere through flexible online training, helping you develop in-demand technology skills and build your future without geographical boundaries</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
           COURSES
      ============================================ */}
      <section className="section-pad bg-white" id="courses" ref={causesRef}>
        <span id="causes" style={{ position: 'relative', top: '-80px', display: 'block' }}></span>
        <div className="container">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: '640px' }} data-aos="fade-up">
            <span className="eyebrow"><i className="bi bi-heart-fill"></i> Active Campaigns</span>
            <h2 className="section-title mt-3" style={{ fontSize: 'clamp(1.8rem,3.2vw,2.5rem)' }}>
              Courses Waiting for You
            </h2>
            <p className="section-sub mx-auto mt-2">
              Every course at Ti-Fact Academy is designed to support your learning journey, with structured modules, practical projects, and clear learning objectives to help you track your progress and build real-world IT skills.
            </p>
          </div>
          <div className="course-carousel-wrapper" data-aos="fade-up" data-aos-delay="100">
            {/* Left / Prev Arrow Button */}
            <button
              type="button"
              className="course-carousel-nav-btn course-carousel-side-btn course-carousel-prev"
              onClick={handlePrevCourse}
              aria-label="Previous Course"
              title="Previous Course"
            >
              <i className="bi bi-chevron-left"></i>
            </button>

            {/* Right / Next Arrow Button */}
            <button
              type="button"
              className="course-carousel-nav-btn course-carousel-side-btn course-carousel-next"
              onClick={handleNextCourse}
              aria-label="Next Course"
              title="Next Course"
            >
              <i className="bi bi-chevron-right"></i>
            </button>

            {/* Carousel Overflow Track */}
            <div
              className="course-carousel-track-container"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="course-carousel-track"
                style={{
                  transform: `translateX(-${carouselIndex * (100 / itemsPerView)}%)`,
                  transition: isTransitioning ? 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)' : 'none'
                }}
                onTransitionEnd={handleTransitionEnd}
              >
                {extendedCourses.map((course, idx) => {
                  const maxPrice = 25000;
                  const progress = Math.min(100, Math.round((course.price / maxPrice) * 100));
                  return (
                    <div
                      className="course-carousel-slide"
                      key={`${course.id}-${idx}`}
                      style={{
                        flex: `0 0 ${100 / itemsPerView}%`,
                        maxWidth: `${100 / itemsPerView}%`
                      }}
                    >
                      <div className="cause-card h-100 d-flex flex-column">
                        <div className="cause-img">
                          <img
                            src={course.thumbnail}
                            alt={course.thumbnailAlt || course.title}
                            loading="lazy"
                          />
                          <span className="cause-tag">{course.categoryId}</span>
                        </div>
                        <div className="cause-body d-flex flex-column justify-content-between flex-grow-1">
                          <div>
                            <h5 className="font-display fw-bold mb-2">{course.title}</h5>
                            <p className="text-muted small mb-0">{course.description}</p>
                          </div>
                          <div className="mt-3">
                            <div className="cause-progress-track">
                              <div
                                className="cause-progress-fill"
                                data-progress={progress}
                                style={{ width: `${progress}%` }}
                              ></div>
                            </div>
                            <div className="cause-meta">
                              <span className="raised">₹{course.price.toLocaleString('en-IN')}</span>
                              <span className="goal">{course.duration} • {course.mode}</span>
                            </div>
                            <button
                              type="button"
                              className="cause-donate"
                              onClick={() => setSelectedCourse(course)}
                            >
                              View Details <i className="bi bi-arrow-right ms-1"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Controls: Indicators + Navigation */}
            <div className="course-carousel-controls">
              <button
                type="button"
                className="course-carousel-nav-btn d-md-none"
                style={{ width: '40px', height: '40px', fontSize: '1rem' }}
                onClick={handlePrevCourse}
                aria-label="Previous Course"
              >
                <i className="bi bi-chevron-left"></i>
              </button>

              <div className="course-carousel-indicators" role="tablist" aria-label="Course Slides">
                {ALL_COURSES.map((c, i) => (
                  <button
                    key={c.id}
                    type="button"
                    className={`course-carousel-dot ${activeCourseIndex === i ? 'active' : ''}`}
                    onClick={() => handleDotClick(i)}
                    aria-label={`Go to course ${i + 1}: ${c.title}`}
                  />
                ))}
              </div>

              <span className="course-carousel-counter">
                {activeCourseIndex + 1} / {COURSE_COUNT}
              </span>

              <button
                type="button"
                className="course-carousel-nav-btn d-md-none"
                style={{ width: '40px', height: '40px', fontSize: '1rem' }}
                onClick={handleNextCourse}
                aria-label="Next Course"
              >
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
           WHY CHOOSE US
      ============================================ */}
      <section className="section-pad" id="why" style={{ background: 'var(--clr-bg)' }}>
        <div className="container">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: '640px' }} data-aos="fade-up">
            <span className="eyebrow">
              <i className={WHY_TIFACT.section.eyebrowIcon}></i> {WHY_TIFACT.section.eyebrow}
            </span>
            <h2 className="section-title mt-3" style={{ fontSize: 'clamp(1.8rem,3.2vw,2.5rem)' }}>
              {WHY_TIFACT.section.heading}
            </h2>
          </div>
          <div className="row g-4">
            {WHY_TIFACT.features.map((feature, idx) => (
              <div
                key={feature.id}
                className="col-md-6 col-lg-4"
                data-aos="fade-up"
                data-aos-delay={`${(idx % 3) * 80}`}
              >
                <div className="why-card">
                  <div className="why-ic"><i className={feature.icon}></i></div>
                  <h5 className="font-display fw-bold">{feature.title}</h5>
                  <p className="text-muted mb-0">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
           HOW IT WORKS
      ============================================ */}
      <section className="section-pad bg-white" id="how">
        <div className="container contact-card">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: '640px' }} data-aos="fade-up">
            <span className="eyebrow"><i className="bi bi-signpost-split-fill"></i> Simple Learning Process</span>
            <h2 className="section-title mt-3" style={{ fontSize: 'clamp(1.8rem,3.2vw,2.5rem)' }}>
              How your learning journey begins and grows
            </h2>
          </div>
          <div className="hiw-wrap">
            <div className="hiw-line"></div>
            <div className="row g-4">
              <div className="col-md-4 hiw-step" data-aos="fade-up">
                <div className="hiw-num">1</div>
                <h5 className="font-display fw-bold">Choose Your Course</h5>
                <p className="text-muted">Explore our IT and software courses and select the program that matches your interests and career goals.</p>
              </div>
              <div className="col-md-4 hiw-step" data-aos="fade-up" data-aos-delay="120">
                <div className="hiw-num">2</div>
                <h5 className="font-display fw-bold">Enroll &amp; Start Learning</h5>
                <p className="text-muted">Join Ti-Fact Academy and access online lessons, structured learning materials, and practical training.</p>
              </div>
              <div className="col-md-4 hiw-step" data-aos="fade-up" data-aos-delay="240">
                <div className="hiw-num">3</div>
                <h5 className="font-display fw-bold">Build Your Skills</h5>
                <p className="text-muted">Practice what you learn through coding exercises and projects, and take the next step toward your future in technology.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
           INSTRUCTORS
      ============================================ */}
      <section className="section-pad" id="instructors">
        <span id="volunteers" style={{ position: 'relative', top: '-80px', display: 'block' }}></span>
        <div className="container">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: '640px' }} data-aos="fade-up">
            <span className="eyebrow"><i className="bi bi-people-fill"></i> Our Instructors</span>
            <h2 className="section-title mt-3" style={{ fontSize: 'clamp(1.8rem,3.2vw,2.5rem)' }}>
              The minds inspiring tomorrow&rsquo;s tech innovators
            </h2>
          </div>

          <div className="course-carousel-wrapper" data-aos="fade-up" data-aos-delay="100">
            {/* Left / Prev Arrow Button */}
            <button
              type="button"
              className="course-carousel-nav-btn course-carousel-side-btn course-carousel-prev"
              onClick={handlePrevInstructor}
              aria-label="Previous Instructor"
              title="Previous Instructor"
            >
              <i className="bi bi-chevron-left"></i>
            </button>

            {/* Right / Next Arrow Button */}
            <button
              type="button"
              className="course-carousel-nav-btn course-carousel-side-btn course-carousel-next"
              onClick={handleNextInstructor}
              aria-label="Next Instructor"
              title="Next Instructor"
            >
              <i className="bi bi-chevron-right"></i>
            </button>

            {/* Carousel Overflow Track */}
            <div
              className="course-carousel-track-container"
              onTouchStart={handleInstTouchStart}
              onTouchMove={handleInstTouchMove}
              onTouchEnd={handleInstTouchEnd}
            >
              <div
                className="course-carousel-track"
                style={{
                  transform: `translateX(-${instCarouselIndex * (100 / instItemsPerView)}%)`,
                  transition: isInstTransitioning ? 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)' : 'none'
                }}
                onTransitionEnd={handleInstTransitionEnd}
              >
                {extendedInstructors.map((inst, idx) => (
                  <div
                    className="course-carousel-slide"
                    key={`${inst.id}-${idx}`}
                    style={{
                      flex: `0 0 ${100 / instItemsPerView}%`,
                      maxWidth: `${100 / instItemsPerView}%`
                    }}
                  >
                    <div className="inst-card">
                      <div className="vol-img">
                        <img
                          src={inst.profilePic}
                          alt={inst.name}
                          loading="lazy"
                        />
                      </div>
                      <div className="vol-overlay">
                        <div className="fw-bold font-display" style={{ fontSize: '1.2rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                          {inst.name}
                        </div>
                        <div className="small opacity-90 fw-medium" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                          {inst.designation}
                        </div>
                        <div className="d-flex align-items-center gap-2 mt-1 small" style={{ color: '#86efac' }}>
                          <i className="bi bi-award-fill"></i>
                          <span>{inst.experience} Experience</span>
                        </div>
                        <div className="vol-social">
                          {inst.socialLinks?.facebook && (
                            <a
                              href={inst.socialLinks.facebook}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="vol-social-btn vol-fb"
                              aria-label={`${inst.name} on Facebook`}
                              title="Facebook"
                            >
                              <i className="bi bi-facebook"></i>
                            </a>
                          )}
                          {inst.socialLinks?.instagram && (
                            <a
                              href={inst.socialLinks.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="vol-social-btn vol-insta"
                              aria-label={`${inst.name} on Instagram`}
                              title="Instagram"
                            >
                              <i className="bi bi-instagram"></i>
                            </a>
                          )}
                          {inst.socialLinks?.linkedin && (
                            <a
                              href={inst.socialLinks.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="vol-social-btn vol-linkedin"
                              aria-label={`${inst.name} on LinkedIn`}
                              title="LinkedIn"
                            >
                              <i className="bi bi-linkedin"></i>
                            </a>
                          )}
                          {inst.email && (
                            <a
                              href={`mailto:${inst.email}`}
                              className="vol-social-btn vol-email"
                              aria-label={`Email ${inst.name}`}
                              title="Email"
                            >
                              <i className="bi bi-envelope-fill"></i>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Controls: Indicators + Navigation */}
            <div className="course-carousel-controls">
              <button
                type="button"
                className="course-carousel-nav-btn d-md-none"
                style={{ width: '40px', height: '40px', fontSize: '1rem' }}
                onClick={handlePrevInstructor}
                aria-label="Previous Instructor"
              >
                <i className="bi bi-chevron-left"></i>
              </button>

              <div className="course-carousel-indicators" role="tablist" aria-label="Instructor Slides">
                {ALL_INSTRUCTORS.map((inst, i) => (
                  <button
                    key={inst.id}
                    type="button"
                    className={`course-carousel-dot ${activeInstructorIndex === i ? 'active' : ''}`}
                    onClick={() => handleInstDotClick(i)}
                    aria-label={`Go to instructor ${i + 1}: ${inst.name}`}
                  />
                ))}
              </div>

              <span className="course-carousel-counter">
                {activeInstructorIndex + 1} / {INSTRUCTOR_COUNT}
              </span>

              <button
                type="button"
                className="course-carousel-nav-btn d-md-none"
                style={{ width: '40px', height: '40px', fontSize: '1rem' }}
                onClick={handleNextInstructor}
                aria-label="Next Instructor"
              >
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
           TESTIMONIALS
      ============================================ */}
      <section className="section-pad bg-white" id="testimonials">
        <div className="container">
          <div className="testi-section p-4 p-md-5" data-aos="zoom-in">
            <div className="text-center mx-auto mb-5" style={{ maxWidth: '600px' }}>
              <span className="eyebrow" style={{ background: 'rgba(255,255,255,.15)', color: '#fff' }}>
                <i className="bi bi-chat-quote-fill"></i> Student Stories
              </span>
              <h2 className="section-title mt-3 text-white" style={{ fontSize: 'clamp(1.7rem,3vw,2.3rem)' }}>
                Success stories from our learning community
              </h2>
            </div>
            <div id="testiCarousel" className="carousel slide position-relative">
              <div className="carousel-inner">
                {/* Slide 1 */}
                <div className={`carousel-item ${activeSlide === 0 ? 'active' : ''}`}>
                  <div className="row g-4 justify-content-center">
                    {ALL_REVIEWS.slice(0, 3).map((review) => (
                      <div className="col-md-6 col-lg-4" key={review.id}>
                        <div className="testi-card d-flex flex-column justify-content-between h-100">
                          <div>
                            <div className="testi-stars d-flex align-items-center mb-3">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <i
                                  key={star}
                                  className={`bi ${star <= review.rating ? 'bi-star-fill' : 'bi-star'}`}
                                  style={{
                                    color: star <= review.rating ? '#f59e0b' : 'rgba(255, 255, 255, 0.35)',
                                    marginRight: '3px'
                                  }}
                                ></i>
                              ))}
                              <span
                                className="ms-2 badge bg-warning bg-opacity-25 text-white"
                                style={{ fontSize: '0.72rem' }}
                              >
                                {review.rating}.0
                              </span>
                            </div>
                            <h6 className="fw-bold text-white mb-2" style={{ fontSize: '1.02rem', lineHeight: 1.4 }}>
                              {review.reviewTitle}
                            </h6>
                            <p className="testi-quote mb-0" style={{ minHeight: '84px' }}>
                              &ldquo;{review.reviewText}&rdquo;
                            </p>
                          </div>
                          <div className="testi-person mt-3 pt-3 border-top border-white border-opacity-10">
                            <img
                              src={review.studentProfile}
                              alt={review.studentName}
                              loading="lazy"
                              style={{ width: '48px', height: '48px', objectFit: 'cover' }}
                            />
                            <div className="overflow-hidden">
                              <div className="testi-name d-flex align-items-center gap-2">
                                <span className="text-truncate">{review.studentName}</span>
                                <span
                                  className="badge bg-white bg-opacity-25 text-white font-monospace"
                                  style={{ fontSize: '0.68rem', padding: '2px 6px' }}
                                >
                                  {review.studentId}
                                </span>
                              </div>
                              <div className="testi-role text-truncate" style={{ fontSize: '0.8rem', opacity: 0.9 }}>
                                <i className="bi bi-mortarboard-fill me-1 text-warning"></i>
                                {review.courseName}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Slide 2 */}
                <div className={`carousel-item ${activeSlide === 1 ? 'active' : ''}`}>
                  <div className="row g-4 justify-content-center">
                    {ALL_REVIEWS.slice(3, 6).map((review) => (
                      <div className="col-md-6 col-lg-4" key={review.id}>
                        <div className="testi-card d-flex flex-column justify-content-between h-100">
                          <div>
                            <div className="testi-stars d-flex align-items-center mb-3">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <i
                                  key={star}
                                  className={`bi ${star <= review.rating ? 'bi-star-fill' : 'bi-star'}`}
                                  style={{
                                    color: star <= review.rating ? '#f59e0b' : 'rgba(255, 255, 255, 0.35)',
                                    marginRight: '3px'
                                  }}
                                ></i>
                              ))}
                              <span
                                className="ms-2 badge bg-warning bg-opacity-25 text-white"
                                style={{ fontSize: '0.72rem' }}
                              >
                                {review.rating}.0
                              </span>
                            </div>
                            <h6 className="fw-bold text-white mb-2" style={{ fontSize: '1.02rem', lineHeight: 1.4 }}>
                              {review.reviewTitle}
                            </h6>
                            <p className="testi-quote mb-0" style={{ minHeight: '84px' }}>
                              &ldquo;{review.reviewText}&rdquo;
                            </p>
                          </div>
                          <div className="testi-person mt-3 pt-3 border-top border-white border-opacity-10">
                            <img
                              src={review.studentProfile}
                              alt={review.studentName}
                              loading="lazy"
                              style={{ width: '48px', height: '48px', objectFit: 'cover' }}
                            />
                            <div className="overflow-hidden">
                              <div className="testi-name d-flex align-items-center gap-2">
                                <span className="text-truncate">{review.studentName}</span>
                                <span
                                  className="badge bg-white bg-opacity-25 text-white font-monospace"
                                  style={{ fontSize: '0.68rem', padding: '2px 6px' }}
                                >
                                  {review.studentId}
                                </span>
                              </div>
                              <div className="testi-role text-truncate" style={{ fontSize: '0.8rem', opacity: 0.9 }}>
                                <i className="bi bi-mortarboard-fill me-1 text-warning"></i>
                                {review.courseName}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Indicators */}
              <div className="carousel-indicators">
                <button
                  type="button"
                  className={activeSlide === 0 ? 'active' : ''}
                  aria-label="Slide 1"
                  onClick={() => setActiveSlide(0)}
                ></button>
                <button
                  type="button"
                  className={activeSlide === 1 ? 'active' : ''}
                  aria-label="Slide 2"
                  onClick={() => setActiveSlide(1)}
                ></button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
           CTA BANNER
      ============================================ */}
      <section className="section-pad" id="cta">
        <div className="container">
          <div className="cta-banner" data-aos="zoom-in">
            <i className="bi bi-heart-fill" style={{ fontSize: '2.4rem' }}></i>
            <h2 className="mt-3">
              Your Future in Technology Starts Here.
            </h2>
            <p className="mb-4" style={{ opacity: '.92' }}>
              Every skill you learn brings you closer to new opportunities. With Ti-Fact Academy, turn your curiosity into knowledge, your knowledge into practical skills, and your dreams into tomorrow&rsquo;s innovations.
            </p>
            <button
              type="button"
              className="btn-cta"
              id="ctaDonateBtn"
              onClick={handleDonateClick}
            >
              <i className="bi bi-heart-fill me-2"></i>Start Learning Today
            </button>
          </div>
        </div>
      </section>

      {/* ============================================
           CONTACT
      ============================================ */}
      <section className="section-pad bg-white" id="contact">
        <div className="container">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: '640px' }} data-aos="fade-up">
            <span className="eyebrow"><i className="bi bi-envelope-fill"></i> Get In Touch</span>
            <h2 className="section-title mt-3" style={{ fontSize: 'clamp(1.8rem,3.2vw,2.5rem)' }}>
              Let&rsquo;s Build Your Future in Technology Together.
            </h2>
          </div>
          <div className="row g-5">
            <div className="col-lg-5 contact-card" data-aos="fade-right">
              <div className="contact-info-item">
                <span className="ic"><i className="bi bi-geo-alt-fill"></i></span>
                <div>
                  <strong>{CONTACT_INFO.office.label}</strong>
                  <div className="text-muted small">
                    <a
                      href={CONTACT_INFO.office.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'inherit', textDecoration: 'none' }}
                    >
                      {CONTACT_INFO.office.address}
                    </a>
                  </div>
                </div>
              </div>
              <div className="contact-info-item">
                <span className="ic"><i className="bi bi-envelope-fill"></i></span>
                <div>
                  <strong>{CONTACT_INFO.email.label}</strong>
                  <div className="text-muted small">
                    <a href={CONTACT_INFO.email.href} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {CONTACT_INFO.email.address}
                    </a>
                  </div>
                </div>
              </div>
              <div className="contact-info-item">
                <span className="ic"><i className="bi bi-telephone-fill"></i></span>
                <div>
                  <strong>{CONTACT_INFO.mobile.label}</strong>
                  <div className="text-muted small">
                    <a href={CONTACT_INFO.mobile.href} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {CONTACT_INFO.mobile.display}
                    </a>
                  </div>
                </div>
              </div>
              <div className="map-placeholder" style={{ padding: 0, overflow: 'hidden', borderRadius: '12px', minHeight: '220px' }}>
                <iframe
                  id="office-map-embed"
                  title="Ti-Fact Academy Office Location"
                  src={CONTACT_INFO.office.embedSrc}
                  width="100%"
                  height="220"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
            <div className="col-lg-7" data-aos="fade-left">
              <div className="contact-card">
                <form
                  id="contactForm"
                  noValidate
                  className={formValidated ? 'was-validated' : ''}
                  onSubmit={handleContactSubmit}
                >
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold" htmlFor="cf-name">
                        Full Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-hw"
                        id="cf-name"
                        placeholder="e.g. Rahul Sharma"
                        required
                        value={contactData.name}
                        onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                      />
                      <div className="invalid-feedback">Please enter your full name.</div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold" htmlFor="cf-email">
                        Email Address <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control form-control-hw"
                        id="cf-email"
                        placeholder="e.g. rahul@example.com"
                        required
                        value={contactData.email}
                        onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                      />
                      <div className="invalid-feedback">Please enter a valid email address.</div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold" htmlFor="cf-mobile">
                        Mobile Number <span className="text-danger">*</span>
                      </label>
                      <input
                        type="tel"
                        className="form-control form-control-hw"
                        id="cf-mobile"
                        placeholder="e.g. +91 98765 43210"
                        required
                        value={contactData.mobile}
                        onChange={(e) => setContactData({ ...contactData, mobile: e.target.value })}
                      />
                      <div className="invalid-feedback">Please enter a valid 10-digit mobile number.</div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold" htmlFor="cf-course">
                        Select Course <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select form-control-hw"
                        id="cf-course"
                        required
                        value={contactData.course}
                        onChange={(e) => setContactData({ ...contactData, course: e.target.value })}
                      >
                        <option value="">-- Choose Course for Enquiry --</option>
                        {ACADEMY_DATA.categories.map((category) => (
                          <optgroup key={category.id} label={category.name}>
                            {category.courses.map((course) => (
                              <option key={course.id} value={course.title}>
                                {course.title}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                        <option value="General IT Career Guidance">General IT Career Guidance / Other</option>
                      </select>
                      <div className="invalid-feedback">Please select a course for enquiry.</div>
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-semibold" htmlFor="cf-message">
                        Message <span className="text-danger">*</span>
                      </label>
                      <textarea
                        className="form-control form-control-hw"
                        id="cf-message"
                        rows="4"
                        placeholder="Tell us about your background, preferred batch timings, or questions regarding the curriculum..."
                        required
                        value={contactData.message}
                        onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                      ></textarea>
                      <div className="invalid-feedback">Please enter your enquiry message.</div>
                    </div>
                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn-hw-primary w-100 justify-content-center"
                        disabled={contactSubmitting}
                      >
                        {contactSubmitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Submitting Enquiry...
                          </>
                        ) : (
                          <>
                            Submit Course Enquiry <i className="bi bi-send ms-1"></i>
                          </>
                        )}
                      </button>
                    </div>
                    {contactError && (
                      <div className="col-12" role="alert">
                        <div
                          className="alert alert-danger mt-2 mb-0"
                          style={{ borderRadius: '12px' }}
                        >
                          <i className="bi bi-exclamation-triangle-fill me-2"></i>
                          {contactError}
                        </div>
                      </div>
                    )}
                    {contactSubmitted && (
                      <div className="col-12" role="status" aria-live="polite">
                        <div
                          className="alert alert-success mt-2 mb-0"
                          style={{ borderRadius: '12px' }}
                        >
                          <i className="bi bi-check-circle-fill me-2"></i>
                          Thank you! Your course enquiry has been submitted successfully. Our academic counselor will reach out to your mobile number and email shortly.
                        </div>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Details Modal */}
      <CourseDetailsModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
        onEnquire={handleCourseEnquiry}
      />

      {/* Story Video Modal */}
      <StoryModal isOpen={storyOpen} onClose={() => setStoryOpen(false)} />
    </>
  );
}
