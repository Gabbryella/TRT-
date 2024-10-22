import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import JourneyList from "./journeyList";
import JourneyForm from "./JourneyForm";

export default function Journey() {
    const {getJourneyState} = useContext(AuthContext)
    const [journey, setJourney] = getJourneyState()
    const [isBooking, setIsBooking] = useState(false)
    const [selectedJourneyId, setSelectedJourneyId] = useState('')

    const handleSelectedJourney = (event,id) => {
        event.preventDefault()
        setSelectedJourneyId(id)
        setIsBooking(true)
    }

    return (
        <>
            {
                isBooking ? <JourneyForm id={selectedJourneyId}/>: <JourneyList journey={journey} handleClick={handleSelectedJourney}/>
            }
        </>
    );
}