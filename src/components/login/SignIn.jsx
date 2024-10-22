import "./style.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import img from "../../assets/logo.png";
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import API_BASE_URL from "../../apiConfig";

export default function SignIn() {
    const [credentiel, setCredentiel] = useState({
        email: '',
        password: ''
    });
    const { isAuthenticated, login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState(false);
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
            const response = await axios.post(`${API_BASE_URL}/token/`, {
                ...credentiel
            });

            await login(response.data.token);

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
                <div className="container-sign sign-in">
                    <div className="form-container-sign">
                        {loading ? ( // Afficher le spinner si chargé
                            <div className="text-center">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <h1>Connexion</h1>
                                <span>or use your email password</span>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    name='email'
                                    value={credentiel.email}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={credentiel.password}
                                    onChange={handleChange}
                                    required
                                />
                                <input type="submit" value="Se connecter" />
                                <Link to="/sign-up"><span>Pas encore de comptes ? S'inscrire</span></Link>
                                {error && <p id="error">Email ou Mot de passe Invalide</p>}
                            </form>
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