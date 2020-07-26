import React, { useState, useContext, ReactElement } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { styles } from '../style';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getDate, getTime } from '../utils/calendar';
import PickerContainer from './pickerContainer';
import AppContext from '../context/appContext';

export interface FeedBackProps {
    fromDate: Date,
    toDate: Date,
    types?: Array<any>,
    subTypes?: Array<any>
}
interface FilterTransactionProps {
    fromDate: Date,
    toDate: Date,
    onFilter: (param: FeedBackProps) => void
}
interface ButtonContainerProps {
    label: string,
    onPress: (param: any) => void
}
interface DateContainerProps {
    label: string,
    date: Date,
    updater: (mode: DTPModeType) => void
}
type DTPModeType = 'time' | 'date' | 'datetime' | 'countdown' | undefined;
interface DateTimePickerModeType {
    mode: 'time' | 'date' | 'datetime' | 'countdown' | undefined,
    type: string,
    update: (date: Date) => void
}
const FilterTransaction: React.FC<FilterTransactionProps> = (props): ReactElement => {
    const [fromDate, updateFromDate] = useState<Date>(props.fromDate);
    const [toDate, updateToDate] = useState<Date>(props.toDate);
    const [types, updateTypes] = useState<Array<any>>([]);
    const [subTypes, updateSubTypes] = useState<Array<any>>([]);
    const [dateTimePickerMode, updateDateTimePickerMode] = useState<DateTimePickerModeType>({
        mode: undefined,
        type: '',
        update: () => { }
    });
    const context = {
        ...useContext(AppContext)
    };
    const resetStates = (param: string) => {
        switch (param) {
            case 'fromDate':
                updateFromDate(props.fromDate);
                break;
            case 'toDate':
                updateToDate(props.toDate);
                break;
            case 'dateTimePickerMode':
                updateDateTimePickerMode({
                    mode: undefined,
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
    const ButtonContainer = (buttonProps: ButtonContainerProps) => {
        return (
            <TouchableOpacity style={styles[`${FilterTransaction.displayName}-btn-container`]} onPress={buttonProps.onPress}>
                <Text style={styles[`${FilterTransaction.displayName}-btn-text`]}>
                    {buttonProps.label}
                </Text>
            </TouchableOpacity>
        )
    }
    const ActionContainer = () => {
        return (
            <View style={styles[`${FilterTransaction.displayName}-action-container`]}>
                {ButtonContainer({
                    label: 'CLEAR',
                    onPress: resetStates
                })}
                {ButtonContainer({
                    label: 'FILTER',
                    onPress: onFilter
                })}
            </View>
        )
    }
    const getDateTime = (date: Date) => {
        return `${getDate(date)}  ${getTime(date)} `
    }
    const DateContainer = (dateContainerProps: DateContainerProps) => {
        return (
            <View style={styles[`${FilterTransaction.displayName}-date-container`]} >
                <View style={styles[`${FilterTransaction.displayName}-datetime-container`]} >
                    <Text style={styles[`${FilterTransaction.displayName}-datetime-text`]} >
                        {getDateTime(dateContainerProps.date)}
                    </Text>
                    <Text style={styles[`${FilterTransaction.displayName}-text-label`]} >
                        {dateContainerProps.label}
                    </Text>
                </View>
                <TouchableOpacity onPress={() => dateContainerProps.updater('date')}>
                    <Image style={styles[`${FilterTransaction.displayName}-datetime-image`]} source={require('../../assets/images/calendar.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => dateContainerProps.updater('time')}>
                    <Image style={styles[`${FilterTransaction.displayName}-datetime-image`]} source={require('../../assets/images/clock.png')} />
                </TouchableOpacity>
            </View>
        )
    }

    const DateSuperContainer = () => {
        return (
            <View style={styles[`${FilterTransaction.displayName}-date-super-container`]}>
                {DateContainer({
                    label: 'START',
                    date: fromDate,
                    updater: (mode: DTPModeType) => updateDateTimePickerMode({
                        mode: mode,
                        type: 'fromDate',
                        update: (date: Date) => updateFromDate(date)
                    })
                })}
                {DateContainer({
                    label: 'END',
                    date: toDate,
                    updater: (mode: DTPModeType) => updateDateTimePickerMode({
                        mode: mode,
                        type: 'toDate',
                        update: (date: Date) => updateToDate(date)
                    })
                })}
                {dateTimePickerMode.mode ?
                    (<DateTimePicker
                        value={dateTimePickerMode.type === 'fromDate' ? fromDate : toDate}
                        mode={dateTimePickerMode.mode}
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
    const TransactionType = () => {
        return (
            <View style={styles[`${FilterTransaction.displayName}-picker-wrapper`]}>
                <PickerContainer
                    mode='multi'
                    label='TYPE'
                    value={types}
                    options={context.transactionTypes.map(x => {
                        return { label: x, value: x }
                    })}
                    onChange={value => updateTypes(value)}
                />
            </View>
        )
    }
    const TransactionSubType = () => {
        return (
            <View style={styles[`${FilterTransaction.displayName}-picker-wrapper`]}>
                <PickerContainer
                    mode='multi'
                    label='SUB TYPE'
                    value={subTypes}
                    options={context.transactionTypeList.map(x => {
                        return { label: x.transactionTypeName, value: x.transactionTypeId }
                    })}
                    onChange={value => updateSubTypes(value)}
                />
            </View>
        )
    }
    const FilterContainer = () => {
        return (
            <ScrollView>
                {DateSuperContainer()}
                {TransactionType()}
                {TransactionSubType()}
            </ScrollView>
        )
    }
    return (
        <View style={styles[`${FilterTransaction.displayName}-container`]}>
            {ActionContainer()}
            {FilterContainer()}
        </View>
    )
}
FilterTransaction.displayName = 'filterTransaction';
export default FilterTransaction;