import React, { FC, ReactElement, useMemo, useCallback } from 'react';
import { PieChart, PieChartData } from 'react-native-svg-charts'
import { ChartProps, randomColor } from './index';
import { View, Text, ScrollView } from 'react-native';
import { styles } from '../../style';


interface PieChartProps extends ChartProps<PieChartData> { };

const PieChartComponent: FC<PieChartProps> = (props: PieChartProps): ReactElement => {
    const { data } = props;
    const element = useMemo(() => {
        const Chart = <PieChart
            style={styles[`${PieChartComponent.displayName}-chart`]}
            data={data}
        />
        const Label = <ScrollView
            style={styles[`${PieChartComponent.displayName}-label-container`]}
        >
            {data.map(x =>
                <View
                    key={`pie-label-${x.key}`}
                    style={styles[`${PieChartComponent.displayName}-label-item-container`]}
                >
                    <View
                        style={{
                            ...styles[`${PieChartComponent.displayName}-label-item-indicator`],
                            backgroundColor: x.svg?.fill
                        }}
                    ></View>
                    <Text
                        style={styles[`${PieChartComponent.displayName}-label-item-text`]}
                    >
                        {`${x.key} - ${x.value?.toFixed(2)}`}
                    </Text>
                </View>
            )}
        </ScrollView>
        return <>
            {Chart}
            {Label}
        </>
    }, [data]);
    return element;
}
export const dataGenerator = (data: Array<number>) => {
    return data
        .filter((value) => value > 0)
        .map((value, index) => ({
            value,
            svg: {
                fill: randomColor(),
                onPress: () => { }
            },
            key: `pie-${index}`,
        }))
}

PieChartComponent.displayName = 'pieChartComponent';
export default PieChartComponent;