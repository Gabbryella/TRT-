export default function JourneyList({journey, handleClick}){
    return <>
        <div className="container mt-5">
            <h1 className="text-center">Liste des Trains</h1>   
            <div className="row">
                {
                    journey.map((voyage, index)=>(
                        <div key={index} className="col-12 col-sm-6 col-md-4">
                            <div className="card train-card mb-4">
                                <div className="card-body">
                                    <h5 className="card-title display-4">Train N: {voyage.id}</h5>
                                    <p className="card-text"><strong>Modèle:</strong> {voyage.train.modele}</p>
                                    <p className="card-text"><strong>Horaire:</strong>
                                        <br />Départ:{voyage.departure_time}
                                        <br />Arrivée: {voyage.arrival_time}
                                    </p>
                                    <p className="card-text"><strong>Planning:</strong> {voyage.schedule.name}</p>
                                    <hr />
                                    <input
                                        type="button"
                                        className="btn btn-success"
                                        value="Reserver"
                                        aria-label="Réserver le train"
                                        onClick={(e)=>{
                                            handleClick(e,voyage.id)
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))
                }
                
            </div>
        </div>
    </>
}