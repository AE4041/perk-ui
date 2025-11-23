import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { Button } from "@perk-ui/components"


export default function App() {
    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ marginBottom: 12 }}>Button examples</Text>
            <View style={{ gap: 10 }}>
                <Button variant="primary" onPress={() => alert('Pressed')}>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button size="large" disabled>
                    Disabled
                </Button>
            </View>
        </SafeAreaView>
    );
}