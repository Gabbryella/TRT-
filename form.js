// script.js
document.getElementById('reservationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const tickets = document.getElementById('tickets').value;
    const date = document.getElementById('date').value;
    alert(`Réservation confirmée pour ${tickets} billet(s) au nom de ${name}, date de voyage : ${date}`);
});

document.getElementById('class').onchange = function() {
    const selectPrice = this.value; // Récupère la valeur sélectionnée
    document.getElementById('selectPrice').textContent = selectPrice;
};

fetch('https://52fc-102-68-63-214.ngrok-free.app/api/journey',{
    method: 'GET',
    headers: {
        "ngrok-skip-browser-warning" :69420
    }
    
})

.then(reponse => {
    // console.log(reponse.json())
    return reponse.json()
})

.then(data => {
    console.log(data)
})

