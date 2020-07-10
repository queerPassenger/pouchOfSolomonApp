import React, { useContext } from 'react';
import { AppContext } from '../context/appContext';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { styles } from '../style';

const tabs = [
    {
        key: 'view',
        name: 'VIEW'
    },
    {
        key: 'analyse',
        name: 'ANALYSE'
    }
]
export default function AppTab() {
    const componentName = 'appTab';
    const context = useContext(AppContext);
    return (
        <View style={styles[`${componentName}-container`]}>
            {tabs.map((x, ind) => {
                return (
                    <TouchableWithoutFeedback
                        key={'tab' + ind}
                        onPress={() => context.updateTabSelected(x.key)}
                    >
                        <View
                            style={styles[`${componentName}-tab-container` + (context.tabSelected === x.key ? `-selected` : ``)]}
                        >
                            <Text style={styles[`${componentName}-tab-text` + (context.tabSelected === x.key ? `-selected` : ``)]}>
                                {x.name}
                            </Text>
                        </View>
                    </ TouchableWithoutFeedback>
                )
            })}
        </View>
    )
}
