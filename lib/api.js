import ky from "ky";

// create api intances

export const api = ky.create({
  prefixUrl: process.env.API_BASE_URL, //THIS IS BASE URL FOR every request made with api instance
  timeout: 60000,
  retry: 0,
});
