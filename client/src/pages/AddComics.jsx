import { useState } from "react";
import ComicService from "../services/comic.services.js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const AddComics = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComicData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!comicData.title || !comicData.author || !comicData.isbn) {
      Swal.fire({
        title: "Validation Error",
        text: "Please fill in all required fields (Title, Author, ISBN)",
        icon: "warning",
      });
      return;
    }

    try {
      const dataToSend = {
        ...comicData,
        publishYear: comicData.publishYear ? parseInt(comicData.publishYear) : undefined,
        volumeNumber: comicData.volumeNumber ? parseInt(comicData.volumeNumber) : undefined,
      };

    
      Object.keys(dataToSend).forEach((key) => {
        if (dataToSend[key] === undefined || dataToSend[key] === "") {
          delete dataToSend[key];
        }
      });

      console.log("Sending data:", dataToSend);

      const response = await ComicService.createComic(dataToSend);
      console.log("Response:", response);

      if (response.status === 201) {
        Swal.fire({
          title: "Success",
          text: response.data.message || "Comic added successfully",
          icon: "success",
        }).then(() => {
          setComicData({
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
          navigate("/comics");
        });
      }
    } catch (error) {
      console.error("Error adding comic:", error);
      Swal.fire({
        title: "Error",
        text: error?.response?.data?.message || error.message || "Failed to add comic",
        icon: "error",
      });
    }
  };

  const handleCancel = () => {
    navigate("/comics");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-lg space-y-8 rounded-xl bg-white p-8 shadow-lg">
        <h2 className="text-center text-2xl font-bold text-gray-800">
          Add New Comic
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField label="Title *" name="title" value={comicData.title} onChange={handleChange} />
          <InputField label="Author *" name="author" value={comicData.author} onChange={handleChange} />
          <InputField label="Category" name="category" value={comicData.category} onChange={handleChange} />
          <InputField label="Publish Year" name="publishYear" type="number" value={comicData.publishYear} onChange={handleChange} />
          <InputField label="ISBN *" name="isbn" value={comicData.isbn} onChange={handleChange} placeholder="978-0-7851-5612-5" />
          <InputField label="Series" name="series" value={comicData.series} onChange={handleChange} />
          <InputField label="Volume Number" name="volumeNumber" type="number" value={comicData.volumeNumber} onChange={handleChange} />
          <InputField label="Illustrator" name="illustrator" value={comicData.illustrator} onChange={handleChange} />

          {/* Color Type */}
          <SelectField
            label="Color Type"
            name="colorType"
            value={comicData.colorType}
            onChange={handleChange}
            options={[{ value: "", label: "Select color type" }, { value: "FULL_COLOR", label: "Full Color" }]}
          />

          {/* Target Age */}
          <SelectField
            label="Target Age"
            name="targetAge"
            value={comicData.targetAge}
            onChange={handleChange}
            options={[{ value: "", label: "Select target age" }, { value: "TEEN", label: "Teen" }]}
          />

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={comicData.description}
              onChange={handleChange}
              rows={3}
              className="block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 rounded-md bg-red-500 py-2 text-white font-semibold shadow hover:bg-red-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-md bg-purple-600 py-2 text-white font-semibold shadow hover:bg-purple-500 transition"
            >
              Add Comic
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Reusable Input Field
const InputField = ({ label, name, value, onChange, type = "text", placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
    />
  </div>
);

// Reusable Select Field
const SelectField = ({ label, name, value, onChange, options }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default AddComics;
