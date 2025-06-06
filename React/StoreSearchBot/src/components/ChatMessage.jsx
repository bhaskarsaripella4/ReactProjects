import StoreSearchBotIcon from "./StoreSearchBotIcon";

const ChatMessage = ({chat}) => {


    return (
        <div className={`message-${ chat.role === "model" ? 'bot':'user'}-message`}>
            {chat.role === 'model' && <StoreSearchBotIcon />}
          <p className="message-text">
            {chat.text}
          </p>
        </div>
        );
}




export default ChatMessage;