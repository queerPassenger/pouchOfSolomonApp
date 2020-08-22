import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from '../style';
import AppImage from './appImage';
import { APP } from '../constants';

interface AboutProps {
    onBack: () => void
}
const commonDisplayName = 'settingsModalChildrenPage';
const About: React.FC<AboutProps> = (props) => {
    const Header = (
        <View style={styles[`${commonDisplayName}-header`]}>
                <TouchableOpacity style={styles[`${commonDisplayName}-header-part1`]} onPress={props.onBack}>
                    <Text style={styles[`${commonDisplayName}-header-part1-txt`]}>
                        &#8592;
                    </Text>
                </TouchableOpacity>
                <View style={styles[`${commonDisplayName}-header-part2`]}>
                    <Text style={styles[`${commonDisplayName}-header-part2-txt`]}>
                        ABOUT
                    </Text>
                </View>
                <View style={styles[`${commonDisplayName}-header-part3`]}></View>
            </View>
    );
    return (
        <View style={styles[`${commonDisplayName}-container`]}>
            {/* {Header} */}
            <Image source={require('../../assets/images/pos-splash.png')} style={styles[`${About.displayName}-logo`]} />
            <Text>{APP.APP_NAME}</Text>
        </View>
    )
}
About.displayName = 'about';
export default About;
