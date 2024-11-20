// Make sure to include these imports:
const { GoogleGenerativeAI } = require("@google/generative-ai");

export default async function handler(req, res) {
    const {message} = req.body;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

    const result = await model.generateContent(message);
    console.log(result.response.text());
    res.status(200).json({message: result.response.text()});

}
