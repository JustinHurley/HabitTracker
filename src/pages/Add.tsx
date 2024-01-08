import { IonContent, IonHeader, IonToolbar } from '@ionic/react';
import { BigButton, Container, GraphsContainer, RowContainer, StyledIonPage } from '../components';
import moment from 'moment';
import { useContext } from 'react';
import { GlobalContext, addTimestamp, removeLastTimestamp } from '../components/State/State';
import { convertDatesToTimezone, countPastNDays, daysToLast, getAmPmTime, getMostRecent, getNow, getNowUTC, stringsToDates } from '../util';
import { CartModal } from '../components/CartModal/CartModal';
import { NumberBox } from '../components/Stats/NumberBox';

const Add: React.FC = () => {
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

  const dates: Date[] = convertDatesToTimezone(stringsToDates(globalState?.timestamps ?? []))
  const dayTotal: number = countPastNDays(1, dates)
  const mostRecentTime: string = getAmPmTime(getMostRecent(dates) ?? getNow())
  
  return (
    <StyledIonPage>
      <IonHeader>
        <IonToolbar>
          
        </IonToolbar>
      </IonHeader>
      <IonContent>
          <Container>
              <BigButton color='primary' onClick={hitClick}>🍃 Toke Counter 🍃</BigButton>
              <BigButton color='warning' onClick={undoClick}>⏪️ Undo Last ⏪️</BigButton>
              <CartModal /> 
              <GraphsContainer className='graphs-container'>
                <RowContainer>
                  <NumberBox text={'Total for Today'} val={dayTotal}/>
                  <NumberBox text={'Last Toke Time'} val={mostRecentTime} other={daysToLast(dates)}/>
                </RowContainer>
              </GraphsContainer>
          </Container>
      </IonContent>
    </StyledIonPage>
  );
};

export default Add;
