// const baseUrl = process.env.API || "https://flipkart-rest-server.herokuapp.com";
// const baseUrl = "https://long-cyan-llama-wear.cyclic.app";
const baseUrl = "http://localhost:5000"

export const api = `${baseUrl}/api`;

export const generatePublicUrl = (fileName) => {
  return `${baseUrl}/public/${fileName}`;
};
