import axios from "axios";

const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const apiKey = process.env.AZURE_OPENAI_API_KEY;
const deployment = process.env.AZURE_OPENAI_DEPLOYMENT;
const apiVersion = process.env.AZURE_OPENAI_API_VERSION || "2023-11-15-preview";

if (!endpoint || !apiKey || !deployment) {
  console.warn("Azure OpenAI environment variables are not fully set. The service will fail until they are set.");
}

export async function generateResponse(prompt: string): Promise<string> {
  if (!endpoint || !apiKey || !deployment) {
    throw new Error("Azure OpenAI configuration missing");
  }

  const url = `${endpoint.replace(/\/$/, "")}/openai/deployments/${encodeURIComponent(
    deployment
  )}/chat/completions?api-version=${apiVersion}`;

  const payload = {
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: prompt }
    ],
    max_tokens: 800,
    temperature: 0.7
  };

  const headers = {
    "Content-Type": "application/json",
    "api-key": apiKey
  };

  const res = await axios.post(url, payload, { headers });
  const text = res.data?.choices?.[0]?.message?.content;
  if (!text) {
    throw new Error("No text returned from Azure OpenAI");
  }
  return text;
}
