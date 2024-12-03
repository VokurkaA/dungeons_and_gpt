import { Paper, IconButton, TextField, List, ListItem, ListItemText, Button } from '@mui/material';
import { useState, useEffect } from 'react';
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
    const [messages, setMessages] = useState<string[]>(() => {
        const savedMessages = localStorage.getItem('messages');
        return savedMessages ? JSON.parse(savedMessages) : [];
    });
    useEffect(() => {
        localStorage.setItem('messages', JSON.stringify(messages));
    }, [messages]);
    return (
        <Paper className="w-full max-w-lg flex flex-col p-4">
            <div className="flex justify-between items-center mb-4">
                <Button variant="contained" color="secondary" onClick={handleClearMessages}>
                    Clear Conversation
                </Button>
            </div>
            <Paper className="flex-1 p-4 overflow-auto mb-4">
                <List>
                    {messages.map((message, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={message} />
                        </ListItem>
                    ))}
                </List>
            </Paper>
            <div className="flex items-center">
                <TextField
                    variant="outlined"
                    fullWidth
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleSendMessage();
                        }
                    }}
                />
                <IconButton color="primary" onClick={handleSendMessage}>
                    Send
                </IconButton>
            </div>
        </Paper>
    )
}