import React, { useState, useEffect, useContext, ReactElement, Fragment } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { URL, API_PATH, APP_DEFAULT_COLORS, ALERT_TITLE, ALERT_MSG, ALERT_BUTTON } from '../constants';
import UserContext from '../context/userContext';
import AppContext from '../context/appContext';
import { request } from '../utils/request';
import { getDate, getTime } from '../utils/calendar';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../style';
import Modal from './modal';
import FilterTransaction, { FilterParamsType } from './filterTransaction';
import AddTransaction from './addTransaction';
import UpdateTransaction from './updateTransaction';
import logger from '../utils/logger';
import { showAlert } from '../utils/alert';
import { getTransactionTypeColor } from '../utils/color';

interface ItemProps {
    transactionId: string,
    amount: number,
    amountTypeId: number,
    comment: string,
    transactionTypeId: number,
    timeStamp: string,
};
export interface ListItemProps {
    transactionId: string,
    amount: number,
    color: string,
    amountTypeId: number,
    comment: string,
    transactionTypeId: number,
    timeStamp: string,
    transactionTypeName: string,
    transactionClassification: string,
    selected: boolean
}
interface ModalProps {
    flag: boolean,
    type: string
}
interface TotalType {
    label: string,
    value: number,
    valueColor: string
}
const TransactionPage: React.FC = (): ReactElement => {
    const context = {
        ...useContext(UserContext),
        ...useContext(AppContext)
    };

    const getInitialState = (state: string): { state: any } => {
        let newState;
        switch (state) {
            case 'filterParams':
                let { filter } = context.userActions.transaction;
                newState = {
                    fromDate: filter && filter.fromDate ? new Date(filter.fromDate): new Date(new Date().getFullYear(), 0, 1),
                    toDate: filter && filter.toDate ? new Date(filter.toDate): new Date(),
                    types: filter && filter.types ? filter.types: context.transactionTypes.map(x => x),
                    subTypes: filter && filter.subTypes ? filter.subTypes:  context.transactionTypeList.map(x => x.transactionTypeId)
                };

                break;
            case 'list':
                newState = [];
                break;
            case 'modal':
                newState = {
                    flag: false,
                    type: ''
                }
                break;
            case 'selectionEnabled':
                newState = false;
                break;
            case 'showTotal':
                newState = false;
                break;
            case 'total':
                newState = context.transactionTypes.map(x => { 
                    return {
                        label:x,
                        valueColor: getTransactionTypeColor(x),
                        value: 0
                    }
                });
                break;
            default:
                break;
        }
        return Object.assign({
            state: newState
        }, {});
    }
    const [filterParams, updateFilterParams] = useState<FilterParamsType>(getInitialState('filterParams').state);
    const [triggerLoadData, updateTriggerLoadData] = useState<boolean>(true);
    const [list, updateList] = useState<Array<any>>(getInitialState('list').state);
    const [modal, updateModal] = useState<ModalProps>(getInitialState('modal').state);
    const [selectionEnabled, updateSelectionEnabled] = useState<boolean>(getInitialState('selectionEnabled').state);
    const [showTotal, updateShowTotal] = useState<boolean>(getInitialState('showTotal').state);
    const [total, updateTotal] = useState<Array<TotalType>>(getInitialState('total').state);
    useEffect(() => {
        if (triggerLoadData) {
            loadData();
            updateTriggerLoadData(false)
        }
    }, []);
    useEffect(() => {
        if (triggerLoadData) {
            loadData();
            updateTriggerLoadData(false)
        }
    }, [filterParams]);
    useEffect(() => {
        calculateTotal();
    }, [list]);
    const loadData = async (): Promise<void> => {
        context.showLoader();
        await getTransaction();
        context.hideLoader();
    }
    const getTransaction = async (): Promise<boolean> => {
        const { fromDate, toDate, types, subTypes } = filterParams;
        const body = {
            fromDate,
            toDate
        };
        updateList([]);        
        try {
            let response = await request.post(URL.API_URL + API_PATH.GET_TRANSACTION.replace('{id}', context.userId), body, {})
            if (response && response.status && response.type === 'json' && response.data) {
                if (response.data.status) {
                    let result = response.data.data.map((item: ItemProps) => {
                        let transactionType = context.transactionTypeList.filter(x => x.transactionTypeId === item.transactionTypeId)[0] || {};
                        
                        return {
                            ...item,
                            amount: +item.amount,
                            transactionTypeName: transactionType.transactionTypeName,
                            transactionClassification: transactionType.transactionClassification,
                            color: transactionType.color,
                            selected: false
                        }
                    }).filter((x: ListItemProps) => types.indexOf(x.transactionClassification) !== -1 || subTypes.indexOf(x.transactionTypeId) !== -1).reverse();
                    updateList(result);                    
                    return true;
                }
            }
            return false;
        }
        catch (err) {
            logger.warn('Error getTransaction' + err.toString())
            return false
        }
    }
    const calculateTotal = (): void => {
        let _total = total.map(x => {
            return {
                ...x,
                value: 0
            }
        });
        list.map(x => {
            let ind = _total.findIndex(y => x.transactionClassification === y.label);
            _total[ind]['value'] += x.amount;
        });
        updateTotal(_total);
    }
    const openModal = (type: string): void => {
        updateModal({
            flag: true,
            type
        });
    }
    const closeModal = (): void => {
        updateModal(getInitialState('modal').state);
    }
    const onFilter = async (filterParams: FilterParamsType): Promise<any> => {
        closeModal();
        updateTriggerLoadData(true);
        let _userActions = context.userActions;
        _userActions['transaction']['filter'] = filterParams;
        AsyncStorage.setItem('user-actions-transaction-filter', JSON.stringify(filterParams));
        context.updateUserActions(_userActions);
        updateFilterParams(filterParams);
    }
    const onItemSelect = (id: string, longPress: boolean) => {
        // let _selectionEnabled = longPress ? !selectionEnabled : selectionEnabled;
        let _selectionEnabled = true;
        if (_selectionEnabled) {
            updateList(list.map(x => {
                return {
                    ...x,
                    ...(id === x.transactionId && { selected: !x.selected })
                }
            }))
        }
        else {
            updateList(list.map(x => {
                return {
                    ...x,
                    selected: false
                }
            }))
        }
        updateSelectionEnabled(_selectionEnabled);
    }
    const failedProcessAlert = (cb = () => { }): void => {
        showAlert(
            ALERT_TITLE.FAILURE,
            ALERT_MSG.FAILED_REQUEST,
            [
                {
                    text: ALERT_BUTTON.OK,
                }
            ]
        );
    }
    const deleteTransactions = async (selectedItems: Array<ListItemProps>): Promise<void> => {
        try {
            let body = selectedItems.map(x => { return { transactionId: x.transactionId } });
            let response = await request.delete(URL.API_URL + API_PATH.DELETE_TRANSACTION.replace('{id}', context.userId), body, {})
            if (response && response.status && response.type === 'json' && response.data) {
                if (response.data.status) {
                    showAlert(
                        ALERT_TITLE.SUCCESS,
                        ALERT_MSG.SUCCESS_DELETE_TRANSACTION,
                        [
                            {
                                text: ALERT_BUTTON.OK,
                                onPress: loadData
                            }
                        ]
                    );
                    return;
                }
            }
            failedProcessAlert();
            return;
        }
        catch (err) {
            logger.warn('Error deleteTransactions' + err.toString());
            failedProcessAlert();
            return;
        }
    }
    const onUpdatePress = () => {
        const selected = list.filter(x => x.selected);
        if (selected.length !== 1) {
            showAlert(
                ALERT_TITLE.WARNING,
                ALERT_MSG.UNMET_PREREQ_UPDATE_TRANSACTION,
                [{
                    text: ALERT_BUTTON.OK
                }]
            )
        }
        else
            openModal('update');
    }
    const onDeletePress = () => {
        const selectedItems = list.filter(x => x.selected);
        if (selectedItems.length > 0) {
            showAlert(
                ALERT_TITLE.WARNING,
                ALERT_MSG.CONFIRMATION_DELETE_TRANSACTION,
                [
                    {
                        text: ALERT_BUTTON.NO
                    },
                    {
                        text: ALERT_BUTTON.YES,
                        onPress: async () => {
                            context.showLoader();
                            await deleteTransactions(selectedItems);
                            context.hideLoader();
                        }
                    }
                ]
            );
        }
        else {
            showAlert(
                ALERT_TITLE.WARNING,
                ALERT_MSG.UNMET_PREREQ_DELETE_TRANSACTION,
                [
                    {
                        text: ALERT_BUTTON.OK
                    }
                ]
            );
        }
    }
    const ListItem = (item: ListItemProps | undefined) => {
        if (!item) {
            let totalLayers = 3;
            return (
                <View style={{
                    ...styles[`${TransactionPage.displayName}-list-item-container`],
                    backgroundColor: APP_DEFAULT_COLORS.APP_PRIMIARY_BACKGROUND
                }} >
                <View style={styles[`${TransactionPage.displayName}-list-item-sub-container`]}>
                    {[...Array(totalLayers)].map((x, ind) => {
                        return (
                            <View key={'empty' + ind} style={{
                                ...styles[`${TransactionPage.displayName}-list-item-sub-container-emptyContainer`],
                                width: 100 - (20 * (ind + 1)) + '%'
                            }}>
                            </View>
                        )
                    })}
                </View>
                </View>
            )
        }
        else {
            const amountType = context.amountTypeList.filter(x => x.amountTypeId === item.amountTypeId)[0] || {};
            const change = (item.amount - Math.floor(item.amount)).toFixed(2).split('.')[1];
            return (
                <TouchableOpacity
                    // onPress={() => selectionEnabled && onItemSelect(item.transactionId, false)} 
                    // onLongPress={() => onItemSelect(item.transactionId, true)}
                    style={styles[`${TransactionPage.displayName}-list-item-container`]}
                    onPress={() => onItemSelect(item.transactionId, true)}
                >                    
                    <View style={{
                        ...styles[`${TransactionPage.displayName}-list-item-wrapper1`],
                        backgroundColor: item.color
                    }}>
                    </View>   
                    <View style={styles[`${TransactionPage.displayName}-list-item-wrapper2`]}>        
                        <View style={styles[`${TransactionPage.displayName}-list-item-sub-container2`]}>
                            <Text style={styles[`${TransactionPage.displayName}-list-item-sub-container2-text1`]} numberOfLines={1} >
                                {item.comment}
                            </Text>
                            <Text style={styles[`${TransactionPage.displayName}-list-item-sub-container2-text2`]} numberOfLines={1}>
                                {item.transactionTypeName ? item.transactionTypeName : ''}
                            </Text>
                            <Text style={styles[`${TransactionPage.displayName}-list-item-sub-container2-text3`]} numberOfLines={1}>
                                {getDate(item.timeStamp ? new Date(item.timeStamp) : new Date())}
                            </Text>
                            <Text style={styles[`${TransactionPage.displayName}-list-item-sub-container2-text4`]} numberOfLines={1}>
                                {getTime(item.timeStamp ? new Date(item.timeStamp) : new Date())}
                            </Text>
                        </View>
                        <View style={styles[`${TransactionPage.displayName}-list-item-sub-container3`]}>
                            <View>
                                <Text style={styles[`${TransactionPage.displayName}-list-item-sub-container3-text1`]} numberOfLines={1}>
                                    {amountType.amountSymbol ? amountType.amountSymbol : ''}
                                </Text>
                            </View>
                            <View>
                                <Text style={{
                                    ...styles[`${TransactionPage.displayName}-list-item-sub-container3-text2`]
                                }} numberOfLines={1}>
                                    {Math.floor(item.amount)}
                                </Text>
                            </View>
                            <View>
                                <Text style={styles[`${TransactionPage.displayName}-list-item-sub-container3-text3`]} numberOfLines={1}>
                                    {`.${change}`}
                                </Text>
                            </View>
                            {item.selected &&
                                <View>
                                    <Text style={styles[`${TransactionPage.displayName}-list-item-sub-container3-text4`]}>
                                        &#10004;
                                        </Text>
                                </View>
                            }
                        </View>
                    </View>                  
                </TouchableOpacity>
            )
        }
    }
    const EmptyList = () => {
        return (
            <View style={styles[`${TransactionPage.displayName}-norecords-container`]}>
                <Text style={styles[`${TransactionPage.displayName}-norecords-container-text`]}>
                    No Records
                </Text>
            </View>
        )
    }
    const ListContainer = () => {
        return (
            <View style={styles[`${TransactionPage.displayName}-list-container`]}>
                {context.loader || list.length > 0 ?
                    <>
                        <FlatList
                            data={context.loader ? [...Array(10)] : list}
                            renderItem={(props) => ListItem(props.item)}
                            keyExtractor={(item, ind) => item ? ('key' + item.transactionId) : ('key' + ind)}
                        />
                        {showTotal? 
                            <View  style={styles[`${TransactionPage.displayName}-total-open-container`]}>
                                <View style={styles[`${TransactionPage.displayName}-total-open-header-container`]}>
                                    <Text style={styles[`${TransactionPage.displayName}-total-open-header-text`]}>
                                        TOTAL
                                    </Text>
                                    <TouchableOpacity style={styles[`${TransactionPage.displayName}-total-open-header-close-container`]} onPress={() => updateShowTotal(false)}>
                                        <Text style={styles[`${TransactionPage.displayName}-total-open-header-close-text`]}> &#10006;</Text>
                                    </TouchableOpacity>                                    
                                </View>                            
                                {total.map((x, ind) => {
                                    return(
                                        <View key={'total'+ind} style={styles[`${TransactionPage.displayName}-total-open-body-item-container`]}>
                                            <View style={styles[`${TransactionPage.displayName}-total-open-body-item-sub-container`]}>
                                                <Text style={styles[`${TransactionPage.displayName}-total-open-body-item-sub-container-text`]}>
                                                    {x.label.toUpperCase()}
                                                </Text>
                                            </View>
                                            <View style={{
                                                ...styles[`${TransactionPage.displayName}-total-open-body-item-sub-container`],
                                                backgroundColor: x.valueColor
                                            }}>
                                                <Text style={{
                                                    ...styles[`${TransactionPage.displayName}-total-open-body-item-sub-container-text`],
                                                    color: APP_DEFAULT_COLORS.PRIMIARY_TXT
                                                }}>
                                                    {x.value.toFixed(2)}
                                                </Text>
                                            </View>
                                        </View>
                                    )
                                })}
                            </View>
                        :
                            <TouchableOpacity  
                                style={styles[`${TransactionPage.displayName}-total-close-container`]}
                                onPress={() => updateShowTotal(true)}
                            >
                                <Text style={{textAlign: 'center', fontWeight: 'bold'}}>Total</Text>
                            </TouchableOpacity>
                        }
                    </>
                    :
                    <Fragment>
                        {EmptyList()}
                    </Fragment>
                }
            </View>
        )
    }
    const FooterContainer = () => {
        return (
            <View style={styles[`${TransactionPage.displayName}-footer-container`]}>
                <TouchableOpacity style={styles[`${TransactionPage.displayName}-footer-container-sub-container`]}
                    onPress={() => openModal('filter')}>
                    <Image source={require('../../assets/images/filter.png')} style={styles[`${TransactionPage.displayName}-footer-container-sub-container-image`]} />
                </TouchableOpacity>
                <TouchableOpacity style={styles[`${TransactionPage.displayName}-footer-container-sub-container`]} onPress={() => openModal('add')}>
                    <Text style={{
                        fontSize: 40
                    }}>
                        &#43;
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles[`${TransactionPage.displayName}-footer-container-sub-container`]} onPress={onUpdatePress}>
                    <Text style={{
                        fontSize: 30,
                    }}>
                        &#10000;
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles[`${TransactionPage.displayName}-footer-container-sub-container`]} onPress={onDeletePress}>
                    <Text style={{
                        fontSize: 25
                    }}>
                        &#128465;
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
    const ModalComponent = () => {
        switch (modal.type) {
            case 'filter':
                return (
                    <FilterTransaction
                        {...filterParams}
                        reset={() => {
                            updateTriggerLoadData(false);
                            updateFilterParams(getInitialState('filterParams').state)
                        }}
                        onFilter={onFilter}
                        onBack={closeModal}
                    />
                );
            case 'add':
                return (
                    <AddTransaction
                        onBack={(trigger) => {
                            closeModal();
                            if (trigger) {
                                updateTriggerLoadData(true);
                                updateFilterParams(getInitialState('filterParams').state);
                            }
                        }}
                    />
                );
            case 'update':
                return (
                    <UpdateTransaction
                        selected={list.filter(x => x.selected)}
                        onBack={(trigger) => {
                            closeModal();
                            if (trigger) {
                                updateTriggerLoadData(true);
                                updateFilterParams(getInitialState('filterParams').state);
                            }
                        }}
                    />
                );
            default:
                return (null)
        }
    }
    const ModalContainer = () => {
        if (!modal.flag)
            return (null);
        else
            return (
                <Modal onClose={closeModal}>
                    {ModalComponent()}
                </Modal>
            )
    }
    return (
        <View style={styles[`${TransactionPage.displayName}-container`]}>
            {ListContainer()}
            {FooterContainer()}
            {ModalContainer()}
        </View>
    )
}
TransactionPage.displayName = 'transactionPage'
export default TransactionPage;