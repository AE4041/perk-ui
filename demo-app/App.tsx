import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Button, BottomSheet } from '@perk-ui/components';

export default function App() {
    const [visible, setVisible] = useState(false);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <SafeAreaView style={styles.safeArea}>
                    <Text style={styles.heading}>Button examples</Text>

                    <View style={styles.buttonGroup}>
                        <Button variant="solid" onPress={() => setVisible(true)}>
                            Primary
                        </Button>

                        <Button variant="subtle" onPress={() => { }}>
                            Secondary
                        </Button>

                        <Button variant="text" onPress={() => { }}>
                            Ghost
                        </Button>

                        <Button size="large" variant="outlined" onPress={() => { }} disabled>
                            Disabled
                        </Button>
                    </View>

                    <BottomSheet
                        visible={visible}
                        maxHeight={300}
                        onRequestClose={() => setVisible(false)}
                        showHandleBar
                        enableSwipeToClose
                        enableOverlayTapToClose
                    >
                        <View>
                            <Text>Emmanuel</Text>
                            <Text>Emmanuel</Text>
                            <Text>Emmanuel</Text>
                            <Text>Emmanuel</Text>
                            <Text>Emmanuel</Text>
                            <Text>Emmanuel</Text>
                            <Text>Emmanuel</Text>
                            <Text>Emmanuel</Text>
                            <Text>Emmanuel</Text>
                            <Text>Emmanuel</Text>
                        </View>
                    </BottomSheet>
                </SafeAreaView>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    heading: {
        marginBottom: 16,
        fontSize: 18,
        fontWeight: '600',
    },
    buttonGroup: {
        width: '100%',
        gap: 12,
    },
    sheetContent: {
        padding: 16,
    },
    sheetText: {
        fontSize: 16,
        marginBottom: 12,
    },
});
