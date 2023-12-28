import { IonLabel } from "@ionic/react"
import { styled } from "styled-components"
import { primaryColor } from "../../util"

const Label = styled(IonLabel)`
    margin: 10px;
    align-items: center;
`
const Num = styled(IonLabel)`
   font-size: 40px;
`

const Diff = styled(IonLabel)`
    font-size: 20px;
`
const Box = styled.div`
    flex-direction: column;
    display: flex;
    align-items: center;
    background-color: ${primaryColor};
    border-radius: 5px;
    margin: 10px;
    width: 40%;
    padding: 10px;
`

const Row = styled.div`
    flex-direction: row;
    display: flex;
    align-items: center;
    gap: 10px;
`

interface NumberBoxProps {
    text: string;
    num: number;
    other?: number;
}

const buildDifference = (curr: number, past: number) => {
    const diff = curr - past;
    let val = '0'
    if (diff < 0) {
        val = diff.toString()
    } else if (diff > 0) {
        val = `+${diff.toString()}`
    }
    return (<Diff>({val})</Diff>)
}

const buildPercentage = (curr: number, past: number) => {
    if (past == 0) {
        return false
    }
    let val = '0%'
    if (curr > past) {
        val = `+${((curr/past)*100).toFixed(0)}%`
    } else if (curr < past) {
        val = `${((curr/past)*100).toFixed(0)}%`
    }
    return (<Diff>({val})</Diff>)
}

export const NumberBox = ({text, num, other}: NumberBoxProps) => {
    return (
        <Box>
            <Label>{text}</Label>
            <Row>
                <Num>{num}</Num>
                {other && buildPercentage(num, other)}
            </Row>
        </Box>
    )
}