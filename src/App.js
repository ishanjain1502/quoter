import { useEffect, useRef, useState } from "react";
import './App.css';

export default function App() {
  const [quotes, setQuotes] = useState("");
  const textRef = useRef();
  let colors = ["#FFFF00", "#90ee90", "#ffa500", "#ff6845", "#84ff16", "#8414FF"];

  const getQuote = () => {
    fetch("http://type.fit/api/quotes")
      .then((res) => res.json())
      .then((data) => {
        let randomNumber = Math.floor(Math.random() * data.length);
        setQuotes(data[randomNumber]);
      });
  };

  useEffect(() => {
    getQuote();
  }, [])

  useEffect(() => {
    textRef.current.style.color = colors[Math.floor(Math.random * colors.length)]
  }, [quotes])

  return (
    <div className="App">
      <div className="quote">
        <p ref={textRef}>"<i> {quotes.text} </i>"</p>
        <p>" Author :<b> {quotes.author} </b>"</p>
        <div className="buttonContainer">
          <button onClick={getQuote} className="btn">
            Next
          </button>
          <a
            href="{https://twitter.com/intent/tweet?text=${quotes.text}}"
            target="_blank"
            rel="noopener noreferrer"
            className="btn" >Tweet</a>
        </div>
      </div>
    </div>
  )
}
