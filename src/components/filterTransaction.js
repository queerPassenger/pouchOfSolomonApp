import React, { Fragment, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { styles } from '../style';
import DateTimePicker from '@react-native-community/datetimepicker'
import { getDate, getTime } from '../utils/calendar';

export default function FilterTransaction(props) {
    const componentName = 'filterTransaction';
    const [fromDate, updateFromDate] = useState(props.fromDate);
    const [toDate, updateToDate] = useState(props.toDate);
    const [dateTimePickerMode, updateDateTimePickerMode] = useState({
        mode: '',
        type: '',
        update: () => { }
    });

    const onFilter = () => {
        props.onFilter({ fromDate, toDate });
    }
    const ActionContainer = () => {
        return (
            <View style={styles[`${componentName}-action-container`]}>
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
        return `${getDate(date)}  < ${getTime(date)} >`
    }
    const DateSuperContainer = () => {
        return (
            <View style={styles[`${componentName}-date-super-container`]}>
                <DateContainer date={fromDate} updater={(mode) => updateDateTimePickerMode({
                    mode: mode,
                    type: 'fromDate',
                    update: updateFromDate
                })} />
                <Text style={styles[`${componentName}-date-seaprator-text`]}>
                    to
                </Text>
                <DateContainer date={toDate} updater={(mode) => updateDateTimePickerMode({
                    mode: mode,
                    type: 'toDate',
                    update: updateToDate
                })} />
                {dateTimePickerMode.mode ?
                    (<DateTimePicker
                        value={dateTimePickerMode.type === 'fromDate'? fromDate: toDate}
                        mode={dateTimePickerMode.mode}
                        is24Hour={true}
                        display="default"
                        onChange={(e, date) => {
                            const { update } = dateTimePickerMode;
                            updateDateTimePickerMode({
                                mode: '',
                                type: '',
                                update: () => { }
                            });
                            date && update(date);
                        }}
                    />)
                    :
                    null}
            </View>
        )
    }
    const FilterContainer = () => {
        return (
            <Fragment>
                <ScrollView>
                    <DateSuperContainer />
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