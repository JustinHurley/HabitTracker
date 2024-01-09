import { useContext } from "react";
import { Container, Graphs, StyledIonContent, StyledIonPage } from "../components"
import { GlobalContext } from "../components/State/State";
import { IonHeader, IonToolbar } from "@ionic/react";

const Stats = () => {
    const { globalState, loading } = useContext(GlobalContext);
    
    if (loading) {
        return (<Container>Loading...</Container>)
    }
    return(
        <StyledIonPage>
            <IonHeader>
                <IonToolbar>
          
                </IonToolbar>
            </IonHeader>
            <StyledIonContent>
                <Container>
                    <Graphs props={globalState}/>
                </Container>
            </StyledIonContent>
        </StyledIonPage>
    )
}

export default Stats;