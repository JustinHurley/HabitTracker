import moment from 'moment';
import { useState, useContext } from 'react';
import { Container, Button, LocalStorageContainer, StyledIonPage } from '../components'
import { dummyData, DEFAULT_TIMEZONE } from '../util';
import { IonContent, IonHeader } from '@ionic/react';
import { GlobalContext, GlobalState } from '../components/State/State';

export const Settings = () => {
    const { globalState, setGlobalState } = useContext(GlobalContext)
    const [ importText, setImportText ] = useState('')
    const [ exportData, setExportData ] = useState(false)

    const toggleDeveloperMode = () => {
        setGlobalState((prevState) => ({
            ...prevState, // Spread the existing state
            developerMode: !globalState?.developerMode // Update timestamps array
        } as GlobalState));
    }

    const getLocalData = () => {
        // If export data pressed with data present, replaces it with info in textArea
        if (exportData) {
            if (importText !== '') {
                setGlobalState((prevState) => ({
                    ...prevState,
                    timestamps: JSON.parse(importText)?.timestamps ?? []
                } as GlobalState));
            }
        }
        setExportData(!exportData);
    }

    const resetClick = () => {
        console.log('Resetting data...')
        console.log(JSON.stringify(localStorage))
        setGlobalState({} as GlobalState);
    }

    const addDummyData = () => {
        setGlobalState((prevState) => ({
            ...prevState,
            timestamps: dummyData
        } as GlobalState));
    }
    
    const handleTextareaChange = (event: any) => {
        setImportText(event.target.value);
    };

    return(
        <StyledIonPage>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                </IonHeader>
                <Container>
                    <Button color='warning' onClick={getLocalData}>Import/Export Local Storage</Button>
                    <Button color='danger' onClick={resetClick}>Reset Data</Button>
                    <Button color='light' onClick={toggleDeveloperMode}>Developer Mode</Button>
                    {exportData &&
                        <LocalStorageContainer id='export-text-area' value={JSON.stringify(localStorage)} onChange={handleTextareaChange}/>
                    }
                    {(globalState?.developerMode ?? false) && 
                        <>
                            <Button color='light' onClick={addDummyData}>Add Dummy Data</Button>
                            {globalState?.timestamps?.map((time: string) => {
                                console.log(globalState.timestamps)
                                if (time) {
                                    return (
                                        <div key={time} style={{fontSize: '10px'}}>
                                            {time}  
                                            {moment.utc(time).tz(DEFAULT_TIMEZONE).format()}
                                        </div>
                                    )
                                } else {
                                    return 
                                }
                            })} 
                        </>
                    }
                </Container>
            </IonContent>
        </StyledIonPage>
    )
}
