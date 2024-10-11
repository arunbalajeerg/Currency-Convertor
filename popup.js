const apiUrl = 'https://api.fastforex.io/fetch-all?api_key=bc9be3dfe6-64fdfe0b99-sl707c'; 
const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');
const resultDiv = document.getElementById('result');
let rates = {};

async function fetchCurrencyData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        rates = data.results;

        Object.keys(rates).forEach(currency => {
            const optionFrom = document.createElement('option');
            optionFrom.value = currency;
            optionFrom.textContent = currency;
            fromCurrencySelect.appendChild(optionFrom);

            const optionTo = document.createElement('option');
            optionTo.value = currency;
            optionTo.textContent = currency;
            toCurrencySelect.appendChild(optionTo);
        });
    } catch (error) {
        console.error('Error fetching currency data:', error);
    }
}

function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    if (amount && fromCurrency && toCurrency) {
        const convertedAmount = (amount * (rates[toCurrency] / rates[fromCurrency])).toFixed(2);
        resultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    } else {
        resultDiv.textContent = 'Please fill in all fields.';
    }
}

document.getElementById('convert').addEventListener('click', convertCurrency);

fetchCurrencyData();
