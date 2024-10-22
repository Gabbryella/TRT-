import { Link } from "react-router-dom"
import "./error.css"

export default function Error (){
    return (
        <>
        <div className="error flex-column  container-fluid d-flex justify-content-center align-items-center">
            <div className="text-white text-center bg-dark bg-opacity-50 p-4 rounded">
                <h1 className="display-1">404</h1>
                <h2 className="h4">Page non trouvée</h2>
                <p>Nous ne trouvons pas la page que vous recherchez.</p>
                <Link to="/"><span className="btn btn-primary">Retourner a la principal</span></Link>
            </div>
        </div>
        </>
    )
}