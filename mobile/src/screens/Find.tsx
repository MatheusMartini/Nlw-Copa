import { Heading, useToast, VStack } from "native-base";

import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useState } from "react";
import { api } from "../services/api";
import { useNavigation } from "@react-navigation/native";

export function Find(){

    const [isLoading, setIsLoading] = useState(false);
    const [code, setCode] = useState('');

    const toast = useToast();
    const { navigate } = useNavigation();

    async function handleJoinPool(){

        try {
            
            setIsLoading(true)

            if(!code.trim()){
                return toast.show({
                    title: 'Informe o código',
                    placement: 'top',
                    bgColor: 'red.500'
                });
            }

            await api.post('/pools/join', { code });

            toast.show({
                title: 'Voce entrou no bolão com sucesso',
                placement: 'top',
                bgColor: 'green.500'
            });

            navigate('pools')
            setIsLoading(false)

        } catch (error) {
            
            console.log(error)
            setIsLoading(false)
            console.log(error.response.data.message)
            if(error.response?.data?.message === 'pool not found'){
                toast.show({
                    title: 'Bolão nao encontrado',
                    placement: 'top',
                    bgColor: 'red.500'
                });
            }
            if(error.response?.data?.message === 'you already joined this pool'){
                toast.show({
                    title: 'Voce ja esta participando de um bolão',
                    placement: 'top',
                    bgColor: 'red.500'
                });
            }

            toast.show({
                title: 'caiu aqui',
                placement: 'top',
                bgColor: 'red.500'
            });

        } 
    }

    return(
        <VStack flex={1} bgColor="gray.900">
            <Header title="Buscar por código" showBackButton/>

            <VStack mt={8} mx={5} alignItems="center">
            
                <Heading fontFamily="heading" color="white" fontSize="xl" mb="8" textAlign="center">
                    Encontre um bolão através de {'\n'} seu código único
                </Heading>

                <Input
                    mb={2}
                    placeholder="Qual o código do bolão?"
                    autoCapitalize="characters"
                    onChangeText={setCode}
                />

                <Button
                    title="BUSCAR BOLÃO"
                    isLoading={isLoading}
                    onPress={handleJoinPool}
                />

            </VStack>

        </VStack>
    );
}