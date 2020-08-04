import { Alert, AlertButton } from 'react-native';

export const showAlert = (
    title: string,
    msg: string,
    btns: Array<AlertButton>,
    cancelable?: boolean
): void => {
    Alert.alert(
        title,
        msg,
        btns,
        { cancelable }
    )
}