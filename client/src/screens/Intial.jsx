import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import 'bootstrap/dist/css/bootstrap.min.css';
function TextAnimation() {
  const initialText = "Enjoy your day.";
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const textAnimation = setTimeout(() => {
      if (charIndex < initialText.length) {
        setDisplayText((prevText) => prevText + initialText[charIndex]);
        setCharIndex(charIndex + 1);
      } else {
        setDisplayText("");
        setCharIndex(0);
      }
    }, 200);

    return () => {
      clearTimeout(textAnimation);
    };
  }, [charIndex, initialText]);

  return (
    <div className="container text-center" style={{ marginTop: "300px" }}>
        <h1 style={{ color: 'brown', fontSize: '2rem' }}>{displayText}</h1>
        {localStorage.getItem('currentUser') && JSON.parse(localStorage.getItem('currentUser')).isAdmin ? (
            <Link to="/admin">
                <button className="btn btn-primary mt-3">Let's Start</button>
            </Link>
        ) : (
            <Link to="/landing">
                <button className="btn btn-primary mt-3">Let's Start</button>
            </Link>
        )}
    </div>
);
}

export default TextAnimation;
