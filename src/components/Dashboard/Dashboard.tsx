import { IonButton } from "@ionic/react";
import { useEffect, useState } from "react";
import { Graphs } from "../Graphs/Graphs";
import { styled } from "styled-components";
import moment from "moment";
import { dummyData, timezone } from "../../util";

const Container = styled.div`
    font-family: 'Helvetica', sans-serif;
    font-weight: bold;
    margin-left: 10%;
    margin-right: 10%;
    gap: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
`

const Button = styled(IonButton)`
    width: 30%;
    margin: 10px;
`

export const Dashboard = () => {
    const [timestamps, setTimestamps] = useState(() => {
        const savedTimestamps = localStorage.getItem('timestamps');
        return savedTimestamps ? JSON.parse(savedTimestamps) : [];
    });

    // Updates local storage when timestamps changes
    useEffect(() => {
        localStorage.setItem('timestamps', JSON.stringify(timestamps));
    }, [timestamps]);

    const hitClick = () => {
        const now = new Date()
        // setTimestamps((prevTimestamps: any) => [...prevTimestamps, now.toISOString()]);
        setTimestamps(dummyData)
    }

    const resetClick = () => {
        console.log('Resetting data...')
        console.log(JSON.stringify(localStorage))
        setTimestamps([]);
    }
    
    const getLocalData = () => {
        console.log(JSON.stringify(localStorage))
    }

    return(
        <Container>
            <Button color='primary' onClick={hitClick}>Press Here</Button>
            <Graphs timestamps={timestamps}/>
            <Button color='warning' onClick={getLocalData}>Export Local Storage</Button>
            <Button color='danger' onClick={resetClick}>Reset Data</Button>
            {timestamps.map((times: any) => (
                <div key={times}>{times}; {moment.utc(times).tz(timezone).format()};</div>
            ))}
        </Container>
    )
}