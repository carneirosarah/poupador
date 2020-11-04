import React from 'react'
import styled from 'styled-components/native'

const InputArea = styled.View`
    width: 100%;
    height: 60px;
    background-color: #ffebee;
    flex-direction: row;
    border-radius: 30px;
    padding-left: 15px;
    align-items: center;
    margin-bottom: 15px;
`

const Input = styled.TextInput`
    flex: 1;
    font-size: 16px;
    color: #565353;
    margin-left: 10px;
`

export default ({IconSvg, pholder, val, changeText, pass}) => {
    return(

        <InputArea>
            <IconSvg width="24" height="24" fill="#565353" />
            <Input
                placeholder={pholder}
                placeholderTextColor="#565353"
                value={val}
                onChangeText={changeText}
                secureTextEntry={pass}
            />
        </InputArea>

    );
}