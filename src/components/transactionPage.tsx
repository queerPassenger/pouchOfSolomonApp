import React, { useState, useEffect, useContext, ReactElement, Fragment } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Alert, AlertButton } from 'react-native';
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
import logger from '../utils/logger';

interface ItemProps {
    transactionId: string,
    amount: number,
    amountTypeId: number,
    comment: string,
    transactionTypeId: number,
    createdTimeStamp: string
};
interface ListItemProps {
    transactionId: string,
    amount: number,
    amountTypeId: number,
    comment: string,
    transactionTypeId: number,
    createdTimeStamp: string,
    transactionTypeName: string,
    transactionClassification: string,
    selected: boolean
}
interface ModalProps {
    flag: boolean,
    type: string
}
interface AlertType {
    flag: boolean,
    title: string,
    msg: string,
    btns: Array<AlertButton>
    cancelable: boolean
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
                newState = {
                    fromDate: new Date(new Date().getFullYear(), 0, 1),
                    toDate: new Date(),
                    types: context.transactionTypes.map(x => x),
                    subTypes: context.transactionTypeList.map(x => x.transactionTypeId)
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
            case 'alert':
                newState = {
                    flag: false,
                    title: '',
                    msg: '',
                    btns: [],
                    cancelable: false
                };
                break;
            default:
                break; 
        }
        return {state: {...newState}}
    }
    const [filterParams, updateFilterParams] = useState<FilterParamsType>(getInitialState('filterParams').state);
    const [triggerLoadData, updateTriggerLoadData] = useState<boolean>(true);
    const [list, updateList] = useState<Array<any>>(getInitialState('list').state);
    const [modal, updateModal] = useState<ModalProps>(getInitialState('modal').state);
    const [selectionEnabled, updateSelectionEnabled] = useState<boolean>(getInitialState('selectionEnabled').state);
    const [alert, updateAlert] = useState<AlertType>(getInitialState('alert').state);
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
    const failedProcessAlert = (cb = () => {}): void => {
        let alert = getInitialState('alert').state;
        alert.flag = true;
        alert.title = ALERT_TITLE.FAILURE;
        alert.msg = ALERT_MSG.FAILED_REQUEST;
        alert.btns = [
            {
                text: ALERT_BUTTON.OK,
                onPress: () => {
                    updateAlert(getInitialState('alert').state);
                    cb();
                },
                type: 'default'
            }
        ]
        updateAlert(alert);
    }
    const deleteTransactions = async (selectedItems: Array<ListItemProps>): Promise<void> => {
        try{
            let body = selectedItems.map(x => {return {transactionId: x.transactionId}});
            let response = await request.delete(URL.API_URL + API_PATH.DELETE_TRANSACTION.replace('{id}', context.userId), body, {})
            if (response && response.status && response.type === 'json' && response.data) {
                if (response.data.status) {
                    let alert = getInitialState('alert').state;
                    alert.flag = true;
                    alert.title = ALERT_TITLE.SUCCESS;
                    alert.msg = ALERT_MSG.SUCCESS_DELETE_TRANSACTION;
                    alert.btns = [
                        {
                            text: ALERT_BUTTON.OK,
                            onPress: async () => {
                                updateAlert(getInitialState('alert').state);
                                context.showLoader();
                                await getTransaction();
                                context.hideLoader();
                            },
                            type: 'default'
                        }
                    ];
                    updateAlert(alert);                    
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
    const onDeletePress = () => {
        const selectedItems = list.filter(x => x.selected);
        let alert = getInitialState('alert').state;
        alert.flag = true;
        if(selectedItems.length > 0){
            alert.title = ALERT_TITLE.WARNING;
            alert.msg = ALERT_MSG.CONFIRMATION_DELETE_TRANSACTION;
            alert.btns = [
                {
                    text: ALERT_BUTTON.NO,
                    onPress: () => updateAlert(getInitialState('alert').state),
                    type: 'default'
                },
                {
                    text: ALERT_BUTTON.YES,
                    onPress: async () => {
                        updateAlert(getInitialState('alert').state);
                        context.showLoader();
                        await deleteTransactions(selectedItems);
                        context.hideLoader();
                    }
                }
            ]
        }
        else{
            alert.title = ALERT_TITLE.WARNING;
            alert.msg = ALERT_MSG.UNMET_PREREQ_DELETE_TRANSACTION;
            alert.btns = [
                {
                    text: ALERT_BUTTON.OK,
                    onPress: () => updateAlert(getInitialState('alert').state),
                    type: 'default'
                }
            ]
        }
        updateAlert(alert);
    }
    const ListItem = (item: ListItemProps | undefined) => {
        if (!item) {
            let totalLayers = 3;
            return (
                <LinearGradient colors={[APP_DEFAULT_COLORS.DARK_COLOR, APP_DEFAULT_COLORS.DARK_COLOR, 'rgb(88, 62, 78)']} style={styles[`${TransactionPage.displayName}-list-item-container`]}>
                    <View style={styles[`${TransactionPage.displayName}-list-item-sub-container1`]}>
                        {[...Array(totalLayers)].map((x, ind) => {
                            return (
                                <View key={'empty' + ind} style={{
                                    ...styles[`${TransactionPage.displayName}-list-item-sub-container1-emptyContainer`],
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
            const amountType = context.amountTypeList.filter(x => x.amountTypeId === item.amountTypeId)[0] || {};
            const change = (item.amount - Math.floor(item.amount)).toFixed(2).split('.')[1];
            return (
                <TouchableOpacity 
                   // onPress={() => selectionEnabled && onItemSelect(item.transactionId, false)} 
                   // onLongPress={() => onItemSelect(item.transactionId, true)}
                   onPress={() => onItemSelect(item.transactionId, true)}
                >
                    <LinearGradient colors={[APP_DEFAULT_COLORS.DARK_COLOR, APP_DEFAULT_COLORS.DARK_COLOR, 'rgb(88, 62, 78)']} style={styles[`${TransactionPage.displayName}-list-item-container`]} >
                        <View style={styles[`${TransactionPage.displayName}-list-item-sub-container2`]}>
                            <Text style={styles[`${TransactionPage.displayName}-list-item-sub-container2-text1`]} numberOfLines={1} >
                                {item.comment}
                            </Text>
                            <Text style={styles[`${TransactionPage.displayName}-list-item-sub-container2-text2`]} numberOfLines={1}>
                                {item.transactionTypeName ? item.transactionTypeName : ''}
                            </Text>
                            <Text style={styles[`${TransactionPage.displayName}-list-item-sub-container2-text3`]} numberOfLines={1}>
                                {getDate(item.createdTimeStamp ? new Date(item.createdTimeStamp) : new Date())}
                            </Text>
                            <Text style={styles[`${TransactionPage.displayName}-list-item-sub-container2-text4`]} numberOfLines={1}>
                                {getTime(item.createdTimeStamp ? new Date(item.createdTimeStamp) : new Date())}
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
                                    ...styles[`${TransactionPage.displayName}-list-item-sub-container3-text2`],
                                    ...{ color: item.transactionClassification === 'expense' ? 'red' : 'green' }
                                }} numberOfLines={1}>
                                    {item.amount.toFixed(0)}
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
                    </LinearGradient>
                </TouchableOpacity>
            )
        }
    }
    const EmptyList = () => {
        return (
            <View style={styles[`${TransactionPage.displayName}-norecords-container`]}>
                <Text style={styles[`${TransactionPage.displayName}-norecords-container-text`]}>
                    No records available for this filter search
                </Text>
            </View>
        )
    }
    const ListContainer = () => {
        return (
            <View style={styles[`${TransactionPage.displayName}-list-container`]}>
                {context.loader || list.length > 0 ?
                    <FlatList
                        data={context.loader ? [...Array(10)] : list}
                        renderItem={(props) => ListItem(props.item)}
                        keyExtractor={(item, ind) => item ? ('key' + item.transactionId) : ('key' + ind)}
                    />
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
                <TouchableOpacity style={styles[`${TransactionPage.displayName}-footer-container-sub-container`]} onPress={() => openModal('add')}>
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
                    />
                );
            case 'add':
                return (
                    <AddTransaction 
                        onBack={closeModal}                        
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
    const AlertContainer = () => {
        const { flag, title, msg, btns, cancelable } = alert;
        if(!flag)
            return (null);
        else
            return (
                Alert.alert(
                    title,
                    msg,
                    btns,
                    {cancelable}
                )
            )
    }
    return (
        <View style={styles[`${TransactionPage.displayName}-container`]}>
            {ListContainer()}
            {FooterContainer()}
            {ModalContainer()}
            {AlertContainer()}
        </View>
    )
}
TransactionPage.displayName = 'transactionPage'
export default TransactionPage;