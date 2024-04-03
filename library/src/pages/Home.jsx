import cover from "./cover.jpg";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import useTheme from "../hooks/useTheme";
import { FaRegEdit } from "react-icons/fa"; // edit icon
import { AiTwotoneDelete } from "react-icons/ai"; // delete icon
import { useEffect, useState } from "react";

function Home() {
  let { data, error, loading } = useFetch(`http://localhost:3000/books`);
  let [books, setBooks] = useState([]);
  let { isDark } = useTheme();
  const navigate = useNavigate();

  let editFun = (e, id) => {
    e.preventDefault();
    navigate(`/edit/${id}`);
  };

  let deleteFun = (e, id) => {
    e.preventDefault();
    console.log("done", id);
    setBooks(
      (prev) => prev.filter((b) => b.id !== id),
      fetch(`http://localhost:3000/books/${id}`, {
        method: "DELETE"
      })
    );
  };

  useEffect(() => {
    setBooks(data);
  }, [data]);

  return (
    <>
      {error && <p>{error}</p>}
      {!error && (
        <section>
          <div className="grid md:grid-cols-2 md:gap-y-8 mt-5 grid-cols-1 gap-y-5 xl:grid-cols-3 ">
            {books &&
              books.map((book) => (
                <Link to={`/books/${book.id}`} key={book.id}>
                  {loading ? (
                    <div className="border border-gray-300 shadow rounded-md p-5 w-[80%] mx-auto space-y-3">
                      <div className="bg-gray-400 h-32 w-[70%] mx-auto"></div>
                      <div className="flex-1 space-y-4 py-1">
                        <div className="h-6 bg-gray-400 rounded w-3/4"></div>
                        <div className="space-y-2">
                          <div className="h-8 bg-gray-400 rounded"></div>
                          <div className="h-3 bg-gray-400 rounded w-5/6"></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`border border-black md:p-5 p-3 mx-auto md:space-y-3 md:space-x-0 space-x-2 rounded-lg w-[80%] flex md:flex-col h-45 md:h-auto ${
                        isDark ? "bg-dCd text-white" : "bg-lCd"
                      }`}
                    >
                      <div className="md:w-[50%] w-[30%] h-full md:h-auto mx-auto bg-red-800 overflow-hidden">
                        <img
                          src={cover}
                          alt="cover"
                          className="md:object-cover"
                        />
                      </div>
                      <div className="w-[70%] md:w-full">
                        <h1 className="text md:text-2xl text-xl font-bold w-full whitespace-nowrap overflow-hidden truncate">
                          {book.title}
                        </h1>
                        <p>Written By {book.author}</p>
                        <span className="flex space-x-2 flex-nowrap overflow-hidden w-full  justify-between">
                          {book.genres &&
                            book.genres.map((b) => (
                              <p
                                className={`tag flex-nowrap truncate ${
                                  isDark ? "dark text-black" : ""
                                }`}
                                key={b}
                              >
                                {b}
                              </p>
                            ))}

                          <div className="flex float-right space-x-2">
                            {/* edit icon */}
                            <FaRegEdit
                              className="w-6 h-6"
                              onClick={(e) => {
                                editFun(e, book.id);
                              }}
                            />

                            {/* delete icon */}
                            <AiTwotoneDelete
                              className="w-6 h-6 text-red-700 mb-3"
                              onClick={(e) => {
                                deleteFun(e, book.id);
                              }}
                            />
                          </div>
                        </span>

                        <div className="w-full truncate-paragraph">
                          {book.description}
                        </div>
                      </div>
                    </div>
                  )}
                </Link>
              ))}
          </div>
        </section>
      )}
    </>
  );
}

export default Home;
