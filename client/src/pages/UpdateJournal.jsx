import { useParams } from "react-router";
import { useNavigate } from "react-router";
import JournalService from "../services/journal.services.js";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";

const UpdateJournal = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [journalData, setJournalData] = useState({
    title: "",
    author: "",
    category: "",
    publishYear: "",
    issn: "",
    volume: "",
    issue: "",
    publicationFrequency: "",
    publisher: "",
    description: "",
  });

  useEffect(() => {
    const updateJournal = async (id) => {
      try {
        const resp = await JournalService.getJournalById(id);
        console.log(resp.data.data);
        if (resp.status === 200) {
          setJournalData(resp.data.data);
        }
      } catch (error) {
        Swal.fire({
          title: "Get Journal",
          icon: "error",
          text: error?.response?.data?.message || error.message,
        });
      }
    };
    updateJournal(id);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setJournalData({ ...journalData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...journalData,
        publishYear: parseInt(journalData.publishYear) || 0,
      };

      const resp = await JournalService.updateJournal(id, dataToSend);
      if (resp.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Journal updated successfully!",
          icon: "success",
        }).then(() => {
          setJournalData({
            title: "",
            author: "",
            category: "",
            publishYear: "",
            issn: "",
            volume: "",
            issue: "",
            publicationFrequency: "",
            publisher: "",
            description: "",
          });
          navigate("/journals");
        });
      }
    } catch (e) {
      console.log(e);
      Swal.fire({
        title: "Error",
        text: e?.response?.data?.message || "Failed to update journal",
        icon: "error",
      });
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/journals");
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-12">
        <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-md">
          <div className="text-center">
            <h2 className="mt-6 text-2xl font-bold text-gray-800">
              Update Journal
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                onChange={handleChange}
                value={journalData.title}
                className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="author"
                className="block text-sm font-medium text-gray-700"
              >
                Author *
              </label>
              <input
                id="author"
                name="author"
                type="text"
                required
                onChange={handleChange}
                value={journalData.author}
                className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <input
                id="category"
                name="category"
                type="text"
                onChange={handleChange}
                value={journalData.category}
                className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="publishYear"
                className="block text-sm font-medium text-gray-700"
              >
                Publish Year
              </label>
              <input
                id="publishYear"
                name="publishYear"
                type="number"
                onChange={handleChange}
                value={journalData.publishYear}
                className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="issn"
                className="block text-sm font-medium text-gray-700"
              >
                ISSN *
              </label>
              <input
                id="issn"
                name="issn"
                type="text"
                required
                onChange={handleChange}
                value={journalData.issn}
                placeholder="1234-5678"
                className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="volume"
                className="block text-sm font-medium text-gray-700"
              >
                Volume
              </label>
              <input
                id="volume"
                name="volume"
                type="text"
                onChange={handleChange}
                value={journalData.volume}
                placeholder="Vol. 15"
                className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="issue"
                className="block text-sm font-medium text-gray-700"
              >
                Issue
              </label>
              <input
                id="issue"
                name="issue"
                type="text"
                onChange={handleChange}
                value={journalData.issue}
                placeholder="Issue 3"
                className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="publicationFrequency"
                className="block text-sm font-medium text-gray-700"
              >
                Publication Frequency
              </label>
              <select
                id="publicationFrequency"
                name="publicationFrequency"
                onChange={handleChange}
                value={journalData.publicationFrequency}
                className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="MONTHLY">Monthly</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="publisher"
                className="block text-sm font-medium text-gray-700"
              >
                Publisher
              </label>
              <input
                id="publisher"
                name="publisher"
                type="text"
                onChange={handleChange}
                value={journalData.publisher}
                className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="3"
                onChange={handleChange}
                value={journalData.description}
                className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <div className="flex gap-2">
                <button
                  onClick={handleCancel}
                  type="button"
                  className="flex-1 rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 transition"
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateJournal;