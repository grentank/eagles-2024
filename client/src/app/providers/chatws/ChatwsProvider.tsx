import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import ChatwsContext from './chatwsContext';
import { useAppDispatch, useAppSelector } from '../../../shared/lib/hooks';
import { UserStatusEnum } from '../../../entities/auth/model/schema';
import chatActionSchema from '../../../features/chat/model/actionSchema';

type ChatwsProviderProps = {
  children: JSX.Element;
};

export default function ChatwsProvider({ children }: ChatwsProviderProps): JSX.Element {
  const status = useAppSelector((state) => state.auth.user.status);
  const socketRef = useRef<WebSocket | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    function socketInit(): void {
      if (status === UserStatusEnum.logged) {
        const socket = new WebSocket('http://localhost:3000');
        socket.onopen = () => {
          console.log('Соединение открыто');
        };
        socket.onclose = () => {
          console.log('Сокет закрылся');
          setTimeout(socketInit, 3000);
        };
        socket.onerror = console.error;
        socket.onmessage = (message) => {
          const action = chatActionSchema.parse(JSON.parse(message.data as string));
          console.log(`Получено сообщение:`, action);
          dispatch(action);
        };
        socketRef.current = socket;
      }
    }
    socketInit();
  }, [status]);

  const sendData = useCallback((text: string) => {
    const socket = socketRef.current;
    if (!socket) return;
    const action = {
      type: 'NEW_MESSAGE',
      payload: text,
    };
    socket.send(JSON.stringify(action));
  }, []);

  const contextData = useMemo(() => ({ sendData }), []);

  return <ChatwsContext.Provider value={contextData}>{children}</ChatwsContext.Provider>;
}
