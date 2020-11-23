import React from 'react'
import styled from 'styled-components/native'

import WalletIcon from '../assets/wallet.svg'
import PlusIcon from '../assets/plus.svg'
import ProfileIcon from '../assets/user.svg'

const TabArea = styled.View`
    height: 60px;
    background-color: #cb9ca1;
    flex-direction: row;
`

const TabItem = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
`

const TabItemCenter = styled.TouchableOpacity`
    width: 70px;
    height: 70px;
    justify-content: center;
    align-items: center;
    background-color: #FFFFFF;
    border-radius: 35px;
    border: 3px solid #cb9ca1;
    margin-top: -20px;
`
export default ({state, navigation}) => {

    const router = (screen) => {
        navigation.navigate(screen)
    }

    return (
        <TabArea>
            <TabItem onPress={() => router('Wallet')}>
                <WalletIcon style={{opacity: state.index===0 ? 1 : 0.5}} width="40" height="40" fill="#FFFFFF"/>
            </TabItem>
            <TabItemCenter onPress={() => router('Transactions')}>
                <PlusIcon width="70" height="70" fill="#008f3e"/>
            </TabItemCenter>
            <TabItem onPress={() => router('Profile')}>
                <ProfileIcon style={{opacity: state.index===2 ? 1 : 0.5}} width="40" height="40" fill="#FFFFFF"/>
            </TabItem>
        </TabArea>
    )
}