import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import SwipeWrapper from './swipeWrapper';
import { AppContext } from '../context/appContext';
import { styles } from '../style';
import ViewPage from './viewPage';
import AnalysePage from './analysePage';

export default function appTabView() {
    const componentName = 'appTabView';
    const context = useContext(AppContext);
    const onSwipe = (direction) => {
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
            if (tabCurrentSelectedInd !== tabSelectedInd && tabCurrentSelectedInd >= 0 && tabCurrentSelectedInd < context.tabs.length && context.tabs[tabCurrentSelectedInd].key)
                context.updateSelectedTab(context.tabs[tabCurrentSelectedInd].key);
        }
    }
    const appRouter = () => {
        switch(context.selectedTab){
            case 'view':
                return <ViewPage />;
            case 'analyse':
                return <AnalysePage />;
            default:
                return null;            
        }
    }    
    return (
        <SwipeWrapper onSwipe={onSwipe}>
            <View style={styles[`${componentName}-container`]}>
                {appRouter()}
            </View>
        </SwipeWrapper>

    )
}