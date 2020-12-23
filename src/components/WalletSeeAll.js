import React, { useState } from 'react'
import styled from 'styled-components/native'
import Visibility from '../assets/visibility.svg'
import VisibilityOff from '../assets/visibility_off.svg'

const VisibilityItem = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
`
const Text = styled.Text`
    color: #565353;
    font-size: 16px;
    font-weight:bold;
    padding: 5px;
`

export default ({onClickSeeAll, seeAll}) => {
    
    const [selected, setSelected] = useState(seeAll)
    
    const onVisibilityClick = (bool) => {

        setSelected(bool)
        onClickSeeAll(bool)
    }

    if (selected) {

        return (
            <VisibilityItem onPress={() => onVisibilityClick(false)}>
                <VisibilityOff width="20" height="20" fill="#565353"/>
                <Text> Ver transações por período</Text>
            </VisibilityItem>
        )

    } else {

        return (
            <VisibilityItem onPress={() => onVisibilityClick(true)}>
                <Visibility width="20" height="20" fill="#565353"/>
                <Text> Ver todas as transações</Text>
            </VisibilityItem>
        )
    }
}