import { useState } from "react";
import axios from "axios";

const ProjectForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("ตู้พาเนล");
  const [images, setImages] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (
    !name ||
    !description ||
    !location ||
    !category ||
    images.length === 0
  ) {
    setError("กรอกข้อมูลให้ครบ");
    return;
  }

  for (const image of images) {
    if (!(image instanceof File) || !image.type.startsWith("image/")) {
      setError("อัพโหลดไฟล์รูปที่ถูกต้อง");
      return;
    }
    if (image.size > 10 * 1024 * 1024) {
      setError("อัพโหลดไฟล์รูปไม่เกิน 10MB");
      return;
    }
  }

  setLoading(true);
  setError("");
  setSuccess("");

  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("กรุณาเข้าสู่ระบบใหม่");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("category", category);
    images.forEach((file) => {
      formData.append("images", file); // ต้องตรงกับ field ที่ backend รับ
    });

    // --- Log ข้อมูล formData เพื่อเช็คก่อนส่งจริง ---
    console.log("===== formData content =====");
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(key, value.name, value.size, value.type);
      } else {
        console.log(key, value);
      }
    }

    // Log header
    console.log("===== Request Headers =====");
    console.log({
      Authorization: `Bearer ${token}`,
      // Content-Type ไม่ต้องใส่ axios จะจัดการให้
    });

    const response = await axios.post(
      "http://localhost:5000/api/projects",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 201 || response.data.success) {
      setSuccess("เพิ่มโปรเจกต์สำเร็จ");
      setName("");
      setDescription("");
      setLocation("");
      setCategory("ตู้พาเนล");
      setImages([]);
      e.target.reset();
    } else {
      throw new Error(
        response.data.message || "เกิดข้อผิดพลาดในการเพิ่มโปรเจกต์"
      );
    }
  } catch (error) {
    console.error("Error adding project", error);
    setError(
      error.response?.data?.message ||
        error.response?.data?.error?.message ||
        error.message ||
        "เกิดข้อผิดพลาดในการเพิ่มโปรเจกต์"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-green-primary">
        เพิ่มโปรเจกต์
      </h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-green-primary mb-1"
          >
            ชื่อโปรเจกต์
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-green-soft/30 rounded-md focus:outline-none focus:ring-accent-orange focus:border-accent-orange"
            placeholder="กรอกชื่อโปรเจกต์"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-green-primary mb-1"
          >
            รายละเอียด
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={3}
            className="w-full px-3 py-2 border border-green-soft/30 rounded-md"
            placeholder="อธิบายรายละเอียดโปรเจกต์"
          />
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-green-primary mb-1"
          >
            สถานที่ติดตั้ง
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="w-full px-3 py-2 border border-green-soft/30 rounded-md"
            placeholder="เช่น โรงงาน A จ.ชลบุรี"
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-green-primary mb-1"
          >
            หมวดหมู่
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full px-3 py-2 border border-green-soft/30 rounded-md"
          >
            <option value="ตู้พาเนล">ตู้พาเนล</option>
            <option value="ตู้เฟรม">ตู้เฟรม</option>
          </select>
        </div>

        <div>
          <div>
            <label
              htmlFor="images"
              className="block text-sm font-medium text-green-primary mb-1"
            >
              รูปภาพโปรเจกต์
            </label>
            <input
              type="file"
              id="images"
              accept="image/*"
              multiple
              onChange={(e) => {
                if (e.target.files) {
                  setImages(Array.from(e.target.files));
                }
              }}
              required
              className="w-full px-3 py-2 border border-green-soft/30 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-orange focus:border-accent-orange"
            />
            <p className="mt-1 text-sm text-green-secondary">
              เลือกรูปได้หลายรูป (สูงสุด 10MB/ไฟล์)
            </p>
            {images.length > 0 && (
              <div className="mt-2 flex gap-2 flex-wrap">
                {images.map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index}`}
                    className="h-24 w-24 object-contain border rounded border-green-soft/30"
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? "กำลังเพิ่ม..." : "เพิ่มโปรเจกต์"}
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
