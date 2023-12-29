import { IonContent, IonHeader, IonPage } from '@ionic/react';
import { Dashboard } from '../components';
import { styled } from 'styled-components';

const StyledIonPage = styled(IonPage)`
  background-color: black;
`
const Home = () => {
  return (
    <StyledIonPage>
      {/* <IonHeader></IonHeader> */}
      <IonContent fullscreen>
        <IonHeader collapse="condense">
        </IonHeader>
        <Dashboard/>
      </IonContent>
    </StyledIonPage>
  );
};

export default Home;
