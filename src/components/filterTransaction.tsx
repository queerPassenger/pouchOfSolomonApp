import React, { useState, useContext, ReactElement, useEffect, Fragment } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { styles } from '../style';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getDate, getTime } from '../utils/calendar';
import PickerContainer from './pickerContainer';
import AppContext from '../context/appContext';
import { APP_DEFAULT_COLORS } from '../constants';

interface FilterTransactionProps {
    fromDate: Date;
    toDate: Date;
    types: Array<any>;
    subTypes: Array<any>;
    reset: () => void;
    onFilter: (param: FilterParamsType) => void;
    onBack: () => void;
}
export interface FilterParamsType {
    fromDate: Date;
    toDate: Date;
    types: Array<any>;
    subTypes: Array<any>;
}

const commonDisplayName = 'modalChildrenPage';
const FilterTransaction: React.FC<FilterTransactionProps> = (props): ReactElement => {
    const [fromDate, updateFromDate] = useState<Date>(props.fromDate);
    const [toDate, updateToDate] = useState<Date>(props.toDate);
    const [types, updateTypes] = useState<Array<any>>(props.types);
    const [subTypes, updateSubTypes] = useState<Array<any>>(props.subTypes);
    const [dateTimeMode, updateDateTimeMode] = useState<Array<any>>([undefined, undefined]);
    const context = {
        ...useContext(AppContext)
    };
    useEffect(() => {
        updateFromDate(props.fromDate);
        updateToDate(props.toDate);
        updateTypes(props.types);
        updateSubTypes(props.subTypes);
    }, [props.fromDate,props.toDate, props.types, props.subTypes]);

    const resetStates = (param: string) => {
        switch (param) {
            case 'filterParams':
                props.reset();
                break;
            case 'dateTimeMode':
                updateDateTimeMode([undefined, undefined]);
                break;
            default:
                resetStates('filterParams');
                resetStates('dateTimeMode');
                break;
        }
    }
    const onFilter = () => {
        props.onFilter({ fromDate, toDate, types, subTypes });
    }
    const getDateTime = (date: Date) => {
        return `${getDate(date)}  ${getTime(date)} `
    }
    const Header = (): ReactElement => {
        return (
            <View style={styles[`${commonDisplayName}-header`]}>
                <TouchableOpacity style={styles[`${commonDisplayName}-header-part1`]} onPress={() => props.onBack()}>
                    <Text style={styles[`${commonDisplayName}-header-part1-txt`]}>
                        &#8592;
                    </Text>
                </TouchableOpacity>
                <View style={styles[`${commonDisplayName}-header-part2`]}>
                    <Text style={styles[`${commonDisplayName}-header-part2-txt`]}>
                        FILTER TRANSACTION
                    </Text>
                </View>
                <TouchableOpacity style={styles[`${commonDisplayName}-header-part3`]} onPress={() => resetStates('all')}>
                    <Text style={styles[`${commonDisplayName}-header-part3-txt`]}>
                        &#8634;
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles[`${commonDisplayName}-header-part4`]} onPress={onFilter}>
                    <Text style={styles[`${commonDisplayName}-header-part4-txt`]}>
                        &#10003;
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
    const Body = () => {
        return (
            <View style={styles[`${commonDisplayName}-body`]}>
                <View style={styles[`${commonDisplayName}-body-part1`]}>
                    {context.transactionTypes.map((x: string, ind: number) => {
                        let matchInd = types.indexOf(x);
                        let selected = matchInd !== -1;
                        return (
                            <TouchableOpacity
                                key={x}
                                style={{
                                    ...styles[`${commonDisplayName}-body-part1-sub`],
                                    ...(selected && {
                                        borderBottomColor: APP_DEFAULT_COLORS.APP_COLOR,
                                        borderBottomWidth: 2
                                    })
                                }}
                                onPress={() => {
                                    if(selected){
                                        updateTypes(types.filter(t => t!== x));
                                    }
                                    else{
                                        updateTypes([...types, x]);
                                    }
                                    
                                }}
                            >
                                <Text style={{
                                    ...styles[`${commonDisplayName}-body-part1-sub-txt`],
                                    ...(selected && {
                                        color: APP_DEFAULT_COLORS.APP_COLOR,
                                        fontWeight: 'bold'
                                    })
                                }}>{x.toUpperCase()}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
                <View style={styles[`${commonDisplayName}-body-part`]}>
                    <PickerContainer
                        mode='multi'
                        label='SUB TYPE'
                        value={subTypes}
                        options={context.transactionTypeList.map(x => ({
                            label: x.transactionTypeName, 
                            value: x.transactionTypeId,
                            ...(x.color && {color: x.color})
                        }))}
                        onChange={value => updateSubTypes(value)}
                    />
                 </View>
                <Fragment>
                    <View style={styles[`${commonDisplayName}-body-part`]}>
                        <TouchableOpacity style={styles[`${commonDisplayName}-body-part-sub-box`]} onPress={() => updateDateTimeMode(['fromDate', 'date'])}>
                            <Text>
                                {getDateTime(fromDate)}
                            </Text>
                            <Text style={styles[`${commonDisplayName}-body-part-sub-box-label`]} >
                                {`FROM DATE & TIME`}
                            </Text>
                        </TouchableOpacity>
                        
                    </View>
                    <View style={styles[`${commonDisplayName}-body-part`]}>
                        <TouchableOpacity style={styles[`${commonDisplayName}-body-part-sub-box`]} onPress={() => updateDateTimeMode(['toDate', 'date'])}>
                            <Text>
                                {getDateTime(toDate)}
                            </Text>
                            <Text style={styles[`${commonDisplayName}-body-part-sub-box-label`]} >
                                {`TO DATE & TIME`}
                            </Text>
                        </TouchableOpacity>
                        
                    </View>
                    {dateTimeMode[0] && dateTimeMode[1] &&
                        <DateTimePicker
                            value={dateTimeMode[0] === 'fromDate'? fromDate: toDate}
                            mode={dateTimeMode[1]}
                            onChange={(e, date) => {
                                let futureDateTimeMode1 = dateTimeMode[1] === 'date' ? 'time' : undefined;
                                let futureDateTimeMode0 = dateTimeMode[1] ? dateTimeMode[0]: undefined;
                                updateDateTimeMode([undefined, undefined]);
                                if (date) {          
                                    dateTimeMode[0] === 'fromDate'? updateFromDate(date): updateToDate(date);
                                    setTimeout(() => {
                                        updateDateTimeMode([futureDateTimeMode0, futureDateTimeMode1]);
                                    }, 10);
                                }
                            }}
                        />
                    }
                </Fragment>
                 
            </View>
        )
    }
    return (
        <View style={styles[`${FilterTransaction.displayName}-container`]}>
            {Header()}
            <ScrollView>
                {Body()}
            </ScrollView>            
        </View>
    )
}
FilterTransaction.displayName = 'filterTransaction';
export default FilterTransaction;