import './approve.css'
import { Link } from 'react-router-dom'

export default function Approve(){
    return <>
<div className="container">
    <div className="row justify-content-center">
        <div className="col-md-8 confirmation-card">
            <h2 className="text-center text-success">Paiement Réussi !</h2>
            <p className="text-center">Votre paiement pour la réservation de tickets de train a été effectué avec succès.</p>
            <div className="text-center">
                <Link to='/' className="btn btn-primary">Retour à l'accueil</Link>
            </div>
        </div>
    </div>
</div>
    </>
}