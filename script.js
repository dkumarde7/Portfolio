
const backToTopButton = document.querySelector("#back-to-top");

// Show the button after scrolling down.
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add("visible");
    } else {
        backToTopButton.classList.remove("visible");
    }
});

// Scroll back to the top when clicked.
backToTopButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


const navLinks = document.querySelectorAll("nav a[href^='#']");

const sections = document.querySelectorAll(
    "#about, #projects, #skills, #contact"
);

function updateActiveLink() {
    let currentSectionId = "";

    // Find the last section that has reached the top area.
    sections.forEach((section) => {
        const position = section.getBoundingClientRect().top;

        if (position <= 160) {
            currentSectionId = section.id;
        }
    });

    // Highlight Contact when the visitor reaches the bottom.
    const atPageBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 5;

    if (atPageBottom) {
        currentSectionId = "contact";
    }

    navLinks.forEach((link) => {
        const isActive =
            link.getAttribute("href") === `#${currentSectionId}`;

        link.classList.toggle("active", isActive);
    });
}

window.addEventListener("scroll", updateActiveLink);
window.addEventListener("resize", updateActiveLink);
updateActiveLink();



const themeToggle = document.querySelector("#theme-toggle");

// Load the visitor's saved theme.
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
    document.body.classList.add("light-mode");
}

// Keep the button label in sync with the current theme.
function updateThemeButton() {
    const isLightMode = document.body.classList.contains("light-mode");

    themeToggle.textContent = isLightMode
        ? "🌙 Dark Mode"
        : "☀️ Light Mode";

    themeToggle.setAttribute("aria-pressed", String(isLightMode));
}

// Set the correct label when the page loads.
updateThemeButton();

// Switch themes and remember the choice.
themeToggle.addEventListener("click", () => {
    const isLightMode = document.body.classList.toggle("light-mode");

    localStorage.setItem(
        "portfolio-theme",
        isLightMode ? "light" : "dark"
    );

    updateThemeButton();
});
