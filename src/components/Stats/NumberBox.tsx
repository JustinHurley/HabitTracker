import { IonLabel } from "@ionic/react"
import { styled } from "styled-components"
import { primaryColor } from "../../util"

const Label = styled(IonLabel)`
    align-items: center;
    font-size: 16px;
`
const Num = styled(IonLabel)`
   font-size: 30px;
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
    height: 100%;
    padding: 1dvh;
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
    let val = '+0'
    if (diff < 0) {
        val = diff.toString()
    } else if (diff > 0) {
        val = `+${diff.toString()}`
    }
    return (`${val}`)
}

const buildPercentage = (curr: number, past: number, decimals = 2) => {
    if (curr === past) {
        return '(+0%)'
    } else if (curr > past) {
        if (past === 0) {
            return '(+inf%)'
        }
        return (`(+${(curr/past).toFixed(decimals)}%)`)
    } else if (curr < past) {
        if (curr === 0) {
            return '(-inf%)'
        }
        return (`(-${(past/curr).toFixed(decimals)}%)`)
    }
    return NaN
}

interface NumberBoxProps {
    text: string;
    val: number | string;
    other?: number | string;
    useDifference?: boolean;
}

export const NumberBox = ({text, val, other, useDifference}: NumberBoxProps) => {

    return (
        <Box>
            <Label>{text}</Label>
            <Num>{val}</Num>
            {(other || other === 0) && 
                <RowContainer>            
                    {useDifference && <Detail>{buildDifference(parseInt(val.toString()), parseInt(other.toString()))}</Detail>}
                    {useDifference && <Detail>{buildPercentage(parseInt(val.toString()), parseInt(other.toString()))}</Detail>}      
                    {!useDifference && <Detail>{other ?? ''}</Detail>}     
                </RowContainer>
            }
        </Box>
    )
}