// AsyncStorageManager.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export const carregarUsuario = async (): Promise<string | null> => {
  try {
    const usuarioArmazenado = await AsyncStorage.getItem('user');
    return usuarioArmazenado;
  } catch (error) {
    console.error('Erro ao carregar o usuário do AsyncStorage', error);
    return null;
  }
};

export const salvarUsuario = async (novoUsuario: string): Promise<void> => {
  try {
    await AsyncStorage.setItem('user', novoUsuario);
    console.log('Usuário armazenado com sucesso!');
  } catch (error) {
    console.error('Erro ao armazenar o usuário no AsyncStorage', error);
  }
};
