import { Box, Typography, TextField } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import { Send } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import useMessages from './hooks/message';

const Chat = () => {
    const [input, setInput] = useState('');
    const { messages, handleSendMessage, isLoading } = useMessages();

    const messagesEndRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <Box className="flex flex-col flex-1 p-4 space-y-4 bg-gray-800">
            <Typography
                variant="h6"
                className="text-white font-semibold">
                Dungeons and GPT
            </Typography>
            <div className="flex flex-1 flex-col space-y-3 overflow-y-auto">
                {messages && messages.map((message, index) => (
                    <div key={index} className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'}`}>
                        <div className={`px-4 py-2 rounded-lg max-w-[80%] ${message.sender === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-700 text-gray-100'
                            }`}>
                            <Typography variant="body1">
                                {message.text}
                            </Typography>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-center">
                        <Typography variant="body1" className="text-gray-400">
                            Loading...
                        </Typography>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={(e) => handleSendMessage(e, input, setInput)} className="mt-4 flex gap-2">
                <TextField fullWidth value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." className="bg-gray-700 rounded-xl my-2"
                    slotProps={{ input: { className: "text-gray-100 placeholder:text-gray-400" } }}
                />
                <IconButton type="submit" className="bg-blue-500 hover:bg-blue-600 text-white self-center">
                    <Send />
                </IconButton>
            </form>
        </Box>
    );
};

export default Chat;
