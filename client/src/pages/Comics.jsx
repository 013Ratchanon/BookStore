import { useState, useEffect } from "react";
import ComicsService from "../services/comic.services.js";
import Swal from "sweetalert2";
import ComicCard from "../components/ComicCard";

const Comics = () => {
  const [comics, setComics] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ComicsService.getAllComics();

        if (response.status === 200) {
          setComics(response.data);
        }
      } catch (error) {
        Swal.fire({
          title: "Get All Comics",
          icon: "error",
          text: error?.response?.data?.message || error.message,
        });
      }
    };
    fetchData();
  }, []);
  
  console.log(comics.data);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Comics</h1>
        <a
          href="/add-comic"
          className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-lg transition"
        >
          Add Comic
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {comics?.data?.map((comic) => (
          <ComicCard key={comic.itemId} comic={comic} />
        ))}
      </div>
    </div>
  );
};

export default Comics;