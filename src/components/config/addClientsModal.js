import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../config';
import { stylesConfigs } from '../../../assets/css/config';

const AddClientsComponent = () => {
    const [cpf, setCpf] = useState('');
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');

    const handleCreateClient = async () => {
        try {
            if (!cpf || !nome || !telefone) {
                Alert.alert('Erro', 'Por favor, preencha todos os campos');
                return;
            }
            await addDoc(collection(db, 'clientes'), {
                cpf,
                nome,
                telefone,
            });
            setCpf('');
            setNome('');
            setTelefone('');

            Alert.alert('Sucesso', 'Cliente criado com sucesso!');
        } catch (error) {
            console.error('Erro ao criar cliente:', error);
            Alert.alert('Erro', 'Erro ao criar cliente. Por favor, tente novamente.');
        }
    };
    return (
        <View style={stylesConfigs.formClientContainer}>
            <Text style={stylesConfigs.formClientTitle}>Cadastar Cliente</Text>
            <View>
                <Text style={stylesConfigs.formClientLabel}>CPF</Text>
                <TextInput
                    value={cpf}
                    onChangeText={setCpf}
                    placeholder="000.000.000-00"
                    keyboardType="numeric"
                    style={stylesConfigs.formClient}
                />
            </View>
            <View>
                <Text style={stylesConfigs.formClientLabel}>Nome</Text>
                <TextInput
                    value={nome}
                    onChangeText={setNome}
                    placeholder="Nome do cliente"
                    style={stylesConfigs.formClient}
                />
            </View>
            <View>
                <Text style={stylesConfigs.formClientLabel}>Telefone</Text>
                <TextInput
                    value={telefone}
                    onChangeText={setTelefone}
                    placeholder="(00) 00000-0000"
                    keyboardType="numeric"
                    style={stylesConfigs.formClient}
                />
            </View>
            <Button title="Criar Cliente" onPress={handleCreateClient} />
        </View>
    )
}

export default AddClientsComponent;
