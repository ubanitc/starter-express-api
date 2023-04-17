const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const app = express();
const port = 3000;
const path = require("path"); 
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.post("/api/sendPrompt", async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    res.json(completion.data.choices[0].message);
  } catch (error) {
    res.status(500).send("Error processing the request.");
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
