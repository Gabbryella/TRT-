import './body.css'
import offers from "../../assets/offers.jpg"
import support from "../../assets/support.jpg"
import train from "../../assets/train1.jpg"
export default function Body() {
    return <>
    <main>
        <div className="container mt-5">
            <div className="row text-center mb-5">
                <div className="col">
                    <h1>Bienvenue sur notre site de réservation de trains</h1>
                    <p >Réservez vos billets de train facilement et rapidement.</p>
                </div>
            </div>

            <div className="row mb-5">
                <div className="col-md-4">
                    <div className="card-body">
                        <img src={train} className="card-body-img-top" alt="Train moderne"></img>
                        <div className="card-body-body">
                            <h5 className="card-body-title">Trains Modernes</h5>
                            <p className="card-body-text">Voyagez avec le confort des trains modernes, équipés de toutes les commodités.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card-body">
                        <img src={offers} className="card-body-img-top" alt="Offres spéciales"></img>
                        <div className="card-body-body">
                            <h5 className="card-body-title">Offres Spéciales</h5>
                            <p className="card-body-text">Découvrez nos offres spéciales et économisez sur vos réservations.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card-body">
                        <img src={support} className="card-body-img-top" alt="Support client"></img>
                        <div className="card-body-body">
                            <h5 className="card-body-title">Support Client</h5>
                            <p className="card-body-text">Notre équipe est là pour vous aider à chaque étape de votre voyage.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row text-center mb-5">
                <div className="col">
                    <h2>Ce que nos clients disent de nous</h2>
                </div>
            </div>

            <div className="row mb-5">
                <div className="col-md-4">
                    <blockquote className="blockquote text-center">
                        <p className="mb-2">"Une expérience de réservation fluide et rapide. Je recommande!"</p>
                        <footer className="blockquote-footer">Zema Daniel</footer>
                    </blockquote>
                </div>
                <div className="col-md-4">
                    <blockquote className="blockquote text-center">
                        <p className="mb-2">"Les prix sont compétitifs et le service client est excellent."</p>
                        <footer className="blockquote-footer">Rubuz Leonardo</footer>
                    </blockquote>
                </div>
                <div className="col-md-4">
                    <blockquote className="blockquote text-center">
                        <p className="mb-2">"J'ai adoré le confort des trains. Je voyagerai encore!"</p>
                        <footer className="blockquote-footer">Mr Judicael</footer>
                    </blockquote>
                </div>
            </div>

            <div className="row text-center mb-5">
                <div className="col">
                    <h2>Pourquoi choisir notre service?</h2>
                    <p>Nous offrons une expérience utilisateur inégalée grâce à :</p>
                </div>
            </div>

            <div className="row mb-5">
                <div className="col-md-3">
                    <h5>Confort</h5>
                    <p>Des sièges spacieux et confortables pour un voyage agréable.</p>
                </div>
                <div className="col-md-3">
                    <h5>Fiabilité</h5>
                    <p>Des horaires fiables et des trains ponctuels.</p>
                </div>
                <div className="col-md-3">
                    <h5>Accessibilité</h5>
                    <p>Un accès facile à nos services en ligne et hors ligne.</p>
                </div>
                <div className="col-md-3">
                    <h5>Sécurité</h5>
                    <p>Des mesures de sécurité strictes pour garantir votre sécurité.</p>
                </div>
            </div>
        </div>
    </main>
    </>
}