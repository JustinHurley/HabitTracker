import { Chart, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from 'chart.js/auto'
import { Bar, Line } from 'react-chartjs-2';
import { convertDatesToTimezone, countByDateInRange, countByHour, dayOptions, getDayConfig, countPastNDays, nDaysBeforeToday, primaryColor, calculatePastNDayAverage, getAmPmTime, daysToLast, getDailyBarGraphConfig, getMostRecent, getNow, stringsToDates } from '../../util';
import { IonSelect, IonSelectOption}  from '@ionic/react';
import styled from 'styled-components';
import { useContext } from 'react';
import { NumberBox } from '../Stats/NumberBox';
import { GlobalContext, GlobalState, updateNumDays } from '../State/State';
import { GraphsContainer, Label, RowContainer, SectionTitle } from '../styledComponents';

Chart.register(
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

interface GraphsProps {
    props: GlobalState | null
}

export const Graphs = ({props}: GraphsProps) => {
    const { globalState, setGlobalState } = useContext(GlobalContext)
    const numDays = globalState?.numDays ?? 30

    const times: Date[] = convertDatesToTimezone(stringsToDates(props?.timestamps ?? []))
    const lastNDaysConfig = getDayConfig(countByDateInRange(nDaysBeforeToday(numDays), getNow(), times))
    const hourConfig = getDailyBarGraphConfig(countByHour(times))

    const dayTotal: number = countPastNDays(1, times)

    const nDayTotal: number = countPastNDays(numDays, times)
    const nDayAverage: string = calculatePastNDayAverage(numDays, times).toFixed(2)

    const pastNDayTotal: number = countPastNDays(numDays*2, times, numDays)
    const pastNDayAverage: string = calculatePastNDayAverage(numDays*2, times, numDays).toFixed(2)

    const mostRecentTime: string = getAmPmTime(getMostRecent(times) ?? getNow())

    const handleSelectedDay = (event: any) => {
        setGlobalState(updateNumDays(event.detail.value, globalState))
    }
 
    return (
        <GraphsContainer className='graphs-container'>
            <SectionTitle>TODAY</SectionTitle>
            {dayTotal > 0 ? 
                <>
                    <RowContainer>
                        <NumberBox text={'Total for Today'} val={dayTotal}/>
                        <NumberBox text={'Last Toke Time'} val={mostRecentTime} other={daysToLast(times)}/>
                    </RowContainer>
                    <GraphFrame>
                        <StyledBar options={hourConfig.options} data={hourConfig.data} />
                    </GraphFrame>
                </> : 
                <RowContainer>
                    <Label style={{fontSize: '30px'}}>😴 None for Today 😴</Label>
                </RowContainer>
            }
            <SectionTitle>TRENDS</SectionTitle>
            <RowContainer>
                <NumberBox text={`${numDays}-Day Total`} val={nDayTotal} other={pastNDayTotal} useDifference={true}/>
                <NumberBox text={`${numDays}-Day Average`} val={nDayAverage} other={pastNDayAverage} useDifference={true}/>
            </RowContainer>
            <GraphFrame>
                <StyledLine options={lastNDaysConfig.options} data={lastNDaysConfig.data} />
            </GraphFrame>
            <RangeBox>
            <Label style={{fontSize: '12px'}}>Select Day Range</Label>
                <IonSelectStyled value={numDays} onIonChange={handleSelectedDay}>
                    {dayOptions.map((day: number) => {
                        return(
                            <IonSelectOption key={day} value={day}>{day} Day(s)</IonSelectOption>
                        )
                    })}
                </IonSelectStyled>
            </RangeBox>
        </GraphsContainer>
    );
}

const StyledBar = styled(Bar)`
    margin: 1dvh;
    background-color: white;
    border-radius: 1dvh;
`

const StyledLine = styled(Line)`
    margin: 1dvh;
    background-color: white;
    border-radius: 1dvh;
`

const GraphFrame = styled.div`
    height: 35dvh;
`

const RangeBox = styled.div`
    display: flex;
    align-items: center;
    background-color: ${primaryColor};
    border-radius: 1dvh;
    margin: 0dvh 1dvh;
`

const IonSelectStyled = styled(IonSelect)`
    margin: 1dvh;
    width: 35dvh;
    font-size: 18px;
    background-color: black;
    border-radius: 1dvh;
    padding: 1dvh;
    margin-left: auto;
`