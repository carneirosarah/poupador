import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Transactions from '../screens/Transactions'
import Wallet from '../screens/Wallet'
import Profile from '../screens/Profile'

const Tab = createBottomTabNavigator()

export default() => (

    <Tab.Navigator>
        <Tab.Screen name="Wallet" component={Wallet} />
        <Tab.Screen name="Transactions" component={Transactions} />
        <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
)