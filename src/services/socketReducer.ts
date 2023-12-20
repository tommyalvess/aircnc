// socketReducer.ts
interface SocketState {
    conectado: boolean;
  }
  
  const initialState: SocketState = {
    conectado: false,
  };
  
  const socketReducer = (state: SocketState = initialState, action: any): SocketState => {
    switch (action.type) {
      case 'CONECTAR_SOCKET':
        return { ...state, conectado: true };
      case 'DESCONECTAR_SOCKET':
        return { ...state, conectado: false };
      default:
        return state;
    }
  };
  
  export default socketReducer;
  