import { Chart, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from 'chart.js/auto'
import { Bar, Line } from 'react-chartjs-2';
import { convertDatesToTimezone, countByDateInRange, countByHour, getDayConfig, getHourConfig, getPastNDayAverage, getPastNDays, nDaysBeforeToday } from '../../util';
import { IonLabel, IonSelect, IonSelectOption}  from '@ionic/react';
import styled from 'styled-components';
import moment from 'moment';
import { useState } from 'react';

Chart.register(
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const StyledBar = styled(Bar)`
    margin: 10px;
    background-color: white;
    border-radius: 3px;
`

const StyledLine = styled(Line)`
    margin: 10px;
    background-color: white;
    border-radius: 3px;
`

const GraphsContainer = styled.div`
    display: grid;
    gap: 10px;
    align-items: center;
`
const GraphContainer = styled.div`
    width: 80vw;
    align-items: center;
    gap: 10px;
`

const Label = styled(IonLabel)`
    margin: 10px;
`

const Break = styled.br`
    margin: 10px;
`
const H3 = styled.h3`
    margin: 10px;
    font-weight: bold;
    font-size: 45px;
`
const IonSelectStyled = styled(IonSelect)`
    margin: 10px;
    width: 50%;
`

interface GraphsProps {
    timestamps: string[]
}
const dayOptions = [7, 15, 30, 60, 90]

export const Graphs = ({timestamps}: GraphsProps) => {
    const [numDays, setNumDays] = useState(30)
    const today = moment.tz('America/New_York').toISOString()
    timestamps = convertDatesToTimezone(timestamps)
    const processedTimes = countByHour(timestamps)
    const lastNDaysConfig = getDayConfig(countByDateInRange(nDaysBeforeToday(numDays), today, timestamps))
    const hourConfig = getHourConfig(processedTimes)

    const dayTotal: any = Object.values(processedTimes).reduce((acc: any, time: any) => {
        return acc + time
    }, 0)
    const nDayTotal: any = getPastNDays(numDays, timestamps)
    const nDayAverage: any = getPastNDayAverage(numDays, timestamps)

    const handleSelectedDay = (event: any) => {
        setNumDays(event.detail.value)
    }

    return (
        <>
            <GraphsContainer className='graphs-container'>
                <GraphContainer className='graph-container'>
                    <H3>TODAY</H3>
                    <Label>Total for Today: {dayTotal}</Label>
                    <StyledBar options={hourConfig.options} data={hourConfig.data} />
                </GraphContainer>
                <GraphContainer className='graph-container'>
                    <H3>TRENDS</H3>
                    <Label>Select Day Range</Label>
                    <IonSelectStyled value={numDays} onIonChange={handleSelectedDay}>
                        {dayOptions.map((day: number) => {
                            return(
                                <IonSelectOption key={day} value={day}>{day} days</IonSelectOption>
                            )
                        })}
                    </IonSelectStyled>
                    <Label>{numDays} Day Total: {nDayTotal}</Label>
                    <Break/>
                    <Label>{numDays} Day Average: {nDayAverage.toFixed(3)}</Label>
                    <StyledLine options={lastNDaysConfig.options} data={lastNDaysConfig.data} />
                </GraphContainer>
            </GraphsContainer>
        </>
    );
}