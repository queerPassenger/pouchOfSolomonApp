import React, { ReactElement } from 'react';
import { View, Image } from 'react-native';
import { styles } from '../style';

const AppImage: React.FC = (): ReactElement => {
    return(
        <View style={styles[`${AppImage.displayName}-container`]}>
          <Image source={require('../assets/images/pos-logo-large.png')} style={styles[`${AppImage.displayName}-logo`]} />
        </View>
    )
}
AppImage.displayName = 'appImage';
export default AppImage;