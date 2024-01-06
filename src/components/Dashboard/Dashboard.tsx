import { useContext } from "react";
import { Graphs } from "../Graphs/Graphs";
import { getNow } from "../../util";
import { BigButton, Container } from "../styledComponents";
import { GlobalContext, addTimestamp } from "../State/State";


export const Dashboard = () => {
    const { globalState, setGlobalState, loading } = useContext(GlobalContext)
    
    const hitClick = () => {
        const now: Date = getNow()
        const updatedTimestamp = addTimestamp(now.toISOString(), globalState)
        setGlobalState(updatedTimestamp)
    }

    if (loading){
        return <Container>Loading...</Container>
    }

    return(
        <Container>
            <BigButton color='primary' onClick={hitClick}>🍃 Toke Counter 🍃</BigButton>
            <Graphs props={globalState}/>
        </Container>
    )
}
