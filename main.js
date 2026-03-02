// Theme toggle logic
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        themeToggle.textContent = 'Light Mode';
    }
}

themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = 'Dark Mode';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = 'Light Mode';
    }
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

const menus = [
    "김치찌개 (Kimchi Stew)",
    "불고기 (Bulgogi)",
    "비빔밥 (Bibimbap)",
    "치킨 (Fried Chicken)",
    "피자 (Pizza)",
    "파스타 (Pasta)",
    "초밥 (Sushi)",
    "타코 (Tacos)",
    "스테이크 (Steak)",
    "라멘 (Ramen)",
    "돈까스 (Tonkatsu)",
    "제육볶음 (Stir-fried Pork)",
    "쌀국수 (Pho)",
    "햄버거 (Hamburger)",
    "떡볶이 (Tteokbokki)"
];

const generateBtn = document.getElementById('generate-btn');
const menuDisplayEl = document.querySelector('dinner-menu');

const getRandomMenu = () => {
    return menus[Math.floor(Math.random() * menus.length)];
};

generateBtn.addEventListener('click', () => {
    menuDisplayEl.menu = getRandomMenu();
});

// Initial recommendation
menuDisplayEl.menu = getRandomMenu();
