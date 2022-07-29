function phoneFormat(input) {//returns (###) ###-####
    input = input.replace(/\D/g, '');
    const size = input.length;
    if (size > 0) {
        input = "(" + input
    }
    if (size > 3) {
        input = input.slice(0, 4) + ") " + input.slice(4, 11)
    }
    if (size > 6) {
        input = input.slice(0, 9) + "-" + input.slice(9)
    }
    return input;
}
const tourneyForm = document.querySelector('.tournamentForm');
const form = document.querySelector('.tournamentForm2');
const thankYouMessage = document.querySelector('#thank-you-message');
tourneyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    thankYouMessage.classList.add('show');
    tourneyForm.style.display = 'none';
    setTimeout(() => form.submit(), 2000);
});