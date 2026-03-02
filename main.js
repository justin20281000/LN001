// Translations
const translations = {
    en: {
        pageTitle: "Dinner Menu Recommender",
        mainHeading: "What's for Dinner?",
        generateBtn: "Recommend Menu",
        themeDark: "Dark Mode",
        themeLight: "Light Mode",
        langBtn: "한국어",
        contactHeading: "Affiliate Inquiry",
        contactEmailPlaceholder: "Your Email",
        contactMessagePlaceholder: "Your Message",
        contactSubmit: "Send Inquiry"
    },
    ko: {
        pageTitle: "저녁 메뉴 추천",
        mainHeading: "오늘 뭐 먹지?",
        generateBtn: "메뉴 추천받기",
        themeDark: "다크 모드",
        themeLight: "라이트 모드",
        langBtn: "English",
        contactHeading: "제휴 문의",
        contactEmailPlaceholder: "이메일 주소",
        contactMessagePlaceholder: "문의 내용",
        contactSubmit: "문의 보내기"
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
    ],
    keywords: [
        "kimchi", "bulgogi", "bibimbap", "fried-chicken", "pizza",
        "pasta", "sushi", "taco", "steak", "ramen",
        "tonkatsu", "spicy-pork", "pho", "hamburger", "tteokbokki"
    ],
    descriptions: {
        en: [
            "A spicy Korean stew made with fermented kimchi, pork, and tofu. Perfect for cold days!",
            "Thinly sliced, marinated beef grilled to perfection. A classic Korean favorite.",
            "A healthy bowl of rice topped with various vegetables, meat, and gochujang sauce.",
            "Crispy, crunchy, and juicy fried chicken. Best enjoyed with a cold beer!",
            "Cheesy goodness on a crispy crust with your favorite toppings.",
            "Classic Italian noodles served with tomato, cream, or oil-based sauces.",
            "Fresh vinegared rice topped with raw fish or seafood. A taste of Japan.",
            "Mexican street food featuring tortillas filled with meat, salsa, and fresh herbs.",
            "Juicy, tender grilled beef steak. A luxurious treat for dinner.",
            "Savory Japanese noodle soup with rich broth and toppings like chashu pork.",
            "Breaded, deep-fried pork cutlet. Crunchy on the outside, tender on the inside.",
            "Spicy stir-fried pork with vegetables. Great with a bowl of steamed rice.",
            "Vietnamese rice noodle soup with aromatic broth and fresh herbs.",
            "Juicy beef patty in a soft bun with lettuce, tomato, and cheese.",
            "Spicy, chewy rice cakes. A popular Korean street food snack."
        ],
        ko: [
            "잘 익은 김치와 돼지고기, 두부를 넣고 끓인 얼큰한 한국인의 소울 푸드입니다.",
            "얇게 썬 소고기를 달콤 짭짤한 양념에 재워 구운 한국의 대표 고기 요리입니다.",
            "따뜻한 밥 위에 나물, 고기, 고추장, 계란후라이를 얹어 비벼 먹는 건강식입니다.",
            "바삭바삭한 튀김옷과 육즙 가득한 속살! 맥주와 환상적인 궁합을 자랑합니다.",
            "쫄깃한 도우 위에 토마토 소스와 치즈, 다양한 토핑이 어우러진 요리입니다.",
            "토마토, 크림, 오일 등 다양한 소스로 맛을 낸 이탈리아의 대표 면 요리입니다.",
            "신선한 생선회와 배합초로 간을 한 밥이 어우러진 일본의 대표 요리입니다.",
            "옥수수 또띠아에 고기, 채소, 살사 소스를 싸서 먹는 멕시코의 맛입니다.",
            "육즙을 가득 머금은 두툼한 소고기 구이. 특별한 날 저녁 메뉴로 제격입니다.",
            "진한 육수에 쫄깃한 면발, 차슈와 계란을 곁들인 일본식 국수 요리입니다.",
            "돼지고기에 빵가루를 입혀 바삭하게 튀겨낸 요리. 겉바속촉의 정석입니다.",
            "매콤달콤한 양념에 돼지고기와 채소를 볶아낸 최고의 밥도둑 반찬입니다.",
            "진한 고기 육수와 부드러운 쌀면, 향긋한 고수가 어우러진 베트남 국수입니다.",
            "두툼한 패티와 신선한 채소를 부드러운 빵 사이에 끼운 든든한 한 끼입니다.",
            "매콤달콤한 고추장 소스에 쫄깃한 떡을 볶아낸 국민 간식입니다."
        ]
    }
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
    
    // Update contact form text
    document.getElementById('contact-heading').textContent = translations[lang].contactHeading;
    document.getElementById('contact-email').placeholder = translations[lang].contactEmailPlaceholder;
    document.getElementById('contact-message').placeholder = translations[lang].contactMessagePlaceholder;
    document.getElementById('contact-submit').textContent = translations[lang].contactSubmit;
    
    updateThemeBtnText();

    // Update current menu if exists
    if (currentMenuIndex !== -1) {
        menuDisplayEl.updateMenu(
            menus[currentLang][currentMenuIndex], 
            menus.keywords[currentMenuIndex],
            menus.descriptions[currentLang][currentMenuIndex]
        );
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

    updateMenu(name, keyword, description) {
        const style = `
            .menu-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                animation: fadeIn 0.5s ease-in-out;
                max-width: 500px;
                margin: 0 auto;
            }
            .menu-image {
                width: 100%;
                max-width: 400px;
                height: 300px;
                object-fit: cover;
                border-radius: 15px;
                margin-bottom: 1.5rem;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                border: 3px solid #ff7272;
            }
            .menu-name {
                font-size: 2rem;
                color: var(--text-color, #333);
                padding: 0.5rem 1rem;
                font-weight: bold;
                margin-bottom: 0.5rem;
            }
            .menu-description {
                font-size: 1.1rem;
                color: var(--text-color, #666);
                line-height: 1.5;
                padding: 1rem;
                background-color: var(--container-bg);
                border-radius: 10px;
                margin-top: 0.5rem;
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;

        // Using local images from the /images folder
        const imageUrl = `images/${keyword}.jpg`;

        this.shadowRoot.innerHTML = `
            <style>${style}</style>
            <div class="menu-container">
                <img class="menu-image" src="${imageUrl}" alt="${name}">
                <div class="menu-name">${name}</div>
                <div class="menu-description">${description || ''}</div>
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
    menuDisplayEl.updateMenu(
        menus[currentLang][currentMenuIndex], 
        menus.keywords[currentMenuIndex],
        menus.descriptions[currentLang][currentMenuIndex]
    );
});

// Initialize language
updateLanguage(currentLang);

// Initial recommendation
currentMenuIndex = getRandomMenuIndex();
menuDisplayEl.updateMenu(
    menus[currentLang][currentMenuIndex], 
    menus.keywords[currentMenuIndex],
    menus.descriptions[currentLang][currentMenuIndex]
);
