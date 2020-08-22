import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from '../style';

interface ContactUsProps {
    onBack: () => void,

}
const commonDisplayName = 'settingsModalChildrenPage';
const ContactUs: React.FC<ContactUsProps> = (props) => {
    const Header = (
        <View style={styles[`${commonDisplayName}-header`]}>
                <TouchableOpacity style={styles[`${commonDisplayName}-header-part1`]} onPress={props.onBack}>
                    <Text style={styles[`${commonDisplayName}-header-part1-txt`]}>
                        &#8592;
                    </Text>
                </TouchableOpacity>
                <View style={styles[`${commonDisplayName}-header-part2`]}>
                    <Text style={styles[`${commonDisplayName}-header-part2-txt`]}>
                        CONTACT US
                    </Text>
                </View>
                <View style={styles[`${commonDisplayName}-header-part3`]}></View>
            </View>
    )
    return (
        <View style={styles[`${commonDisplayName}-container`]}>
            {Header}
        </View>
    )
}
ContactUs.displayName = 'contactUs';
export default ContactUs;
