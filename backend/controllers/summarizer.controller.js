import axios from 'axios';

export const summarizeArticle = async (req, res) => {
  console.log('📥 /api/summarize called');

  const { content } = req.body;
  console.log('Received content:', content);

  if (!content || content.trim().length < 30) {
    return res.status(400).json({ error: 'Article content is too short or missing.' });
  }

  const prompt = `Summarize the following article in 3 concise bullet points:\n\n${content}`;

  try {
    const apiKey = process.env.GEMINI_API_KEY;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    const summary = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!summary || summary.trim().length < 10) {
      return res.status(500).json({ error: 'Failed to generate a summary from Gemini 1.5' });
    }

    console.log('✅ Gemini summary:', summary);
    res.status(200).json({ summary });

  } catch (err) {
    console.error('❌ Gemini API error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Gemini summarization failed.' });
  }
};
