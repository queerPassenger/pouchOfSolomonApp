import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { copyToClipboard } from '../utils/copyToClipboard';
import { styles } from '../style';
import { APP } from '../constants';

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
            <View style={styles[`${ContactUs.displayName}-container`]}>
                <View style={styles[`${ContactUs.displayName}-details-super-container`]}>
                    <View style={styles[`${ContactUs.displayName}-details-container`]}>
                        <Text style={styles[`${ContactUs.displayName}-details-text`]}>
                            {APP.EMAIL_SUPPORT}
                        </Text>
                        <TouchableOpacity onPress={() => copyToClipboard(APP.EMAIL_SUPPORT.toString())}>
                            <Text style={styles[`${ContactUs.displayName}-details-copy`]}>
                                Copy
                            </Text>
                        </TouchableOpacity>                            
                        <Text style={styles[`${ContactUs.displayName}-details-label`]}>
                            MAIL SUPPORT
                        </Text>
                    </View>
                </View>
            </View>
        </View >
    )
}
ContactUs.displayName = 'contactUs';
export default ContactUs;
