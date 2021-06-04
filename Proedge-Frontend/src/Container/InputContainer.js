import { useState } from "react";
import "./InputContainer.css";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);

  const handleInput = (e) => {
    if (!isNaN(e.target.value)) {
      setInput(e.target.value);
    }
  };

  const handleCancel = (key) => {
      const updatedData = data.filter(list => list.rollNumber !== key);
      setData(updatedData);

  }

  const handleSubmit = (e) => {
    if (e.keyCode === 8 && input === "" && data.length > 0) {
      data.pop();
      setData([...data]);
    } else if ((e.keyCode === 13 || e.keyCode === 188) && input !== "") {
      if(!data.some(list => list.rollNumber === input)){
        data.push({rollNumber: input});
        setData([...data]);
        setInput("");
      }else{
          alert('Roll number already exist')
      }
    }
  };

  const handleSubmitData = () => {
    setIsLoading(true);
    fetch("https://proedgebackend.herokuapp.com/v1/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ data: data })
    })
      .then((result) => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <div className="input">
        {data.map((data, index) => {
          return (
            <span key={index}>
              {data.rollNumber}
              <i className="material-icons icons" onClick={() => handleCancel(data.rollNumber)}>cancel</i>
            </span>
          );
        })}
        <input
          type="text"
          onKeyUp={(e) => {
            handleSubmit(e);
          }}
          onChange={(e) => {
            handleInput(e);
          }}
          value={input}
          autoFocus
          placeholder="Enter here"
        />
      </div>

      <div className="btn">
        <div className="button" onClick={handleSubmitData}>
          {isLoading ? "Submitting..." : "Submit"}
        </div>
      </div>
    </div>
  );
}
