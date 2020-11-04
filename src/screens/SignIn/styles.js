import React from 'react'
import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
    background-color:#ffcdd2;
    flex: 1;
    justify-content: center;
    align-items: center;
`

export const InputArea = styled.View`
    width: 100%;
    padding: 40px;
`
export const CustomButton = styled.TouchableOpacity`
    height: 60px;
    background-color: #cb9ca1;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
`
export const CustomButtonText = styled.Text`
    font-size: 18px;
    color: #565353;
`
export const SignMessageButton = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    margin-top: 50px;
    margin-bottom: 20px;
`
export const SignMessageButtonText = styled.Text`
    font-size: 16px;
    color: #565353;
`
export const SignMessageButtonTextBold = styled.Text`
    font-size: 16px;
    color: #565353;
    font-weight:bold;
    margin-left: 5px;
`


/* InputArea, 
    CustomButton, 
    CustomButtonText, 
    SignMessageButton, 
    SignMessageButtonText, 
    SignMessageButtonTextBold */