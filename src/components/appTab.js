import React, { useContext } from 'react';
import { AppContext } from '../context/appContext';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { styles } from '../style';

export default function AppTab() {
    const componentName = 'appTab';
    const context = useContext(AppContext);
    return (
        <View style={styles[`${componentName}-container`]}>
            {context.tabs.map((x, ind) => {
                return (
                    <TouchableWithoutFeedback
                        key={'tab' + ind}
                        onPress={() => context.updateSelectedTab(x.key)}
                    >
                        <View
                            style={styles[`${componentName}-tab-container` + (x.selected ? `-selected` : ``)]}
                        >
                            <Text style={styles[`${componentName}-tab-text` + (x.selected ? `-selected` : ``)]}>
                                {x.name}
                            </Text>
                        </View>
                    </ TouchableWithoutFeedback>
                )
            })}
        </View>
    )
}
