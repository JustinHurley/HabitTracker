import { styled } from "styled-components"
import { IonButton, IonButtons, IonHeader, IonInput, IonItem, IonList, IonModal, IonToolbar } from "@ionic/react"
import { useRef, useState } from "react"
import { OverlayEventDetail } from "@ionic/core"
import { BigButton, StyledIonContent } from "../styledComponents"

interface CartModalProps {}

const CartModal: React.FC<CartModalProps> = () => {
    const [cartAmount, setCartAmount] = useState<number>();
    const [cartName, setCartName ] = useState('')
    const modal = useRef<HTMLIonModalElement>(null);
    const ionNumberInputEl = useRef<HTMLIonInputElement>(null);

    const onWillDismiss = (ev: CustomEvent<OverlayEventDetail>) => {
        if (ev.detail.role === 'confirm') {
          console.log('Bye!')
        }
    }

    const onAmountInput = (ev: Event) => {
        const value = (ev.target as HTMLIonInputElement).value as string;
        const filteredValue = value.replace(/\D/g, '');
        setCartAmount(parseFloat(filteredValue))
        const inputCmp = ionNumberInputEl.current;
        if (inputCmp !== null) {
            inputCmp.value = filteredValue;
        }
    }

    return(
        <ModalContainer>
            <BigButton color='secondary' id='open-modal'>🔋 Add New Cart 🔋</BigButton> 
            <IonModal ref={modal} trigger="open-modal" onWillDismiss={onWillDismiss}>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot='start'>
                            <ToolbarButton color='danger' onClick={() => modal.current?.dismiss()}>Cancel</ToolbarButton>
                        </IonButtons>
                        <IonButtons slot='end'>
                            <ToolbarButton color='primary' onClick={() => console.log('submit')}>Submit</ToolbarButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <StyledIonContent>
                    <IonList>
                        <IonItem>
                            <IonInput 
                                label='Enter Cart Name'
                                value={cartName}
                                clearInput={true}
                            />
                        </IonItem>
                        <IonItem>
                            <IonInput 
                                label='Enter Cart Amount' 
                                value={cartAmount}
                                type='number'
                                clearInput={true}
                                onIonInput={onAmountInput}
                                ref={ionNumberInputEl}
                            />
                        </IonItem>
                    </IonList>
                </StyledIonContent>
            </IonModal>
        </ModalContainer>
    )
}

export default CartModal;

const ModalContainer = styled.div`
    background-color: var(--ion-color-primary)
`

const ToolbarButton = styled(IonButton)`
    border-radius: 1dvh;
`