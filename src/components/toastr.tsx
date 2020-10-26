import React, { ReactElement, useContext } from 'react';
import { View, Text } from 'react-native';
import UserContext from '../context/userContext';
import AppContext from '../context/appContext';
import { styles } from '../style';

const Toastr: React.FC = (): ReactElement => {
    const context = {
        ...useContext(UserContext),
        ...useContext(AppContext)
    };
    const DefaultContent = (content: any, index: number) => (
        <View
            style={{
                ...styles[`${Toastr.displayName}-content-container`],
                ...(content.backgroundColor && {backgroundColor: content.backgroundColor}),
                
            }}
            key={`default-content-${index}`}
        >
            <Text 
                style={{
                    ...(content.color && {color: content.color}),
                    textAlign: 'center',
                    flexWrap: 'wrap'
                }}
            >
                {content.msg}
            </Text>
        </View>
    )
    return <View style={styles[`${Toastr.displayName}-container`]}>
        {context.toastr.map((x, ind) => DefaultContent(x, ind))}
    </View>
}
Toastr.displayName = 'toastr';
export default Toastr;