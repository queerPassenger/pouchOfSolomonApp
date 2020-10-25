import React, { useState, ReactElement } from 'react';
import { View, TouchableOpacity, Text, Picker, ScrollView } from 'react-native';
import { styles } from '../style';
import Modal from './modal';
import { APP_DEFAULT_COLORS } from '../constants';
import logger from '../utils/logger';

interface PickerContainerProps {
    mode: ('simple' | 'multi')
    value: string | Array<any>,
    label: string,
    style?: any,
    options: Array<OptionProps>,
    onChange: (value: any) => void
}
export interface OptionProps {
    value: string,
    label: string,
    color?: string
}
interface OptionMethodProps {
    i: number,
    value: OptionProps
}
const displayName = 'pickerContainer';

const SimplePicker: React.FC<PickerContainerProps> = (props): ReactElement => {
    return (
        <View style={styles[`${displayName}-container`]}>
            <Picker
                selectedValue={props.value}
                style={styles[`${displayName}-simplePicker-picker-container`]}
                onValueChange={(itemValue, itemIndex) => props.onChange(itemValue)}
            >
                {props.options.map((x, i) => <Picker.Item key={'pickerOptions' + i} label={x.label} value={x.value} />)}
            </Picker>
            <Text style={styles[`${displayName}-label`]} >
                {props.label}
            </Text>
        </View>
    )
}
const MultiPicker: React.FC<PickerContainerProps> = (props): ReactElement => {
    const [showOptions, updateShowOptions] = useState(false);
    const [selectAll, updateSelectAll] = useState(true);
    const onOptionPress = (selectedValue: string) => {
        if (Array.isArray(props.value)) {
            let values = [...props.value];
            const ind = values.indexOf(selectedValue);
            if (ind === -1) {
                values.push(selectedValue);
            }
            else {
                values.splice(ind, 1);
            }
            props.onChange(values);
        }
    }
    const onOptionLongPress = () => {
        if (Array.isArray(props.value)) {
            let values = [...props.value];
            if (selectAll)
                values = props.options.map(x => x.value);
            else
                values = [];
            updateSelectAll(!selectAll);
            props.onChange(values);
        }
    }
    const option = (_props: OptionMethodProps) => {
        return (
            <TouchableOpacity
                key={'pickerOptions-option' + _props.i}
                style={styles[`${displayName}-multipicker-option-container`]}
                onPress={() => onOptionPress(_props.value.value)}
                onLongPress={() => onOptionLongPress()}
            >
                <View style={{
                    width: 20,
                    height: 20,
                    borderWidth: 0.25,
                    borderColor: 'black',
                    borderRadius: 3,
                    marginRight: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    ...(props.value.indexOf(_props.value.value) !== -1 && { backgroundColor: APP_DEFAULT_COLORS.APP_COLOR })
                }}>

                </View>
                <Text 
                    style={{
                        ...styles[`${displayName}-multipicker-option-text`],
                        ...(_props.value.color && {color: _props.value.color})
                    }}
                >
                    {_props.value.label}
                </Text>
            </TouchableOpacity>
        )
    }
    const options = () => {
        return props.options.map((x, i) => option({ i, value: x }));
    }
    return (
        <TouchableOpacity style={styles[`${displayName}-multipicker-container`]} onPress={() => updateShowOptions(true)}>
            <Text style={styles[`${displayName}-multipicker-selected-text`]} numberOfLines={1}>
                {props.options.filter(x => props.value.indexOf(x.value) !== -1).map(x => x.label).join(', ')}
            </Text>
            <Text style={styles[`${displayName}-label`]} >
                {props.label}
            </Text>            
            {showOptions &&
                <Modal onClose={() => updateShowOptions(false)}>
                    <ScrollView>
                        {options()}
                    </ScrollView>
                </Modal>
            }
        </TouchableOpacity>
    )
}

const PickerContainer: React.FC<PickerContainerProps> = (props): ReactElement => {
    switch (props.mode) {
        case 'simple':
            return <SimplePicker {...props} />
        case 'multi':
            return <MultiPicker {...props} />;
        default:
            return <SimplePicker {...props} />
    }
}
export default PickerContainer;