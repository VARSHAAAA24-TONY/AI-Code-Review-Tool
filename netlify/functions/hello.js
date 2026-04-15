export const handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "HELLO_FROM_NETLIFY_FUNCTIONS" }),
  };
};
