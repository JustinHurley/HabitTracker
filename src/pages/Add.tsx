import { IonContent, IonHeader } from '@ionic/react';
import { Dashboard, StyledIonPage } from '../components';

export const Add = () => {
  return (
    <StyledIonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
        </IonHeader>
        <Dashboard/>
      </IonContent>
    </StyledIonPage>
  );
};
