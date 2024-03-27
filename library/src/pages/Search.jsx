import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export default function Search() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(-1);
  const [resultArray, setResultArray] = useState([]);
  const [history,setHistory] = useState(['hello', 'hi'])


  const navigate = useNavigate();
    let {
      data: result,
      error,
      loading
    } = useFetch(`http://localhost:3000/books`);

  const handleClick = (bookId) => {
    navigate(`/books/${bookId}`); 
   
  };

  const handelhistory = (bookTitle) => {
    setHistory((prev) => [bookTitle, ...prev]);
    console.log(history);
  };


  useEffect(() => {
    if (result) {
      setResultArray(
        [...result].filter((f) =>
          f.title.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  }, [result, text]);



  const handleKey = (e) => {
    if (text === "") {
      setIndex(-1);
    }
    if (e.key === "ArrowDown") {
      if (index !== resultArray.length - 1) {
        setIndex((prev) => prev + 1);
      }
    }
    if (e.key === "ArrowUp") {
      if (index !== 0) {
        setIndex((prev) => prev - 1);
      }
    }
    if (e.key === "Enter") {
      let selectIndex = resultArray[index].id
      handleClick(selectIndex);
      console.log('done')
    }
  };



  return (
    <>
      {error && <p>{error}</p>}
      {loading && <p>Loading ...</p>}
      {!error && (
        <section className="w-full h-[100vh] flex flex-col items-center bg-blue-50 rounded-md">
          <div className="w-full h-auto flex justify-center">
            <input
              type="text"
              className="bg-gray-50 md:w-[500px] py-2 px-7 border-solid border-2 rounded-full mx mx-auto mt-28 w-[90%]"
              onChange={(e) => setText(e.target.value)}
              onKeyUp={handleKey}
              value={text}
            />
          </div>
          <div>
            {/* {history.map((h) => (
              <p key={h} >
                {h}
              </p>
            ))} */}
          </div>
          <div className=" h-auto flex flex-col items-center border shadow-md rounded-xl bg-gray-50 md:w-[500px] w-[90%]">
            {text &&
              resultArray.map((b, i) => (
                <div
                  onClick={() => {
                    handleClick(b.id);
                    handelhistory(b.title);
                  }}
                  key={b.id}
                  className={
                    " py-2 px-7 w-[100%] text rounded hover:bg-blue-400 hover:text-white cursor-pointer" +
                    (index === i ? " bg-blue-400 text-white" : "")
                  }
                >
                  <p>{b.title}</p>
                </div>
              ))}
          </div>
        </section>
      )}
    </>
  );
}

