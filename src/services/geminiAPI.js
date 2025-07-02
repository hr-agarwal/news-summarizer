export const summarizeArticle = async (text) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  const prompt = `Summarize the following article in 3 concise bullet points:\n\n${text}`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    }
  );

  const data = await response.json();

  if (
    response.ok &&
    data?.candidates?.[0]?.content?.parts?.[0]?.text
  ) {
    return data.candidates[0].content.parts[0].text
      .split('\n')
      .filter((line) =>
        line.trim().startsWith('•') || line.trim().startsWith('-')
      );
  } else {
    throw new Error(data?.error?.message || 'Gemini summarization failed');
  }
};

