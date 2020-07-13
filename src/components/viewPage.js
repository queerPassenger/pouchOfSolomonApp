import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList } from 'react-native';
import { apiUrl, endpoint } from '../constants/urls';
import { UserContext } from '../context/userContext';
import { AppContext } from '../context/appContext';
import { request } from '../utils/request';
import { getDate, getTime } from '../utils/calendar';

import { styles } from '../style';

export default function ViewPage() {
    const componentName = 'viewPage';
    const [list, updateList] = useState([]);
    const [fromDate, updateFromDate] = useState(new Date(new Date().getFullYear(), 0, 1));
    const [toDate, updateToDate] = useState(new Date());
    const context = {
        ...useContext(UserContext),
        ...useContext(AppContext)
    };
    useEffect(() => {
        loadData();
    }, []);
    const loadData = async () => {
        context.showLoader();
        await getTransactions();
        context.hideLoader();
    }
    const getTransactions = async () => {
        const body = {
            fromDate,
            toDate
        };
        try {
            let response = await request.post(apiUrl + endpoint.getTransaction.replace('{id}', context.userId), {}, body)
            if (response && response.status && response.type === 'json' && response.data) {
                if (response.data.status) {
                    updateList(response.data.data);
                    return true;
                }
            }
            return false;
        }
        catch (err) {
            console.warn('Error getTransactions', err)
            return false
        }
    }
    const renderPanel = () => {
        return (
            <View style={styles[`${componentName}-panel-container`]}>

            </View>
        )
    }
    const renderListItem = ({ item }) => {
        const transactionType = context.transactionTypeList.filter(x => x.transactionTypeId === item.transactionTypeId)[0] || {};
        const amountType = context.amountTypeList.filter(x => x.amountTypeId === item.amountTypeId)[0] || {};
        const change = (item.amount - Math.floor(item.amount)).toFixed(2).split('.')[1];
        return (
            <View style={styles[`${componentName}-list-item-container`]}>
                <View style={styles[`${componentName}-list-item-sub-container1`]}>

                </View>
                <View style={styles[`${componentName}-list-item-sub-container2`]}>
                    <Text style={styles[`${componentName}-list-item-sub-container2-text1`]} numberOfLines={1} >
                        {item.comment}
                    </Text>
                    <Text style={styles[`${componentName}-list-item-sub-container2-text2`]} numberOfLines={1}>
                        {transactionType.transactionTypeName ? transactionType.transactionTypeName : ''}
                    </Text>
                    <Text style={styles[`${componentName}-list-item-sub-container2-text3`]} numberOfLines={1}>
                        {getDate(item.createdTimeStamp ? new Date(item.createdTimeStamp) : new Date())}
                    </Text>
                    <Text style={styles[`${componentName}-list-item-sub-container2-text4`]} numberOfLines={1}>
                        {getTime(item.createdTimeStamp ? new Date(item.createdTimeStamp) : new Date())}
                    </Text>
                </View>
                <View style={styles[`${componentName}-list-item-sub-container3`]}>
                    <View>
                        <Text style={styles[`${componentName}-list-item-sub-container3-text1`]} numberOfLines={1}>
                            {amountType.amountSymbol ? amountType.amountSymbol : ''}
                        </Text>
                    </View>
                    <View>
                        <Text style={{
                            ...styles[`${componentName}-list-item-sub-container3-text2`],
                            ...{ color: transactionType.transactionClassification === 'expense' ? 'red' : 'green' }
                        }} numberOfLines={1}>
                            {item.amount.toFixed(0)}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles[`${componentName}-list-item-sub-container3-text3`]} numberOfLines={1}>
                            {`.${change}`}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
    const renderList = () => {
        return (
            <View style={styles[`${componentName}-list-container`]}>
                <FlatList
                    data={list}
                    renderItem={renderListItem}
                    keyExtractor={item => item.transactionId}
                />
            </View>
        )
    }
    return (
        <View style={styles[`${componentName}-container`]}>
            {renderPanel()}
            {renderList()}
        </View>
    )
}