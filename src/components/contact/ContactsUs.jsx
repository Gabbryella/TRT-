import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ContactUs = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            /*await axios.post('https://api.yourservice.com/send-email', {
                to: 'kongadan68@gmail.com',
                subject: 'Nouveau message de contact',
                body: `Nom: ${name}\nEmail: ${email}\nMessage: ${message}`
            });*/
            setSuccessMessage('Votre message a été envoyé avec succès !');
            setErrorMessage('');
            // Réinitialiser le formulaire
            setName('');
            setEmail('');
            setMessage('');
        } catch (error) {
            setErrorMessage('Une erreur s\'est produite lors de l\'envoi de votre message. Veuillez réessayer.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Contactez-nous</h1>
            <div className="row">
                <div className="col-md-6">
                    <h2>Qui sommes-nous ?</h2>
                    <p>
                        Nous sommes une équipe de stagiaires chez <strong>Infoset</strong>, située en République Démocratique du Congo. 
                        En tant qu'étudiants à <strong>Uscitech</strong>, l'Université des Sciences et de Technologies, 
                        nous nous consacrons à l'apprentissage et à l'innovation dans le domaine de la technologie. 
                        Notre mission est de créer des solutions numériques qui répondent aux besoins de notre communauté et au-delà.
                    </p>
                    <p>
                        Notre équipe est composée de passionnés de technologie, désireux d'apprendre et de partager nos connaissances. 
                        Nous croyons en la collaboration et en l'importance d'unir nos efforts pour atteindre des objectifs communs.
                    </p>
                </div>
                <div className="col-md-6">
                    <h2>Envoyez-nous un message</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Nom</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                className="form-control"
                                id="message"
                                rows="4"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Envoyer</button>
                    </form>
                    {successMessage && (
                                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                                    Votre message a ete recu avec success !
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setSuccessMessage(false)}></button>
                                  </div>
                                    
                                )}
                    {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
                </div>
            </div>
        </div>
    );
};

export default ContactUs;