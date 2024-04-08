import cover from "./cover.jpg";
import { Link, useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import { FaRegEdit ,FaTrashAlt} from "react-icons/fa"; // edit icon
import { AiTwotoneDelete } from "react-icons/ai"; // delete icon
import { useEffect, useState } from "react";
import { database } from "../firebase";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query
} from "firebase/firestore";
                  
function Home() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [deleteBookId, setDeleteBookId] = useState(null); // Track book ID for deletion confirmation
  let { isDark } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    let ref = collection(database, "books");
    let q = query(ref, orderBy("date", "desc"));

    onSnapshot(q, (docs) => {
      let books = [];
      if (docs.empty) {
        setError("No Documents Found");
        setLoading(false);
      } else {
        docs.forEach((doc) => {
          let book = { id: doc.id, ...doc.data() };
          books.push(book);
        });

        setBooks(books);
        setLoading(false);
        setError("");
      }
    });
  }, []);

  let editFun = (e, id) => {
    e.preventDefault();
    navigate(`/edit/${id}`);
  };

  let deleteFun = async (e, id) => {
    e.preventDefault();
    // delete firestore
    let ref = doc(database, "books", id);
    await deleteDoc(ref);

    setDeleteBookId(null); // Reset deleteBookId after deletion
  };

  return (
    <>
      {error && <p>{error}</p>}
      {!error && (
        <section>
          <div className="bg-gray-800 text-white py-10 mt-0">
            <div className="container mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4">
                Welcome to Our Website
              </h1>
              <p className="text-lg mb-4">
                Discover the best books and authors here.
              </p>
              
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-y-8 mt-5 grid-cols-1 gap-y-5 xl:grid-cols-3 ">
            {books &&
              books.map((book) => (
                <div key={book.id}>
                  {/* Wrap each book in a div to avoid potential issues with Link */}

                  <Link to={`/books/${book.id}`} className="w-full">
                    <div className="flex items-center bg-gray-100 rounded-lg p-4 transition duration-300 hover:bg-gray-200">
                      <div className="w-32 h-40 overflow-hidden flex-shrink-0">
                        <img
                          src={cover}
                          alt="cover"
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex flex-col flex-grow ml-4">
                        <h2 className="text-xl font-semibold">{book.title}</h2>
                        <p className="text-gray-600">
                          Written By {book.author}
                        </p>
                        <p className="text-gray-800 mt-2 mb-4">
                          {book.description}
                        </p>
                        <div className="flex flex-wrap">
                          {book.genres &&
                            book.genres.map((genre, index) => (
                              <span
                                key={index}
                                className="text-xs text-gray-700 mr-2 mb-2 p-1 bg-gray-300 rounded"
                              >
                                {genre}
                              </span>
                            ))}
                        </div>
                        <div className="flex justify-end mt-auto">
                          <button
                            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                            onClick={(e) => {
                              e.preventDefault();
                              editFun(e, book.id);
                            }}
                          >
                            <FaRegEdit className="w-4 h-4 mr-1" />
                            Edit
                          </button>
                          <button
                            className="bg-red-500 text-white px-4 py-2 rounded flex items-center ml-2 hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
                            onClick={(e) => {
                              e.preventDefault();
                              setDeleteBookId(book.id);
                            }}
                          >
                            <FaTrashAlt className="w-4 h-4 mr-1" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                  {deleteBookId === book.id && (
                    <div
                      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-70`}
                    >
                      <div
                        className={`bg-white p-8 rounded-lg shadow-lg max-w-md`}
                      >
                        <h1 className="text-gray-900 text-3xl font-semibold mb-6">
                          Confirm Deletion
                        </h1>
                        <p className="text-gray-700 mb-8">
                          Are you sure you want to delete this book? This action
                          cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-4">
                          <button
                            type="button"
                            className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md font-semibold hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-400"
                            onClick={() => {
                              setDeleteBookId(null);
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="px-6 py-2 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-700"
                            onClick={(e) => {
                              deleteFun(e, book.id);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </section>
      )}
    </>
  );
}

export default Home;



