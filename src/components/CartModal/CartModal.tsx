import { styled } from "styled-components"
import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonToolbar } from "@ionic/react"
import { useRef } from "react"
import { OverlayEventDetail } from "@ionic/core"
import { BigButton } from "../styledComponents"

interface CartModalProps {
    
}

export const CartModal: React.FC<CartModalProps> = () => {
    const modal = useRef<HTMLIonModalElement>(null);

    const onWillDismiss = (ev: CustomEvent<OverlayEventDetail>) => {
        if (ev.detail.role === 'confirm') {
          console.log('Bye!')
        }
      }

    return(
        <ModalContainer>
            <BigButton color='secondary' id='open-modal'>🔋 Add New Cart 🔋</BigButton> 
            <IonModal ref={modal} trigger="open-modal" onWillDismiss={onWillDismiss}>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    
                </IonContent>
            </IonModal>
        </ModalContainer>
    )
}

const ModalContainer = styled.div`
    background-color: var(--ion-color-primary)
`