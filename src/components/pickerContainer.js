import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Picker, ScrollView } from 'react-native';
import { styles } from '../style';
import PropTypes from 'prop-types';
import Modal from './modal';

const componentName = 'pickerContainer';
export default function PickerContainer(props) {
    switch (props.mode) {
        case 'simple':
            return <SimplePicker {...props} />
        case 'multi':
            return <MultiPicker {...props} />;
        default:
            return <SimplePicker {...props} />
    }
}
PickerContainer.propTypes = {
    mode: PropTypes.string
}
PickerContainer.defaultProps = {
    name: 'simple'
};
export function SimplePicker(props) {
    return (
        <View style={styles[`${componentName}-container`]}>
            <Picker
                selectedValue={props.value}
                style={styles[`${componentName}-simplePicker-picker-container`]}
                onValueChange={(itemValue, itemIndex) => props.onChange(itemValue)}
            >
                {props.options.map((x,i) => <Picker.Item key={'pickerOptions'+i} label={x.label} value={x.value} />)}
            </Picker>
            <Text style={styles[`${componentName}-label`]} >
                {props.label}
            </Text>
        </View>
    )
}
SimplePicker.propTypes = {
    value: PropTypes.string,
    label: PropTypes.string,
    style: PropTypes.object,
    options: PropTypes.arrayOf(PropTypes.object),
    onChange: PropTypes.func
};
SimplePicker.defaultProps = {
    onChange: () => {}
};
export function MultiPicker(props){
    const [showOptions, updateShowOptions] = useState(false);
    const onOptionPress = (value) => {
        props.onChange()
    }
    const Options = () => {
        return props.options.map((x,i) => <Option i={i}  key={'pickerOptions'+i} value={x}  />);
    }
    const Option = (_props) => {
        console.log('_props');
        return(
            <TouchableOpacity 
                key={'pickerOptions-option'+_props.i} 
                style={styles[`${componentName}-multipicker-option-container`]}
                onPress={() => onOptionPress(_props.value.value)}
                onLongPress={() => onOptionLongPress(_props.value.value)}
            >
                <View style={{
                    width: 20,
                    height: 20,
                    borderWidth: 0.25,
                    borderColor: 'black',
                    borderRadius: 3,
                    marginRight: 20,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>

                </View>
                <Text style={styles[`${componentName}-multipicker-option-text`]}>
                    {_props.value.label}
                </Text>
            </TouchableOpacity>
        )
    }
    return (
        <TouchableOpacity style={styles[`${componentName}-container`]} onPress={() => updateShowOptions(true)}>
           <Text style={styles[`${componentName}-label`]} >
                {props.label}
            </Text>
            {showOptions && 
                <Modal onClose={() => updateShowOptions(false)}>
                    <ScrollView>
                        <Options />
                    </ScrollView>
                </Modal>
            }
        </TouchableOpacity>
    )
}
MultiPicker.propTypes = {
    value: PropTypes.array,
    style: PropTypes.object,
    options: PropTypes.arrayOf(PropTypes.object)
}