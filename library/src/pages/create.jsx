import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router";

function Create() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genres, setGenres] = useState([]);
  const [categatatory, setCategatatory] = useState("");


    let { setPostData ,data } = useFetch("http://localhost:3000/books", "POST");
    let navigate = useNavigate()


  let addBook = (e) => {
e.preventDefault();
let data = {
  title,
  description,
  genres
};
if (title !== "" && description !== "" && genres.length > 0) {
  setPostData(data);
}

  }


  useEffect(() => {

if(data) {
  navigate('/')
}
  }, [data,navigate]);


  return (
    <form className="w-full max-w-lg  mx-auto mt-8">
      {/* for title */}
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="md:w-full w-[90%] px-3 mx-auto">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            Book Title
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-password"
            type="text"
            placeholder="Book Title ..."
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
      </div>
      {/* for Description */}
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="md:w-full w-[90%] px-3 mx-auto">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            Book Description
          </label>
          <textarea
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-password"
            placeholder=" Book Description ..."
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
      </div>
      {/* for  Genres*/}
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="md:w-full w-[90%] px-3 mx-auto">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            Book Genres
          </label>

          <div className="flex items-center">
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="text"
              placeholder="Book Genres ..."
              value={categatatory}
              onChange={(e) => {
                setCategatatory(e.target.value);
              }}
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
              onClick={() => {
                if (categatatory !== "") {
                  setGenres((prev) => [categatatory, ...prev]);
                }
                setCategatatory("");
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap space-x-2">
        {genres.map((g) => (
          <div key={g}>{g}</div>
        ))}
      </div>

      {/* to create book */}

      <div
        className="flex items-center space-x-2 bg-blue-300 p-2 rounded-xl btn justify-center md:w-full w-[90%] px-3 mx-auto"
        onClick={addBook}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <h1>Create Book</h1>
      </div>
    </form>
  );
}
export default Create;
