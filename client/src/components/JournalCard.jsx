import Swal from "sweetalert2";
import JournalService from "../services/journal.services.js";

const JournalCard = ({ journal }) => {
  const handleDelete = async (id) => {
    try {
      const response = await JournalService.deleteJournal(id);
      if (response.status === 200) {
        Swal.fire({
          title: "Deleted journal",
          text: "Journal deleted successfully!",
          icon: "success",
        }).then(() => {
          window.location.reload();
        });
      }
    } catch (e) {
      Swal.fire("Error", e?.response?.data?.message || "Failed to delete journal", "error");
    }
  };

  return (
    <div className="max-w-sm bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Cover Image */}
      <img
        className="w-full h-48 object-cover"
        src={journal.coverImage || "https://via.placeholder.com/300x200?text=No+Image"}
        alt={journal.title}
      />

      <div className="p-5 flex flex-col">
  {/* Title & Description */}
  <div>
    <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
      {journal.title}
    </h2>
    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
      {journal.description || "No description available."}
    </p>
  </div>

  {/* Details */}
  <div className="space-y-1 text-gray-700 text-sm">
    <p><span className="font-semibold">Category:</span> {journal.category || "-"}</p>
    <p><span className="font-semibold">Published:</span> {journal.publishYear || "-"}</p>
    <p><span className="font-semibold">Author:</span> {journal.author || "-"}</p>
    <p>
      <span className="font-semibold">Status:</span>{" "}
      <span className={`${journal.status === "available" ? "text-green-600" : "text-red-600"} font-medium`}>
        {journal.status || "Unknown"}
      </span>
    </p>
  </div>

  {/* Action Buttons */}
  <div className="flex justify-between items-center mt-4">
    <a
      href={`/update-journal/${journal.itemId}`}
      className="flex-1 mr-2 text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition"
    >
      Update
    </a>
    <button
      onClick={() => handleDelete(journal.itemId)}
      className="flex-1 ml-2 text-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition"
    >
      Delete
    </button>
  </div>
</div>

    </div>
  );
};

export default JournalCard;
