import { IonButton, IonContent, IonLabel, IonPage, IonTextarea } from "@ionic/react"
import styled from "styled-components"

export const StyledIonPage = styled(IonPage)`
  background-color: black;
`

export const Container = styled.div`
    font-family: 'Helvetica', sans-serif;
    font-weight: bold;
    gap: 1dvh;
    display: flex;
    flex-direction: column;
    padding: 5dvh;
    align-items: center;
`

export const Button = styled(IonButton)`
    width: auto;
    margin: 1dvh;
`

export const BigButton = styled(IonButton)`
    padding: 1dvh;
    font-weight: 900;
`

export const LocalStorageContainer = styled(IonTextarea)`
    background-color: white;
    color: black;
    padding-left: 1dvh;
    max-height: auto;
    min-height: 50vh;
    resize: both;
`

export const Label = styled(IonLabel)`
    margin: auto;
    padding: 1dvh;
`

export const SectionTitle = styled.h3`
    margin: 1dvh;
    font-weight: bold;
    font-size: 45px;
`

export const RowContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 1dvh;
    margin: 1dvh;
`

export const GraphsContainer = styled.div`
    display: grid;
    align-items: center;
`

export const StyledIonContent = styled(IonContent)`
    padding: 0dvh 5dvh;
`