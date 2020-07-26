import React, { ReactElement, ReactNode } from 'react';
import { Modal, View } from 'react-native';
import { styles } from '../style';

interface ModalProps {
    onClose: () => void,
    children: ReactNode
}
const ModalComponent: React.FC<ModalProps> = (props): ReactElement => {
    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={true}
            onRequestClose={() => props.onClose()}
        >
            <View style={styles[`${ModalComponent.displayName}-container`]}>
                <View style={styles[`${ModalComponent.displayName}-sub-container`]}>
                    {props.children}
                </View>
            </View>
        </Modal>
    )
}
ModalComponent.displayName = 'modalComponent';
export default ModalComponent;