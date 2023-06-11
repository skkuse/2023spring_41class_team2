import React, { useContext, useEffect, useRef, useState } from 'react';
import { theme } from '../styles/theme';
import { styled } from 'styled-components';
import { UserContext } from '../utils/UserProvider';
import { Button, Form } from 'react-bootstrap';
import { commonAxios } from '../utils/commonAxios';
import { getAiResponse } from '../utils/getAiResponse';
import send_icon from '../assets/send-message.png';
import user_icon from '../assets/user.png';
import gpt_icon from '../assets/chat.png';
import { StyledText } from '../styles/StyledText';

interface ChatMessageProps {
    speaker: string;
    content: string;
}

const Chatbox = (props: any) => {
    const [messages, setMessages] = useState<ChatMessageProps[]>([]);
    const { userid, nickname, email } = useContext(UserContext);
    const [currentInput, setCurrentInput] = useState('');

    const chatMessageContainer = useRef<HTMLDivElement | null>(null);
    const chatMessageInput = useRef(null);

    useEffect(() => {
        getMessages();
    }, [props.problemid, userid]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        setCurrentInput(props.selectedQuestion);
    }, [props.selectedQuestion]);

    const sendMessage = async () => {
        if (currentInput.length === 0) {
            return;
        }

        const newQuestion = {
            speaker: 'User',
            content: currentInput,
        };

        setMessages((prevMessages) => [...prevMessages, newQuestion]);

        commonAxios
            .post(
                `/users/${userid}/solved/${props.problemid}/chat/`,
                newQuestion
            )
            .then((res) => {
                if (res.status === 200) {
                    setMessages((messages) => [...messages, newQuestion]);
                }
            })
            .catch((err) => {
                console.log(err);
            });

        setCurrentInput('');

        let answer = await getAiResponse(currentInput);
        if (answer === 'Error') {
            answer = 'There is a problem with the server.';
        }
        const newAnswer = {
            speaker: 'Chatbot',
            content: answer,
        };

        setMessages((prevMessages) => [...prevMessages, newAnswer]);

        commonAxios
            .post(`/users/${userid}/solved/${props.problemid}/chat/`, newAnswer)
            .then((res) => {
                if (res.status === 200) {
                    setMessages((messages) => [...messages, newAnswer]);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getMessages = () => {
        commonAxios
            .get(`/users/${userid}/solved/${props.problemid}/chat/`)
            .then((res) => {
                if (res.status === 200) {
                    setMessages(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const scrollToBottom = () => {
        if (chatMessageContainer.current) {
            chatMessageContainer.current.scrollTop =
                chatMessageContainer.current.scrollHeight;
        }
    };

    const SendByEnter = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <ChatboxContainer>
            <ChatMessageContainer ref={chatMessageContainer}>
                {messages.map((message: any) => {
                    return (
                        <ChatMessage key={message.id}>
                            <img
                                src={
                                    message.speaker === 'User'
                                        ? user_icon
                                        : gpt_icon
                                }
                                alt={message.speaker}
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    marginRight: '10px',
                                    borderRadius: '50%',
                                }}
                            />
                            <StyledText style={{ color: 'black' }}>
                                {message.content}
                            </StyledText>
                        </ChatMessage>
                    );
                })}
            </ChatMessageContainer>
            <InputContainer>
                <Form.Control
                    ref={chatMessageInput}
                    as="textarea"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyDown={SendByEnter}
                    style={{
                        overflowY: 'auto',
                        maxHeight: '500px',
                    }}
                />
                <img
                    src={send_icon}
                    alt="Send"
                    style={{
                        width: '50px',
                        height: '50px',
                        marginLeft: '10px',
                        cursor: 'pointer',
                    }}
                    onClick={sendMessage}
                />
            </InputContainer>
        </ChatboxContainer>
    );
};

export default Chatbox;

const ChatboxContainer = styled.div`
    background-color: ${theme.colors.grey};
    border-radius: 10px;
    width: 100%;
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const ChatMessageContainer = styled.div`
    padding: 1rem;
    overflow-y: auto;
    max-height: 80vh;

    &::-webkit-scrollbar {
        width: 10px;
    }
    &::-webkit-scrollbar-track {
        background-color: ${({ theme }) => theme.colors.grey};
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${({ theme }) => theme.colors.white};
        border-radius: 10px;
    }
`;

const InputContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-top: 1px solid ${theme.colors.grey};
`;

const ChatMessage = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    border: 1px solid ${theme.colors.lightgreen};
    border-radius: 10px;
    background-color: ${theme.colors.lightgreen};
`;
