import React, { ReactElement, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { styles } from '../style';
import logger from '../utils/logger';
import AppContext, { ToastrType } from '../context/appContext';
import { URL, API_PATH, APP_DEFAULT_COLORS, ALERT_TITLE, ALERT_MSG, ALERT_BUTTON } from '../constants';
import PickerContainer, { OptionProps } from '../components/pickerContainer';
import TextInputContainer from './textInputContainer';
import { showAlert } from '../utils/alert';
import { Keyboard } from 'react-native';
import { request } from '../utils/request';
import UserContext from '../context/userContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getDate, getTime } from '../utils/calendar';
import Loader from './loader';

interface AddTransactionProps {
    onBack: (flag: boolean) => void
};
interface RecordTransactionPayloadType {
    amount: number,
    amountTypeId: number,
    comment: string,
    createdTimeStamp: string,
    lastUpdatedTimeStamp: '',
    timeStamp: string,
    transactionTypeId: number
}
const commonDisplayName = 'modalChildrenPage';
const AddTransaction: React.FC<AddTransactionProps> = (props): ReactElement => {
    const context = {
        ...useContext(AppContext),
        ...useContext(UserContext)
    };
    const loadInitialData = (): [Array<string>, Array<Array<OptionProps>>, Array<OptionProps>] => {
        let types: Array<string> = [];
        let subTypes: Array<Array<OptionProps>> = [];
        let amountTypes: Array<OptionProps> = [];
        context.transactionTypeList.map(x => {
            let matchInd = types.indexOf(x.transactionClassification.toUpperCase());
            let insertInd;
            if (matchInd === -1) {
                types.push(x.transactionClassification.toUpperCase());
                subTypes.push([]);
                insertInd = types.length - 1;
            }
            else
                insertInd = matchInd;

            subTypes[insertInd] && subTypes[insertInd].push({
                label: x.transactionTypeName,
                value: x.transactionTypeId
            });
        });
        amountTypes = context.amountTypeList.map(x => {
            return {
                value: x.amountTypeId.toString(),
                label: x.amountSymbol
            }
        })
        return [types, subTypes, amountTypes];
    }
    const [types, subTypes, amountTypes] = loadInitialData();
    const getInitialState = (key: string): { state: any } => {
        let state;
        let { add } = context.userActions.transaction;
        switch (key) {
            case 'transactionDateTime':
                state = new Date();
                break;
            case 'type':
                state = add && add.type ? add.type: types[0];
                break;
            case 'subTypeId':
                state = add && add.subTypeId ? add.subTypeId: subTypes[0][0].value.toString();
                break;
            case 'amount':
                state = '';
                break;
            case 'amountTypeId':
                state = add && add.amountTypeId ? add.amountTypeId: '49';
                break;
            case 'comment':
                state = '';
                break;
            case 'dateTimeMode':
                state;
                break;
            case 'loader':
                state = false;
                break;
        }
        return { ...{ state } };
    }
    const [transactionDateTime, updateTransactionDateTime] = useState<Date>(getInitialState('transactionDateTime').state);
    const [type, updateType] = useState<string>(getInitialState('type').state);
    const [subTypeId, updateSubTypeId] = useState<string>(getInitialState('subTypeId').state);
    const [amount, updateAmount] = useState<string>(getInitialState('amount').state);
    const [amountTypeId, updateAmountTypeId] = useState<string>(getInitialState('amountTypeId').state);
    const [comment, updateComment] = useState<string>(getInitialState('comment').state);
    const [dateTimeMode, updateDateTimeMode] = useState<any>(getInitialState('dateTimeMode').state);
    const [loader, updateLoader] = useState<boolean>(getInitialState('loader').state);
    const onReset = () => {
        updateTransactionDateTime(getInitialState('transactionDateTime').state);
        updateType(getInitialState('type').state);
        updateSubTypeId(getInitialState('subTypeId').state);
        updateAmount(getInitialState('amount').state);
        updateAmountTypeId(getInitialState('amountTypeId').state);
        updateComment(getInitialState('comment').state);
        updateDateTimeMode(getInitialState('dateTimeMode').state);
    }
    const isPreReqMet = () => {
        if (amount.trim() === '' || comment.trim() === '') {
            showAlert(
                ALERT_TITLE.WARNING,
                ALERT_MSG.UNMET_ADD_TRANSACTION,
                [
                    {
                        text: ALERT_BUTTON.OK
                    }
                ]
            );
        }
        else
            return true;
    }
    const proceedToAdd = async (): Promise<boolean> => {
        let _userActions = context.userActions;
        let addParams = {
            type,
            subTypeId,
            amountTypeId
        };
        _userActions['transaction']['add'] = addParams;
        context.updateUserActions(_userActions);
        AsyncStorage.setItem('user-actions-transaction-add', JSON.stringify(addParams));
        let body: Array<RecordTransactionPayloadType> = [{
            amount: +amount,
            amountTypeId: +amountTypeId,
            comment,
            createdTimeStamp: new Date().toISOString(),
            lastUpdatedTimeStamp: '',
            timeStamp: transactionDateTime.toISOString(),
            transactionTypeId: +subTypeId
        }];
        try {
            let response = await request.post(URL.API_URL + API_PATH.ADD_TRANSACTION.replace('{id}', context.userId), body, {})
            if (response && response.status && response.type === 'json' && response.data) {
                if (response.data.status) {
                    return true;
                }
            }
            return false;
        }
        catch (err) {
            logger.warn('Error proceedToAdd' + err.toString())
            return false
        }
    }
    const onAdd = async () => {
        Keyboard.dismiss();
        if (isPreReqMet()) {
            updateLoader(true);
            const flag = await proceedToAdd();
            updateLoader(false);
            if (flag) {
                props.onBack(true);
                const toastr = {
                    id: Date.now(),
                    msg: ALERT_MSG.SUCCESS_ADD_TRANSACTION,
                    color: 'white',
                    backgroundColor: 'green'
                };
                context.updateToastr((toastrI: Array<ToastrType>) => [...toastrI, toastr]);
                setTimeout(() => {
                    context.updateToastr((toastrI: Array<ToastrType>) => toastrI.filter(x => x.id!== toastr.id));
                }, 2000);
            }
            else
                showAlert(
                    ALERT_TITLE.FAILURE,
                    ALERT_MSG.FAILED_REQUEST,
                    [
                        {
                            text: ALERT_BUTTON.OK
                        }
                    ]
                );
        }
    }
    const Header = (): ReactElement => {
        return (
            <View style={styles[`${commonDisplayName}-header`]}>
                <TouchableOpacity style={styles[`${commonDisplayName}-header-part1`]} onPress={() => props.onBack(false)}>
                    <Text style={styles[`${commonDisplayName}-header-part1-txt`]}>
                        &#8592;
                    </Text>
                </TouchableOpacity>
                <View style={styles[`${commonDisplayName}-header-part2`]}>
                    <Text style={styles[`${commonDisplayName}-header-part2-txt`]}>
                        ADD TRANSACTION
                    </Text>
                </View>
                <TouchableOpacity style={styles[`${commonDisplayName}-header-part3`]} onPress={onReset}>
                    <Text style={styles[`${commonDisplayName}-header-part3-txt`]}>
                        &#8634;
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles[`${commonDisplayName}-header-part4`]} onPress={onAdd}>
                    <Text style={styles[`${commonDisplayName}-header-part4-txt`]}>
                        &#10003;
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
    const getDateTime = (date: Date) => {
        return `${getDate(date)}  ${getTime(date)} `
    }
    const Body = (): ReactElement => {
        let matchInd = types.indexOf(type);
        return (
            <View style={styles[`${commonDisplayName}-body`]}>
                <View style={styles[`${commonDisplayName}-body-part1`]}>
                    {types.map((x: string, ind: number) => {
                        let selected = type === x;
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
                                    updateType(x);
                                    updateSubTypeId(subTypes[ind][0].value);
                                }}
                            >
                                <Text style={{
                                    ...styles[`${commonDisplayName}-body-part1-sub-txt`],
                                    ...(selected && {
                                        color: APP_DEFAULT_COLORS.APP_COLOR,
                                        fontWeight: 'bold'
                                    })
                                }}>{x}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
                <View style={styles[`${commonDisplayName}-body-part`]}>
                    <TouchableOpacity style={styles[`${commonDisplayName}-body-part-sub-box`]} onPress={() => updateDateTimeMode('date')}>
                        <Text>
                            {getDateTime(transactionDateTime)}
                        </Text>
                        <Text style={styles[`${commonDisplayName}-body-part-sub-box-label`]} >
                            {`DATE & TIME`}
                        </Text>
                    </TouchableOpacity>
                    {dateTimeMode &&
                        <DateTimePicker
                            value={transactionDateTime}
                            mode={dateTimeMode}
                            onChange={(e, date) => {
                                updateDateTimeMode(undefined);
                                if (date) {
                                    let futureDateTimeMode = dateTimeMode === 'date' ? 'time' : undefined;
                                    updateTransactionDateTime(date);
                                    setTimeout(() => {
                                        updateDateTimeMode(futureDateTimeMode)
                                    }, 10);
                                }
                            }}
                        />
                    }
                </View>
                <View style={styles[`${commonDisplayName}-body-part`]}>
                    <PickerContainer
                        mode='simple'
                        label='SUB TYPE'
                        value={subTypeId}
                        options={matchInd === -1 ? [] : subTypes[matchInd]}
                        onChange={value => updateSubTypeId(value)}
                    />
                </View>
                <View style={styles[`${commonDisplayName}-body-part`]}>
                    <PickerContainer
                        mode='simple'
                        label='CURRENCY'
                        value={amountTypeId}
                        options={amountTypes}
                        onChange={value => updateAmountTypeId(value)}
                    />
                </View>
                <View style={styles[`${commonDisplayName}-body-part`]}>
                    <TextInputContainer
                        mode='decimal'
                        label='AMOUNT'
                        value={amount}
                        onChange={value => updateAmount(value)}
                    />
                </View>
                <View style={styles[`${commonDisplayName}-body-part`]}>
                    <TextInputContainer
                        mode='textarea'
                        label='COMMENT'
                        value={comment}
                        onChange={value => updateComment(value)}
                    />
                </View>
            </View>
        )
    }
    return (
        <View style={styles[`${commonDisplayName}-container`]}>
            {Header()}
            <ScrollView>
                {Body()}
            </ScrollView>
            {loader && <Loader />}
        </View>
    )
}
AddTransaction.displayName = 'addTransaction';
export default AddTransaction;