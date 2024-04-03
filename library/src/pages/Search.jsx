import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch"; // Importing custom hook for fetching data
import History from "./history";
import useTheme from "../hooks/useTheme";
 

export default function Search() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(-1);
  const [resultArray, setResultArray] = useState([]);
  const [start, setStart] = useState(false);
  const navigate = useNavigate();

  let {
    data: result,
    error,
    loading
  } = useFetch(`http://localhost:3000/books`);

  let { setPostData } = useFetch("http://localhost:3000/history", "POST");

  let addHistory = async (abcd, id) => {
    let data = {
      h: abcd
    };

    if (text !== "") {
      await setPostData(data);
    }

    await handleClick(id);
  };

  // Function to handle click on a book item
  const handleClick = (bookId) => {
    navigate(`/books/${bookId}`);
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
      let selectTitle = resultArray[index].title;
      // handleClick(selectIndex);

      addHistory(selectTitle, selectIndex);
      setText(selectTitle);
    }
  };
 let { isDark } = useTheme();
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
              className={` md:w-[500px] py-2 px-7 border-solid border-2 rounded-full mx mx-auto mt-28 w-[90%] ${
                isDark ? "bg-blue-500 bg-opacity-20 outline-none" : "bg-gray-50"
              }`}
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
          {start && <History setStart={setStart} setText={setText} />}

          {/* Rendering search results */}
          <div
            className={`h-auto flex flex-col items-center shadow-lg rounded-xl  md:w-[500px] w-[90%] ${
              isDark ? "shadow-white" : " "
            }`}
          >
            {text && (
              <>
                {!!resultArray.length &&
                  resultArray.map((b, i) => (
                    <div
                      onClick={() => {
                        addHistory(b.title, b.id);
                        setText(b.title);
                      }}
                      key={b.id}
                      className={`py-2 px-3 w-[100%] text rounded  hover:text-white cursor-pointer ${
                        i === 0 ? "rounded-tl-xl rounded-tr-xl" : ""
                      } ${
                        i === resultArray.length - 1
                          ? "rounded-bl-xl rounded-br-xl"
                          : ""
                      } ${
                        index === i ? "bg-blue-900 text-white opacity-100" : ""
                      }${
                        isDark
                          ? "bg-blue-500 bg-opacity-20 hover:bg-blue-900"
                          : "bg-gray-50 hover:bg-blue-400"
                      }`}
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

                {!resultArray.length && (
                  <p className="p-2"> There is no result</p>
                )}
              </>
            )}
          </div>
        </section>
      )}
    </>
  );
}
