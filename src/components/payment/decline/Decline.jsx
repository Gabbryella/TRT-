import { Link } from 'react-router-dom'
import './decline.css'
export default function Decline() {
    return <>
<div className="container">
    <div className="row justify-content-center">
        <div className="col-md-8 error-card">
            <h2 className="text-center text-danger">Échec de l'Opération</h2>
            <p className="text-center">Nous sommes désolés, votre paiement pour la réservation de tickets de train a échoué.</p>
            <p className="text-center">Veuillez vérifier vos informations de paiement et réessayer.</p>
            <div className="text-center">
                <Link to='/'  className="btn btn-primary">Retour à l'accueil</Link>
            </div>
        </div>
    </div>
</div>


    </>
}