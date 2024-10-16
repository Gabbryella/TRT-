// script.js
document.getElementById('reservationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const tickets = document.getElementById('tickets').value;
    const date = document.getElementById('date').value;
    alert(`Réservation confirmée pour ${tickets} billet(s) au nom de ${name}, date de voyage : ${date}`);
});
