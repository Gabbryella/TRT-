import { useContext } from "react"
import Footer from "../footer/Footer"
import Search from "../search/Search"
import "./home.css"
import { AuthContext } from "../../context/AuthContext"
import Body from "../body/Body"
export default function Home(){
    const {getJourneyState} = useContext(AuthContext)
    const [Journey, setJourney] = getJourneyState()
    
    return (
        <>
        <section id="home" className="accueil">
            <h2 className="display-3 fw-bold text-center">Réservez votre voyage</h2>
            <h3 className="display-5 mb-2 text-center">Voyagez en toute securite</h3>
       
            <div className="s002">
                <Search setJourney={setJourney}/>
            </div>
        </section>
        <Body/>
        <Footer/>
        </>
    )
}