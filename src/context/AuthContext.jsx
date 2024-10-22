import { createContext,  useState } from "react";
import { useEffect } from "react";

export const AuthContext = createContext()

export default function AuthProvider ({children}){
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [journey, setJourney] = useState([])
    const [selectedDepart, setSelectedDepart] = useState('Depart')
    const [selectedDestination, setSelectedDestination] = useState('Destination')

    useEffect(() => {
        // Vérifier si un token est présent dans le localStorage
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }else [
            setIsAuthenticated(false)
        ]
    }, []);

    function login (token) {
        setIsAuthenticated(true)
        localStorage.setItem('token',token)
    }

    function logout (){
        setIsAuthenticated(false)
        localStorage.removeItem('token')
    }
    

    function getJourneyState(){
        return [journey, setJourney]
    }
    const getToken = () => {
        const token = localStorage.getItem('token')
        return token;
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout,getToken,  getJourneyState,selectedDepart, setSelectedDepart, selectedDestination, setSelectedDestination}}>
            {children}
        </AuthContext.Provider>
    )
}