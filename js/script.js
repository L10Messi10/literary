// Preloader functionality
window.addEventListener("load", function () {
  const preloader = document.querySelector(".preloader");
  setTimeout(() => {
    preloader.classList.add("hidden");
  }, 1000);
});

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
  {
    name: "Sophie Dubois",
    major: "Memoir",
    bio: "Writes about cross-cultural experiences and personal transformation. Developing a memoir.",
    img: "https://randomuser.me/api/portraits/women/26.jpg",
  },
  {
    name: "Kenji Tanaka",
    major: "Experimental Fiction",
    bio: "Pushes boundaries of narrative structure and form. Published in avant-garde literary journals.",
    img: "https://randomuser.me/api/portraits/men/24.jpg",
  },
];

// Carousel variables
let autoScrollInterval;
const scrollSpeed = 2000;

// Initialize carousel
function initStudentCarousel() {
  const carousel = document.getElementById("studentCarousel");
  carousel.innerHTML = "";

  // Create duplicate cards for infinite scrolling effect
  const allStudents = [...students, ...students];

  allStudents.forEach((student) => {
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
}

// Move carousel manually
function moveCarousel(direction) {
  const carousel = document.getElementById("studentCarousel");
  const scrollAmount = 250;

  carousel.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth",
  });
}

// Auto-scroll function
function autoScroll() {
  const carousel = document.getElementById("studentCarousel");
  const scrollAmount = 1;

  if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 50) {
    carousel.scrollTo({ left: 0, behavior: "auto" });
  } else {
    carousel.scrollBy({ left: scrollAmount, behavior: "auto" });
  }
}

// Start auto-scrolling
function startAutoScroll() {
  stopAutoScroll();
  autoScrollInterval = setInterval(autoScroll, 20);
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

// Parallax effect for header background
window.addEventListener("scroll", function () {
  const scrollPosition = window.pageYOffset;
  const headerBg = document.querySelector(".header-bg");
  if (headerBg) {
    headerBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
  }
});
