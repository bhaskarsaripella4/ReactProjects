import { useRef } from "react";


const ChatForm = ({chatHistory, setChatHistory, generateBotResponse}) => {

    const inputRef = useRef();

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const userMessage = inputRef.current.value.trim();
        if(!userMessage) return;

        inputRef.current.value = ""; // empty the message

        // update chat history. Three dots are array spread operators that merge arrays
        setChatHistory((history) => [...history, {role: "user", text: userMessage}]);

        setTimeout(() => {
            // Add a placeholder for model response processing.
            setChatHistory((history) => [...history, {role: "model", text : "Processing..."}]);
            
            generateBotResponse([...chatHistory, {role:"user", text:userMessage}]); 

        }, 600);

        console.log(chatHistory);
    }

    return (
        <form action="#" className = "chat-form" onSubmit={handleFormSubmit}>
          <input ref={inputRef} type="text"  placeholder="Message..." className="message-input" required/>
          <button className="material-symbols-rounded">arrow_upward</button>
        </form>
    );
};

export default ChatForm;