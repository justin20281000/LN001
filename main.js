// Translations
const translations = {
    en: {
        pageTitle: "Dinner Menu Recommender",
        mainHeading: "What's for Dinner?",
        generateBtn: "Recommend Menu",
        themeDark: "Dark Mode",
        themeLight: "Light Mode",
        langBtn: "한국어"
    },
    ko: {
        pageTitle: "저녁 메뉴 추천",
        mainHeading: "오늘 뭐 먹지?",
        generateBtn: "메뉴 추천받기",
        themeDark: "다크 모드",
        themeLight: "라이트 모드",
        langBtn: "English"
    }
};

const menus = {
    en: [
        "Kimchi Stew", "Bulgogi", "Bibimbap", "Fried Chicken", "Pizza",
        "Pasta", "Sushi", "Tacos", "Steak", "Ramen",
        "Tonkatsu", "Stir-fried Pork", "Pho", "Hamburger", "Tteokbokki"
    ],
    ko: [
        "김치찌개", "불고기", "비빔밥", "치킨", "피자",
        "파스타", "초밥", "타코", "스테이크", "라멘",
        "돈까스", "제육볶음", "쌀국수", "햄버거", "떡볶이"
    ]
};

// State
let currentLang = localStorage.getItem('lang') || 'en';

// Theme toggle logic
const themeToggle = document.getElementById('theme-toggle');
const updateThemeBtnText = () => {
    const theme = document.documentElement.getAttribute('data-theme');
    themeToggle.textContent = theme === 'dark' ? translations[currentLang].themeLight : translations[currentLang].themeDark;
};

const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
}
updateThemeBtnText();

themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
    updateThemeBtnText();
});

// Language toggle logic
const langToggle = document.getElementById('lang-toggle');
const updateLanguage = (lang) => {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    
    // Update static text
    document.getElementById('page-title').textContent = translations[lang].pageTitle;
    document.getElementById('main-heading').textContent = translations[lang].mainHeading;
    document.getElementById('generate-btn').textContent = translations[lang].generateBtn;
    langToggle.textContent = translations[lang].langBtn;
    updateThemeBtnText();

    // Update current menu if exists
    if (currentMenuIndex !== -1) {
        menuDisplayEl.menu = menus[currentLang][currentMenuIndex];
    }
};

langToggle.addEventListener('click', () => {
    const newLang = currentLang === 'en' ? 'ko' : 'en';
    updateLanguage(newLang);
});

class DinnerMenu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    set menu(name) {
        const style = `
            .menu-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                animation: fadeIn 0.5s ease-in-out;
            }
            .menu-name {
                font-size: 2rem;
                color: var(--text-color, #333);
                padding: 1rem 2rem;
                border: 2px solid #ff7272;
                border-radius: 15px;
                background-color: var(--container-bg, #fff);
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;

        this.shadowRoot.innerHTML = `
            <style>${style}</style>
            <div class="menu-container">
                <div class="menu-name">${name}</div>
            </div>
        `;
    }
}

customElements.define('dinner-menu', DinnerMenu);

const generateBtn = document.getElementById('generate-btn');
const menuDisplayEl = document.querySelector('dinner-menu');
let currentMenuIndex = -1;

const getRandomMenuIndex = () => {
    return Math.floor(Math.random() * menus.en.length);
};

generateBtn.addEventListener('click', () => {
    currentMenuIndex = getRandomMenuIndex();
    menuDisplayEl.menu = menus[currentLang][currentMenuIndex];
});

// Initialize language
updateLanguage(currentLang);

// Initial recommendation
currentMenuIndex = getRandomMenuIndex();
menuDisplayEl.menu = menus[currentLang][currentMenuIndex];
