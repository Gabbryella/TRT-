import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { API_BASE_URL } from "../../apiConfig";

export default function Payment (){
    const { getToken } = useContext(AuthContext);
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({ next: null, previous: null });

    const fetchPayments = async (url) => {
        try {
            const token = getToken();
            const response = await axios.get(url || `${API_BASE_URL}/payment/list/`, {
                headers: {
                    'Authorization': `Token ${token}`,
                    'ngrok-skip-browser-warning': 'true',
                }
            });

            setPayments(response.data.results); 
            setPagination({ next: response.data.next, previous: response.data.previous });

        } catch (error) {
            console.error("Erreur lors de la récupération des paiements :", error);
            setError("Impossible de charger les paiements.");
        } finally {
            setLoading(false);
        }
    };

    const loadMore = (url) => {
        fetchPayments(url);
    };

    useEffect(() => {
        fetchPayments();
    }, [getToken]);

    if (loading) {
        return (
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Chargement...</span>
            </div>
        );
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center">Mes Paiements</h1>

            <table className="table table-bordered mt-4">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Paiement ID</th>
                        <th scope="col">Date de Paiement</th>
                        <th scope="col">Montant</th>
                        <th scope="col">Statut du Paiement</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="text-center">Aucun paiement trouvé.</td>
                        </tr>
                    ) : (
                        payments.map((payment) => (
                            <tr key={payment.id}>
                                <td>{payment.reservation.id}</td>
                                <td>{new Date(payment.payment_date).toLocaleDateString()}</td>
                                <td>{payment.amount} €</td>
                                <td>{payment.payment_status}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <div className="d-flex justify-content-between mt-3">
                <button 
                    className="btn btn-secondary" 
                    onClick={() => loadMore(pagination.previous)} 
                    disabled={!pagination.previous}
                >
                    <i className="fa-solid fa-chevron-left"></i> Précédent
                </button>
                <button 
                    className="btn btn-secondary" 
                    onClick={() => loadMore(pagination.next)} 
                    disabled={!pagination.next}
                >
                    Suivant <i className="fa-solid fa-chevron-right"></i>
                </button>
            </div>
        </div>
    );
};

