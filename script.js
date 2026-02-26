const siteConfig = {
  schoolName: "Rechabite Group of Schools",
  schoolShort: "Rechabite",
  city: "Ijebu Ode",
  tagline:
    "Learning and achieving together through exceptional Early Years and Primary education.",
  email: "admissions@rechabitegroupschools.edu",
  phone: "08133546272",
  address: "10, Olufowobi Street, off Awokoya Str, Ijebu Ode",
  signals: [
    "10+ Years of Excellence",
    "100% Pupil-Focused Learning",
    "Inclusive SEND Support",
    "Early Years to Primary",
    "Creativity + Character Development",
    "Safe & Structured Campus"
  ],
  programs: [
    {
      title: "Nursery School",
      text: "Play-based foundations that build confidence, language, curiosity, and social development.",
      level: "Creche to Kindergarten",
      outcomes: [
        "Language and literacy readiness",
        "Emotional growth and self-expression",
        "Numeracy through practical activities"
      ]
    },
    {
      title: "Primary Curriculum",
      text: "A blended curriculum focused on strong academics, character, and problem-solving skills.",
      level: "Year 1 to Year 6",
      outcomes: [
        "Strong numeracy and reading outcomes",
        "Structured science and discovery projects",
        "Leadership and teamwork habits"
      ]
    },
    {
      title: "Model College",
      text: "College-level preparation with academic depth, leadership training, and future-ready skills.",
      level: "Junior and Senior College",
      outcomes: [
        "Strong WAEC and NECO exam readiness",
        "STEM, arts, and leadership pathways",
        "Mentorship and career-focused guidance"
      ]
    }
  ],
  life: [
    {
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1300&q=80",
      caption: "Student Research Expo",
      className: "wide"
    },
    {
      image:
        "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?auto=format&fit=crop&w=1100&q=80",
      caption: "Classroom Learning",
      className: "tall"
    },
    {
      image:
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
      caption: "Creative Arts",
      className: "wide"
    },
    {
      image:
        "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1100&q=80",
      caption: "Sports and Movement",
      className: "tall"
    }
  ],
  stories: [
    {
      quote:
        "Admissions was clear and supportive from start to finish. We felt guided, not pressured, and our son settled in quickly.",
      name: "Mariam Yusuf",
      role: "Parent, Year 3"
    },
    {
      quote:
        "The teachers communicate progress clearly and give practical suggestions we can follow at home every week.",
      name: "Chinwe Okafor",
      role: "Parent, Year 2"
    },
    {
      quote:
        "The school balances strong academics with kindness and confidence-building. It has been a great fit for our family.",
      name: "Amina Bello",
      role: "Parent, Year 1"
    },
    {
      quote:
        "We moved mid-session and were worried about transition, but the support team made our daughter feel included immediately.",
      name: "Tosin Adebayo",
      role: "Parent, Year 4"
    },
    {
      quote:
        "I appreciate the structure and discipline, but also how much the school encourages creativity through arts and clubs.",
      name: "Ifeoma Nnaji",
      role: "Parent, Year 5"
    },
    {
      quote:
        "From security to classroom teaching, everything feels intentional and child-focused. We are very satisfied with the experience.",
      name: "Sadiq Musa",
      role: "Parent, Year 6"
    }
  ]
};

const selectors = {
  schoolName: document.querySelectorAll("[data-school-name]"),
  schoolShort: document.querySelectorAll("[data-school-short]"),
  tagline: document.querySelectorAll("[data-school-tagline]"),
  city: document.querySelector("[data-school-city]"),
  email: document.querySelector("[data-school-email]"),
  phone: document.querySelector("[data-school-phone]"),
  address: document.querySelector("[data-school-address]"),
  signalTrack: document.getElementById("signalTrack"),
  programGrid: document.getElementById("programGrid"),
  lifeGrid: document.getElementById("lifeGrid"),
  storyTrack: document.getElementById("storyTrack")
};

function assignText(nodeList, value) {
  nodeList.forEach((node) => {
    node.textContent = value;
  });
}

function hydrateReusableContent() {
  assignText(selectors.schoolName, siteConfig.schoolName);
  assignText(selectors.schoolShort, siteConfig.schoolShort);
  assignText(selectors.tagline, siteConfig.tagline);

  if (selectors.city) selectors.city.textContent = siteConfig.city;
  if (selectors.email) {
    selectors.email.textContent = siteConfig.email;
    selectors.email.href = `mailto:${siteConfig.email}`;
  }

  if (selectors.phone) {
    selectors.phone.textContent = siteConfig.phone;
    selectors.phone.href = `tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`;
  }

  if (selectors.address) selectors.address.textContent = siteConfig.address;
}

function renderSignals() {
  if (!selectors.signalTrack) return;
  const mergedSignals = [...siteConfig.signals, ...siteConfig.signals];
  selectors.signalTrack.innerHTML = mergedSignals
    .map((signal) => `<span class="signal-item">${signal}</span>`)
    .join("");
}

function renderPrograms() {
  if (!selectors.programGrid) return;
  selectors.programGrid.innerHTML = siteConfig.programs
    .map(
      (program) => `
      <article class="program-card reveal">
        <h3>${program.title}</h3>
        <p>${program.text}</p>
        <ul class="program-outcomes">
          ${program.outcomes.map((outcome) => `<li>${outcome}</li>`).join("")}
        </ul>
        <span class="program-badge">${program.level}</span>
      </article>
    `
    )
    .join("");
}

function renderLifeGallery() {
  if (!selectors.lifeGrid) return;
  selectors.lifeGrid.innerHTML = siteConfig.life
    .map(
      (item) => `
      <figure class="life-item ${item.className} reveal" data-caption="${item.caption}">
        <img src="${item.image}" alt="${item.caption}" loading="lazy">
      </figure>
    `
    )
    .join("");
}

function renderStories() {
  if (!selectors.storyTrack) return;
  selectors.storyTrack.innerHTML = siteConfig.stories
    .map(
      (story) => `
      <article class="story-card">
        <p>"${story.quote}"</p>
        <strong>${story.name}</strong>
        <p>${story.role}</p>
      </article>
    `
    )
    .join("");
}

function setupMenu() {
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");
  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

function setupStoriesSlider() {
  const nextBtn = document.getElementById("nextStory");
  const prevBtn = document.getElementById("prevStory");
  if (!nextBtn || !prevBtn || !selectors.storyTrack) return;

  let storyIndex = 0;
  const maxStories = siteConfig.stories.length;

  function updateStoryPosition() {
    selectors.storyTrack.style.transform = `translateX(-${storyIndex * 100}%)`;
    selectors.storyTrack.style.transition = "transform 0.55s cubic-bezier(0.2, 0.7, 0.2, 1)";
  }

  nextBtn.addEventListener("click", () => {
    storyIndex = (storyIndex + 1) % maxStories;
    updateStoryPosition();
  });

  prevBtn.addEventListener("click", () => {
    storyIndex = (storyIndex - 1 + maxStories) % maxStories;
    updateStoryPosition();
  });

  window.setInterval(() => {
    storyIndex = (storyIndex + 1) % maxStories;
    updateStoryPosition();
  }, 5500);
}

function setupActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");
  if (!sections.length || !navLinks.length) return;

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { threshold: 0.5 }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

function setupLenis() {
  if (!window.Lenis) return;

  const lenis = new window.Lenis({
    duration: 1.05,
    smoothWheel: true,
    touchMultiplier: 1.45
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}

function setupAnimations() {
  if (!window.gsap || !window.ScrollTrigger) return;

  document.documentElement.classList.add("anim-ready");
  window.gsap.registerPlugin(window.ScrollTrigger);

  gsap.from(".hero-copy > *", {
    y: 26,
    opacity: 0,
    duration: 0.85,
    stagger: 0.1,
    ease: "power2.out"
  });

  gsap.from(".hero-media", {
    y: 26,
    opacity: 0,
    duration: 1,
    delay: 0.15,
    ease: "power3.out"
  });

  gsap.to("[data-parallax]", {
    yPercent: 8,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  gsap.utils.toArray(".reveal").forEach((item) => {
    gsap.fromTo(
      item,
      { y: 28, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: item,
          start: "top 88%"
        }
      }
    );
  });
}

hydrateReusableContent();
renderSignals();
renderPrograms();
renderLifeGallery();
renderStories();
setupMenu();
setupStoriesSlider();
setupActiveNav();
setupLenis();
setupAnimations();
