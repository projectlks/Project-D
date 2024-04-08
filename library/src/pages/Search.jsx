import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import History from "./history";
import useTheme from "../hooks/useTheme";
import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import { database } from "../firebase";
 

export default function Search() {
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [index, setIndex] = useState(-1);
  const [resultArray, setResultArray] = useState([]);
  const [start, setStart] = useState(false);
 let [result, setResult] = useState([]);
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true)
    let books = [];
    let ref = collection(database, "books");

    getDocs(ref).then((docs) => {
      if (docs.empty) {
        setError("No Documents Found");
        setLoading(false)
      } else {
        docs.forEach((doc) => {
          let book = { id: doc.id, ...doc.data() };
          books.push(book);
        });
        setResult(books);
        setLoading(false);
        setError('')
      }
    });
  }, []);

//  !genres.includes(categatatory);

let addHistory = async (title, id) => {
 if (!history.some((item) => item.h === title)) {
   let data = {
     h: title
   };
   let ref = collection(database, "history");
   await addDoc(ref, data);

   handleClick(id);
 } else {
   handleClick(id);
 }
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
      {loading && (
        <div className={`w-full flex justify-center `}>
          <h1 className={`flex items-center ${isDark ? 'text-white' : ''} `}>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 "
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Loading ...
          </h1>
        </div>
      )}
      {!error && !loading && (
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
          {start && (
            <History
              setStart={setStart}
              setText={setText}
              history={history}
              setHistory={setHistory}
            />
          )}

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
