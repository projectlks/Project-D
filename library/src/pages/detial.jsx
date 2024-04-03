
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import useTheme from "../hooks/useTheme";

import cover from "./cover.jpg";

export default function Detial() {
  let { id } = useParams();
  let { isDark } = useTheme();
let {
  data: book,
  error,
  loading
} = useFetch(`http://localhost:3000/books/${id}`);

  return (
    <>
      {error && <p>{error}</p>}
      {loading && <h1>Loading...</h1>}
      {!error && (
        <section className="grid md:grid-cols-2 mt-10 grid-cols-1">
          <img src={cover} alt="cover" className="w-[70%] mx-auto" />

          {book && (
            <div className="space-y-3 p-4">
              <h1 className="text text-4xl font-bold">{book.title}</h1>
              <p className="flex">
                Written by{" "}
                <span className="text text-blue-500 mx-2">{book.author}</span>{" "}
                In {book.publication_year}
              </p>
              <span className="flex space-x-2 flex-nowrap overflow-hidden">
                {book.genres.map((b) => (
                  <p
                    className={`tag flex-nowrap truncate ${
                      isDark ? "dark text-black" : ""
                    }`}
                    key={b}
                  >
                    {b}
                  </p>
                ))}
              </span>

              <h1 className="text text-2xl font-bold">Description</h1>
              <p className="text text-justify">{book.description}</p>

              <div>
                <Link to="/comingSoon">
                  <p className="p-2 bg-slate-300 rounded-full w-[120px] text-center select-none">
                    Read Now...
                  </p>
                </Link>
              </div>
            </div>
          )}
        </section>
      )}
    </>
  );
}
