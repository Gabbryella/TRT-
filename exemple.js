document.getElementById('journeyForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    const depart = document.getElementById('depart').value;
    const destination = document.getElementById('destination').value;

    const data = {
        depart: depart,
        destination: destination
    };

    try {
        const response = await fetch('https://52fc-102-68-63-214.ngrok-free.app/api/journey-filter/', {
            method: 'POST', // Méthode POST
            headers: {
                'Content-Type': 'application/json' // Indique que le contenu est en JSON
            },
            body: JSON.stringify(data) // Conversion de l'objet en JSON
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }

        const jsonResponse = await response.json();
        displayResults(jsonResponse.results);
    } catch (error) {
        document.getElementById('results').innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
    }
});

function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Réinitialise les résultats

    if (results.length === 0) {
        resultsDiv.innerHTML = '<div class="alert alert-warning">Aucun voyage trouvé.</div>';
        return;
    }

    const table = document.createElement('table');
    table.className = 'table table-striped';
    table.innerHTML = `
        <thead>
            <tr>
                <th>ID</th>
                <th>Horaire</th>
                <th>Heure de départ</th>
                <th>Heure d'arrivée</th>
                <th>Modèle de train</th>
            </tr>
        </thead>
        <tbody>
    `;

    results.forEach(result => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${result.id}</td>
            <td>${result.schedule.name}</td>
            <td>${result.departure_time}</td>
            <td>${result.arrival_time}</td>
            <td>${result.train.modele}</td>
        `;
        table.appendChild(row);
    });

    table.innerHTML += '</tbody></table>';
    resultsDiv.appendChild(table);
}