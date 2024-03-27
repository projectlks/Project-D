import cover from './cover.jpg'
import { Link } from "react-router-dom";
import useFetch from '../hooks/useFetch';

function Home() {

    let {
      data: book,
      error,
      loading
    } = useFetch(`http://localhost:3000/books`);
 return (
   <>
     {error && <p>{error}</p>}

     {!error && (
       <section>
         <div className="grid md:grid-cols-2 md:gap-y-8 mt-5 grid-cols-1 gap-y-5 xl:grid-cols-3">
           {book &&
             book.map((book) => (
               <Link to={`/books/${book.id}`} key={book.id}>
                 {/* selectron form */}

                 {loading && (
                   <div
                     className="border border-gray-300 shadow rounded-md  
  p-5 w-[80%] mx-auto space-y-3 "
                   >
                     <div className=" bg-gray-400 h-32  w-[70%] mx-auto"></div>

                     <div className="flex-1 space-y-4 py-1">
                       <div className="h-6 bg-gray-400 rounded w-3/4"></div>
                       <div className="space-y-2">
                         <div className="h-8 bg-gray-400 rounded"></div>
                         <div className="h-3 bg-gray-400 rounded w-5/6"></div>
                       </div>
                     </div>
                   </div>
                 )}

                 {/* actual one */}
                 <div className="border border-black p-5  mx-auto space-y-3 rounded-lg w-[80%]  ">
                   <img src={cover} alt="cover" className="w-[50%] mx-auto" />
                   <h1 className="text text-2xl font-bold w-full whitespace-nowrap overflow-hidden truncate">
                     {book.title}
                   </h1>

                   <p>Written By {book.author}</p>

                   <span className="flex space-x-2">
                     {book.genres.map((b) => (
                       <p
                         className="text text-sm flex whitespace-nowrap overflow-hidden truncate p-1 hover:border hover:rounded-full hover:p-[3px] hover:border-blue-500"
                         key={b}
                       >
                         #{b}
                       </p>
                     ))}
                   </span>
                 </div>
               </Link>
             ))}
         </div>
       </section>
     )}
   </>
 );
}

export default Home
