import { IonLabel } from "@ionic/react"
import { styled } from "styled-components"
import { primaryColor } from "../../util"

const Label = styled(IonLabel)`
    align-items: center;
    font-size: 16px;
`
const Num = styled(IonLabel)`
   font-size: 32px;
   white-space: nowrap;
   margin-top: 5px;
`

const Detail = styled(IonLabel)`
    font-size: 14px;
    white-space: nowrap;
`
const Box = styled.div`
    flex-direction: column;
    display: flex;
    align-items: center;
    background-color: ${primaryColor};
    border-radius: 5px;
    width: 40%;
    padding: 10px;
    height: auto;
    justify-content: space-between;
`

const buildDifference = (curr: number, past: number) => {
    const diff = curr - past;
    let val = '0'
    if (diff < 0) {
        val = diff.toString()
    } else if (diff > 0) {
        val = `+${diff.toString()}`
    }
    return (<Detail>({val})</Detail>)
}

const buildPercentage = (curr: number, past: number) => {
    if (past == 0) {
        return 'Inf'
    }
    let val = '0%'
    if (curr > past) {
        val = `+${((curr/past)*100).toFixed(0)}%`
    } else if (curr < past) {
        val = `${((curr/past)*100).toFixed(0)}%`
    }
    return (<Detail>({val})</Detail>)
}

interface NumberBoxProps {
    text: string;
    val: number | string;
    other?: number | string;
    usePercentage?: boolean;
    useDifference?: boolean;
}

export const NumberBox = ({text, val, other, usePercentage = false, useDifference = false}: NumberBoxProps) => {
    return (
        <Box>
            <Label>{text}</Label>
            <Num>{val}</Num>
            {other && 
                <Detail>
                    {usePercentage && buildPercentage(parseInt(val.toString()), parseInt(other.toString()))}
                    {useDifference && buildDifference(parseInt(val.toString()), parseInt(other.toString()))}
                    {!usePercentage && !useDifference && other}
                </Detail>
            }
        </Box>
    )
}