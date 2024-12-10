import { Button, IconButton, List, ListItem, ListItemText, Paper, TextField, CircularProgress } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import callAPI from './api/api';
import {dataFormat} from './dataFormat';

export default function Chat(props: { setUserData: Dispatch<SetStateAction<{ health: number; inventory: never[]; equippedWeapon: string; }>> }) {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Array<string>>(localStorage.getItem('messages') ? JSON.parse(localStorage.getItem('messages') || '[]') : []);
    const [loading, setLoading] = useState(false);

    const handleSendMessage = async () => {
        if (!input.trim() || loading) return;

        setLoading(true);
        setMessages([...messages, input]);
        setInput('');

        try {
            // Set data format
            const data: typeof dataFormat = await callAPI(input);

            if (data.story) {
                setMessages(prev => [...prev, data.story]);
            } if (data.player) {
                const userData = { health: data.player.health, inventory: data.player.inventory, equippedWeapon: data.player.equipped_weapon }
                props.setUserData(userData);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClearMessages = () => {
        setMessages([]);
    };

    useEffect(() => {
        const storedMessages = localStorage.getItem('messages');
        if (storedMessages) {
            const messageData = JSON.parse(storedMessages);
            if (messageData) {
                setMessages(JSON.parse(storedMessages));
            }
            if (!messageData || messageData.length === 0){
                const initGame = async () => {
                setLoading(true);
                try {
                    const data = await callAPI('start');
                    if (data.story) {
                        setMessages([data.story]);
                    }
                    if (data.player) {
                        const userData = {
                            health: data.player.health,
                            inventory: data.player.inventory,
                            equippedWeapon: data.player.equipped_weapon
                        };
                        props.setUserData(userData);
                    }
                } catch (error) {
                    console.error('Error initializing game:', error);
                } finally {
                    setLoading(false);
                }
            };
            initGame();
        }
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
            {messages.length > 0 && <Paper
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
            </Paper>}
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
                    disabled={loading}
                />
                <IconButton
                    color="primary"
                    onClick={handleSendMessage}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} /> : <SendIcon />}
                </IconButton>
            </div>
        </Paper>
    );
}