import { useEffect, useState, useContext } from "react";
import Message from "../interfaces/message";
import callAPI from "../../../api/api";
import { UserDataContext } from "../../hooks/userDataContext";
import {dataFormat} from './../../../dataFormat';

const useMessages = () => {

    const { setUserData } = useContext(UserDataContext);
    const [isLoading, setIsLoading] = useState(false);

    async function fetchApiData(prompt: string): Promise<void> {
        setIsLoading(true);
        try {
            const data: typeof dataFormat = await callAPI(prompt);
            if (data.player) {
                const userData = { health: data.player.health, inventory: data.player.inventory, equippedWeapon: data.player.equipped_weapon };
                setUserData(userData);
                localStorage.setItem('userData', JSON.stringify(userData));
            } 
            if (data.story) {
                setMessages(prevMessages => [...prevMessages, { text: data.story, sender: 'system' }]);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const loadInitialMessages = () => {
        const storedMessages = localStorage.getItem('messages');
        if (storedMessages && storedMessages !== 'undefined') {
            try {
                return JSON.parse(storedMessages);
            } catch (error) {
                console.error('Error parsing stored messages:', error);
            }
        }

        fetchApiData('start');
        return [];
    };

    const [messages, setMessages] = useState<Array<Message>>(loadInitialMessages);

    useEffect(() => {
        localStorage.setItem('messages', JSON.stringify(messages));
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        const inputElement = (e.target as HTMLFormElement).elements[0] as HTMLInputElement;
        const input = inputElement.value;
        if (!input.trim() || isLoading) return;

        inputElement.value = '';
        setMessages(prevMessages => [...prevMessages, { text: input, sender: 'user' }]);

        fetchApiData(input);
    };

    return { messages, handleSendMessage, isLoading };
};

export default useMessages;