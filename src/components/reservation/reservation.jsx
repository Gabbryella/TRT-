import { useState } from "react"

export default function ({reservation, handleCancel}){
    const [loadingCancel, setLoadingCancel ] = useState(false)
    
    const handleClick = async (reservation) => {
        setLoadingCancel(true);
        await handleCancel(reservation.id)
        setLoadingCancel(false)
    }

    return <>
            <div className="col-md-4">
                <div className="card my-3">
                    <div className="card-body">
                        <h5 className="card-title">Réservation N: {reservation.id}</h5>
                        <p className="card-text">
                            <strong>Passager:</strong> {reservation.passenger.first_name} ({reservation.passenger.email})
                            <br />
                            <strong>Statut:</strong> <span className={reservation.status.status_name === 'Confirmed' ? 'confirmed' : 'canceled'}>{reservation.status.status_name}</span>
                            <br />
                            <strong>Date de Réservation:</strong> {new Date(reservation.booking_date).toLocaleDateString()}
                            <br />
                            <strong>Départ:</strong> Station {reservation.depart}
                            <br />
                            <strong>Arrivée:</strong> Station {reservation.destination}
                            <br />
                            <strong>Classe:</strong> Classe {reservation.carriage_class}
                            <br />
                            <strong>Prix:</strong> {reservation.amount_paid} CDF
                            <br />
                            <strong>Numéro de Ticket:</strong> {reservation.ticket_number}
                            <br />
                            <strong>Numéro de Siège:</strong> {reservation.seat_number}
                        </p>
                        {
                            loadingCancel ?  
                            <>
                                <div className="spinner-border text-primary " role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </>
                            :
                            <>
                            {
                                reservation.status.status_name ==='Confirmed' ?
                                <>
                            <button
                            className="btn btn-danger"
                            onClick={() => handleClick(reservation)}
                        >
                            Annuler
                            </button></>:
                            <></>
                            }
                            </>
                        }   
                    </div>
                </div>
            </div>
    </>
}