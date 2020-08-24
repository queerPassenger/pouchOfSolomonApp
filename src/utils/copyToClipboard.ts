import { Clipboard } from 'react-native';

export const copyToClipboard = (txt: string) => {
    Clipboard.setString(txt);
}
