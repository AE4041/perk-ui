import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { Button } from "@perk-ui/components"

export default function App() {
    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ marginBottom: 12 }}>Button examples</Text>
            <View style={{ gap: 10 }}>
                <Button variant="solid" onPress={() => alert('Pressed')}>Primary</Button>
                <Button variant="subtle" onPress={() => { }} >Secondary</Button>
                <Button variant="text" onPress={() => { }}>Ghost</Button>
                <Button size="large" variant="outlined" onPress={() => { }} disabled>
                    Disabled
                </Button>
            </View>
        </SafeAreaView>
    );
}