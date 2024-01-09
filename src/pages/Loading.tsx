import { IonHeader, IonToolbar } from "@ionic/react";
import { StyledIonContent, StyledIonPage } from "../components"

const Loading: React.FC = () => {
    return (
        <StyledIonPage>
            <IonHeader>
                <IonToolbar>
          
                </IonToolbar>
            </IonHeader>
            <StyledIonContent>
                <div>Loading...</div>
            </StyledIonContent>
        </StyledIonPage>
    )
}

export default Loading;