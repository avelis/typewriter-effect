import { useState, useRef, useEffect } from "react";

const TypewriterEffect = () => {
  const [typedSentence, setTypedSentence] = useState("");
  const savedCallback = useRef();
  const intervalId = useRef();

  // start the interval and save its id,
  // so we can stop it once all letters are typed
  const startTyping = (sentence) => {
    setTypedSentence("");
    intervalId.current = setInterval(() => {
      savedCallback.current(sentence);
    }, 500);
  };

  // stop the interval
  const stopTyping = () => {
    clearInterval(intervalId.current);
    intervalId.current = null;
  };

  const typeNextLetter = (sentence) => {
    const letters = Array.from(sentence);
    if (typedSentence.length === letters.length) {
      // we typed all the letters
      stopTyping();
      return;
    }
    // else, type next letter
    const nextLetterIndex = typedSentence.length;
    setTypedSentence(typedSentence + letters[nextLetterIndex]);
  };

  useEffect(() => {
    savedCallback.current = typeNextLetter;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    startTyping(data.get("sentence"));
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <input
          type="text"
          name="sentence"
          placeholder="Type a sentence"
          style={{ width: "300px" }}
        />
        <button type="submit">Display with typewriter effect</button>
      </form>
      <h4> {typedSentence && <p>You typed {typedSentence}</p>}</h4>
    </div>
  );
};

export default TypewriterEffect;
