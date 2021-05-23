import { Dot, Spacer, Table, User } from "@geist-ui/react";
import { EventTypes, KeywordMessage, useTetherMessageListener } from "@esportlayers/io";
import { ReactElement, useCallback, useEffect, useMemo, useState } from "react";

import ChatListenerMessage from "./ChatListenerMessage";
import ChatMessageAction from "./ChatMessageAction";
import { LoadingContextProvider } from "context/LoadingContext";
import dayjs from "dayjs";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";

type MessageValue = KeywordMessage['value'];


function mergeQuestions(
  oldState: MessageValue[],
  newState: MessageValue[]
): MessageValue[] {
  if (newState.length) {
    const newQuestions = newState.filter(
      ({ message }) =>
        !oldState.find(({ message: oldMessage }) => oldMessage === message)
    );
    if (newQuestions.length) {
      return [...newQuestions, ...oldState];
    }
  }
  return oldState;
}

function useChatListenerData(): {
  messages: MessageValue[],
  onHold: boolean;
  setOnHold: (onHold: boolean) => void;
  queueSize: number
} {
  const [storedMessages, setStoredMessages] = useLocalStorageState<string>('chatListener', '[]');
  const [messages, setMessages] = useState<MessageValue[]>([]);
  const [onHold, setOnHold] = useState(false);
  const [queue, setQueue] = useState<MessageValue[]>([]);

  useEffect(() => {
    if (!messages.length && JSON.parse(storedMessages).length > 0) {
      setMessages(JSON.parse(storedMessages) as MessageValue[]);
    }
  }, [storedMessages]);

  useEffect(() => {
    if (messages.length > 0) {
      setStoredMessages(JSON.stringify(messages.splice(0, 50)))
    }
  }, [messages]);

  const { value: newMessage } = useTetherMessageListener<KeywordMessage>(
    EventTypes.keyword_message
  );

  const handleNewMessage = useCallback((newMessage) => {
    if (onHold) {
      setQueue((q) => mergeQuestions(q, [newMessage]));
    } else {
      setMessages((q) => mergeQuestions(q, [newMessage]));
    }
  }, [onHold])

  useEffect(() => {
    newMessage && handleNewMessage(newMessage);
  }, [newMessage]);

  useEffect(() => {
    if (!onHold && queue.length > 0) {
      setMessages((q) => mergeQuestions(q, queue));
      setQueue([]);
    }
  }, [onHold, queue])

  return { messages, onHold, setOnHold, queueSize: queue.length };
}

export default function ChatListenerTable(): ReactElement {
  const { messages, onHold, setOnHold, queueSize } = useChatListenerData();

  const tableData = useMemo(() => {
    return messages.sort(({ time: a, time: b }) => b - a).map(({ time, name, logo, message }) => ({
      action: ChatMessageAction,
      message: ChatListenerMessage,
      origin: { time, name, logo, message },
      time: dayjs.unix(time / 1000).format('MM.DD. HH:mm'),
      user: <User src={logo} name={name} />
    }));
  }, [messages])

  return <div>
    <Dot type={onHold ? 'secondary' : 'success'} style={{ marginRight: '20px' }}>{onHold ? `Queuing, size: ${queueSize}` : 'Live'}</Dot>

    <Spacer y={1} />

    <LoadingContextProvider>
      <Table data={tableData} onMouseEnter={() => setOnHold(true)} onMouseLeave={() => setOnHold(false)}>
        <Table.Column prop="time" label="Time" />
        <Table.Column prop="user" label="User" />
        <Table.Column prop="message" label="Message" />
        <Table.Column prop="action" label="" width={70} />
      </Table>
    </LoadingContextProvider>
  </div>;
}