import { useEffect, useState, useContext, useRef } from "react";
import callAPI from "../../../api/api";
import Message from "./../interfaces/message";
import { UserDataContext } from "../../hooks/userDataContext";
import {gameState} from '../../interfaces/gameState';
import { getData } from '../../../db/db';

const useMessages = () => {

    const { setUserData } = useContext(UserDataContext);
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Array<Message>>([]);
    const hasLoaded = useRef(false);

    const fetchData = async () : Promise<string[]> => {
        const storedMessages = await getData();
        return storedMessages.story;
    };
    useEffect(() => {
        if(hasLoaded.current) {
            return;
        }
        setMessages([]);
        const storedMessages : Message[] = [];
        fetchData().then((data) => {
            // Skipping init messages
            for (let i = 2; i < data.length; i++) {
                if(i % 2 === 1){
                    storedMessages.push({ text: data[i], sender: 'user' });
                }
                else{
                    storedMessages.push({ text: data[i], sender: 'assistant' });
                }
            }
        });
        setMessages(storedMessages);
        if(storedMessages.length < 1){
            fetchApiData('start');
        }
        hasLoaded.current = true;
    }, []);

    async function fetchApiData(prompt: string): Promise<void> {
        setIsLoading(true);
        try {
            const data: typeof gameState = await callAPI(prompt);
            if (data.player) {
                const userData = { health: data.player.health, inventory: data.player.inventory, equippedWeapon: data.player.equipped_weapon };
                setUserData(userData);
            } 
            if (data.story) {
                setMessages(prevMessages => [...prevMessages, {text: data.story, sender: 'assistant'}]);
                // const storedMessages : Message[] = [];
                // fetchData().then((data) => {
                //     console.log(`data: `, data);
                //     // Skipping init messages
                //     for (let i = 2; i < data.length; i++) {
                //         if(i % 2 === 1){
                //             storedMessages.push({ text: data[i], sender: 'user' });
                //         }
                //         else{
                //             storedMessages.push({ text: data[i], sender: 'assistant' });
                //         }
                //     }
                //     setMessages(storedMessages);
                //     console.log(`Stored messages: ${storedMessages}`);
                // });
            }
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        const inputElement = (e.target as HTMLFormElement).elements[0] as HTMLInputElement;
        const input = inputElement.value;
        if (!input.trim() || isLoading) return;

        inputElement.value = '';
        setMessages(prevMessages => [...prevMessages, {text: input, sender: 'user'}]);

        fetchApiData(input);
    };

    return { messages, handleSendMessage, isLoading };
};

export default useMessages;