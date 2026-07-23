import { FiSearch } from 'react-icons/fi';
import '../../styles/search-input.css';

function SearchInput({ placeholder = "Search...", value, onChange, className = "" }) {
  return (
    <div className={`search-box ${className}`}>
      <FiSearch className="search-icon" size={18} />
      <input
        type="text"
        placeholder={placeholder}
        className="search-input"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default SearchInput;
