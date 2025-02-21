import { useState } from "react";
import axios from "axios";

export default function ImageUploader() {
  const [image, setImage] = useState(null);
  const [resizedImages, setResizedImages] = useState([]);

  const uploadImage = async () => {
    if (!image) return alert("Please select an image!");

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(
        "https://your-backend.vercel.app/upload",
        formData
      );
      setResizedImages(response.data.files);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const tweetImages = async () => {
    try {
      await axios.post("https://your-backend.vercel.app/tweet");
      alert("Images posted to Twitter!");
    } catch (error) {
      console.error("Tweet failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold">Upload an Image</h2>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="mt-4"
        />
        <button
          onClick={uploadImage}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          Upload
        </button>

        {resizedImages.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Resized Images:</h3>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {resizedImages.map((img, idx) => (
                <img key={idx} src={`https://your-backend.vercel.app/${img}`} className="w-32 h-32 object-cover" alt="Resized" />
              ))}
            </div>
            <button
              onClick={tweetImages}
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
            >
              Tweet Images
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
