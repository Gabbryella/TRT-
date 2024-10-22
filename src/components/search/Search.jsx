import "./search.css";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import {API_BASE_URL ,config}from "../../apiConfig"

export default function Search({ setJourney }) {
  const [date, setDate] = useState('');
  const { selectedDepart, setSelectedDepart } = useContext(AuthContext);
  const { selectedDestination, setSelectedDestination } = useContext(AuthContext);
  const [station, setStation] = useState([]);
  const [error, setError] = useState({
    departChange: false,
    destinationChange: false,
    done: false,
    sameLocation: false
  });
  const [noData, setNoData] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_BASE_URL}/station/`,config)
      .then((response) => {
        setStation(response.data.results);
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération des stations :", err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (selectedDepart && selectedDestination) {
      // Vérification si le départ et la destination sont les mêmes
      if (selectedDepart === selectedDestination) {
        setError((prevError) => ({
          ...prevError,
          sameLocation: true,
          done: false
        }));
        return; 
      } else {
        setError((prevError) => ({
          ...prevError,
          sameLocation: false
        }));
      }

      axios.post(`${API_BASE_URL}/journey-filter/`, {
        'depart': selectedDepart,
        'destination': selectedDestination,
        'date': date
      },config)
      .then(function (response) {
        setJourney(response.data);
        if (Array.isArray(response.data) && response.data.length === 0) {
          setNoData(true);
        } else {
          setNoData(false); // Réinitialiser noData si on a des résultats
          navigate("/journey");
        }
      })
      .catch(function (error) {
        console.error("Erreur lors de la recherche de voyages :", error);
        setError((prevError) => ({ ...prevError, done: true }));
      });
    } else {
      setError((prevError) => ({ ...prevError, done: true }));
    }
  };

  const handleChangeDepart = (event) => {
    setSelectedDepart(event.target.value);
    setError((prevError) => ({
      ...prevError,
      departChange: true,
    }));
  };

  const handleChangeDestination = (event) => {
    setSelectedDestination(event.target.value);
    setError((prevError) => ({
      ...prevError,
      destinationChange: true,
    }));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="inner-form">
          <div className="input-field first-wrap">
            <div className="icon-wrap">
            </div>
            <select id="depart" value={selectedDepart} onChange={handleChangeDepart}>
              <option value="">Départ</option>
              {station.map((depart, index) => (
                <option key={index} value={depart.station_name}>{depart.station_name}</option>
              ))}
            </select>
          </div>
          <div className="input-field first-wrap">
            <div className="icon-wrap">
            </div>
            <select id="destination" value={selectedDestination} onChange={handleChangeDestination}>
              <option value="">Destination</option>
              {station.map((destination, index) => (
                <option key={index} value={destination.station_name}>{destination.station_name}</option>
              ))}
            </select>
          </div>
          <div className="input-field second-wrap">
            <div className="icon-wrap">
            </div>
            <input className="datepicker" id="depart" type="date" 
              value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="input-field fifth-wrap">
            <input className="btn-search" type="submit" value="RECHERCHER" />
          </div>
        </div>
        {error.done && <p className="p-error">Vous devez fournir votre départ et votre destination.</p>}
        {error.sameLocation && <p className="p-error">Le départ et la destination ne peuvent pas être les mêmes.</p>}
        {noData && <p className="p-error">Il n'y a pas de voyage correspondant à votre trajet.</p>}
      </form>
    </>
  );
}