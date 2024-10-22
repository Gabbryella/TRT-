async function getTrains() {
    await fetch (`${baseUrl}/api/train`, {
        method: 'GET',
        headers: {
            //"ngrok-skip-browser-warning" :69420
            'Content-Type': 'application/json' // Indique que le contenu est en JSON
        },
    }
    
    )
    .then(response => {
        return response.json()
    })
    .then(data => {
        console.log(data);
        // Effacer la div avec la liste vide
        const maDiv = document.getElementById('liste-vide');

        // Vérifiez si 'data.result' existe
        if (data.result) {
            // Si 'data.result' existe, affichez son contenu dans la div
            maDiv.innerHTML = data.result;
            maDiv.style.display = 'block'; // Assurez-vous que la div est visible
        } else {
            // Sinon, cachez la div
            maDiv.style.display = 'none';
        }
        // Ajouter les data.results dans un tableau
        let tableau = [];
        tableau = console.log(data);
        
        if (data.result) {
            tableau.push(data.result);
            console.log("Résultat ", tableau);
        }
        
        // Selectionner l'élement <ul> où les <li> seront inspirés  
        let ul = document.getElementById('liste-train');

        // Vider l'élement <ul> au cas où il y aurait des ancies élements
        ul.innerHTML = ""
        
        // Faire une boucle qui renvoie pour chaque élément du tableau une balise li contenant les infos du train
        tableau.forEach(function(element){
            let li = document.createElement("li");
            li.textContent = element;
            ul.appendChild(li);
        });
    })
    .catch(
        error => {
            console.log("Une erreur est survenue ", error);      
        }
    )

}
//////////////////////////////////////////////////

async function getTrains() {
    try {
        // Envoie une requête GET à l'API pour récupérer les trains
        const response = await fetch(`${baseUrl}/api/train`, {
            method: 'GET', // Utilise la méthode GET
            headers: {
                'Content-Type': 'application/json' // Indique que le contenu est en JSON
            }
        });

        // Convertit la réponse en JSON
        const data = await response.json();
        console.log(data); // Affiche les données dans la console

        // Récupère l'élément avec l'ID 'liste-vide'
        const maDiv = document.getElementById('liste-vide');

        // Vérifie si 'data.result' existe
        if (data.result) {
            maDiv.innerHTML = data.result; // Affiche le contenu de 'data.result' dans la div
            maDiv.style.display = 'block'; // Assure que la div est visible
        } else {
            maDiv.style.display = 'none'; // Cache la div si 'data.result' n'existe pas
        }

        // Récupère l'élément <ul> avec l'ID 'liste-train'
        let ul = document.getElementById('liste-train');
        ul.innerHTML = ""; // Vide l'élément <ul> au cas où il y aurait des anciens éléments

        // Vérifie si 'data.result' est un tableau
        if (Array.isArray(data.result)) {
            // Parcourt chaque élément du tableau et crée un <li> pour chacun
            data.result.forEach(function(element) {
                let li = document.createElement("li");
                li.textContent = element; // Assure que 'element' est une chaîne
                ul.appendChild(li); // Ajoute le <li> à l'élément <ul>
            });
        }
    } catch (error) {
        // Affiche un message d'erreur dans la console
        console.log("Une erreur est survenue ", error);
    }
}



////////////////////////////////////////////

try {
    // Envoie une requête POST à l'API pour filtrer les voyages
    const response = await fetch(`${baseUrl}/api/journey-filter/`, {
        method: 'GET', // Utilise la méthode POST
        headers: {
            'Content-Type': 'application/json' // Indique que le contenu est en JSON
        },
        body: JSON.stringify({
            depart: depart.value, // Ajoute la valeur du champ 'depart' au corps de la requête
            search: search.value, // Ajoute la valeur du champ 'search' au corps de la requête
            date: date.value // Ajoute la valeur du champ 'date' au corps de la requête
        })
    });

    // Vérifie si la réponse n'est pas correcte
    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données'); // Lance une erreur si la réponse n'est pas correcte
    }

    // Convertit la réponse en JSON
    const jsonResponse = await response.json();

    // Affiche les résultats en utilisant la fonction displayResults
    displayResults(jsonResponse.results);
} catch (error) {
    // Affiche un message d'erreur dans l'élément avec l'ID 'result'
    document.getElementById('result').innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
}

// Fonction pour afficher les résultats
function displayResults(results) {
    // Récupère l'élément avec l'ID 'results'
    const resultsDiv = document.getElementById('results');

    // Réinitialise le contenu de l'élément 'results'
    resultsDiv.innerHTML = '';

    // Vérifie si aucun résultat n'a été trouvé
    if (results.length === 0) {
        resultsDiv.innerHTML = '<div class="alert alert-warning">Aucun voyage trouvé.</div>';
        return; // Arrête l'exécution de la fonction
    }

    // Crée un tableau pour afficher les résultats
    const table = document.createElement('table');
    table.className = 'table table-striped'; // Ajoute des classes CSS pour le style
    table.innerHTML = `
    <thead>
    <tr>
        <th>train_id</th>
        <th>nom</th>
        <th>departure_time</th>
        <th>arrival_time</th>
        <th>modele</th>
    </tr>
    </thead>
    <tbody>
    `;

    // Parcourt chaque résultat et crée une ligne de tableau pour chacun
    results.forEach(result => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${result.id}</td>
        <td>${result.schedule.name}</td>
        <td>${result.departure_time}</td>
        <td>${result.arrival_time}</td>
        <td>${result.train.modele}</td>
        `;
        table.querySelector('tbody').appendChild(row); // Ajoute la ligne au corps du tableau
    });

    // Ajoute le tableau à l'élément 'results'
    resultsDiv.appendChild(table);
}

// Fonction pour récupérer les trains