import { useEffect, useState } from "react";
import API from "../services/api";

function AdminDashboard() {
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState({
    brand: "",
    model: "",
    year: "",
    pricePerDay: ""
  });

  const [editingId, setEditingId] = useState(null);

  // Fetch Cars
  const fetchCars = async () => {
    const res = await API.get("/cars");
    setCars(res.data);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or Update Car
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await API.put(`/cars/${editingId}`, form);
      setEditingId(null);
    } else {
      await API.post("/cars", form);
    }

    setForm({ brand: "", model: "", year: "", pricePerDay: "" });
    fetchCars();
  };

  // Edit Car
  const handleEdit = (car) => {
    setForm(car);
    setEditingId(car._id);
  };

  // Delete Car
  const handleDelete = async (id) => {
    await API.delete(`/cars/${id}`);
    fetchCars();
  };

  return (
  <div className="min-h-screen bg-gray-100 p-8">
    <h2 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h2>

    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto mb-8"
    >
      <div className="space-y-4">
        <input
          name="brand"
          placeholder="Brand"
          value={form.brand}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="model"
          placeholder="Model"
          value={form.model}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="year"
          placeholder="Year"
          value={form.year}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="pricePerDay"
          placeholder="Price Per Day"
          value={form.pricePerDay}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          {editingId ? "Update Car" : "Add Car"}
        </button>
      </div>
    </form>

    <div className="grid md:grid-cols-3 gap-6">
      {cars.map(car => (
        <div
          key={car._id}
          className="bg-white p-4 rounded-xl shadow-md"
        >
          <h3 className="text-xl font-semibold">
            {car.brand} {car.model}
          </h3>
          <p className="text-gray-600">
            {car.year} - ${car.pricePerDay}/day
          </p>

          <div className="flex gap-2 mt-4">
            <button
              onClick={() => handleEdit(car)}
              className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(car._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}

export default AdminDashboard;