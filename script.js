const DEFAULT_SCHOOL_KEY = "rechabite";
let siteConfig = null;

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

function sanitizeSchoolKey(rawKey) {
  return String(rawKey || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "");
}

function getSchoolKeyFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return sanitizeSchoolKey(params.get("school")) || DEFAULT_SCHOOL_KEY;
}

async function fetchSchoolConfig(schoolKey) {
  const response = await fetch(`schools/${schoolKey}.json`);
  if (!response.ok) {
    throw new Error(`School config not found: ${schoolKey}`);
  }

  return response.json();
}

async function loadSiteConfig() {
  const requestedKey = getSchoolKeyFromUrl();

  try {
    return await fetchSchoolConfig(requestedKey);
  } catch (error) {
    if (requestedKey !== DEFAULT_SCHOOL_KEY) {
      console.warn(`Failed to load '${requestedKey}', using '${DEFAULT_SCHOOL_KEY}' instead.`);
      return fetchSchoolConfig(DEFAULT_SCHOOL_KEY);
    }

    throw error;
  }
}

function updateMeta() {
  if (!siteConfig) return;

  const title = `${siteConfig.schoolName} | ${siteConfig.tagline}`;
  document.title = title;

  const descriptionTag = document.querySelector('meta[name="description"]');
  if (descriptionTag) {
    descriptionTag.setAttribute("content", siteConfig.tagline);
  }
}

function hydrateReusableContent() {
  if (!siteConfig) return;

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
  if (!siteConfig || !selectors.signalTrack) return;

  const mergedSignals = [...siteConfig.signals, ...siteConfig.signals];
  selectors.signalTrack.innerHTML = mergedSignals
    .map((signal) => `<span class="signal-item">${signal}</span>`)
    .join("");
}

function renderPrograms() {
  if (!siteConfig || !selectors.programGrid) return;

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
  if (!siteConfig || !selectors.lifeGrid) return;

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
  if (!siteConfig || !selectors.storyTrack) return;

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
  if (!nextBtn || !prevBtn || !selectors.storyTrack || !siteConfig) return;

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

async function bootstrap() {
  try {
    siteConfig = await loadSiteConfig();
  } catch (error) {
    console.error("Unable to load school data.", error);
    return;
  }

  updateMeta();
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
}

bootstrap();
