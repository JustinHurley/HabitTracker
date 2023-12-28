import { Chart, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from 'chart.js/auto'
import { Bar, Line } from 'react-chartjs-2';
import { convertDatesToTimezone, countByDateInRange, countByHour, dayOptions, getDayConfig, getHourConfig, getPastNDayAverage, countPastNDays, nDaysBeforeToday, primaryColor, timezone } from '../../util';
import { IonLabel, IonSelect, IonSelectOption}  from '@ionic/react';
import styled from 'styled-components';
import moment from 'moment';
import { useState } from 'react';
import { NumberBox } from '../Stats/NumberBox';

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
    border-radius: 5px;
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
    margin-bottom: 20px;
`

const Label = styled(IonLabel)`
    margin: 10px;
    align-items: center;
`

const RangeBox = styled.div`
    display: flex;
    align-items: center;
    background-color: ${primaryColor};
    width: 50%;
    border-radius: 5px;
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
    font-size: 20px;
    background-color: black;
    border-radius: 5px;
    padding: 5px;
    padding-left: 10px;
`

const RowContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    margin-left: auto;
    margin-right: auto;
    justify-content: space-evenly;
`
interface GraphsProps {
    timestamps: string[]
}

export const Graphs = ({timestamps}: GraphsProps) => {
    const times = convertDatesToTimezone(timestamps)
    const [numDays, setNumDays] = useState(30)
    const today = moment.tz(timezone).toISOString()
    const lastNDaysConfig = getDayConfig(countByDateInRange(nDaysBeforeToday(numDays).toISOString(), today, times))
    const hourConfig = getHourConfig(countByHour(times))

    const dayTotal: any = countPastNDays(1, times)
    const nDayTotal: any = countPastNDays(numDays, times)
    const nDayAverage: any = getPastNDayAverage(numDays, times).toFixed(2)
    const pastNDayTotal: any = countPastNDays(numDays*2, times, numDays)

    const handleSelectedDay = (event: any) => {
        setNumDays(event.detail.value)
    }

    return (
        <>
            <GraphsContainer className='graphs-container'>
                <GraphContainer className='graph-container'>
                    <H3>TODAY</H3>
                    {dayTotal > 0 ? 
                    <>
                        <RowContainer>
                            <NumberBox text={'Total for Today'} num={dayTotal}/>
                        </RowContainer>
                        <StyledBar options={hourConfig.options} data={hourConfig.data} />
                    </> : <Label>None for Today 😴</Label>}
                </GraphContainer>
                <GraphContainer className='graph-container'>
                    <H3>TRENDS</H3>
                    <RowContainer>
                        <NumberBox text={`${numDays} Day Total`} num={nDayTotal} other={pastNDayTotal}/>
                        <NumberBox text={`${numDays} Day Average`} num={nDayAverage}/>
                    </RowContainer>
                    <StyledLine options={lastNDaysConfig.options} data={lastNDaysConfig.data} />
                    <RangeBox>
                        <Label>Select Day Range</Label>
                        <IonSelectStyled value={numDays} onIonChange={handleSelectedDay}>
                            {dayOptions.map((day: number) => {
                                return(
                                    <IonSelectOption key={day} value={day}>{day} Days</IonSelectOption>
                                )
                            })}
                        </IonSelectStyled>
                    </RangeBox>
                </GraphContainer>
            </GraphsContainer>
        </>
    );
}