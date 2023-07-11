const valueInput = document.querySelector(".value-input");
const currencySelector = document.querySelector("#currency-selector");
const valueForm = document.querySelector("#value-form");
const output = document.querySelector(".output");
const loader = document.querySelector(".loader-container");
const convertButton = document.querySelector(".convert-button");

const loaderHandler = (val) => {
  loader.style.display = val;
};

const getData = async (curr) => {
  try {
    loaderHandler("flex");
    const res = await fetch(
      `http://api.nbp.pl/api/exchangerates/rates/a/${curr}/`
    );
    const data = await res.json();
    loaderHandler("none");
    return data;
  } catch (error) {
    loaderHandler("none");
    alert("An error occurred while fetching the data, please try later.");
    throw error;
  }
};

const onConvertClick = async (event) => {
  event.preventDefault();
  const userInput = valueInput.value;

  if (
    isNaN(userInput) ||
    userInput.trim() === "" ||
    parseFloat(userInput) === 0
  ) {
    return alert("Wrong input.");
  }

  const data = await getData(currencySelector.value);
  const exchange = data?.rates?.[0]?.mid;

  if (!exchange) {
    alert("An error occurred while fetching the data, please try later.");
  } else {
    output.textContent = `${(userInput * exchange).toFixed(2)} PLN`;
  }
};

valueInput.addEventListener("input", () => {
  const inputValue = valueInput.value;
  if (inputValue.startsWith("-")) {
    valueInput.value = inputValue.slice(1);
  }
});

valueForm.addEventListener("submit", onConvertClick);
convertButton.addEventListener("click", onConvertClick);
