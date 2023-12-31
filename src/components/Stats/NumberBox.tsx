import { IonLabel } from "@ionic/react"
import { styled } from "styled-components"
import { primaryColor } from "../../util"
import { RowContainer } from "../styledComponents";

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
            {other ? <Num>{val}</Num> : <BigNum>{val}</BigNum>}
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

const Label = styled(IonLabel)`
    align-items: center;
    font-size: 16px;
    margin: 1dvh;
`
const Num = styled(IonLabel)`
   font-size: 30px;
   white-space: nowrap;
   margin: 1dvh;
`

const BigNum = styled(IonLabel)`
   font-size: 45px;
   white-space: nowrap;
   margin: auto;
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
    border-radius: 1dvh;
    width: 45dvw;
    padding: 1dvh;
`