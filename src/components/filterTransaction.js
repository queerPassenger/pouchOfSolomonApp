import React, { Fragment, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { styles } from '../style';
import DatePicker from 'react-native-datepicker'

export default function FilterTransaction(props) {
    const componentName = 'filterTransaction';
    const [fromDate, updateFromDate] = useState(props.fromDate);
    const [toDate, updateToDate] = useState(props.toDate);
    const ActionContainer = () => {
        return (
            <View style={styles[`${componentName}-action-container`]}>
                {/* <TouchableOpacity style={styles[`${componentName}-btn-container`]} onPress={props.onClose}>
                    <Text style={styles[`${componentName}-btn-text`]}>
                        CANCEL
                    </Text>
                </TouchableOpacity> */}
                <TouchableOpacity style={styles[`${componentName}-btn-container`]} onPress={() => props.onFilter({fromDate, toDate})}>
                    <Text style={styles[`${componentName}-btn-text`]}>
                        FILTER
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
    const DateContainer = () => {
        return(
            <View style={styles[`${componentName}-date-container`]}>
                <View style={styles[`${componentName}-date-sub-container`]}>
                    <DatePicker
                        style={{
                            width: 300
                        }}
                        date={fromDate}
                        mode="datetime"
                        placeholder="Select from date"
                        format="DD-MM-YYYY (HH:MM)"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36,     
                            borderRadius: 3,
                            fontWeight: 'bold'                   
                        }
                    
                        }}
                        onDateChange={(date) => {updateFromDate(date)}}
                    />
                </View>
                <View style={styles[`${componentName}-date-sub-container`]}>
                    <Image source={require('../assets/images/vertical-dots.png')} />
                </View>
                <View style={styles[`${componentName}-date-sub-container`]}>
                    <DatePicker
                        style={{
                            width: 300,
                        }}
                        date={toDate}
                        mode="datetime"
                        placeholder="Select from date"
                        format="DD-MM-YYYY (HH:MM)"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36,     
                            borderRadius: 3                   
                        }
                    
                        }}
                        onDateChange={(date) => {updateToDate(date)}}
                    />
                </View>
            </View>
        )
    }
    const FilterContainer = () => {
        return(
            <Fragment>
                <ScrollView>
                    <DateContainer />
                </ScrollView>                
            </Fragment>
        )
    }
    return (
        <View style={styles[`${componentName}-container`]}>
            <ActionContainer />
            <FilterContainer />
        </View>
    )
}