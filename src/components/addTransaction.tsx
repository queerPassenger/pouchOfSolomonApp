import React, { ReactElement, useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { styles } from '../style';
import logger from '../utils/logger';
import AppContext from '../context/appContext';
import { URL, API_PATH, APP_DEFAULT_COLORS, ALERT_TITLE, ALERT_MSG, ALERT_BUTTON } from '../constants';
import PickerContainer, { OptionProps } from '../components/pickerContainer';
import TextInputContainer from './textInputContainer';
import { showAlert } from '../utils/alert';
import { Keyboard } from 'react-native';
import { request } from '../utils/request';
import UserContext from '../context/userContext';

interface AddTransactionProps {
    onBack: (flag: boolean) => void
};
interface RecordTransactionPayloadType {
    amount: number,
    amountTypeId: number,
    comment: string,
    createdTimeStamp: string,
    lastUpdatedTimeStamp: string,
    timeStamp: string,
    transactionTypeId: number
}

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
        switch (key) {
            case 'transactionDateTime':
                state = new Date();
                break;
            case 'type':
                state = types[0];
                break;
            case 'subTypeId':
                state = subTypes[0][0].value.toString();
                break;
            case 'amount':
                state = '';
                break;
            case 'amountTypeId':
                state = '49';
                break;
            case 'comment':
                state = '';
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

    const onReset = () => {
        updateTransactionDateTime(getInitialState('transactionDateTime').state);
        updateType(getInitialState('type').state);
        updateSubTypeId(getInitialState('subTypeId').state);
        updateAmount(getInitialState('amount').state);
        updateAmountTypeId(getInitialState('amountTypeId').state);
        updateComment(getInitialState('comment').state);
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
            context.showLoader();
            const flag = await proceedToAdd();
            context.hideLoader();
            if (flag) {
                showAlert(
                    ALERT_TITLE.SUCCESS,
                    ALERT_MSG.SUCCESS_ADD_TRANSACTION,
                    [
                        {
                            text: ALERT_BUTTON.OK,
                            onPress: () => props.onBack(true)
                        }
                    ]
                );

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
            <View style={styles[`${AddTransaction.displayName}-header`]}>
                <TouchableOpacity style={styles[`${AddTransaction.displayName}-header-part1`]} onPress={() => props.onBack(false)}>
                    <Text style={styles[`${AddTransaction.displayName}-header-part1-txt`]}>
                        &#8592;
                    </Text>
                </TouchableOpacity>
                <View style={styles[`${AddTransaction.displayName}-header-part2`]}>
                    <Text style={styles[`${AddTransaction.displayName}-header-part2-txt`]}>
                        ADD TRANSACTION
                    </Text>
                </View>
                <TouchableOpacity style={styles[`${AddTransaction.displayName}-header-part3`]} onPress={onReset}>
                    <Text style={styles[`${AddTransaction.displayName}-header-part3-txt`]}>
                        &#8634;
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles[`${AddTransaction.displayName}-header-part4`]} onPress={onAdd}>
                    <Text style={styles[`${AddTransaction.displayName}-header-part4-txt`]}>
                        &#10003;
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
    const Body = (): ReactElement => {
        let matchInd = types.indexOf(type);
        return (
            <View style={styles[`${AddTransaction.displayName}-body`]}>
                <View style={styles[`${AddTransaction.displayName}-body-part1`]}>
                    {types.map((x: string, ind: number) => {
                        let selected = type === x;
                        return (
                            <TouchableOpacity
                                key={x}
                                style={{
                                    ...styles[`${AddTransaction.displayName}-body-part1-sub`],
                                    ...(selected && {
                                        borderBottomColor: APP_DEFAULT_COLORS.DARK_COLOR,
                                        borderBottomWidth: 2
                                    })
                                }}
                                onPress={() => {
                                    updateType(x);
                                    updateSubTypeId(subTypes[ind][0].value);
                                }}
                            >
                                <Text style={{
                                    ...styles[`${AddTransaction.displayName}-body-part1-sub-txt`],
                                    ...(selected && {
                                        color: APP_DEFAULT_COLORS.DARK_COLOR,
                                        fontWeight: 'bold'
                                    })
                                }}>{x}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
                <View style={styles[`${AddTransaction.displayName}-body-part`]}>
                    <PickerContainer
                        mode='simple'
                        label='SUB TYPE'
                        value={subTypeId}
                        options={matchInd === -1 ? [] : subTypes[matchInd]}
                        onChange={value => updateSubTypeId(value)}
                    />
                </View>
                <View style={styles[`${AddTransaction.displayName}-body-part`]}>
                    <PickerContainer
                        mode='simple'
                        label='CURRENCY'
                        value={amountTypeId}
                        options={amountTypes}
                        onChange={value => updateAmountTypeId(value)}
                    />
                </View>
                <View style={styles[`${AddTransaction.displayName}-body-part`]}>
                    <TextInputContainer
                        mode='decimal'
                        label='AMOUNT'
                        value={amount}
                        onChange={value => updateAmount(value)}
                    />
                </View>
                <View style={styles[`${AddTransaction.displayName}-body-part`]}>
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
        <View style={styles[`${AddTransaction.displayName}-container`]}>
            {Header()}
            <ScrollView>
                {Body()}
            </ScrollView>
        </View>
    )
}
AddTransaction.displayName = 'addTransaction';
export default AddTransaction;