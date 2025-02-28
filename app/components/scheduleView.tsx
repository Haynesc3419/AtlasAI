import { template } from '@babel/core';
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TRIP_ITENERARY } from "../constants/templates.json";

const ScheduleView = (schedule: any) => {
    
    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.sectionTitle}>Transits</Text>
                {schedule.transits.map((transit, index) => (
                    <View key={index} style={styles.card}>
                        <Text style={styles.cardTitle}>{transit.from} to {transit.to}</Text>
                        <Text>Mode: {transit.mode}</Text>
                        <Text>Price: ${transit.price}</Text>
                        <Text>Departure: {new Date(transit.departure).toLocaleString()}</Text>
                        <Text>Arrival: {new Date(transit.arrival).toLocaleString()}</Text>
                    </View>
                ))}
                <Text style={styles.sectionTitle}>Lodging</Text>
                {schedule.lodging.map((lodging, index) => (
                    <View key={index} style={styles.card}>
                        <Text style={styles.cardTitle}>{lodging.name}</Text>
                        <Text>Address: {lodging.address}</Text>
                        <Text>Price: ${lodging.price} per night</Text>
                        <Text>Check-in: {lodging.check_in}</Text>
                        <Text>Check-out: {lodging.check_out}</Text>
                    </View>
                ))}
                <Text style={styles.sectionTitle}>Destinations</Text>
                {schedule.destinations.map((destination, index) => (
                    <View key={index} style={styles.card}>
                        <Text style={styles.cardTitle}>{destination.location}</Text>
                        <Text>Arrival Date: {destination.arrival_date}</Text>
                        <Text>Departure Date: {destination.departure_date}</Text>
                        <Text>Activities:</Text>
                        {destination.activities.map((activity, idx) => (
                            <Text key={idx} style={styles.activity}>- {activity}</Text>
                        ))}
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: 20,
        width: '80%',
        height: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: 'black',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
        position: 'absolute',
        top: '10%',
        left: '10%',

    },
    message: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    sectionTitle: {
        fontSize: 22,
        marginVertical: 10,
        color: '#444',
    },
    card: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
    },
    cardTitle: {
        fontSize: 18,
        marginBottom: 5,
        color: '#333',
    },
    activity: {
        marginLeft: 10,
        color: '#555',
    },
});

export default ScheduleView;