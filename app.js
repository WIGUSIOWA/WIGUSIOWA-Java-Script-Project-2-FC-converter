const valueInput = document.querySelector(".value-input");
const currencySelector = document.querySelector("#currency-selector");
const convertBtn = document.querySelector("button");
const output = document.querySelector(".output");
const loader = document.querySelector('.loader-container');

const loaderHandler = (val) => {
    loader.style.display = val;
};
const getData = async (curr) => {
    loaderHandler('flex');
    const res = await fetch(`http://api.nbp.pl/api/exchangerates/rates/a/${curr}/today`);
    const data = await res.json();
    loaderHandler('none');
    return data;
}

const onConvertClick = async () => {
    const data = await getData(currencySelector.value);
    const exchange = data.rates[0].mid;
    const userInput = valueInput.value;

    if (!isNaN(userInput) && userInput) {
        output.textContent = `${(userInput * exchange).toFixed(2)} PLN`;
    } else {
        alert('Wrong input.')
    }
}
convertBtn.addEventListener('click', onConvertClick);