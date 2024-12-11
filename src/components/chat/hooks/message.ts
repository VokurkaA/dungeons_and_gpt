import { useEffect, useState, useContext } from "react";
import Message from "../interfaces/message";
import callAPI from "../../../api/api";
import { UserDataContext } from "../../hooks/userDataContext";

const useMessages = () => {

    const { setUserData } = useContext(UserDataContext);

    async function fetchApiData(prompt: string): Promise<Message | undefined> {
        try {
            const response = await callAPI(prompt);
            const data = JSON.parse(response);
            if (data.player) {
                const userData = { health: data.player.health, inventory: data.player.inventory, equippedWeapon: data.player.equipped_weapon };
                setUserData(userData);
            } if (data.story) {
                return { text: data.story, sender: 'system' };
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }

    const getInitialMessages = () => {
        const storedMessages = localStorage.getItem('messages');
        if (storedMessages && storedMessages !== 'undefined') {
            try {
                return JSON.parse(storedMessages);
            } catch (error) {
                console.error('Error parsing stored messages:', error);
            }
        }

        fetchApiData('start').then((response) => {
            if (response) {
                setMessages([...messages, response]);
            }
        });

        return [];
    };

    const [messages, setMessages] = useState<Array<Message>>(getInitialMessages);

    useEffect(() => {
        localStorage.setItem('messages', JSON.stringify(messages));
        console.log(JSON.parse(localStorage.getItem('messages') || '[]'));
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        const inputElement = (e.target as HTMLFormElement).elements[0] as HTMLInputElement;
        const input = inputElement.value;
        if (!input.trim()) return;

        inputElement.value = '';
        setMessages(prevMessages => [...prevMessages, { text: input, sender: 'user' }]);


        fetchApiData(input).then((response) => {
            if (response) {
                setMessages(prevMessages => [...prevMessages, response]);
            }
        });
    };
    return { messages, handleSendMessage };
};

export default useMessages;