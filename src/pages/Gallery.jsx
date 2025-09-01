import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { Eye, Trash2 } from "lucide-react";
import axios from "axios";

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { theme } = useTheme();

  const filters = [
    { id: "all", label: "All Photos" },
    { id: "campus", label: "Campus Life" },
    { id: "academics", label: "Academics" },
    { id: "sports", label: "Sports" },
    { id: "events", label: "Events" },
    { id: "arts", label: "Arts" },
  ];

  // 🔥 Upload Function
  const handleUpload = async (e, category) => {
    const file = e.target.files[0];
    if (!file) return;

    const title = prompt("Enter image title:", "Untitled");
    if (title === null) return;

    const description = prompt("Enter image description:", "");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("category", category);
    formData.append("title", title);
    formData.append("description", description || "");

    try {
      setLoading(true);
      setError(null);

      const res = await axios.post(
        "http://localhost:5000/api/gallery/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setPhotos((prev) => [...prev, res.data]);
      alert("Image uploaded successfully!");
    } catch (err) {
      console.error("Upload failed", err);
      setError("Upload failed. Please try again.");
      alert("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🧠 Fetch Images
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/gallery/");
        setPhotos(res.data);
      } catch (err) {
        console.error("Fetching images failed", err);
        setError("Failed to load images.");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // 🗑️ Delete Function
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) {
      return;
    }

    try {
      setLoading(true);
      await axios.delete(`http://localhost:5000/api/gallery/${id}`);
      
      // Remove the deleted image from the state
      setPhotos(prev => prev.filter(photo => photo._id !== id));
      alert("Image deleted successfully!");
    } catch (err) {
      console.error("Delete failed", err);
      setError("Delete failed. Please try again.");
      alert("Delete failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filteredPhotos =
    activeFilter === "all"
      ? photos
      : photos.filter((photo) => photo.category === activeFilter);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1KOdwn.img?w=4169&h=2829&m=4&q=80"
            alt="Gallery"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-900/60"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
            Photo Gallery
          </h1>
          <p className="text-xl md:text-2xl animate-fade-in-delay">
            Capturing Memories
          </p>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  activeFilter === filter.id
                    ? `${theme.bgPrimary}  shadow-lg`
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Add Image Button */}
          {activeFilter !== "all" && (
            <div className="text-center mt-8">
              <label className="inline-block cursor-pointer bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700">
                + Add Image to{" "}
                {filters.find((f) => f.id === activeFilter)?.label}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleUpload(e, activeFilter)}
                />
              </label>
            </div>
          )}
        </div>
      </section>

      {/* Loading & Error */}
      {loading && (
        <p className="text-center text-gray-500 mb-4">Loading photos...</p>
      )}
      {error && <p className="text-center text-red-500 mb-4">{error}</p>}

      {/* Photo Grid */}
      <section className="pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-scale-in"
              >
                <img
                  src={photo.imageUrl || photo.image}
                  alt={photo.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Eye
                    className={`${theme.textAccent} h-8 w-8 animate-bounce-in`}
                  />
                </div>
                {/* Delete Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(photo._id);
                  }}
                  className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-700"
                  title="Delete image"
                >
                  <Trash2 size={16} />
                </button>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h4 className={`font-bold mb-1 ${theme.textAccent}`}>
                    {photo.title}
                  </h4>
                  <p className={`text-sm ${theme.textAccent}`}>
                    {photo.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Tour */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2
                className={`text-3xl md:text-4xl font-bold ${theme.textPrimary}`}
              >
                Virtual Campus Tour
              </h2>
              <p className="text-lg text-gray-600">
                Explore our facilities with interactive 360° views.
              </p>

              <div className="space-y-3">
                {["360° Views", "Interactive Elements", "Mobile Friendly"].map(
                  (feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div
                        className={`w-2 h-2 ${theme.bgPrimary} rounded-full`}
                      ></div>
                      <span className={`${theme.textPrimary}`}>{feature}</span>
                    </div>
                  )
                )}
              </div>

              <button
                className={`px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-white ${theme.bgPrimary} hover:${theme.bgPrimaryHover}`}
              >
                Start Virtual Tour
              </button>
            </div>

            <div className="relative">
              <img
                src="https://www.atulhost.com/wp-content/uploads/2019/05/create-a-website.jpg"
                alt="Virtual tour"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
