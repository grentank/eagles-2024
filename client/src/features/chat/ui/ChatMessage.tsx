import React from 'react';
import { Card } from 'react-bootstrap';
import type { MessageT } from '../../../entities/message/model/types';
import { useAppSelector } from '../../../shared/lib/hooks';
import { UserStatusEnum } from '../../../entities/auth/model/schema';

type ChatMessageProps = {
  message: MessageT;
};

export default function ChatMessage({ message }: ChatMessageProps): JSX.Element {
  const user = useAppSelector((state) => state.auth.user);
  const owner =
    user.status === UserStatusEnum.logged ? user.id === message.userId : false;
  return (
    <Card
      className="mb-2"
      style={{
        backgroundColor: owner ? '#cce5ff' : '#f0f0f0',
        alignSelf: owner ? 'flex-end' : 'flex-start',
        maxWidth: '70%',
      }}
    >
      <Card.Body>
        <p className="mb-0">{message.text}</p>
      </Card.Body>
    </Card>
  );
}
