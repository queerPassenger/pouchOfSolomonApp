import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList } from 'react-native';
import { apiUrl, endpoint } from '../constants/urls';
import { UserContext } from '../context/userContext';
import { request } from '../utils/request';
import { getDate, getTime } from '../utils/calendar';
import { styles } from '../style';

export default function ViewPage() {
    const componentName = 'viewPage';
    const [list, updateList] = useState([]);
    const [fromDate, updateFromDate] = useState(new Date(new Date().getFullYear(), 0, 1));
    const [toDate, updateToDate] = useState(new Date());
    const context = {
        ...useContext(UserContext)
    };
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        const body = {
            fromDate,
            toDate
        };
        try {
            let response = await request.post(apiUrl + endpoint.getTransaction.replace('{id}', context.userId), {}, body)
            if (response && response.status && response.type === 'json' && response.data) {
                if (response.data.status) {
                    updateList(response.data.data);
                }
                return response;
            }
        }
        catch (err) {
            console.warn('Error getData', err)
            return false
        }
    }
    const renderPanel = () => {
        return(
            <View style={styles[`${componentName}-panel-container`]}>

            </View>
        )
    }
    const renderListItem = ({ item }) => {
       
        return (
            <View style={styles[`${componentName}-list-item-container`]}>
                <View style={styles[`${componentName}-list-item-sub-container1`]}>

                </View>
                <View style={styles[`${componentName}-list-item-sub-container2`]}>
                    <Text style={styles[`${componentName}-list-item-sub-container2-text1`]} numberOfLines = { 1 } >
                        {item.comment}
                    </Text>
                    <Text style={styles[`${componentName}-list-item-sub-container2-text2`]}>
                        {item.comment}
                    </Text>
                    <Text style={styles[`${componentName}-list-item-sub-container2-text3`]}>
                        {getDate(item.createdTimeStamp ? new Date(item.createdTimeStamp): new Date())}
                    </Text>
                    <Text style={styles[`${componentName}-list-item-sub-container2-text4`]}>
                        {getTime(item.createdTimeStamp ? new Date(item.createdTimeStamp): new Date())}
                    </Text>
                </View>
                <View style={styles[`${componentName}-list-item-sub-container3`]}>
                    <Text style={styles[`${componentName}-list-item-sub-container3-text1`]} >
                        {item.amount}
                    </Text>
                </View>
                <Text>
                    
                </Text>
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