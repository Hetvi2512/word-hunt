import React from "react";
import "./Definition.css";
function Definition({ data, word, category, lightMode }) {
  console.log(data[0]);
  return (
    <div className="meanings">
      {data[0] && word && category === "en" && (
        <>
          <audio
            src={data[0]?.phonetics[0]?.audio}
            controls
            style={{ backgroundColor: "#fff", borderRadius: 10 }}
          >
            Your browser dosen't support audio element
          </audio>
        </>
      )}
      {word === "" ? (
        <span className="subTitle">Start by typing a word</span>
      ) : (
        data.map((mean) =>
          mean.meanings.map((item) =>
            item.definitions.map((def) => (
              <div
                className="singleMean"
                style={{
                  backgroundColor: lightMode ? "#3b5360" : "white",
                  color: lightMode ? "white" : "black",
                }}
              >
                <b>{def.definition}</b>
                <hr style={{ backgroundColor: "black", width: "100%" }} />
                {def.example && (
                  <span>
                    <b>Example :</b> {def.example}
                  </span>
                )}
                {def.synonyms && (
                  <span>
                    <b>Synonyms :</b> {def.synonyms.map((s) => `${s}, `)}
                  </span>
                )}
              </div>
            ))
          )
        )
      )}
    </div>
  );
}

export default Definition;
