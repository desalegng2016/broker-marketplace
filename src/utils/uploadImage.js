export const uploadImage = async (imageFile) => {
  const apiKey = "76858e5c36419e9604dc6511fb5ab0a0";

  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${apiKey}`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();
  return data.data.url;
};