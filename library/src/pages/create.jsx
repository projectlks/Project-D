import { useEffect, useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useNavigate, useParams } from "react-router";
import useTheme from "../hooks/useTheme";
import { TiDelete } from "react-icons/ti";

function Create() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genres, setGenres] = useState([]);
  const [categatatory, setCategatatory] = useState("");

  // error message
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [categatatoryError, setCategatatoryError] = useState("");
  const [error, setError] = useState("");

  // useRef
   const titleRef = useRef(null);
   const descriptionRef = useRef(null);
   const genresRef = useRef(null);

  let { isDark } = useTheme();

  let { id } = useParams(); // to get with book to edit


  // to change other input or something if you click enter 
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (e.target === titleRef.current) {
        descriptionRef.current.focus();
      } else if (e.target === descriptionRef.current) {
        genresRef.current.focus();
      }
      // Add more conditions for other input fields as needed
    }
  };

  // to get data whih one is to edit
  if (id) {
    let { data } = useFetch(`http://localhost:3000/books/${id}`);
    useEffect(() => {
      {
        {
          data && (
            <>
              {setTitle(data.title)}
              {setDescription(data.description)}
              {setGenres(data.genres)}
            </>
          );
        }
      }
    }, [data]);
  }

  let { setPostData, data } = useFetch("http://localhost:3000/books", "POST");
  let navigate = useNavigate();

  // to add new one

  let addBook = () => {
    let data = {
      title,
      description,
      genres
    };
    if (title !== "" && description !== "" && genres.length > 0) {
      setPostData(data);
    }
    if (title === "") {
      setTitleError("Please fill in the title.");
    }
    if (description === "") {
      setDescriptionError("Please fill in the description.");
    }
    if (genres.length === 0) {
      setCategatatoryError("Please select at least one category.");
    }
  };
// to edit Books 
  let editBook = (id) => {
    let data = {
      title,
      description,
      genres
    };

    fetch(`http://localhost:3000/books/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update book");
        }
      })
      .catch((error) => {
        console.error("Error updating book:", error);
      });

    navigate("/");
  };


  // to remove something you don't want
  let remove = (text) => {
    setGenres((prev) => prev.filter((g) => g !== text));
  };

  // to go home page if data change
  useEffect(() => {
    if (data) {
      navigate("/");
    }
  }, [data, navigate]);

  return (
    <section className="h-screen">
      <form
        className={`w-full max-w-lg  mx-auto mt-8 border-blue-300 border-2 p-4 rounded-xl ${
          isDark ? "text-white border-white" : ""
        }`}
      >
        {/* for title */}
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="md:w-full w-[90%] px-3 mx-auto">
            <label
              className={`block uppercase tracking-wide  text-xs font-bold mb-2 ${
                isDark ? "text-white" : "text-gray-700"
              }`}
              htmlFor="grid-password"
            >
              Book Title
            </label>
            <input
              className={`appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password ${titleError ? "border-red-700 mb-1" : ""} ${
                isDark
                  ? "bg-blue-500 bg-opacity-20 outline-none"
                  : "bg-gray-200"
              }`}
              type="text"
              placeholder="Book Title ..."
              // to handel Enter
              ref={titleRef}
              onKeyDown={handleKeyPress}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setTitleError("");
              }}
            />
            {/* error message */}
            <div className="text-red-700 w-full  pl-3"> {titleError}</div>
          </div>
        </div>
        {/* for Description */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="md:w-full w-[90%] px-3 mx-auto">
            <label
              className={`block uppercase tracking-wide  text-xs font-bold mb-2 ${
                isDark ? "text-white" : "text-gray-700"
              }`}
              htmlFor="grid-password"
            >
              Book Description
            </label>
            <textarea
              className={`appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-justify ${
                descriptionError ? "border-red-700 mb-1" : ""
              } ${
                isDark
                  ? "bg-blue-500 bg-opacity-20 outline-none"
                  : "bg-gray-200"
              } scrollbar-w-40 scrollbar-track-gray-800 scrollbar-thumb-black scrollbar-thumb-hover-gray-500`}
              id="grid-password"
              placeholder="The Lord of the Rings is a high fantasy ..."
              value={description}
              ref={descriptionRef} // to handle Enter
              onKeyDown={handleKeyPress}
              onChange={(e) => {
                setDescription(e.target.value);
                setDescriptionError("");
              }}
            />

            {/* error message */}
            <div className="text-red-700 w-full pl-3"> {descriptionError}</div>
          </div>
        </div>

        {/* for  Genres*/}
        <div className="flex flex-wrap -mx-3 mb-2 ">
          <div className="md:w-full w-[90%] px-3 mx-auto">
            <label
              className={`block uppercase tracking-wide  text-xs font-bold mb-2 ${
                isDark ? "text-white" : "text-gray-700"
              }`}
              htmlFor="grid-password"
            >
              Book Genres
            </label>

            <div className="flex items-center space-x-2">
              <input
                className={`appearance-none block w-full border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${
                  error ? "border-red-700 " : ""
                } ${categatatoryError ? "border-red-700 mb-1" : ""} ${
                  isDark ? "text-black" : ""
                }  ${
                  isDark
                    ? "bg-blue-500 bg-opacity-20 outline-none"
                    : "bg-gray-200"
                }`}
                id="grid-password"
                type="text"
                placeholder="Fantasy, Adventure, ..."
                value={categatatory}
                ref={genresRef} // to handel Enter
                onKeyDown={handleKeyPress}
                onChange={(e) => {
                  setCategatatory(e.target.value);
                  setError("");
                  setCategatatoryError("");
                }}
              />

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 "
                onClick={() => {
                  if (categatatory !== "") {
                    // to check already have or not
                    if (!genres.includes(categatatory)) {
                      setGenres((prev) => [categatatory, ...prev]);
                      setCategatatory("");
                    } else {
                      setError("Category already exists.");
                    }
                  }
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
            {/* error message */}
            <div className="text-red-700 w-full  pl-3">{categatatoryError}</div>
            {error && (
              <div className="text-red-700 w-full  text-center">{error}</div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap space-x-5 mb-3">
          {genres &&
            genres.map((g) => (
              <div
                key={g}
                className=" bg-blue-500  rounded-full flex items-center pl-3 h-7 space-x-3"
              >
                <h1>{g}</h1>
                {/* to remove  */}
                <TiDelete className="w-full h-full" onClick={() => remove(g)} />
              </div>
            ))}
        </div>

        {/* to create book */}

        <div
          className={`flex items-center space-x-2  p-2 rounded-xl btn justify-center md:w-full w-[90%] px-3 mx-auto ${
            isDark ? "bg-dCd text-white" : "bg-blue-300"
          }`}
          onClick={() => {
            if (!id) {
              addBook();
            } else {
              editBook(id);
            }
          }}
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
          <h1> {id ? "Edit Book" : "Create Book"}</h1>
        </div>
      </form>
    </section>
  );
}

export default Create;
