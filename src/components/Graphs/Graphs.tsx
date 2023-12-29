import { Chart, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from 'chart.js/auto'
import { Bar, Line } from 'react-chartjs-2';
import { convertDatesToTimezone, countByDateInRange, countByHour, dayOptions, getDayConfig, getHourConfig, countPastNDays, nDaysBeforeToday, primaryColor, calculatePastNDayAverage, now, getLastTime, getAmPmTime, getDifferenceInDays } from '../../util';
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
    border-radius: 3px;
`

const StyledLine = styled(Line)`
    margin: 10px;
    background-color: white;
    border-radius: 5px;
    margin-top: 20px;
`

const GraphsContainer = styled.div`
    display: grid;
    gap: 10px;
    align-items: center;
`
const GraphContainer = styled.div`
    width: 80vw;
    align-items: center;
    margin-bottom: 20px;
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
const H3 = styled.h3`
    margin: 10px;
    font-weight: bold;
    font-size: 45px;
`
const IonSelectStyled = styled(IonSelect)`
    margin: 10px;
    width: 35%;
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

    const times = convertDatesToTimezone(timestamps)
    const lastNDaysConfig = getDayConfig(countByDateInRange(nDaysBeforeToday(numDays).toISOString(), now.toISOString(), times))
    const hourConfig = getHourConfig(countByHour(times))

    const dayTotal: any = countPastNDays(1, times)
    const prevDayTotal: any = countPastNDays(2, times, 1)

    const nDayTotal: any = countPastNDays(numDays, times)
    const nDayAverage: any = calculatePastNDayAverage(numDays, times).toFixed(2)

    const pastNDayTotal: any = countPastNDays(numDays*2, times, numDays)
    const pastNDayAverage: any = calculatePastNDayAverage(numDays*2, times, numDays).toFixed(2)

    const mostRecent: Date = getLastTime(times)
    
    
    const mostRecentTime = getAmPmTime(mostRecent)
    const daysToLast = () => {
        const diff = getDifferenceInDays(mostRecent, now)
        if (diff <= 0) {
            return undefined;
        } else if (diff === 1) {
            return '(1 day ago)'
        } else {
            return `(${diff} days ago))`
        }
    } 

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
                            <NumberBox text={'Total for Today'} val={dayTotal} other={prevDayTotal} useDifference={true}/>
                            <NumberBox text={'Last Toke Time'} val={mostRecentTime} other={daysToLast()}/>
                        </RowContainer>
                        <StyledBar options={hourConfig.options} data={hourConfig.data} />
                    </> : <Label>None for Today 😴</Label>}
                </GraphContainer>
                <GraphContainer className='graph-container'>
                    <H3>TRENDS</H3>
                    <RowContainer>
                        <NumberBox text={`${numDays}-Day Total`} val={nDayTotal} other={pastNDayTotal} useDifference={true}/>
                        <NumberBox text={`${numDays}-Day Daily Average`} val={nDayAverage} other={pastNDayAverage} usePercentage={true}/>
                    </RowContainer>
                    <StyledLine options={lastNDaysConfig.options} data={lastNDaysConfig.data} />
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