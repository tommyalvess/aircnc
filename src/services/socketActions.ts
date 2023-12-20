// socketActions.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dispatch } from 'redux';
import io, { Socket } from 'socket.io-client';

interface ConectarSocketAction {
  type: 'CONECTAR_SOCKET';
}

interface DesconectarSocketAction {
  type: 'DESCONECTAR_SOCKET';
}

export type SocketActionTypes = ConectarSocketAction | DesconectarSocketAction;

let socket: Socket | null = null;

export const conectarSocket = () => {
  return async (dispatch: Dispatch) => {
    try {
      const user_id = await AsyncStorage.getItem('user_id');
      socket = io('http://192.168.1.10:3333', {
        query: { user_id: "6578e78a45ae73e336320d28"},
      });

      // Conecte o socket
      socket.connect();

      // Despache a ação para indicar que o socket foi conectado
      dispatch({ type: 'CONECTAR_SOCKET' });

      // Retorne o socket para que possa ser usado em outros lugares
      return socket;
    } catch (error) {
      console.error('Erro ao conectar o socket:', error);
      throw error;
    }
  };
};

export const desconectarSocket = () => {
  // Desconectar o socket se estiver conectado
  if (socket && socket.connected) {
    socket.disconnect();
  }

  // Limpar a referência do socket
  socket = null;
};

export const getSocket = () => {
  return socket;
};
