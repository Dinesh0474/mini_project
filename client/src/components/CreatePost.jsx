import React, { useState } from 'react'
import axios from "axios"
const CreatePost = () => {
    const [isopenModel,setOpenModel] = useState(false);
    const [postData,setPostData] = useState({
        caption:"",
        image:"",
        hashtags:""
    })
const user_id=localStorage.getItem("user_id");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPostData({
            ...postData,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setPostData((prevData) => ({
                       ...prevData,  // Spread the previous state
                       image: reader.result // Update the image field
                     }));
                };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const tweetsData={
        text:postData.caption,
        hashtags:postData.hashtags.split(" "),
        imagePath:postData.image,
        userId:user_id

    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const data=await axios.post("http://localhost:3000/tweets",tweetsData)
            console.log("Post Data: ", data);
            console.log("Post Data: ", tweetsData);
            
            closeModal(); // Close the modal after submission
        }catch(err){
            console.log("Error in posting data: ",err);
        }
        // Handle post submission
    };

    const openModal = () => {
        setOpenModel(true);
    };

    const closeModal = () => {
        setOpenModel(false);
        setPostData({ caption: "", image: null, hashtags: "" }); // Reset form
    };
    return (
        <div>
             <div className="mt-8 flex justify-between">
        <h1 className="text-xl font-semibold">For You</h1>
        <button
          onClick={openModal}
          className="bg-gray-300 text-black px-4 py-2 rounded-full hover:bg-gray-500"
        >
          Add Post+
        </button>
      </div>
           
             {isopenModel && (
                <div className="fixed inset-0  bg-opacity-100  flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-8 rounded-lg w-96">
                        <h2 className="text-2xl font-semibold text-center mb-4">Create a Post</h2>

                        
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="caption" className="block text-sm font-semibold">
                                    Caption
                                </label>
                                <input
                                    type="text"
                                    id="caption"
                                    name="caption"
                                    value={postData.caption}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md"
                                    placeholder="Write something..."
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="image" className="block text-sm font-semibold">
                                    Upload Image
                                </label>
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    onChange={handleImageChange}
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="hashtags" className="block text-sm font-semibold">
                                    Hashtags
                                </label>
                                <input
                                    type="text"
                                    id="hashtags"
                                    name="hashtags"
                                    value={postData.hashtags}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md"
                                    placeholder="#hashtag #anotherHashtag"
                                />
                            </div>

                            <div className="flex justify-between">
                              
                                <button
                                    type="button"
                                    onClick={closeModal}
                className="bg-gray-600 text-white px-4 py-2 rounded-full hover:bg-gray-500"

                                    // className="bg-gray-300 text-black py-2 px-4 rounded-md"
                                >
                                    Cancel
                                </button>

                            
                                <button
                                    type="submit"
                className="bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-700"
                                    
                                    // className="bg-blue-600 text-white py-2 px-4 rounded-md"
                                >
                                    Post
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CreatePost