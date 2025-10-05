import { useState } from "react";
import JournalService from "../services/journal.services.js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const AddJournals = () => {
  const navigate = useNavigate();
  const [journalData, setJournalData] = useState({
    title: "",
    author: "",
    category: "",
    publishYear: "",
    issn: "",
    volume: "",
    issue: "",
    publicationFrequency: "MONTHLY",
    publisher: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJournalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!journalData.title || !journalData.author || !journalData.issn) {
      Swal.fire({
        title: "Validation Error",
        text: "Please fill in all required fields (Title, Author, ISSN)",
        icon: "warning",
      });
      return;
    }

    try {
      const dataToSend = {
        ...journalData,
        publishYear: parseInt(journalData.publishYear) || null,
      };

      console.log("Sending data:", dataToSend);
      const response = await JournalService.createJournal(dataToSend);
      console.log("Response:", response);

      if (response.status === 201 || response.status === 200) {
        Swal.fire({
          title: "Success",
          text: response.data.message || "Journal added successfully",
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
            publicationFrequency: "MONTHLY",
            publisher: "",
            description: "",
          });
          navigate("/journals");
        });
      }
    } catch (error) {
      console.error("Error adding journal:", error);
      Swal.fire({
        title: "Error",
        text: error?.response?.data?.message || error.message || "Failed to add journal",
        icon: "error",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-lg space-y-8 rounded-xl bg-white p-8 shadow-lg">
        <h2 className="text-center text-2xl font-bold text-gray-800">
          Add New Journal
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <InputField
            label="Title *"
            name="title"
            value={journalData.title}
            onChange={handleChange}
            placeholder="Enter journal title"
          />

          {/* Author */}
          <InputField
            label="Author *"
            name="author"
            value={journalData.author}
            onChange={handleChange}
            placeholder="Enter author name"
          />

          {/* Category */}
          <InputField
            label="Category"
            name="category"
            value={journalData.category}
            onChange={handleChange}
            placeholder="Enter category"
          />

          {/* Publish Year */}
          <InputField
            label="Publish Year"
            name="publishYear"
            type="number"
            value={journalData.publishYear}
            onChange={handleChange}
            placeholder="e.g., 2023"
          />

          {/* ISSN */}
          <InputField
            label="ISSN *"
            name="issn"
            value={journalData.issn}
            onChange={handleChange}
            placeholder="1234-5678"
          />

          {/* Volume */}
          <InputField
            label="Volume"
            name="volume"
            value={journalData.volume}
            onChange={handleChange}
            placeholder="Vol. 15"
          />

          {/* Issue */}
          <InputField
            label="Issue"
            name="issue"
            value={journalData.issue}
            onChange={handleChange}
            placeholder="Issue 3"
          />

          {/* Publication Frequency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Publication Frequency
            </label>
            <select
              name="publicationFrequency"
              value={journalData.publicationFrequency}
              onChange={handleChange}
              className="block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="MONTHLY">Monthly</option>
              <option value="WEEKLY">Weekly</option>
              <option value="YEARLY">Yearly</option>
            </select>
          </div>

          {/* Publisher */}
          <InputField
            label="Publisher"
            name="publisher"
            value={journalData.publisher}
            onChange={handleChange}
            placeholder="Publisher name"
          />

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={journalData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Enter description"
              className="block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 py-2 text-white font-semibold shadow hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500 transition"
          >
            Add Journal
          </button>
        </form>
      </div>
    </div>
  );
};

// Reusable Input Field Component
const InputField = ({ label, name, value, onChange, type = "text", placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    />
  </div>
);

export default AddJournals;
