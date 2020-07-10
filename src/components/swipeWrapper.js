import React from 'react';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

export default function swipeWrapper(props) {
    const swipeDirectionHandler = (direction, state) => {
        props.onSwipe && props.onSwipe(direction);
    }
    const swipeHandler = (direction, state) => {
        const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
        return;
    }
    return <GestureRecognizer
        onSwipe={swipeHandler}
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