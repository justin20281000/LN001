
class LottoNumbers extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    set numbers(numbers) {
        const style = `
            .lotto-numbers-container {
                display: flex;
            }
            .lotto-number {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin: 0 5px;
                font-size: 1.2rem;
                font-weight: bold;
                color: white;
            }
        `;

        const numberElements = numbers.map(number => {
            const ball = document.createElement('div');
            ball.classList.add('lotto-number');
            ball.textContent = number;
            ball.style.backgroundColor = this.getColor(number);
            return ball;
        });

        this.shadowRoot.innerHTML = `<style>${style}</style>`;
        const container = document.createElement('div');
        container.classList.add('lotto-numbers-container');
        numberElements.forEach(el => container.appendChild(el));
        this.shadowRoot.appendChild(container);
    }

    getColor(number) {
        if (number <= 10) return '#fbc400';
        if (number <= 20) return '#69c8f2';
        if (number <= 30) return '#ff7272';
        if (number <= 40) return '#aaa';
        return '#b0d840';
    }
}

customElements.define('lotto-numbers', LottoNumbers);

const generateBtn = document.getElementById('generate-btn');
const lottoNumbersEl = document.querySelector('lotto-numbers');

const generateNumbers = () => {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    return Array.from(numbers).sort((a, b) => a - b);
};

generateBtn.addEventListener('click', () => {
    const newNumbers = generateNumbers();
    lottoNumbersEl.numbers = newNumbers;
});

// Initial generation
const initialNumbers = generateNumbers();
lottoNumbersEl.numbers = initialNumbers;
