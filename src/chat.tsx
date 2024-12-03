import { Button, IconButton, List, ListItem, ListItemText, Paper, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Chat() {
    const handleSendMessage = () => {
        if (input.trim()) {
            setMessages([...messages, input]);
            setInput('');
        }
    };

    const handleClearMessages = () => {
        setMessages([]);
    };

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Array<string>>(localStorage.getItem('messages') ? JSON.parse(localStorage.getItem('messages') || '[]') : [])
    useEffect(() => {
        const storedMessages = localStorage.getItem('messages');
        if (storedMessages) {
            setMessages(JSON.parse(storedMessages));
        }
    }, []);

    useEffect(() => {
        const handler = setTimeout(() => {
            localStorage.setItem('messages', JSON.stringify(messages));
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [messages]);

    return (
        <Paper elevation={3} className="w-full max-w-lg flex flex-col p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold 800">Chat</h2>
                <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={handleClearMessages}
                    size="small">
                    Clear
                </Button>
            </div>
            <Paper
                elevation={1}
                className="flex-1 p-4 overflow-auto mb-4 max-h-[500px]">
                {messages && <List>
                    {messages.map((message, index) => (
                        <ListItem
                            key={index}
                            className="rounded-lg mb-2 shadow-sm"
                        >
                            <div className="w-full">
                                <ListItemText
                                    primary={message}
                                    className="break-words"
                                />
                            </div>
                        </ListItem>
                    ))}
                </List>}
            </Paper>
            <div className="flex items-center gap-2">
                <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleSendMessage();
                        }
                    }}
                    size="small"
                />
                <IconButton
                    color="primary"
                    onClick={handleSendMessage}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                    <SendIcon />
                </IconButton>
            </div>
        </Paper>
    );
}