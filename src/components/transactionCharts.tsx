import React, { FC, ReactElement, useMemo, useState, useCallback, useRef } from 'react';
import { View, Dimensions } from 'react-native';
import { TotalType } from './transactionPage';
import PieChartComponent from './charts/pieChart';
import { randomColor } from './charts/index';
import { PieChartData } from 'react-native-svg-charts';
import { APP_DEFAULT_COLORS } from '../constants';
import Carousel from 'react-native-snap-carousel';
import { styles } from '../style';

interface TransactionChartsProp {
    total: Array<TotalType>
    list: Array<any>,
    transactionTypeList: Array<any>,
    onBack: () => void
}

const TransactionCharts: FC<TransactionChartsProp> = (props): ReactElement => {
    const { total, list, transactionTypeList } = props;
    const [curr, updateCurr] = useState<number>(0);
    const chartDataSet: Array<Array<PieChartData>> = useMemo(() => {
        let subTypes = transactionTypeList.map(x => {
            let total = 0;
            for (let i = 0; i < list.length; i++) {
                if (list[i].transactionTypeId === x.transactionTypeId)
                    total += list[i].amount;
            }
            return {
                ...x,
                total
            }
        });
        let separateChartDataSet: Array<Array<PieChartData>> = [];
        const totalChartData: Array<PieChartData> = total.map(x => {
            separateChartDataSet.push(
                subTypes
                    .filter(y => x.label === y.transactionClassification)
                    .map(z => ({
                        key: z.transactionTypeName,
                        value: z.total,
                        svg: {
                            fill: randomColor(),
                            onPress: () => { }
                        }
                    }))
            );
            return {
                key: x.label,
                value: x.value,
                svg: {
                    fill: x.valueColor,
                    onPress: () => { }
                }
            }
        });
        return [totalChartData, ...separateChartDataSet];
    }, [total, list, transactionTypeList]);
    const carouselIndicators = useMemo(
        () =>
            <View style={styles[`${TransactionCharts.displayName}-carousel-indicator-container`]}>
                {chartDataSet.map((_, ind) => <View
                    key={`carousel-dots-${ind}`}
                    style={{
                        ...styles[`${TransactionCharts.displayName}-carousel-indicator-container`],
                        ...(curr === ind && { backgroundColor: APP_DEFAULT_COLORS.APP_COLOR })
                    }}
                ></View>)}
            </View>
        ,
        [chartDataSet.length, curr]
    );
    const renderItem = useCallback(
        ({ item }) =>
            <View style={styles[`${TransactionCharts.displayName}-carousel-item-container`]}>
                <PieChartComponent
                    data={item || []}
                />
            </View>
        ,
        []
    );
    const carousel = useMemo(
        () =>
            <View style={styles[`${TransactionCharts.displayName}-carousel-container`]}>
                <Carousel
                    data={chartDataSet}
                    renderItem={renderItem}
                    onSnapToItem={ind => updateCurr(ind)}
                    sliderWidth={300}
                    itemWidth={Dimensions.get('window').width - 20}
                    layout={'default'}
                />
            </View>
        ,
        [chartDataSet, renderItem]
    );
    return (
        <>
            {carouselIndicators}
            {carousel}
        </>
    )
}

TransactionCharts.displayName = 'transactionCharts';
export default TransactionCharts;