import React from 'react';
import { Modal, View } from 'react-native';
import { styles } from '../style';

export default function ModalComponent(props){
    const componentName = 'modalComponent';
    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={true}
            onRequestClose={() => props.onClose()}
        >
            <View style={styles[`${componentName}-container`]}>
                <View style={styles[`${componentName}-sub-container`]}>
                    <View style={styles[`${componentName}-header-container`]}>

                    </View>
                    <View style={styles[`${componentName}-body-container`]}>
                        {props.children}
                    </View>                    
                </View>
            </View>
        </Modal>
    )
} 