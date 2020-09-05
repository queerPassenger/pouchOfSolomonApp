import React, { ReactElement } from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { styles  } from '../style';

interface LoaderProps{
    color?: string,
    size?: number | 'large' | 'small' | undefined
}
const Loader: React.FC<LoaderProps> = (props) : ReactElement => {
    return(
        <View style={styles[`${Loader.displayName}-container`]}>
            <ActivityIndicator size={props.size} color={props.color}/>
        </View>
    )
}
Loader.displayName = 'loader';
Loader.defaultProps = {
    color: 'gray',
    size: 'large'
}
export default Loader;