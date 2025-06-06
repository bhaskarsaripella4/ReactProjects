
import { FaSearch, FaShoppingBag } from 'react-icons/fa';

const StoreSearchBotIcon = () => {

    return (
    <div
      style={{
        backgroundColor: 'yellow',
        padding: '0.2rem 0.4rem',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.25rem',
        borderRadius: '8px',
        width: 'auto',
        verticalAlign: 'top',
      }}
    >
      <FaShoppingBag color = "red" />
      <FaSearch color = "black"/>
    </div>)
}

export default StoreSearchBotIcon