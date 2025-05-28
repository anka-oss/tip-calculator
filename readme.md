# Tip Calculator

## Description

### English
A simple, responsive Tip Calculator web application built with vanilla HTML, CSS, and JavaScript. Enter the bill amount, desired tip percentage, and number of people to instantly see how much tip each person should pay and the total amount per person. Perfect as a beginner’s project to master core web technologies.

### Polski
Prosta, responsywna aplikacja Kalkulator Napiwków stworzona w czystym HTML, CSS i JavaScript. Wprowadź kwotę rachunku, procent napiwku oraz liczbę osób, aby od razu zobaczyć, ile napiwku przypada na każdą osobę oraz całkowitą kwotę do zapłaty przez osobę. Idealny projekt dla początkujących do opanowania podstawowych technologii webowych.

## Features
- Calculate total tip based on bill amount and selected percentage
- Split tip and total per person for group payments
- Responsive layout for mobile and desktop
- User-friendly validation with error messages

## Live demo
Check out the live version of the app: [ossowska.tech/tip-calculator](https://ossowska.tech/tip-calculator)

## Technologies used
- Semantic HTML5
- CSS3 (Flexbox)
- Vanilla JavaScript (ES6)
- Playwright for end-to-end testing

## Planned Enhancements
- **Dark mode toggle**: allow users to switch between light and dark themes for better readability in low-light environments (coming soon)
- Remember user preference with `localStorage`
- Real-time calculation on input change without form submission

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/anka-oss/tip-calculator.git
   ```
2. Navigate into the project folder:
   ```bash
   cd tip-calculator
   ```
3. Serve the files with any static server or open `index.html` directly in your browser. Example using `serve`:
   ```bash
   npx serve .
   ```

## Testing
This project includes my first automated test written using Playwright. The test verifies the correct calculation of tips and totals based on user input.

### To run the test:
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the test
   ```
   npm test
   ```

The test script is located in the test/ directory.

## Usage
1. Enter the **Bill Amount** in the first input field.
2. Enter the **Tip Percentage** you want to give.
3. Enter the **Number of People** to split the bill.
4. Click **Calculate** to see the results.

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests for new features and improvements.

## License
This project is open-source and available under the [MIT License](LICENSE).

---
*Made with ♥ for learners and clean code enthusiasts.*
