import React, { useContext, useEffect, useRef, useState } from 'react';
import { theme } from '../styles/theme';
import { styled } from 'styled-components';
import { UserContext } from '../utils/UserProvider';
import { Button, Form } from 'react-bootstrap';
import { commonAxios } from '../utils/commonAxios';
import { getAiResponse } from '../utils/getAiResponse';

interface ChatMessageProps {
    speaker: string;
    content: string;
}

const Chatbox = (props: any) => {
    const [messages, setMessages] = useState<ChatMessageProps[]>([]);
    const { userid, nickname, email } = useContext(UserContext);
    const [currentInput, setCurrentInput] = useState('');

    useEffect(() => {
        getMessages();
    }, [props.problemid]);

    useEffect(() => {
        getMessages();
    }, []);

    useEffect(() => {
        getMessages();
    }, [currentInput]);

    useEffect(() => {
        setCurrentInput(props.selectedQuestion);
    }, [props.selectedQuestion]);

    const sendMessage = async () => {
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

    return (
        <ChatboxContainer>
            <ChatMessageContainer>
                {messages.map((message: any) => {
                    return (
                        <ChatMessage key={message.speaker}>
                            {message.content}
                        </ChatMessage>
                    );
                })}
            </ChatMessageContainer>
            <InputContainer>
                <Form.Control
                    as="textarea"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    style={{
                        overflowY: 'auto',
                        maxHeight: '500px',
                    }}
                />
                <Button onClick={sendMessage}>Send</Button>
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
`;
