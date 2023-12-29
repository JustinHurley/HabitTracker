import { IonButton, IonTextarea } from "@ionic/react";
import { useEffect, useState } from "react";
import { Graphs } from "../Graphs/Graphs";
import { styled } from "styled-components";
import moment from 'moment-timezone';
import { dummyData, now, rightNow, timezone } from "../../util";

const Container = styled.div`
    font-family: 'Helvetica', sans-serif;
    font-weight: bold;
    margin-left: 10%;
    margin-right: 10%;
    gap: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 50px;
`

const Button = styled(IonButton)`
    width: auto;
    margin: 10px;
`

const BigButton = styled(IonButton)`
    margin: 10px;
    padding: 20px;
    font-weight: 900;
`

const LocalStorageContainer = styled(IonTextarea)`
    background-color: white;
    color: black;
    padding-left: 10px;
`

export const Dashboard = () => {
    const [timestamps, setTimestamps] = useState(() => {
        const savedTimestamps = localStorage.getItem('timestamps');
        return savedTimestamps ? JSON.parse(savedTimestamps) : [];
    });

    const [developerMode, setDeveloperMode] = useState(() => {
        const saved = localStorage.getItem('developerMode');
        return saved ? saved : false;
    });

    const [exportData, setExportData] = useState(false)

    useEffect(() => {
        localStorage.setItem('timestamps', JSON.stringify(timestamps));
    }, [timestamps]);

    useEffect(() => {
        localStorage.setItem('developerMode', developerMode.toString());
    }, [developerMode]);

    const hitClick = () => {
        const now = rightNow
        setTimestamps((prevTimestamps: any) => [...prevTimestamps, now.toISOString()]);
        // setTimestamps(dummyData)
    }

    const resetClick = () => {
        console.log('Resetting data...')
        console.log(JSON.stringify(localStorage))
        setTimestamps([]);
    }
    
    const getLocalData = () => {
        console.log(JSON.stringify(localStorage))
        setExportData(!exportData);
    }

    const toggleDeveloperMode = () => {
        setDeveloperMode(!developerMode);
    }

    return(
        <Container>
            <BigButton color='primary' onClick={hitClick}>🍃 Toke Counter 🍃</BigButton>
            <Graphs timestamps={timestamps}/>
            <Button color='warning' onClick={getLocalData}>Export Local Storage</Button>
            <Button color='danger' onClick={resetClick}>Reset Data</Button>
            <Button color='light' onClick={toggleDeveloperMode}>Developer Mode</Button>
            {exportData &&
                <>
                    <LocalStorageContainer value={JSON.stringify(localStorage)}></LocalStorageContainer>
                </>
            }
            {developerMode && 
                <>
                    {now.toISOString()}
                    {timestamps.map((times: any) => (
                        <div key={times}>{times}; {moment.utc(times).tz(timezone).format()};</div>
                    ))} 
                </>
            }
            
            
        </Container>
    )
}