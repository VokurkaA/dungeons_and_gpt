import { Box, Typography, TextField } from '@mui/material';
import { useState, useRef } from 'react';
import { Send } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import useMessages from './hooks/message';

const Chat = () => {
    const [input, setInput] = useState('');
    const { messages, handleSendMessage } = useMessages();

    const messagesEndRef = useRef<HTMLDivElement>(null);
    // const [loading, setLoading] = useState(false);

    // const scrollToBottom = () => {
    //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    // }

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
                <div ref={messagesEndRef} /> {/* Anchor div */}
            </div>
            <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
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
