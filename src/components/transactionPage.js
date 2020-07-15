import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { apiUrl, endpoint } from '../constants/urls';
import { UserContext } from '../context/userContext';
import { AppContext } from '../context/appContext';
import { request } from '../utils/request';
import { getDate, getTime } from '../utils/calendar';
import { LinearGradient } from 'expo-linear-gradient';
import { styles, common } from '../style';
import Modal from './modal';

export default function TransactionPage() {
    const componentName = 'transactionPage';
    const [list, updateList] = useState([]);
    const [modal, updateModal] = useState({
        flag: false,
        type: ''
    })
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
    const openModal = (type) => {
        updateModal({
            flag: true,
            type
        });
    }
    const closeModal = () => {
        updateModal({
            flag: false,
            type: ''
        });
    }
    const renderListItem = ({ item }) => {
        if (!item) {
            let totalLayers = 3;
            return (
                <LinearGradient colors={[common.appColorDark, common.appColorDark, 'rgb(88, 62, 78)']} style={styles[`${componentName}-list-item-container`]}>
                    <View style={styles[`${componentName}-list-item-sub-container1`]}>
                        {[...Array(totalLayers)].map((x, ind) => {
                            return (
                                <View key={'empty' + ind} style={{
                                    ...styles[`${componentName}-list-item-sub-container1-emptyContainer`],
                                    width: 100 - (20 * (ind + 1)) + '%'
                                }}>
                                </View>
                            )
                        })}
                    </View>
                </LinearGradient>
            )
        }
        else {
            const transactionType = context.transactionTypeList.filter(x => x.transactionTypeId === item.transactionTypeId)[0] || {};
            const amountType = context.amountTypeList.filter(x => x.amountTypeId === item.amountTypeId)[0] || {};
            const change = (item.amount - Math.floor(item.amount)).toFixed(2).split('.')[1];
            return (
                <LinearGradient colors={[common.appColorDark, common.appColorDark, 'rgb(88, 62, 78)']} style={styles[`${componentName}-list-item-container`]}>
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
                </LinearGradient>
            )
        }
    }
    const emptyList = () => {
        return (
            <View style={styles[`${componentName}-norecords-container`]}>
                <Text style={styles[`${componentName}-norecords-container-text`]}>
                    No records available for this filter search
                </Text>
            </View>
        )
    }
    const renderList = () => {
        return (
            <View style={styles[`${componentName}-list-container`]}>
                {context.loader || list.length > 0 ?
                    <FlatList
                        data={context.loader ? [...Array(10)] : list}
                        renderItem={renderListItem}
                        keyExtractor={(item, ind) => item ? item.transactionId : ind}
                    />
                    :
                    emptyList()
                }
            </View>
        )
    }
    const renderFooter = () => {
        return (
            <View style={styles[`${componentName}-footer-container`]}>
                <TouchableOpacity style={{
                        ...styles[`${componentName}-footer-container-sub-container`],
                        borderRightColor: 'darkgray',
                        borderRightWidth: 1,
                        backgroundColor: modal.type === 'filter' ? 'gray': 'lightgray',
                    }}
                    onPress={() => openModal('filter')}>
                    <Image source={require('../assets/images/filter.png')} style={styles[`${componentName}-footer-container-sub-container-image`]} />
                </TouchableOpacity>
                <TouchableOpacity style={{
                        ...styles[`${componentName}-footer-container-sub-container`],
                        backgroundColor: modal.type === 'add' ? 'gray': 'lightgray',
                    }} onPress={() => openModal('add')}>
                    <Image source={require('../assets/images/add.png')} style={styles[`${componentName}-footer-container-sub-container-image`]} />
                </TouchableOpacity>
            </View>
        )
    }
    const renderModalComponent = () => {
        switch (modal.type) {
            case 'filter':
                return (
                    <View>
                        <Text>
                            I am Filter popUp
                        </Text>
                    </View>
                );
            case 'add':
                return (
                    <View>
                        <Text>
                            I am Add popUp
                        </Text>
                    </View>
                );
            default:
                return (null)
        }
    }
    const renderModal = () => {
        if (!modal.flag)
            return (null);
        else
            return (
                <Modal onClose={closeModal}>
                    {renderModalComponent()}
                </Modal>
            )
    }
    return (
        <View style={styles[`${componentName}-container`]}>
            {renderList()}
            {renderFooter()}
            {renderModal()}
        </View>
    )
}