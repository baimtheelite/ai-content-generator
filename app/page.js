'use client'
import axios from 'axios';
import { useState } from 'react'

export default function Page() {
  const [geminiFormData, setGeminiFormData] = useState({
    message: "",
  });

  const [openAiFormData, setOpenAiFormData] = useState({
    message: "",
  });

  const [openAIResponse, setOpenAIResponse] = useState("");
  const [geminiResponse, setGeminiResponse] = useState("");

  const handleChangeGemini = (e) => {
    const { name, value } = e.target;
    setGeminiFormData({ ...geminiFormData, [name]: value });
  };

  const handleChangeOpenAI = (e) => {
    const { name, value } = e.target;
    setOpenAiFormData({ ...openAiFormData, [name]: value });
  };

  const handleGeminiSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting:", geminiFormData);

    const response = await axios.post('/api/gemini', {
      message: geminiFormData.message
    })
      .then(function (response) {
        console.log(response.data);
        setGeminiResponse(response.data.message);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleOpenAISubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting:", openAiFormData);

     const response = await axios.post('/api/openai', {
      message: openAiFormData.message
    })
    .then(function (response) {
      console.log(response.data);
      setOpenAIResponse(response.data.message.choices[0].message.content);
    })
    .catch(function (error) {
      console.log(error);
    });

  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <form onSubmit={handleOpenAISubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2>ChatGPT</h2>
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={openAiFormData.message}
                onChange={handleChangeOpenAI}
                className="w-full p-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                rows="4"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              Submit
            </button>
          </form>

          <div className="mb-4 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            Response: <p>{openAIResponse}</p>
          </div>
        </div>
        <div>
          <form onSubmit={handleGeminiSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2>Gemini</h2>
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={geminiFormData.message}
                onChange={handleChangeGemini}
                className="w-full p-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                rows="4"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              Submit
            </button>
          </form>

          <div className="mb-4 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            Response: <p>{geminiResponse}</p>
          </div>
        </div>
      </div>
    </>
  );
};