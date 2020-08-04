import React, { ReactElement, Fragment } from 'react';
import { View, Text, TextInput, TextInputProps, ScrollView } from 'react-native';
import { styles } from '../style';

interface TextInputContainerProps {
    mode: string,
    placeholder?: string,
    value: string,
    label: string,
    onChange: (value: string) => void
}

const TextInputContainer: React.FC<TextInputContainerProps> = (props): ReactElement => {
    const getProps = (): TextInputProps => {
        switch(props.mode){
            case 'decimal':
                return {
                    style: {flex: 1},
                    onChangeText: onChange,
                    keyboardType: 'numeric',
                    multiline: false,
                    value: props.value
                };
            case 'numeric':
                return {
                    style: {flex: 1},
                    onChangeText: onChange,
                    keyboardType: 'numeric',
                    multiline: false,
                    value: props.value
                }
            case 'textarea':
                return {
                    style: {flex: 1},
                    onChangeText: onChange,
                    keyboardType: 'default',
                    multiline: true,
                    value: props.value
                }
            default:
                return {
                    style: {flex: 1},
                    onChangeText: onChange,
                    keyboardType: 'default',
                    multiline: false,
                    value: props.value
                }
        }
    }
    const onChange = (text: string) => {
        let updatedValue = '';
        switch(props.mode){
            case 'decimal':
            case 'numeric':
                updatedValue = text;
            default:
                updatedValue = text;
        }
        return props.onChange(text);
    }
    const prop = getProps();
    return (
        <View style={{
            ...styles[`${TextInputContainer.displayName}-container`],
            ...(props.mode === 'textarea' && {height: 100}),
        }} >
            <ScrollView>
                <TextInput
                    {...prop} 
                />
            </ScrollView>
                   
            <Text style={{
                ...styles[`${TextInputContainer.displayName}-label`],
                ...(props.mode === 'textarea' && {bottom: 92})
            }} >
                {props.label}
            </Text>
        </View>
    )
}
TextInputContainer.displayName = 'textInputContainer';
export default TextInputContainer;