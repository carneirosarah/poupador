import React, { useState } from 'react'
import {Image} from 'react-native'
import { Container,
         PageHeader,
         PageBody,
         InputArea,
         Input
} from '../Transactions/styles'

export default () => {
    const [categoria, setCategoriaField] = useState('')
    const [desc, setDescField] = useState('')
    return (
        <Container>
            <PageHeader>
                <Image source={ require('../../assets/pigIcon.png') } style = {{ width:100, height:100 }}/>
            </PageHeader>
            <PageBody>
                <InputArea>
                    <Input
                        placeholder="Categoria"
                        placeholderTextColor="#565353"
                        value={categoria}
                        onChangeText={e => setCategoriaField(e)}
                    />
                </InputArea>

                <InputArea  style = {{ height:100 }}>
                    <Input
                        placeholder="Descrição"
                        placeholderTextColor="#565353"
                        value={desc}
                        onChangeText={e => setDescField(e)}
                        multiline
                        maxLength={100}
                    />
                </InputArea>
            </PageBody>
        </Container>
    )
}