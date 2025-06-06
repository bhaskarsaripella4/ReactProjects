import StoreSearchBotIcon from "./components/StoreSearchBotIcon"
import ChatForm from "./components/ChatForm"
import ChatMessage from "./components/ChatMessage";
import { useState } from "react";


{/* https://www.youtube.com/watch?v=5fiXEGdEK10&ab_channel=CodingNepal */ }
const App = () => {
  const [chatHistory, setChatHistory] = useState([]);

  const generateBotResponse = async(history) => {
    const updateHistory = (text) => (setChatHistory(prev => 
      [...prev.filter(msg => msg.text !== "Processing..."),
      {role:"model", text: text}
    ]))

    // format chat history for api (array format)
    history = history.map(({role,text}) => ({role, parts: [{text}]}) );

    const requestOptions = {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({contents: history})
    }
    
    try{
      const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
      const data = await response.json();

      if (!response.ok) throw new Error(data.error.message || "Something went wrong!");

      const apiTextResponse = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim();
      
      updateHistory(apiTextResponse);

      console.log(data);
    } catch (error){
      console.log(error);
    }
  }


  return <div className="container">
    <div className="chatbot-popup">
      {/* Chatbot header*/}
      <div className="chat-header">
        <div className="header-info">
          <StoreSearchBotIcon />
          <h2 className="logo-text">StoreSearchBot</h2>
          
          </div> 
          <button className="material-symbols-rounded">keyboard_arrow_down</button>
      </div>

       {/* Chatbot Body*/}
       <div className="chat-body">
        <div className="message-bot-message">
         <p className="message-text">
          Welcome to Grocery Store. <br></br> How can I help you?
          </p>
        </div>

        {/* render chat history*/}
        {
          chatHistory.map((chat,index) => (
            <ChatMessage key = {index} chat={chat}/>
          ))
        }
       </div>

       {/* Chatbot footer*/}
      <div className="chat-footer">
        <ChatForm chatHistory = {chatHistory} setChatHistory = {setChatHistory} generateBotResponse = 
        {generateBotResponse}/>
      </div>
    </div>
  </div>
}

export default App
