import { useState } from 'react'
import { Alert } from 'react-native'
import AsyncStorage
  from "@react-native-async-storage/async-storage";

import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { Container } from './styles'
import { InputAmount } from '../../components/InputAmount'
import { spendingCreate } from '../../spending/spendingCreate'
import { spendingGetAll } from '../../spending/spendingGetAll';

export function Dashboard() {

  const [fiscalNote, setFiscalNote] = useState('')
  const [impostId, setImpostId] = useState('')
  const [fiscalValue, setFiscalValue] = useState('')
  const [stateFiscal, setStateFiscal] = useState('')
  const [supplier, setSupplier] = useState('')
  const [impost, setImpost] = useState('')

  async function handleAddNewSpending() {

    // limpar o AsyncStorage no IOS
    // AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove)
    // Alert.alert('Atencao', 'Programa finalizado !!')
    // return

    // limpa o AsyncStorage no Android
    // await AsyncStorage.clear()
    // Alert.alert('Atencao', 'Programa finalizado !!')
    // return

    //1234, 6789, 1708 e 5952
    //Aceitar somente os estados do RJ, SP e MG
    //Totvs e Microsoft.



    if (fiscalNote.trim() === '' || impostId.trim() === ''
      || fiscalValue.trim() === '' || stateFiscal.trim() === ''
      || supplier.trim() === '') {
      return Alert.alert('Atencao',
        'Todos os campos devem ser preenchidos')
    }

    const validCodes = ['1234', '6789', '1708', '5952'];
    if (!validCodes.includes(impostId)) {
      Alert.alert('Código', 'Código inválido, são aceitos apenas os códigos 1234, 6789, 1708, 5952')
      return;
    }    

    const validStates = ['RJ','SP','MG'];
    const stateUpper = stateFiscal.toUpperCase();

    if (validStates.includes(stateUpper)) {
      setStateFiscal(stateUpper);
    }
    else {
      Alert.alert('Estado', 'Estado inválido, são aceitos apenas os estados RJ, SP, MG')
      return;
    }
    
    const validSuppliers = ['Microsoft','microsoft', 'Totvs', 'totvs'];
    if (!validSuppliers.includes(supplier)) {
      Alert.alert('Fornecedor', 'Fornecedor inválido, são aceitos apenas os fornecedores Microsoft e Totvs')
      return;
    }

     let impostValue = 0;


    if (impostId === '1234' || impostId === '6789' && stateUpper === 'RJ') {
      
     impostValue = 0.01;
     const readjustmentValue = parseFloat(fiscalValue) * impostValue + fiscalValue;
     Alert.alert('Valor do Imposto', `O valor de reajustado do imposto é de R$ ${readjustmentValue}`);
    } 

    else if(impostId === '1234' || impostId === '6789' && stateUpper === 'SP') {
     impostValue = 0.02;
     const readjustmentValue = parseFloat(fiscalValue) * impostValue + fiscalValue;
     Alert.alert('Valor do Imposto', `O valor de reajustado do imposto é de R$ ${readjustmentValue}`);
  
    }
    else if(impostId === '1234' || impostId === '6789' && stateUpper === 'MG') {
      
     impostValue = 0.03;
     const readjustmentValue = parseFloat(fiscalValue) * impostValue + fiscalValue;
      Alert.alert('Valor do Imposto', `O valor de reajustado do imposto é de R$ ${readjustmentValue}`);
    }
    
    else {
      Alert.alert('Valor do Imposto', 'Não há imposto para este código')
    }
    const data = {
      id: String(new Date().getTime()),
      fiscalNote,
      impostId,
      fiscalValue,
      stateFiscal,
      supplier,
      impost
    }

    setFiscalNote('')
    setImpostId('')
    setFiscalValue('')
    setStateFiscal('')
    setSupplier('')
    setImpost('')

    await spendingCreate(data)
    const result = await spendingGetAll()
    console.log(result)
  }

  return (
    <Container
    >
      <Header title='App Nota Fiscal' />

      <Input
        placeholder='Nota Fiscal'
        placeholderTextColor='black'
        value={fiscalNote}
        onChangeText={value => setFiscalNote(value)}
      />

      <Input
        placeholder='Código do Imposto'
        placeholderTextColor='black'
        value={impostId}
        onChangeText={value => setImpostId(value)}
        maxLength={4}
      />

      <InputAmount
        placeholder='Valor da Nota Fiscal'
        placeholderTextColor='black'
        value={fiscalValue}
        onChangeText={value => setFiscalValue(value)}
      />

      <Input
        placeholder='Estado'
        placeholderTextColor='black'
        value={stateFiscal}
        onChangeText={value => setStateFiscal(value)
        }
        
        maxLength={2}        
      />

      <Input
        placeholder='Fornecedor'
        placeholderTextColor='black'
        value={supplier}
        onChangeText={value => setSupplier(value)}
      />

      <Button
        title='Adicionar'
        onPress={handleAddNewSpending}
      />

    </Container>
  )
}