
export interface ChartProps<T> {
    style?: React.CSSProperties,
    data: Array<T>
}

export interface ChartDataSvgObject {
    fill: string,
    onPress?: () => void
}

export const randomColor = (): string => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7);