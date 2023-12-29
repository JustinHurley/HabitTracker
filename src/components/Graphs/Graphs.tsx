import { Chart, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from 'chart.js/auto'
import { Bar, Line } from 'react-chartjs-2';
import { convertDatesToTimezone, countByDateInRange, countByHour, dayOptions, getDayConfig, countPastNDays, nDaysBeforeToday, primaryColor, calculatePastNDayAverage, now, getLastTime, getAmPmTime, getDifferenceInDays, daysToLast, getDailyBarGraphConfig } from '../../util';
import { IonLabel, IonSelect, IonSelectOption}  from '@ionic/react';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
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
    border-radius: 5px;
`

const StyledLine = styled(Line)`
    margin: 10px;
    background-color: white;
    border-radius: 5px;
`

const GraphsContainer = styled.div`
    display: grid;
    align-items: center;
`
const GraphContainer = styled.div`
    width: 80dvw;
    align-items: center;
    margin-bottom: 20px;
`

const GraphFrame = styled.div`
    height: 30dvh;
`

const Label = styled(IonLabel)`
    margin: auto;
    align-items: center;
`

const RangeBox = styled.div`
    display: flex;
    align-items: center;
    background-color: ${primaryColor};
    border-radius: 5px;
    margin: 10px;
`

const SectionTitle = styled.h3`
    margin: 10px;
    font-weight: bold;
    font-size: 45px;
`
const IonSelectStyled = styled(IonSelect)`
    margin: 10px;
    width: 35dvh;
    font-size: 18px;
    background-color: black;
    border-radius: 5px;
    padding: 5px;
    padding-left: 10px;
    margin-left: auto;
`

const RowContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`
interface GraphsProps {
    timestamps: string[]
}

export const Graphs = ({timestamps}: GraphsProps) => {
    const [numDays, setNumDays] = useState(() => {
        return parseInt(localStorage.getItem('numDays') ?? '30') ;
    })

    useEffect(() => {
        localStorage.setItem('numDays', numDays.toString())
    }, [numDays])

    const times: string[] = convertDatesToTimezone(timestamps)
    const lastNDaysConfig = getDayConfig(countByDateInRange(nDaysBeforeToday(numDays).toISOString(), now.toISOString(), times))
    const hourConfig = getDailyBarGraphConfig(countByHour(times))

    const dayTotal: any = countPastNDays(1, times)
    const prevDayTotal: any = countPastNDays(2, times, 1)

    const nDayTotal: any = countPastNDays(numDays, times)
    const nDayAverage: any = calculatePastNDayAverage(numDays, times).toFixed(2)

    const pastNDayTotal: any = countPastNDays(numDays*2, times, numDays)
    const pastNDayAverage: any = calculatePastNDayAverage(numDays*2, times, numDays).toFixed(2)

    const mostRecentTime = getAmPmTime(getLastTime(times))

    const handleSelectedDay = (event: any) => {
        setNumDays(event.detail.value)
    }

    return (
        <>
            <GraphsContainer className='graphs-container'>
                <GraphContainer className='graph-container'>
                    <SectionTitle>TODAY</SectionTitle>
                    {dayTotal > 0 ? 
                    <>
                        <RowContainer>
                            <NumberBox text={'Total for Today'} val={dayTotal} other={prevDayTotal} useBoth={true}/>
                            <NumberBox text={'Last Toke Time'} val={mostRecentTime} other={daysToLast(times)}/>
                        </RowContainer>
                        <GraphFrame>
                            <StyledBar options={hourConfig.options} data={hourConfig.data} />
                        </GraphFrame>
                    </> : <Label>None for Today 😴</Label>}
                </GraphContainer>
                <GraphContainer className='graph-container'>
                    <SectionTitle>TRENDS</SectionTitle>
                    <RowContainer>
                        <NumberBox text={`${numDays}-Day Total`} val={nDayTotal} other={pastNDayTotal} useBoth={true}/>
                        <NumberBox text={`${numDays}-Day Average`} val={nDayAverage} other={pastNDayAverage} useBoth={true}/>
                    </RowContainer>
                    <GraphFrame>
                        <StyledLine options={lastNDaysConfig.options} data={lastNDaysConfig.data} />
                    </GraphFrame>
                    <RangeBox>
                    <Label>Select Day Range</Label>
                        <IonSelectStyled value={numDays} onIonChange={handleSelectedDay}>
                            {dayOptions.map((day: number) => {
                                return(
                                    <IonSelectOption key={day} value={day}>{day} Day(s)</IonSelectOption>
                                )
                            })}
                        </IonSelectStyled>
                    </RangeBox>
                </GraphContainer>
            </GraphsContainer>
        </>
    );
}