import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import ComicService from "../services/comic.services.js";
import Swal from "sweetalert2";

const UpdateComic = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [comicData, setComicData] = useState({
    title: "",
    author: "",
    category: "",
    publishYear: "",
    isbn: "",
    series: "",
    volumeNumber: "",
    illustrator: "",
    colorType: "",
    targetAge: "",
    description: "",
  });

  useEffect(() => {
    const fetchComic = async () => {
      try {
        const resp = await ComicService.getComicById(id);
        if (resp.status === 200) setComicData(resp.data.data);
      } catch (error) {
        Swal.fire("Get Comic", error?.response?.data?.message || error.message, "error");
      }
    };
    fetchComic();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComicData({ ...comicData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...comicData,
        publishYear: parseInt(comicData.publishYear) || 0,
        volumeNumber: parseInt(comicData.volumeNumber) || 0,
      };

      const resp = await ComicService.updateComic(id, dataToSend);
      if (resp.status === 200) {
        Swal.fire("Success", "Comic updated successfully!", "success").then(() => {
          navigate("/comics");
        });
      }
    } catch (e) {
      Swal.fire("Error", e?.response?.data?.message || "Failed to update comic", "error");
    }
  };

  const handleCancel = () => navigate("/comics");

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-xl space-y-6 rounded-xl bg-white p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Update Comic</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title *
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              value={comicData.title}
              onChange={handleChange}
              placeholder="Enter comic title"
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
            />
          </div>

          {/* Author */}
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700">
              Author *
            </label>
            <input
              id="author"
              name="author"
              type="text"
              required
              value={comicData.author}
              onChange={handleChange}
              placeholder="Enter author name"
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              id="category"
              name="category"
              type="text"
              value={comicData.category}
              onChange={handleChange}
              placeholder="e.g., Action, Fantasy"
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
            />
          </div>

          {/* Publish Year */}
          <div>
            <label htmlFor="publishYear" className="block text-sm font-medium text-gray-700">
              Publish Year
            </label>
            <input
              id="publishYear"
              name="publishYear"
              type="number"
              value={comicData.publishYear}
              onChange={handleChange}
              placeholder="e.g., 2023"
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
            />
          </div>

          {/* ISBN */}
          <div>
            <label htmlFor="isbn" className="block text-sm font-medium text-gray-700">
              ISBN *
            </label>
            <input
              id="isbn"
              name="isbn"
              type="text"
              required
              value={comicData.isbn}
              onChange={handleChange}
              placeholder="Enter ISBN code"
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
            />
          </div>

          {/* Series & Volume */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="series" className="block text-sm font-medium text-gray-700">
                Series
              </label>
              <input
                id="series"
                name="series"
                type="text"
                value={comicData.series}
                onChange={handleChange}
                placeholder="Series name"
                className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="volumeNumber" className="block text-sm font-medium text-gray-700">
                Volume Number
              </label>
              <input
                id="volumeNumber"
                name="volumeNumber"
                type="number"
                value={comicData.volumeNumber}
                onChange={handleChange}
                placeholder="1"
                className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Illustrator */}
          <div>
            <label htmlFor="illustrator" className="block text-sm font-medium text-gray-700">
              Illustrator
            </label>
            <input
              id="illustrator"
              name="illustrator"
              type="text"
              value={comicData.illustrator}
              onChange={handleChange}
              placeholder="Illustrator name"
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
            />
          </div>

          {/* Color Type & Target Age */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="colorType" className="block text-sm font-medium text-gray-700">
                Color Type
              </label>
              <select
                id="colorType"
                name="colorType"
                value={comicData.colorType}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
              >
                <option value="">Select color type</option>
                <option value="FULL_COLOR">Full Color</option>
                <option value="BLACK_WHITE">Black & White</option>
              </select>
            </div>
            <div>
              <label htmlFor="targetAge" className="block text-sm font-medium text-gray-700">
                Target Age
              </label>
              <select
                id="targetAge"
                name="targetAge"
                value={comicData.targetAge}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
              >
                <option value="">Select target age</option>
                <option value="CHILD">Child</option>
                <option value="TEEN">Teen</option>
                <option value="ADULT">Adult</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="3"
              value={comicData.description}
              onChange={handleChange}
              placeholder="Enter a short description"
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 rounded-md bg-red-500 px-4 py-2 text-white font-semibold hover:bg-red-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-md bg-purple-500 px-4 py-2 text-white font-semibold hover:bg-purple-600 transition"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateComic;
