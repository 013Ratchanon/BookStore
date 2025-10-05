import { useEffect } from "react";
import Swal from "sweetalert2";
import ComicService from "../services/comic.services.js";

const ComicCard = ({ comic }) => {
  useEffect(() => {}, []);

  const handleDelete = async (id) => {
    console.log("Deleting id:", id);
    try {
      const response = await ComicService.deleteComic(id);
      if (response.status === 200) {
        Swal.fire({
          title: "Deleted comic",
          text: "Comic deleted successfully!",
          icon: "success",
        }).then(() => {
          window.location.reload();
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="max-w-sm bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img
        className="w-full h-48 object-cover"
        src={
          comic.coverImage || "https://via.placeholder.com/300x200?text=No+Image"
        }
        alt={comic.title}
      />

      <div className="p-5">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2 line-clamp-2">
          {comic.title}
        </h2>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {comic.description || "No description available."}
        </p>

        <div className="space-y-1 text-gray-700 text-sm">
          <p>
            <span className="font-semibold">Series:</span> {comic.series}
          </p>
          <p>
            <span className="font-semibold">Volume:</span> {comic.volumeNumber}
          </p>
          <p>
            <span className="font-semibold">Author:</span> {comic.author}
          </p>
          <p>
            <span className="font-semibold">Illustrator:</span> {comic.illustrator}
          </p>
          <p>
            <span className="font-semibold">Color:</span> {comic.colorType}
          </p>
          <p>
            <span className="font-semibold">Target Age:</span> {comic.targetAge}
          </p>
          <p>
            <span className="font-semibold">สถานะ:</span>{" "}
            <span
              className={`${
                comic.status === "available" ? "text-green-600" : "text-red-600"
              } font-medium`}
            >
              {comic.status}
            </span>
          </p>
        </div>

        <div className="flex justify-between items-center mt-5">
          <a
            href={`/update-comic/${comic.itemId}`}
            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-md transition"
          >
            Update
          </a>
          <button
            onClick={() => handleDelete(comic.itemId)}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComicCard;   