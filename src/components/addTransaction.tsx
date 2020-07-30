import React, { ReactElement, useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../style';
import logger from '../utils/logger';
import AppContext from '../context/appContext';
import { APP_DEFAULT_COLORS } from '../constants';

interface AddTransactionProps {
    onBack: () => void
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
interface DropDownOptionsType {
    value: string | number,
    label: string
}
const AddTransaction: React.FC<AddTransactionProps> = (props): ReactElement => {
    const context = {
        ...useContext(AppContext)
    };
    const loadInitialData = (): [Array<string>, Array<Array<DropDownOptionsType>>] => {
        let types: Array<string> = [];
        let subTypes: Array<Array<DropDownOptionsType>> = [];
        context.transactionTypeList.map(x => {
            let matchInd = types.indexOf(x.transactionClassification.toUpperCase());
            let insertInd;
            if(matchInd === -1){
                types.push(x.transactionClassification.toUpperCase());
                subTypes.push([]);
                insertInd = types.length -1;
            }
            else
                insertInd = matchInd;
            
            subTypes[insertInd] && subTypes[insertInd].push({
                label: x.transactionTypeName,
                value: x.transactionTypeId
            });
        });
        return [types, subTypes];
    }
    const [types, subTypes] = loadInitialData();
    const [transactionDateTime, updateTransactionDateTime] = useState<Date>(new Date());
    const [type, updateType] = useState<string>('');
    const [subTypeId, updateSubTypeId] = useState<string | number>();
    const [amount, updateAmount] = useState<number>();
    const [amountTypeId, updateAmountTypeId] = useState<number>();
    const [comment, updateComment] = useState<string>('');

    useEffect(() => {
        updateType(types[0]);
        updateSubTypeId(subTypes[0][0].value);
    },[])
    const onReset = () => {

    }
    const onAdd = () => {

    }
    const Header = (): ReactElement => {
        return(
            <View style={styles[`${AddTransaction.displayName}-header`]}>
                <TouchableOpacity style={styles[`${AddTransaction.displayName}-header-part1`]} onPress={props.onBack}>
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
        return(
            <View style={styles[`${AddTransaction.displayName}-body`]}>
                <View style={styles[`${AddTransaction.displayName}-body-part1`]}>
                    {types.map((x: string) => {
                        let selected = type === x;
                        return(
                            <TouchableOpacity 
                                key={x} 
                                style={{
                                    ...styles[`${AddTransaction.displayName}-body-part1-sub`],
                                    ...(selected && {
                                        borderBottomColor: APP_DEFAULT_COLORS.DARK_COLOR,
                                        borderBottomWidth: 2
                                    })
                                }}
                                onPress={() => updateType(x)}
                            >
                                <Text style={{
                                    ...styles[`${AddTransaction.displayName}-body-part1-sub-txt`],
                                    ...(selected && {
                                        color: APP_DEFAULT_COLORS.DARK_COLOR,
                                        fontStyle: 'italic',
                                        fontWeight: 'bold'
                                    })
                                }}>{x}</Text>
                            </TouchableOpacity>
                        )
                    })}                        
                </View>
            </View>
        )
    }
    return(
        <View style={styles[`${AddTransaction.displayName}-container`]}>
            {Header()}
            {Body()}
        </View>
    )
}
AddTransaction.displayName = 'addTransaction';
export default AddTransaction;