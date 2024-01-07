import { IonButton, IonPage, IonTextarea } from "@ionic/react"
import { styled } from "styled-components"

export const StyledIonPage = styled(IonPage)`
  background-color: black;
`

export const Container = styled.div`
    font-family: 'Helvetica', sans-serif;
    font-weight: bold;
    gap: 1dvw;
    display: flex;
    flex-direction: column;
    padding: 5dvw;
    width: 95dvw;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
`

export const Button = styled(IonButton)`
    width: auto;
    margin: 1dvw;
`

export const BigButton = styled(IonButton)`
    padding: 2dvw;
    font-weight: 900;
`

export const LocalStorageContainer = styled(IonTextarea)`
    background-color: white;
    color: black;
    padding-left: 1dvw;
    max-height: auto;
    min-height: 50vh;
    resize: both;
`