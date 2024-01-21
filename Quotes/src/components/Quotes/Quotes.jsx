import { quotes } from "../../utils/quotes";
import { useState } from "react";
import "./style.css";

function Quotes() {
  const [currentQuote, setCurrentQuote] = useState(false);

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  };

  return (
    <div className="container">
      <div>
        {currentQuote ? (
          <>
            <p className="quotes">"{currentQuote.text}"</p>
            <p className="author">- {currentQuote.author}</p>
          </>
        ) : (
          <p className="start">Click the button!</p>
        )}
      </div>
      <button className="btn" onClick={getRandomQuote}>
        Random Quote
      </button>
    </div>
  );
}

export default Quotes;
