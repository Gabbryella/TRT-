import { Link } from 'react-router-dom'
import './cancel.css'
export default function Cancel() {
    return <>
<div className="container">
    <div className="row justify-content-center">
        <div className="col-md-8 cancellation-card">
            <h2 className="text-center text-danger">Paiement Annulé</h2>
            <p className="text-center">Votre paiement pour la réservation de tickets de train a été annulé avec succès.</p>
            <div className="text-center">
                <Link to='/' className="btn btn-primary">Retour à l'accueil</Link>
                <Link to='/booking'  className="btn btn-secondary">Voir mes réservations</Link>
            </div>
        </div>
    </div>
</div>
    </>
}