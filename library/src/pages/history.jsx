import  { useEffect, useState } from 'react'
import { MdHistory } from "react-icons/md"; // Importing Material Design History icon
import useFetch from '../hooks/useFetch';
// import PropTypes from "prop-types";

const History = ({ setText, setStart }) => {
  const [history, setHistory] = useState([]);
  // Fetching search history data from the server
  let { data: historyData } = useFetch("http://localhost:3000/history");

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

  useEffect(() => {
    setHistory(historyData);
  }, [historyData]);

  return (
    <div>
      <div className="h-auto flex flex-col items-center  shadow-md rounded-xl bg-gray-50 md:w-[500px] w-[90%]">
        {history &&
          history.map((h) => (
            <div
              key={h.id}
              className="py-2 px-3 w-[100%] text rounded hover:bg-blue-400 hover:text-white cursor-pointer flex justify-between"
            >
              <p
                className="flex items-center"
                onClick={() => {
                  setText(h.h);
                  setStart(false);
                }}
              >
                <MdHistory className="w-4 h-4 mr-2" />
                {h.h}
              </p>

              {/* cross icons */}
              <div
                className="flex justify-center items-center w-6 h-6 rounded-full hover:bg-blue-500"
                onClick={() => deleteHistory(h.id)}
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
  );
};


export default History