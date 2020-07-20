import React, { Fragment, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Picker } from 'react-native';
import { styles } from '../style';
import DateTimePicker from '@react-native-community/datetimepicker'
import { getDate, getTime } from '../utils/calendar';
import PickerContainer from './pickerContainer';
import { AppContext } from '../context/appContext';

export default function FilterTransaction(props) {
    const componentName = 'filterTransaction';
    const [fromDate, updateFromDate] = useState(props.fromDate);
    const [toDate, updateToDate] = useState(props.toDate);
    const [types, updateTypes] = useState([]);
    const [subTypes, updateSubTypes] = useState([]);
    const [dateTimePickerMode, updateDateTimePickerMode] = useState({
        mode: '',
        type: '',
        update: () => { }
    });
    const context = {
        ...useContext(AppContext)
    };
    const resetStates = (param) => {
        switch (param) {
            case 'fromDate':
                updateFromDate(props.fromDate);
                break;
            case 'toDate':
                updateToDate(props.toDate);
                break;
            case 'dateTimePickerMode':
                updateDateTimePickerMode({
                    mode: '',
                    type: '',
                    update: () => { }
                });
                break;
            default:
                resetStates('fromDate');
                resetStates('toDate');
                resetStates('dateTimePickerMode');
                break;
        }
    }
    const onFilter = () => {
        props.onFilter({ fromDate, toDate });
    }
    const ActionContainer = () => {
        return (
            <View style={styles[`${componentName}-action-container`]}>
                <ButtonContainer
                    label='CLEAR'
                    onPress={resetStates}
                />
                <ButtonContainer
                    label='FILTER'
                    onPress={onFilter}
                />
            </View>
        )
    }
    const ButtonContainer = (props) => {
        return (
            <TouchableOpacity style={styles[`${componentName}-btn-container`]} onPress={props.onPress}>
                <Text style={styles[`${componentName}-btn-text`]}>
                    {props.label}
                </Text>
            </TouchableOpacity>
        )
    }
    const DateContainer = (props) => {
        return (
            <View style={styles[`${componentName}-date-container`]} >
                <View style={styles[`${componentName}-datetime-container`]} >
                    <Text style={styles[`${componentName}-datetime-text`]} >
                        {getDateTime(props.date)}
                    </Text>
                    <Text style={styles[`${componentName}-text-label`]} >
                        {props.label}
                    </Text>
                </View>
                <TouchableOpacity onPress={() => props.updater('date')}>
                    <Image style={styles[`${componentName}-datetime-image`]} source={require('../assets/images/calendar.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.updater('time')}>
                    <Image style={styles[`${componentName}-datetime-image`]} source={require('../assets/images/clock.png')} />
                </TouchableOpacity>
            </View>
        )
    }
    const getDateTime = (date) => {
        return `${getDate(date)}  ${getTime(date)} `
    }
    const DateSuperContainer = () => {
        return (
            <View style={styles[`${componentName}-date-super-container`]}>
                <DateContainer
                    date={fromDate}
                    label='START'
                    updater={(mode) => updateDateTimePickerMode({
                        mode: mode,
                        type: 'fromDate',
                        update: updateFromDate
                    })}
                />
                <DateContainer
                    date={toDate}
                    label='END'
                    updater={(mode) => updateDateTimePickerMode({
                        mode: mode,
                        type: 'toDate',
                        update: updateToDate
                    })}
                />
                {dateTimePickerMode.mode ?
                    (<DateTimePicker
                        value={dateTimePickerMode.type === 'fromDate' ? fromDate : toDate}
                        mode={dateTimePickerMode.mode}
                        is24Hour={true}
                        display="default"
                        onChange={(e, date) => {
                            const { update } = dateTimePickerMode;
                            resetStates('dateTimePickerMode');
                            date && update(date);
                        }}
                    />)
                    :
                    null
                }
            </View>
        )
    }
    const TransactionType = (props) => {
        return (
            <View style={styles[`${componentName}-picker-wrapper`]}>
                <PickerContainer
                    label='TYPE'
                    value={types && types[0] || ''}
                    options={context.transactionTypes.map(x => {
                        return { label: x, value: x }
                    })}
                    onChange={value => updateTypes([value])}
                />
            </View>
        )
    }
    const TransactionSubType = (props) => {
        return (
            <View style={styles[`${componentName}-picker-wrapper`]}>
                <PickerContainer
                    mode='multi'
                    label='SUB TYPE'
                    value={types}
                    options={context.transactionTypeList.map(x => {
                        return { label: x.transactionTypeName, value: x.transactionTypeId }
                    })}
                    onChange={value => updateTypes(value)}
                />
            </View>
        )
    }
    const FilterContainer = () => {
        return (
            <Fragment>
                <ScrollView>
                    <DateSuperContainer />
                    <TransactionType />
                    <TransactionSubType />
                </ScrollView>
            </Fragment>
        )
    }
    return (
        <View style={styles[`${componentName}-container`]}>
            <ActionContainer />
            <FilterContainer />
        </View>
    )
}