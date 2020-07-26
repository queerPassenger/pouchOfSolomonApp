import React, { ReactElement, ReactNode } from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';

interface SwipeWrapperProps {
    onSwipe: (param: string) => void,
    children: ReactNode
}
const SwipeWrapper: React.FC<SwipeWrapperProps> = (props): ReactElement => {
    const swipeDirectionHandler = (direction: string, state: any) => {
        props.onSwipe && props.onSwipe(direction);
    }
    return <GestureRecognizer
        onSwipeUp={(state) => swipeDirectionHandler('up', state)}
        onSwipeDown={(state) => swipeDirectionHandler('down', state)}
        onSwipeLeft={(state) => swipeDirectionHandler('left', state)}
        onSwipeRight={(state) => swipeDirectionHandler('right', state)}
        config={{
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        }}
        style={{
            flex: 1,
        }}
    >
        {props.children}
    </GestureRecognizer>;
}
SwipeWrapper.displayName = 'swipeWrapper';
export default SwipeWrapper;