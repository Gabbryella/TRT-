import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import './JourneyPayment.css'; // Assurez-vous de créer ce fichier pour les styles personnalisés
//import { FontAwesomeIcon } from '@fontawesome/react-fontawesome';
//import { faCreditCard, faCalendar, faLock } from '@fontawesome/free-solid-svg-icons';

export default function Paiement() {
  return (
    <div className="container d-flex justify-content-center mt-5 mb-5">
      <div className="row g-3">
        <div className="col-md-6">
          <span>Méthode de paiement</span>
          <div className="card">
            <div className="accordion" id="accordionExample">
              <div className="card">
                <div className="card-header p-0" id="headingTwo">
                  <h2 className="mb-0">
                    <button className="btn btn-light btn-block text-left collapsed p-3 rounded-0 border-bottom-custom" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                      <div className="d-flex align-items-center justify-content-between">
                        <span>FlexPay</span>
                        <img src="images/logo_flexpay2.png" width="30" alt="FlexPay Logo" />
                      </div>
                    </button>
                  </h2>
                </div>
                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                  <div className="card-body">
                    <input type="text" className="form-control" placeholder="email FlexPay" />
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header p-0">
                  <h2 className="mb-0">
                    <button className="btn btn-light btn-block text-left p-3 rounded-0" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      <div className="d-flex align-items-center justify-content-between">
                        <span>Carte de crédit</span>
                        <div className="icons">
                          <img src="images/Mastercard.png" width="30" alt="Mastercard" />
                          <img src="images/Visa.png" width="30" alt="Visa" />
                          <img src="images/american express.png" width="30" alt="American Express" />
                        </div>
                      </div>
                    </button>
                  </h2>
                </div>

                <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                  <div className="card-body payment-card-body">
                    <span className="font-weight-normal card-text">Numéro de carte</span>
                    <div className="input">
                      <FontAwesomeIcon icon={faCreditCard} />
                      <input type="text" className="form-control" placeholder="0000 0000 0000 0000" />
                    </div>

                    <div className="row mt-3 mb-3">
                      <div className="col-md-6">
                        <span className="font-weight-normal card-text">Date d'expiration</span>
                        <div className="input">
                          <FontAwesomeIcon icon={faCalendar} />
                          <input type="text" className="form-control" placeholder="MM/YY" />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <span className="font-weight-normal card-text">CVC/CVV</span>
                        <div className="input">
                          {/* <FontAwesomeIcon icon={faLock} /> */}
                          <input type="text" className="form-control" placeholder="000" />
                        </div>
                      </div>
                    </div>

                    <span className="text-muted certificate-text">
                      {/* <FontAwesomeIcon icon={faLock} /> Votre transaction est sécurisée avec un certificat SSL */}
                      Votre transaction est sécurisée avec un certificat SSL
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <span>Résumé</span>
          <div className="card">
            <div className="d-flex justify-content-between p-3">
              <div className="d-flex flex-column">
                <span>Montant brut</span>
              </div>
              <div className="mt-1">
                <sup id="price" className="super-price"></sup>
              </div>
            </div>

            <hr className="mt-0 line" />

            <div className="p-3">
              <div className="d-flex justify-content-between mb-2">
                {/* Other summary details can go here */}
              </div>
              <div className="d-flex justify-content-between">
                <span>T.V.A</span>
                <span>16%</span>
              </div>
            </div>

            <hr className="mt-0 line" />

            <div className="p-3 d-flex justify-content-between">
              <div className="d-flex flex-column">
                <span>Montant total</span>
              </div>
            </div>

            <div className="p-3">
              <button className="btn btn-primary btn-block free-button">Procéder au paiement</button>
              <div className="text-center"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

