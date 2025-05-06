const billAmount = document.getElementById('bill');
const tipPercentage = document.getElementById('tip-percent');
const numberOfPeople = document.getElementById('people');
const tipAmount = document.getElementById('tip-amount');
const totalPerPerson = document.getElementById('total-per-person');
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
};

function computeTip() {
    const billVal = billAmount.value;
    const tipVal = tipPercentage.value;
    const peopleVal = numberOfPeople.value;
    
    if (!billVal || !tipVal || !peopleVal) {
        showMessage('Please, fill in all the fields');
        return null;
    }

    const bill = parseFloat(billVal);
    const tipPct = parseFloat(tipVal);
    const people = parseInt(peopleVal, 10);

    if (bill <= 0 || tipPct <= 0 || people <= 0) {
        showMessage('Please enter numbers greater than 0');
        return null;
    }

    const tipTotal = bill * (tipPct / 100);
    const tipPerPerson = tipTotal / people;
    const totalVal = (bill + tipTotal) / people;
  
    return { tipPerPerson, totalPerPerson: totalVal };
}

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
  
    const result = computeTip();
    if (!result) return;
  
    tipAmount.textContent = result.tipPerPerson.toFixed(2);
    totalPerPerson.textContent = result.totalPerPerson.toFixed(2);
  });