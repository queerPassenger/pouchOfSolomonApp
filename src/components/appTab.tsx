import React, { useContext, ReactElement } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import AppContext from '../context/appContext';
import { styles } from '../style';

const AppTab: React.FC = (): ReactElement => {
    const context = useContext(AppContext);
    return (
        <View style={styles[`${AppTab.displayName}-container`]}>
            {context.tabs.map((x, ind) => {
                return (
                    <TouchableWithoutFeedback
                        key={'tab' + ind}
                        onPress={() => context.updateSelectedTab(x.key)}
                    >
                        <View
                            style={styles[`${AppTab.displayName}-tab-container` + (x.selected ? `-selected` : ``)]}
                        >
                            <Text style={styles[`${AppTab.displayName}-tab-text` + (x.selected ? `-selected` : ``)]}>
                                {x.name}
                            </Text>
                        </View>
                    </ TouchableWithoutFeedback>
                )
            })}
        </View>
    )
}
AppTab.displayName = 'appTab';
export default AppTab;
