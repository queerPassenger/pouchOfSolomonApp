import React from 'react';
import { View, Text } from 'react-native';

const tabs = [
    {
        key: 'view',
        name: 'View'
    },
    {
        key: 'analyse',
        name: 'Analyse'
    }
]
export default function AppTab(){
    return(
        <View>
            {tabs.map(x => {
                return(
                    <View key={x}>
                        <Text>
                            {x.name}
                        </Text>
                    </View>
                )
            })}
        </View>
    )
}
