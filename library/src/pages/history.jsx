import  { useEffect, useState } from 'react'
import { MdHistory } from "react-icons/md"; // Importing Material Design History icon
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { database } from '../firebase';
import useTheme from '../hooks/useTheme';

const History = ({ setText, setStart, setHistory, history }) => {
  // Fetching search history data from the server

  useEffect(() => {
    let historys = [];
    let ref = collection(database, "history");
    onSnapshot(ref, (docs) => {
      if (!docs.empty) {
        docs.forEach((doc) => {
          let history = { id: doc.id, ...doc.data() };
          historys.push(history);
        });
        setHistory(historys);
      }
    });
  }, []);

   let { isDark } = useTheme();

  let deleteHistory = async (id) => {
    let ref = doc(database, "history", id);

    await deleteDoc(ref);
     setHistory(prevHistory => prevHistory.filter(item => item.id !== id));

  };

  return (
    <div className="w-full mx-auto flex justify-center">
      {/* <div className="h-auto flex flex-col items-center  shadow-md rounded-xl bg-gray-50 md:w-[500px] w-[90%]"> */}
      <div
        className={`h-auto flex flex-col items-center shadow-lg rounded-xl  md:w-[500px] w-[90%]  ${
          isDark ? "shadow-white" : " "
        }`}
      >
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