import React from 'react'
import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
    background-color:#ffcdd2;
    flex: 1;
`

export const Scroller = styled.ScrollView`
    flex: 1;
`

export const Header = styled.View`
    background-color:#ffcdd2;;
    width: 100%;
    height: 200px;
    justify-content: center;
    align-items: center;
`

export const HeaderTitle = styled.View`
    width: 90%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
`

export const HeaderReceived = styled.Text`
    font-size: 22px;
    font-weight: bold;
    color: #008f3e;
    padding: 5px;
`

export const HeaderBalance = styled.Text`
    font-size: 28px;
    font-weight: bold;
    color: #000000;
    padding: 5px;
`

export const HeaderSpent = styled.Text`
    font-size: 22px;
    font-weight: bold;
    color: #d32f2f;
    padding: 5px;
`
export const LoadingIcon = styled.ActivityIndicator``

export const ListArea = styled.View`
    margin-top: 30px;
    margin-bottom: 30px;
    justify-content: center;
    align-items: center;
`

export const DateSelector = styled.View`
    flex-direction: row;
`
export const DatePrevArea = styled.TouchableOpacity`
    flex: 1;
    justify-content: flex-end;
    align-items: flex-end;
`
export const DateTitleArea = styled.View`
    width: 140px;
    justify-content: center;
    align-items: center;
`
export const DateNextArea = styled.TouchableOpacity`
    flex: 1;
    align-items: flex-start;
`
export const DateTitle = styled.Text`
    font-size: 17px;
    font-weight: bold;
    color: #000000;
`