// import dotenv from "dotenv";
// dotenv.config()
// const url = `https://api.cloudinary.com/v1_1/dunt7rsk6/auto/upload`;
// const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_COULDINARY_CLOUD_NAME}/auto/upload`;

export const uploadFile = async (file) => {
    try {
        const cloudName = process.env.REACT_APP_COULDINARY_CLOUD_NAME;
        const url = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "chat-app");

        const response = await fetch(url, {
            method: "POST",
            body: formData
        })
        if (!response.ok) {
            throw new Error("Image not fount")
        }

        const data = await response.json()

        return data
    } catch (error) {
        console.log(error.message || error)
    }
}