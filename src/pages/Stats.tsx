import { useContext } from "react";
import { Container, Graphs, StyledIonPage } from "../components"
import { GlobalContext } from "../components/State/State";
import { IonContent, IonHeader, IonToolbar } from "@ionic/react";

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
            <IonContent>
                <Container>
                    <Graphs props={globalState}/>
                </Container>
            </IonContent>
        </StyledIonPage>
    )
}

export default Stats;