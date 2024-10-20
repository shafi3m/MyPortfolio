// -----------------------
// Dark Mode Toggle
// -----------------------
const darkModeToggle = document.getElementById("darkModeToggle");
const darkModeIcon = document.getElementById("darkModeIcon");

let isDarkMode = localStorage.getItem("darkMode") === "enabled";

const enableDarkMode = () => {
  document.body.classList.add("dark");
  darkModeIcon.textContent = "dark_mode";
  localStorage.setItem("darkMode", "enabled");
};

const disableDarkMode = () => {
  document.body.classList.remove("dark");
  darkModeIcon.textContent = "light_mode";
  localStorage.setItem("darkMode", "disabled");
};

if (isDarkMode) {
  enableDarkMode();
}

darkModeToggle.addEventListener("click", () => {
  isDarkMode = !isDarkMode;
  if (isDarkMode) {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});

// -----------------------
// Mobile Navigation Toggle
// -----------------------
const navToggle = document.getElementById("navToggle");
const mobileNav = document.getElementById("mobileNav");

navToggle.addEventListener("click", () => {
  mobileNav.classList.toggle("hidden");
});

mobileNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.add("hidden");
  });
});

// -----------------------
// Typewriter Effect for Name
// -----------------------
const name = "Mohammed Shafi";
const nameContainer = document.getElementById("name");
let i = 0; // Index for typing
let deleting = false; // Flag to indicate whether we are deleting

const typeWriter = () => {
  if (!deleting) {
    // Typing phase
    if (i < name.length) {
      nameContainer.innerHTML =
        name.substring(0, i + 1) + "<span class='cursor'>|</span>";
      i++;
      setTimeout(typeWriter, 100); // Adjust typing speed here
    } else {
      // Start deleting after a pause
      deleting = true;
      setTimeout(typeWriter, 1000); // Pause before starting to delete
    }
  } else {
    // Deleting phase
    if (i > 0) {
      nameContainer.innerHTML =
        name.substring(0, i - 1) + "<span class='cursor'>|</span>";
      i--;
      setTimeout(typeWriter, 100); // Adjust deleting speed here
    } else {
      // Finished deleting, reset and start typing again
      deleting = false;
      setTimeout(typeWriter, 1000); // Pause before starting to type
    }
  }
};

typeWriter();

//section scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);
    const navbarHeight = 80; // Adjust this to the height of your navbar

    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth", // This enables smooth scrolling
    });
  });
});

const skillsSection = document.getElementById("skills");
const skillCards = skillsSection.querySelectorAll(".flex");

// Create an Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Add the animation class to each card
      skillCards.forEach((card, index) => {
        // Reset the animation
        card.classList.remove("animate"); // Remove animation class
        // Force reflow to restart animation
        void card.offsetWidth; // Trigger reflow
        // Add the animation class again
        setTimeout(() => {
          card.classList.add("animate"); // Add animation class
        }, index * 100); // Stagger the animation
      });
    }
  });
});

// Observe the skills section
observer.observe(skillsSection);

// -----------------------
// Horizontal Scroll Functionality for Certifications
// -----------------------
const container = document.getElementById("certificationContainer");
const scrollLeftBtn = document.getElementById("scrollLeftBtn");
const scrollRightBtn = document.getElementById("scrollRightBtn");

// Horizontal scroll on mouse wheel (for non-touchpad users)
container.addEventListener("wheel", (event) => {
  event.preventDefault();

  // For touchpad horizontal scrolling (deltaX) and mouse vertical scrolling (deltaY)
  const scrollAmount = event.deltaY !== 0 ? event.deltaY : event.deltaX;

  // Adjust scroll speed
  container.scrollLeft += scrollAmount * 4;
});

// Scroll left button functionality
scrollLeftBtn.addEventListener("click", () => {
  container.scrollBy({ left: -300, behavior: "smooth" });
});

// Scroll right button functionality
scrollRightBtn.addEventListener("click", () => {
  container.scrollBy({ left: 300, behavior: "smooth" });
});

// -----------------------
// Flip Cards Functionality
// -----------------------
const flipCards = document.querySelectorAll(".flip-card");

flipCards.forEach((card) => {
  card.addEventListener("click", (event) => {
    // Prevent flipping when the 'View Certificate' button is clicked
    if (!event.target.classList.contains("viewCertificateBtn")) {
      card.classList.toggle("flipped");
      const flipInner = card.querySelector(".flip-card-inner");
      flipInner.classList.toggle("flipped");
    }
  });
});

// -----------------------
// View Certificate Functionality
// -----------------------
document.querySelectorAll(".viewCertificateBtn1").forEach((button) => {
  button.addEventListener("click", (event) => {
    const certificateSrc = event.currentTarget.getAttribute(
      "data-certificate-src"
    );
    console.log("Button clicked for:", certificateSrc);

    const modal = document.querySelector(".certificateModal");
    const certificateImage = modal.querySelector(".certificateImage");

    // Set the image source
    certificateImage.src = certificateSrc;

    // Show the modal
    modal.classList.remove("hidden");
  });
});

// Close modal when close button is clicked
document.querySelectorAll(".closeModalBtn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const modal = btn.closest(".certificateModal"); // Find the closest modal
    modal.classList.add("hidden"); // Hide the modal
  });
});

// -----------------------
// Show More Functionality for Projects and Certifications
// -----------------------
const showMoreBtn = document.getElementById("show-more-btn");
const moreProjects = document.getElementById("more-projects");

showMoreBtn.addEventListener("click", () => {
  moreProjects.classList.toggle("hidden");
  showMoreBtn.textContent = moreProjects.classList.contains("hidden")
    ? "Show More"
    : "Show Less";
});

const showMoreCertificationsBtn = document.getElementById(
  "show-more-certifications-btn"
);
const moreCertifications = document.getElementById("more-certifications");

showMoreCertificationsBtn.addEventListener("click", () => {
  moreCertifications.classList.toggle("hidden");
  showMoreCertificationsBtn.textContent = moreCertifications.classList.contains(
    "hidden"
  )
    ? "Show More"
    : "Show Less";
});

// Start observing the section
observer.observe(section);
