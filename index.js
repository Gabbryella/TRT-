

/* 
async function sendData(data) {
    // Construct a FormData instance
    const formData = new FormData();
  
    // Add a text field
    formData.append("depart", depart.value);
    formData.append("destination", search.value);
    formData.append("date", date.value);
    try {
      const response = await fetch(`${baseUrl}/api/train`, {
        method: 'GET', // Utilise la méthode GET
        headers: {
            "ngrok-skip-browser-warning" : 69420,
            'Content-Type': 'application/json' // Indique que le contenu est en JSON
        }
      });
      console.log(await response.json());

    } catch (e) {
      console.error(e);
    }
  }
  
  const send = document.querySelector("#button");
  send.addEventListener("click", sendData); */

// Récupère l'élément avec l'ID 'depart'
let depart = document.getElementById('depart');

// Récupère l'élément avec l'ID 'search'
let search = document.getElementById('search');

// Récupère l'élément avec l'ID 'date'
let date = document.getElementById('date');

// Récupère le formulaire avec l'ID 'search-form'
let searchForm = document.querySelector("#search-form");

// Récupère l'élément avec l'ID 'liste-train'
let listTrain = document.getElementById('liste-train');

// Déclare l'URL de base pour les requêtes API
const baseUrl = "https://cf29-102-68-63-214.ngrok-free.app";

// Ajoute un écouteur d'événement pour le formulaire de recherche
searchForm.addEventListener("submit", async function(event) {
    // Empêche le comportement par défaut du formulaire (rechargement de la page)
    event.preventDefault();

    // Affiche les valeurs des champs de formulaire dans la console
    console.log(depart.value);
    console.log(search.value);
    console.log(date.value);

    
});

  async function sendData(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    // Construct a FormData instance
    const formData = new FormData();
    formData.append("depart", depart.value);
    formData.append("destination", search.value);
    formData.append("date", date.value);

    try {
        const response = await fetch(`${baseUrl}/api/train`, {
            method: 'GET',
            headers: {
                "ngrok-skip-browser-warning": 69420,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log(data);

        // Sélectionnez la liste
        const liste = document.getElementById('liste-train');
        liste.innerHTML = ''; // Effacez le contenu précédent

        // Supprimez le message "Aucun train trouvé"
        const listeVide = document.getElementById('liste-vide');
        if (listeVide) {
            listeVide.remove();
        }
        
            
            if (liste) {
                if (data && data.length > 0) {
                    // Parcourez les résultats et ajoutez-les à la liste
                    data.forEach(train => {
                        const li = document.createElement ('li');
                        li.textContent = `id: ${train.train_id}, Nom: ${train.nom}, Modèle: ${train.modele}`; // Ajustez selon vos données
                        liste.appendChild(li);
                    });
                
            }
        } else {
            // Si aucun train n'est trouvé, réaffichez le message
            liste.innerHTML = '<div id="liste-vide"><p>Aucun train trouvé pour le momentt</p></div>';
        } 
     
    } catch (e) {
        console.error(e);
    }
    
}

const send = document.querySelector("#button");
send.addEventListener("click", sendData);



        
//         // Sélectionnez le corps du tableau
//         const tbody = document.getElementById('liste-train');
//         tbody.innerHTML = ''; // Effacez le contenu précédent

//         if (data && data.length > 0) {
//             // Supprimez le message "Aucun train trouvé"
//             const listeVide = document.getElementById('liste-vide');
//             if (listeVide) {
//                 listeVide.remove();
//             }

//             // Parcourez les résultats et ajoutez-les au tableau
//             data.forEach(train => {
//                     const row = document.createElement('tr');
//                     row.innerHTML = `
//                     <td>${train.nom}</td> 
//                     /* nom */
//                     <td>${train.modele}</td>
//                 `;
//                 tbody.appendChild(row);
//             });
//         } else {
//             // Si aucun train n'est trouvé, réaffichez le message
//             tbody.innerHTML = '<tr id="liste-vide"><td colspan="3">Aucun train trouvé pour le moment</td></tr>';
//         }

//     } catch (e) {
//         console.error(e);
//     }
// }

// const send = document.querySelector("#button");
// send.addEventListener("click", sendData);
  
  
  