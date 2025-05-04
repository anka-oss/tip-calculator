const billAmount = document.getElementById('bill');
const tipPercentage = document.getElementById('tip-percent');
const numberOfPeople = document.getElementById('people');
const tipAmount = document.getElementById('tip-amount');
const perPerson = document.getElementById('total-per-person');
const submitBtn = document.getElementById('calc');

function showMessage(msg) {
    const banner = document.createElement('div');
    banner.textContent = msg;
    banner.style.position = 'fixed';
    banner.style.top = '1rem';
    banner.style.left = '50%';
    banner.style.transform = 'translateX(-50%)';
    banner.style.background = '#444';
    banner.style.color = '#fff';
    banner.style.padding = '0.5rem 1rem';
    banner.style.borderRadius = '5px';
    banner.style.zIndex = 9999;
    document.body.appendChild(banner);
  
    setTimeout(() => banner.remove(), 3000);
}

function checkIfNotEmpty (billAmountFloat, tipPercentageFloat, numberOfPeopleFloat) {
    if (billAmountFloat == null || billAmountFloat == "" || tipPercentageFloat == null || tipPercentageFloat == "" || numberOfPeopleFloat == null || numberOfPeopleFloat == "") {
        showMessage('Please, fill in all the fields');
        return true;
    }
}

function computeTip(billAmount, tipPercentage, numberOfPeople) {
    const billAmountFloat = parseFloat(billAmount.value, 0.01);
    const tipPercentageFloat = parseFloat(tipPercentage.value, 0.01);
    const numberOfPeopleFloat = parseFloat(numberOfPeople.value, 1);

    const somethingIsEmpty = checkIfNotEmpty(billAmountFloat, tipPercentageFloat, numberOfPeopleFloat);
    
    if (somethingIsEmpty === true) {
        return;
    }

    if (billAmountFloat <= 0 || tipPercentageFloat <=0 || numberOfPeopleFloat <=0 ) {
        showMessage('Please enter number greater than 0')
        return;
    } else {
        const billIncreasedWithTip = billAmountFloat * (tipPercentageFloat / 100);
        const tipTotal = billIncreasedWithTip - billAmountFloat;
        const tipPerPerson = tipTotal / numberOfPeopleFloat;
        return(tipPerPerson);
    }
};

submitBtn.addEventListener('click',(e) => {
    e.preventDefault();

    const tipToSplit = computeTip(billAmount, tipPercentage, numberOfPeople);

    Math.round(tipToSplit);
})