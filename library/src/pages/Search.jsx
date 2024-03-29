

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch"; // Importing custom hook for fetching data
import { MdHistory } from "react-icons/md"; // Importing Material Design History icon

export default function Search() {
  const [text, setText] = useState(""); 
  const [index, setIndex] = useState(-1); 
  const [resultArray, setResultArray] = useState([]);
  const [history, setHistory] = useState([]); 
  const [start, setStart] = useState(false); 
  const navigate = useNavigate(); 
    let deleteHistory = (id) => {
      
      setHistory(
        (prev) => {
          return prev.filter((his) => {
            return his.id !== id;
          });
        },
        fetch(`http://localhost:3000/history/${id}`, {
          method: "DELETE"
        })
      );
    };
  // Fetching books data from the server
  let {
    data: result,
    error,
    loading
  } = useFetch(`http://localhost:3000/books`);

  // Fetching search history data from the server
  let { data: historyData } = useFetch("http://localhost:3000/history");
  let { setPostData } = useFetch("http://localhost:3000/history", "POST");

  // Function to add a search query to history
  let addHistory = async (abcd, id) => {
    let data = {
      h: abcd
    };




    if (text !== "") {
      await setPostData(data);
    }

    await handleClick(id);
  };

  // Effect to update history state when history data changes
  useEffect(() => {
    setHistory(historyData);
  }, [historyData]);

  // Function to handle click on a book item
  const handleClick = (bookId) => {
    navigate(`/books/${bookId}`); // Navigate to the book details page
  };

  // Filtering search results based on the search text
  useEffect(() => {
    if (result) {
      setResultArray(
        [...result].filter((f) =>
          f.title.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  }, [result, text]);

  // Function to handle keyboard events
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
      let selectIndex = resultArray[index].id;
      handleClick(selectIndex);
    }
  };

  // Return statement
  return (
    <>
      {error && <p>{error}</p>}
      {loading && <p>Loading ...</p>}
      {!error && (
        <section className="w-full h-[100vh] flex flex-col items-center rounded-md">
          <div className="w-full h-auto flex justify-center">
            {/* Input field for searching */}
            <input
              type="text"
              className="bg-gray-50 md:w-[500px] py-2 px-7 border-solid border-2 rounded-full mx mx-auto mt-28 w-[90%]"
              onChange={(e) => {
                setText(e.target.value);
                setStart(false);
              }}
              onKeyUp={handleKey}
              value={text}
              onClick={() => {
                setStart(true);
              }}
            />
          </div>

          {/* Rendering search history */}
          {start && (
            <div>
              <div className="h-auto flex flex-col items-center border shadow-md rounded-xl bg-gray-50 md:w-[500px] w-[90%]">
                {history &&
                  history.map((h) => (
                    <div
                      key={h.id}
                      className="py-2 px-3 w-[100%] text rounded hover:bg-blue-400 hover:text-white cursor-pointer flex justify-between"
                    >
                      <p className="flex items-center">
                        <MdHistory className="w-4 h-4 mr-2" />
                        {h.h}
                      </p>

                      {/* cross icons */}
                      <div
                        className="flex justify-center items-center w-6 h-6 rounded-full hover:bg-blue-500"
                        onClick={()=>deleteHistory(h.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4 "
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Rendering search results */}
          <div className="h-auto flex flex-col items-center border shadow-md rounded-xl bg-gray-50 md:w-[500px] w-[90%]">
            {text &&
              resultArray.map((b, i) => (
                <div
                  onClick={() => {
                    setHistory((prev) => [b.title, ...prev]);
                    addHistory(b.title, b.id);
                    setText(b.title);
                  }}
                  key={b.id}
                  className={
                    "py-2 px-3 w-[100%] text rounded hover:bg-blue-400 hover:text-white cursor-pointer" +
                    (index === i ? " bg-blue-400 text-white" : "")
                  }
                >
                  <p className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                      />
                    </svg>
                    {b.title}
                  </p>
                </div>
              ))}
          </div>
        </section>
      )}
    </>
  );
}
