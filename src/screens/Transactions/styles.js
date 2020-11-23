import React from 'react'
import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
    background-color:#ffcdd2;
    flex: 1;
`
export const PageHeader = styled.View`
    width: 100%;
    height: 200px;
    justify-content: center;
    align-items: center;
`
export const PageBody = styled.View`
    margin: 30px;
    min-height: 400px;
    align-items: center;
`
export const InputArea = styled.View`
    width: 100%;
    height: 60px;
    background-color: #ffebee;
    flex-direction: row;
    border-radius: 30px;
    padding-left: 15px;
    align-items: center;
    margin-bottom: 15px;
`

export const Input = styled.TextInput`
    flex: 1;
    font-size: 16px;
    color: #565353;
    margin-left: 10px;
`