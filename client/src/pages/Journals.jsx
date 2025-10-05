import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import JournalService from "../services/journal.services.js";
import Swal from "sweetalert2";
import JournalCard from "../components/JournalCard";

const Journals = () => {
  const [journals, setJournals] = useState([]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await JournalService.getAllJournals();
      if (response.status === 200) {
        setJournals(response.data.data);
      }
    } catch (error) {
      Swal.fire({
        title: "Get All Journals",
        icon: "error",
        text: error?.response?.data?.message || error.message,
      });
    }
  };
  fetchData();
}, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Journals</h1>
        <Link
          to="/add-journal"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition"
        >
          Add Journal
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {journals?.map((journal) => (
          <JournalCard key={journal.itemId} journal={journal} />
        ))}
      </div>
    </div>
  );
};

export default Journals;
