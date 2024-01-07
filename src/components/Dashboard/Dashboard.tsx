import { useContext } from "react";
import { Graphs } from "../Graphs/Graphs";
import { getNowUTC } from "../../util";
import { BigButton, Container } from "../styledComponents";
import { GlobalContext, addTimestamp, removeLastTimestamp } from "../State/State";
import moment from "moment";


export const Dashboard = () => {
    const { globalState, setGlobalState, loading } = useContext(GlobalContext)
    
    const hitClick = () => {
        const updatedTimestamps = addTimestamp(moment(getNowUTC()).format(), globalState)
        setGlobalState(updatedTimestamps)
    }

    const undoClick = () => {
        const updatedTimestamps = removeLastTimestamp(globalState)
        setGlobalState(updatedTimestamps)
    }

    if (loading){
        return <Container>Loading...</Container>
    }

    return(
        <Container>
            <BigButton color='primary' onClick={hitClick}>🍃 Toke Counter 🍃</BigButton>
            <BigButton color='warning' onClick={undoClick}>⏪️ Undo Last ⏪️</BigButton>
            <Graphs props={globalState}/>
        </Container>
    )
}
