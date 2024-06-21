import https from "https";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const openaiApiKey = config.private.OPENAI_API_KEY;

  if (!openaiApiKey) {
    return {
      statusCode: 500,
      message: 'OPENAI_API_KEY is not set in the environment variables.'
    };
  }

  try {
    const body = await readBody(event);
    const messages = body.messages || [];

    return new Promise((resolve, reject) => {
      const req = https.request(
        {
          hostname: "api.openai.com",
          port: 443,
          path: "/v1/chat/completions",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiApiKey}`,
          },
        },
        (res) => {
          let data = '';
          res.on('data', (chunk) => {
            data += chunk;
          });

          res.on('end', () => {
            try {
              const json = JSON.parse(data);
              if (json.error) {
                reject({
                  statusCode: res.statusCode,
                  message: json.error.message,
                });
              } else {
                resolve(json);
              }
            } catch (error) {
              reject({
                statusCode: 500,
                message: "Invalid JSON response from OpenAI",
                error: (error as Error).message,
              });
            }
          });
        }
      );

      req.on("error", (e) => {
        console.error("Request error:", e);
        reject({
          statusCode: 500,
          message: "Problem with request: " + (e as Error).message,
        });
      });

      req.write(JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: messages.map((message: { actor: string; message: any; }) => ({
          role: message.actor === "Human" ? "user" : "assistant",
          content: message.message
        })),
        temperature: 0.9,
        max_tokens: 512,
        top_p: 1.0,
        frequency_penalty: 0,
        presence_penalty: 0.6,
      }));

      req.end();
    });
  } catch (error) {
    console.error("Handler error:", error);
    return {
      statusCode: 500,
      message: "An error occurred while processing the request.",
      error: (error as Error).message
    };
  }
});
