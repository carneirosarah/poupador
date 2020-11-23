import React from 'react'
import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
    background-color:#ffcdd2;
    flex: 1;
`
export const Scroller = styled.ScrollView `
    flex: 1;
`
export const PageHeader = styled.View`
    background-color:#cb9ca1;
    width: 100%;
    height: 200px;
    justify-content: center;
    align-items: center;
`
export const PageBody = styled.View`
    background-color:#ffcdd2;
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
    margin-top: -50px;
    min-height: 400px;
`
export const UserInfoArea = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

export const UserInfoName = styled.Text`
    color: #000000;
    font-size: 20px;
    font-weight:bold;
    margin-top: 30px;
`
export const UserActionsArea = styled.View`
    margin-top: 30px;
    margin-bottom: 30px;
    margin-left: 30px;
    margin-right: 30px;
    flex: 1;
`

export const ActionButton = styled.TouchableOpacity`
    margin-top: 30px;
    background-color: #ffebee;
    border-radius: 10px;
    padding: 20px 20px;
    justify-content: center;
    align-items: center;
`

export const ActionButtonText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #565353;
`

