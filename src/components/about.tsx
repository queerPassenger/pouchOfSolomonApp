import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from '../style';
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
        <View style={styles[`${About.displayName}-container`]}>
            {/* {Header} */}
            <View style={styles[`${About.displayName}-sub-container`]}>
                <Text style={styles[`${About.displayName}-appName`]}>{APP.APP_NAME}</Text>
                <Text style={styles[`${About.displayName}-appVersion`]}>{`V ${APP.APP_VERSION}`}</Text>
                <Image source={require('../../assets/images/pos-splash.png')} style={styles[`${About.displayName}-logo`]} />
                <Text style={styles[`${About.displayName}-appOwner`]}>&#169;{` ${APP.APP_OWNER}`}</Text>
                <View style={styles[`${About.displayName}-credits`]}>
                    <View style={styles[`${About.displayName}-credit`]}>
                        <Text style={styles[`${About.displayName}-credit-title`]}>
                            Icons
                        </Text>
                        <Text style={styles[`${About.displayName}-credit-text`]}>
                            {APP.ICON_CREDITS}
                        </Text>
                    </View>
                    <View style={styles[`${About.displayName}-credit`]}>
                        <Text style={styles[`${About.displayName}-credit-title`]}>
                            Logo
                        </Text>
                        <Text style={styles[`${About.displayName}-credit-text`]}>
                        {APP.LOGO_CREDITS}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}
About.displayName = 'about';
export default About;
