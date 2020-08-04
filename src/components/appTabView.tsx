import React, { useContext, ReactElement } from 'react';
import { View, Text } from 'react-native';
import SwipeWrapper from './swipeWrapper';
import AppContext from '../context/appContext';
import { styles } from '../style';
import TransactionPage from './transactionPage';
import AnalysePage from './analysePage';

const AppTabView: React.FC = (): ReactElement => {
    const context = useContext(AppContext);
    const onSwipe = (direction: string): void => {
        return;
        const tabSelectedInd = context.tabs.findIndex(x => x.selected);
        if (tabSelectedInd >= 0) {
            let tabCurrentSelectedInd;
            switch (direction) {
                case 'left':
                    tabCurrentSelectedInd = tabSelectedInd + 1;
                    break;
                case 'right':
                    tabCurrentSelectedInd = tabSelectedInd - 1;
                    break;
                default:
                    break;
            }
            if (tabCurrentSelectedInd && tabCurrentSelectedInd !== tabSelectedInd && tabCurrentSelectedInd >= 0 && tabCurrentSelectedInd < context.tabs.length && context.tabs[tabCurrentSelectedInd].key)
                context.updateSelectedTab(context.tabs[tabCurrentSelectedInd].key);
        }
    }
    const appRouter = () => {
        switch(context.selectedTab){
            case 'transaction':
                return <TransactionPage />;
            case 'analyse':
                return <AnalysePage />;
            default:
                return null;            
        }
    }    
    return (
        <SwipeWrapper onSwipe={onSwipe}>
            <View style={styles[`${AppTabView.displayName}-container`]}>
                {appRouter()}
            </View>
        </SwipeWrapper>

    )
}
AppTabView.displayName = 'appTabView';
export default AppTabView;
