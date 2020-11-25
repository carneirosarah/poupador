import React, { useState } from 'react'
import styled from 'styled-components/native'
import RatioChecked from '../assets/radio_button_checked.svg'
import RatioUnchecked from '../assets/radio_button_unchecked.svg'

const RatioArea = styled.View`
    height: 80px;
    background-color: #ffcdd2;
    flex-direction: row;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
`
const RatioItem = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 30px;
`
const Text = styled.Text`
    color: #565353;
    font-size: 20px;
    font-weight:bold;
    padding: 5px;
`
export default ({onChangeType}) => {
    const [checked, setChecked] = useState(false)
    const [type, setType] = useState('')

    const onRadioCheck = (transactionType) => {
        setChecked(true)
        setType(transactionType)
        onChangeType(transactionType)
    }
    if (checked) {

        if (type === 'R') {

            return (
                <RatioArea>
                    <RatioItem onPress={() => onRadioCheck('R')}>
                        <RatioChecked width="20" height="20" fill="#565353"/>
                        <Text> Receita </Text>
                    </RatioItem>
                    <RatioItem onPress={() => onRadioCheck('D')} >
                        <RatioUnchecked width="20" height="20" fill="#565353"/>
                        <Text> Despesa </Text>
                    </RatioItem>
                </RatioArea>
            )
        } else {

            return (
                <RatioArea>
                    <RatioItem onPress={() => onRadioCheck('R')}>
                        <RatioUnchecked width="20" height="20" fill="#565353"/>
                        <Text> Receita </Text>
                    </RatioItem>
                    <RatioItem onPress={() => onRadioCheck('D')}>
                        <RatioChecked width="20" height="20" fill="#565353"/>
                        <Text> Despesa </Text>
                    </RatioItem>
                </RatioArea>
            )

        }

    } else {

        return (
            <RatioArea>
                <RatioItem onPress={() => onRadioCheck('R')}>
                    <RatioUnchecked width="20" height="20" fill="#565353"/>
                    <Text> Receita </Text>
                </RatioItem>
                <RatioItem onPress={() => onRadioCheck('D')}>
                    <RatioUnchecked width="20" height="20" fill="#565353"/>
                    <Text> Despesa </Text>
                </RatioItem>
            </RatioArea>
        )
    }
}