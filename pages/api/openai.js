const { default: OpenAI } = require("openai");

export default async function handler(req, res) {
    console.log(req);

    const {message} = req.body;
    
    // console.log(message);

    // res.status(200).json({ message: message });

    
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: "user", content: message }],
        model: "gpt-4o-mini",
    });

    res.status(200).json({message: chatCompletion});
}