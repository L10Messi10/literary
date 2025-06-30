// Preloader functionality
window.addEventListener("load", function () {
  const preloader = document.querySelector(".preloader");
  setTimeout(() => {
    preloader.classList.add("hidden");
  }, 1000);

  // Initialize animations
  initAnimations();
});

// Initialize animations for cards
function initAnimations() {
  // Writing cards
  const writingCards = document.querySelectorAll(".writing-card");
  writingCards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("visible");
    }, 300 * index);
  });

  // Student cards
  const studentCards = document.querySelectorAll(".student-card");
  studentCards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("visible");
    }, 300 * index);
  });
}

// Achievements Carousel Functionality
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".nav-dot");
const prevBtn = document.querySelector(".prev-slide");
const nextBtn = document.querySelector(".next-slide");
const carouselSlides = document.querySelector(".carousel-slides");
let currentSlide = 0;
let slideInterval;

// Initialize carousel
function initCarousel() {
  slideInterval = setInterval(nextSlide, 8000); // Change slide every 8 seconds
  updateSlidePosition();
}

// Update slide position
function updateSlidePosition() {
  carouselSlides.style.transform = `translateX(-${currentSlide * 25}%)`;

  // Update active classes
  slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === currentSlide);
  });

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}

// Go to specific slide
function goToSlide(n) {
  currentSlide = (n + slides.length) % slides.length;
  updateSlidePosition();
}

// Next slide
function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlidePosition();
}

// Previous slide
function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateSlidePosition();
}

// Event listeners
prevBtn.addEventListener("click", () => {
  clearInterval(slideInterval);
  prevSlide();
  initCarousel();
});

nextBtn.addEventListener("click", () => {
  clearInterval(slideInterval);
  nextSlide();
  initCarousel();
});

dots.forEach((dot) => {
  dot.addEventListener("click", function () {
    clearInterval(slideInterval);
    const slideIndex = parseInt(this.getAttribute("data-slide"));
    goToSlide(slideIndex);
    initCarousel();
  });
});

// Student data for the carousel
const students = [
  {
    name: "Alex Johnson",
    major: "Creative Writing",
    bio: "Specializes in speculative fiction and character-driven narratives. Won the 2022 Young Writers Award.",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Maya Chen",
    major: "Journalism",
    bio: "Investigative journalist with a passion for social justice. Published in several national magazines.",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Sam Rodriguez",
    major: "Poetry",
    bio: "Spoken word artist blending traditional forms with contemporary themes. Two published collections.",
    img: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    name: "Jamal Williams",
    major: "Screenwriting",
    bio: "Focuses on historical dramas and character studies. Currently developing a limited series.",
    img: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    name: "Elena Petrova",
    major: "Literary Fiction",
    bio: "Explores themes of identity and belonging. Shortlisted for the National Fiction Prize.",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "David Kim",
    major: "Science Writing",
    bio: "Makes complex scientific concepts accessible. Regular contributor to science magazines.",
    img: "https://randomuser.me/api/portraits/men/31.jpg",
  },
  {
    name: "Priya Sharma",
    major: "Fantasy",
    bio: "Creates immersive secondary worlds with deep cultural systems. Working on debut trilogy.",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Marcus Brown",
    major: "Playwriting",
    bio: "Contemporary playwright exploring modern relationships. Two plays currently in production.",
    img: "https://randomuser.me/api/portraits/men/41.jpg",
  },
];

// Carousel variables
let autoScrollInterval;
let currentStudentIndex = 0;
const scrollSpeed = 4000; // 4 seconds

// Initialize student carousel
function initStudentCarousel() {
  const carousel = document.getElementById("studentCarousel");
  carousel.innerHTML = "";

  students.forEach((student) => {
    const card = document.createElement("div");
    card.className = "student-card";
    card.innerHTML = `
    <img src="${student.img}" alt="${student.name}" class="student-img">
    <h3 class="student-name">${student.name}</h3>
    <p class="student-major">${student.major}</p>
    <p class="student-bio">${student.bio}</p>
    <a href="#" class="view-profile">View Profile</a>
  `;
    carousel.appendChild(card);
  });

  // Start auto-scrolling
  startAutoScroll();

  // Add hover event listeners
  carousel.addEventListener("mouseenter", stopAutoScroll);
  carousel.addEventListener("mouseleave", startAutoScroll);

  // Initialize animations after cards are created
  setTimeout(initAnimations, 100);
}

// Move carousel manually
function moveCarousel(direction) {
  const carousel = document.getElementById("studentCarousel");
  const scrollAmount = 300;
  currentStudentIndex =
    (currentStudentIndex + direction + students.length) % students.length;

  carousel.scrollTo({
    left: currentStudentIndex * (carousel.scrollWidth / students.length),
    behavior: "smooth",
  });
}

// Auto-scroll function
function autoScroll() {
  const carousel = document.getElementById("studentCarousel");
  currentStudentIndex = (currentStudentIndex + 1) % students.length;

  carousel.scrollTo({
    left: currentStudentIndex * (carousel.scrollWidth / students.length),
    behavior: "smooth",
  });
}

// Start auto-scrolling
function startAutoScroll() {
  stopAutoScroll();
  autoScrollInterval = setInterval(autoScroll, scrollSpeed);
}

// Stop auto-scrolling
function stopAutoScroll() {
  clearInterval(autoScrollInterval);
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", function () {
  initCarousel();
  initStudentCarousel();
});
