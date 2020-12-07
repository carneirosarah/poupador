import React from 'react'
import styled from 'styled-components/native'

export const Container = styled.SafeAreaView``

export const Scroller = styled.ScrollView`
    flex: 1;
    padding: 20px;
`

export const Header = styled.View`
    background-color:#cb9ca1;
    width: 100%;
    height: 200px;
    justify-content: center;
    align-items: center;
`

export const HeaderTitle = styled.View`
    width: 80%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
`

export const HeaderReceived = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #008f3e;
    padding: 5px;
`

export const HeaderBalance = styled.Text`
    font-size: 28px;
    font-weight: bold;
    color: #565353;
    padding: 5px;
`

export const HeaderSpent = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #d32f2f;
    padding: 5px;
`
export const LoadingIcon = styled.ActivityIndicator``
