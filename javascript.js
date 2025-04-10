const mobileMenu = document.querySelector("#mobile-menu")
const links = document.querySelector(".mobile-links")
const button = document.querySelector("[data-theme-toggle]");
const localStorageTheme = localStorage.getItem("theme");
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
const collapsibleButton = document.querySelectorAll(".collapsible-button");
let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });

updateButton({ buttonEl: button, isDark: currentThemeSetting === "dark" });
updateThemeOnHtmlEl({ theme: currentThemeSetting });

button.addEventListener("click", (event) => {
    const newTheme = currentThemeSetting === "dark" ? "light" : "dark";

    localStorage.setItem("theme", newTheme);
    updateButton({ buttonEl: button, isDark: newTheme === "dark" });
    updateThemeOnHtmlEl({ theme: newTheme });

    currentThemeSetting = newTheme;
});

mobileMenu.addEventListener("click", function() {
    if (links.style.display === "block") {
        links.style.display = "none";
    } else {
        links.style.display = "block";
    }
    const newIcon = links.style.display === "none" ? `<span class="material-symbols-outlined">menu</span>` : `<span class="material-symbols-outlined">close</span>`
    mobileMenu.innerHTML = newIcon;
})

collapsibleButton.forEach(button => {
    button.addEventListener("click", function() {
        this.classList.toggle("active");
        collapsibleContent = this.nextElementSibling;
        if (collapsibleContent.style.display === "flex") {
            collapsibleContent.style.display = "none";
        } else {
            collapsibleContent.style.display = "flex";
        }
    })
});

function calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }) {
    if (localStorageTheme !== null) {
        return localStorageTheme;
    }

    if (systemSettingDark.matches) {
        return "dark";
    }
    return "light";
}

function updateButton({ buttonEl, isDark }) {
    const newCta = isDark ? "Change to light theme" : "Change to dark theme";
    const newIcon = isDark ? `<span class="material-symbols-outlined">light_mode</span>` : `<span class="material-symbols-outlined">dark_mode</span>`
    buttonEl.setAttribute("aria-label", newCta);
    buttonEl.innerHTML = newIcon;
}
  
function updateThemeOnHtmlEl({ theme }) {
    document.querySelector("html").setAttribute("data-theme", theme);
}