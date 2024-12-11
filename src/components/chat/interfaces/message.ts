export default interface Message{
    text: string;
    sender: 'user' | 'system';
}