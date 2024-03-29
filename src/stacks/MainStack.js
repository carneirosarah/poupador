import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Load from '../screens/Load'
import SignIn from '../screens/SignIn'
import SignUp from '../screens/SignUp'
import Main from '../stacks/UserStack'

const Stack = createStackNavigator()

export default () => (
    <Stack.Navigator
        initialRouteName="Load"
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen name="Load" component={Load} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Main" component={Main} />
    </Stack.Navigator>
)