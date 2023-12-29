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
    margin: 2.5px;
`
const Box = styled.div`
    flex-direction: column;
    display: flex;
    align-items: center;
    background-color: ${primaryColor};
    border-radius: 5px;
    width: 35dvw;
    height: 10dvh;
    padding: 10px;
    height: auto;
    justify-content: space-between;
`

const RowContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
`

const buildDifference = (curr: number, past: number) => {
    const diff = curr - past;
    let val = '0'
    if (diff < 0) {
        val = diff.toString()
    } else if (diff > 0) {
        val = `+${diff.toString()}`
    }
    return (`${val}`)
}

const buildPercentage = (curr: number, past: number) => {
    let val = '0%'
    if (past == 0) {
        val = 'inf'
    } else if (curr > past) {
        val = `+${((curr/past)*100).toFixed(0)}%`
    } else if (curr < past) {
        val = `${((curr/past)*100).toFixed(0)}%`
    }
    return (`(${val})`)
}

interface NumberBoxProps {
    text: string;
    val: number | string;
    other?: number | string;
    usePercentage?: boolean;
    useDifference?: boolean;
    useBoth?: boolean;
}

export const NumberBox = ({text, val, other, usePercentage = false, useDifference = false, useBoth}: NumberBoxProps) => {
    if (useBoth) {
        usePercentage = true
        useDifference = true
    }

    return (
        <Box>
            <Label>{text}</Label>
            <Num>{val}</Num>
            {other && 
                <RowContainer>            
                    {useDifference && <Detail>{buildDifference(parseInt(val.toString()), parseInt(other.toString()))}</Detail>}
                    {usePercentage && <Detail>{buildPercentage(parseInt(val.toString()), parseInt(other.toString()))}</Detail>}      
                    {!usePercentage && !useDifference && <Detail>{other ?? ' '}</Detail>}     
                </RowContainer>
            }
        </Box>
    )
}