const SentenceDisplay = ({ sentence, input }) => {
    const inputWords = input.trim().split(" ");
    const targetWords = sentence.split(" ");
  
    return (
      <p>
        {targetWords.map((word, index) => {
          let color = "black";
          if (inputWords[index]) {
            color = inputWords[index] === word ? "green" : "red";
          }
          return (
            <span key={index} style={{ color, fontWeight: "bold" }}>
              {word}{" "}
            </span>
          );
        })}
      </p>
    );
  };
  
  export default SentenceDisplay;
  