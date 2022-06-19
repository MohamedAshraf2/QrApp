import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from '@react-navigation/native';


export const Home = () => {
    const navigation = useNavigation();

    return (
        <View>
            <Text>Hellow from home</Text>
            <Button
                title="Creat New"
                onPress={() => {
                    navigation.navigate('NewPage');
                }}
            />
        </View>
    )
}