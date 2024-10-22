import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import API_BASE_URL from "../../apiConfig";
import './reservation.css';

const ReservationList = () => {
    const { getToken } = useContext(AuthContext);
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(false);
    const [pagination, setPagination] = useState({ next: null, previous: null });

    const fetchReservations = async (url) => {
        try {
            const token = getToken();
            const response = await axios.get(url || `${API_BASE_URL}/booking/`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });

            const stationPromises = response.data.results.map(async (reservation) => {
                const [departResponse, destinationResponse] = await Promise.all([
                    axios.get(`${API_BASE_URL}/station/${reservation.departure_station}/`),
                    axios.get(`${API_BASE_URL}/station/${reservation.arrival_station}/`)
                ]);

                return {
                    ...reservation,
                    depart: departResponse.data.station_name,
                    destination: destinationResponse.data.station_name,
                };
            });

            const reservationsWithStations = await Promise.all(stationPromises);

            // Trier les réservations du plus récent au plus ancien
            reservationsWithStations.sort((a, b) => new Date(b.booking_date) - new Date(a.booking_date));

            setReservations(reservationsWithStations);
            setPagination({ next: response.data.next, previous: response.data.previous });

        } catch (error) {
            console.error("Erreur lors de la récupération des réservations :", error);
            setError("Impossible de charger les réservations.");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (id) => {
        const token = getToken();
        try {
            await axios.post(`${API_BASE_URL}/booking/${id}/handle_status/`, {}, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            setReservations(prev => prev.filter(reservation => reservation.id !== id));
            setSuccessMessage(true);
        } catch (error) {
            console.error("Erreur lors de l'annulation de la réservation :", error);
            setError("Erreur lors de l'annulation de la réservation.");
        }
    };

    const loadMore = (url) => {
        fetchReservations(url);
    };

    useEffect(() => {
        fetchReservations();
    }, [getToken]);

    if (loading) {
        return <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center">Mes Réservations</h1>
            
            {successMessage && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    Votre réservation a été annulée.
                    <button 
                        type="button" 
                        className="btn-close" 
                        data-bs-dismiss="alert" 
                        aria-label="Close" 
                        onClick={() => setSuccessMessage(false)}
                    ></button>
                </div>
            )}

            <div className="row">
                {reservations.length === 0 ? (
                    <div className="text-center">Aucune réservation trouvée.</div>
                ) : (
                    reservations.map((reservation) => (
                        <div key={reservation.id} className="col-md-4">
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
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleCancel(reservation.id)}
                                    >
                                        Annuler
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="d-flex justify-content-between mt-3">
                <button 
                    className="btn btn-secondary" 
                    onClick={() => loadMore(pagination.previous)} 
                    disabled={!pagination.previous}
                >
                    &laquo; Précédent
                </button>
                <button 
                    className="btn btn-secondary" 
                    onClick={() => loadMore(pagination.next)} 
                    disabled={!pagination.next}
                >
                    Suivant &raquo;
                </button>
            </div>
        </div>
    );
};

export default ReservationList;