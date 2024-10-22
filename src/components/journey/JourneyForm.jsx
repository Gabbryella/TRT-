import "./journey.css";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import {API_BASE_URL, config} from "../../apiConfig";

export default function JourneyForm({ id }) {
    const { selectedDepart, selectedDestination, getToken } = useContext(AuthContext);
    const [depart, setDepart] = useState('');
    const [destination, setDestination] = useState('');
    const [journey, setJourney] = useState({});
    const [train, setTrain] = useState({});
    const [carriageClass, setCarriageClass] = useState({});
    const [error, setError] = useState({ canSubmit: false, errorSubmit: false });
    const [successMessage, setSuccessMessage] = useState(false);
    const [loading, setLoading] = useState(false); // État pour le spinner
    const token = getToken();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const journeyResponse = await axios.get(`${API_BASE_URL}/journey/${id}`, config);
                setJourney(journeyResponse.data);
                const trainResponse = await axios.get(`${API_BASE_URL}/train/${journeyResponse.data.train.train_id}`, config);
                setTrain(trainResponse.data);
                const DepartResponse = await axios.post(`${API_BASE_URL}/station/by_name/`, { "name": selectedDepart }, config);
                setDepart(DepartResponse.data);
                const DestinationResponse = await axios.post(`${API_BASE_URL}/station/by_name/`, { "name": selectedDestination }, config);
                setDestination(DestinationResponse.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        };

        fetchData();
    }, [id]);

    const handleClick = (carriage) => {
        setCarriageClass(carriage);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (error.canSubmit) {
            setLoading(true); // Afficher le spinner
            axios.post(`${API_BASE_URL}/new-booking/`, {
                "departure_station": depart.id,
                "arrival_station": destination.id,
                "train_journey": id,
                "carriage_class": carriageClass.id,
                "amount_paid": carriageClass.prices?.[0]?.price,
                "ticket_number": 1,
            }, {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                }
            }).then((response) => {
                if (response.status === 201) {
                    console.log(response);
                    setSuccessMessage(true);
                    setTimeout(() => {
                        setSuccessMessage(false);
                    }, 10000);
                }
            }).catch((error) => {
                console.error("Erreur lors de la réservation :", error);
                setError({ ...error, errorSubmit: true });
            }).finally(() => {
                setLoading(false); // Masquer le spinner après la requête
            });
        } else {
            setError({ ...error, errorSubmit: true });
        }
    };

    return (
        <>
            <div className="container mt-5">
                <h1 className="text-center">Réservation de Tickets de Train</h1>
                <div className="row">
                    {successMessage && (
                        <div className="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>Félicitations</strong> Votre réservation a été faite
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setSuccessMessage(false)}></button>
                        </div>
                    )}
                    <div className="col-md-12">
                        <div className="card my-5">
                            <div className="card-body">
                                <h5 className="card-title">Train N: {journey.train?.train_id}</h5>
                                <p className="card-text">
                                    <br /><strong>Modèle:</strong> {journey.train?.modele}
                                    <br /><strong>Nom:</strong> {train.nom}
                                </p>
                                <p className="card-text">
                                    <br /><strong>Départ:</strong> {selectedDepart}
                                    <br /><strong>Destination:</strong> {selectedDestination}
                                </p>
                                <p className="card-text"><strong>Horaire:</strong>
                                    <br />Départ: {journey.departure_time}
                                    <br />Arrivée: {journey.arrival_time}
                                </p>
                                <p className="card-text"><strong>Planning:</strong> {journey.schedule?.name}</p>
                                <hr />
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="carriageClass">Classe :</label>
                                        <select
                                            value={carriageClass.class_name || ""}
                                            className="form-control"
                                            id="carriageClass"
                                            onChange={(e) => {
                                                const selectedCarriage = train.carriage.find(c => c.class_name === e.target.value);
                                                if (selectedCarriage) {
                                                    handleClick(selectedCarriage);
                                                    setError({ ...error, canSubmit: true });
                                                }
                                            }}
                                        >
                                            <option value="">Sélectionnez une classe</option>
                                            {train.carriage?.map((carr, index) => (
                                                <option key={index} value={carr.class_name}>
                                                    {carr.class_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <p className="card-text"><strong>Prix : {carriageClass.prices?.[0]?.price || "N/A"}</strong> CDF</p>
                                    </div>
                                    <input type="submit" className="btn btn-primary" value="Réserver" onClick={handleSubmit} />
                                    {error.errorSubmit && <p className="p-error">Sélectionner une classe pour votre voyage</p>}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Spinner d'attente */}
                {loading && (
                    <div className="spinner-overlay">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Chargement...</span>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}