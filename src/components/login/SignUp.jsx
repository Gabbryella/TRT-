import { Link, Navigate, useNavigate } from "react-router-dom";
import img from "../../assets/logo.png";
import "./style.css";
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import API_BASE_URL from "../../apiConfig";

export default function SignUp() {
    const [credentiel, setCredentiel] = useState({
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        password2: '',
        number: '' // Champ pour le numéro de téléphone
    });
    const [error, setError] = useState(false);
    const { isAuthenticated, login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // État pour le chargement

    function handleChange(e) {
        setCredentiel({
            ...credentiel,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Démarrer le chargement
        
        try {
            // Étape 1 : Créer un passager
            const passengerResponse = await axios.post(`${API_BASE_URL}/passenger/`, credentiel);

            // Étape 2 : Authentifier et obtenir le token
            const tokenResponse = await axios.post(`${API_BASE_URL}/token/`, credentiel);

            // Connexion avec le token
            await login(tokenResponse.data.token);

            if (isAuthenticated) {
                navigate('/');
            }
        } catch (err) {
            console.log("error :", err);
            setError(true);
        } finally {
            setLoading(false); // Arrêter le chargement
        }
    };

    return (
        <>
            {isAuthenticated ? (
                <Navigate to="/" />
            ) : (
                <div className="container-sign">
                    <div className="form-container-sign sign-up">
                        <form onSubmit={handleSubmit}>
                            <h1>Nouveau Compte</h1>
                            <input
                                type="text"
                                placeholder="Prénom"
                                name='first_name'
                                value={credentiel.first_name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Nom"
                                name='last_name'
                                value={credentiel.last_name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                name='email'
                                value={credentiel.email}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="tel" // Type pour numéro de téléphone
                                placeholder="Numéro de téléphone"
                                name='number'
                                value={credentiel.number}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Mot de passe"
                                name='password'
                                value={credentiel.password}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Confirmez le mot de passe"
                                name='password2'
                                value={credentiel.password2}
                                onChange={handleChange}
                                required
                            />
                            <input type="submit" value="S'inscrire" />
                            <Link to="/sign-in"><span>Vous avez déjà un compte ? Se connecter</span></Link>
                            {error && <p id="error">Erreur lors de la création du compte.</p>}
                        </form>
                        {loading && ( // Afficher le spinner si chargé
                            <div className="text-center mt-3">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="image">
                        <img src={img} alt="" />
                    </div>
                </div>
            )}
        </>
    );
}