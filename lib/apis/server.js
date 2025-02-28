import { HTTPError } from "ky";
import { api } from "@/lib/api";

// create the funtion as LoginUser (loginUser Action)
// export const loginUser = async (loginData) => {
//   //console.log(loginData);
//   // calling the END POINT api url using fetch request
//   const response = await fetch("http://localhost:3000/api/v1/login", {
//     method: "POST",
//     //passed the data inside body to end point
//     body: JSON.stringify({
//       email: loginData?.email,
//       password: loginData?.password,
//     }),
//   });

//   console.log("SERVER LOGIN ACTION", response.json());
// };

// export const loginUser = async (loginData) => {
//   try {
//     const response = await fetch("http://localhost:3000/api/v1/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json", // Ensure the Content-Type header is set
//       },
//       body: JSON.stringify({
//         email: loginData?.email,
//         password: loginData?.password,
//       }),
//     });

//     // Check for HTTP error responses
//     if (!response.ok) {
//       const errorData = await response.json();
//       console.error("Login failed:", errorData);
//       throw new Error(`Login failed: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log("SERVER LOGIN ACTION", data);
//     return data;
//   } catch (error) {
//     console.error("Error in loginUser:", error);
//     return { error: true, message: error.message };
//   }
// };

export const loginUser = async (loginData) => {
  try {
    // Make the request using the api instance (or fetch)
    const response = await api.post("api/v1/login", {
      body: JSON.stringify({
        email: loginData?.email,
        password: loginData?.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Optional based on your needs
    });

    // Check if the response is OK (status 200-299)
    if (response.ok) {
      const data = await response.json();
     // console.log("SERVER LOGIN ACTION", data);
      return data; // Return the parsed JSON response
    } else {
      // If the response status is not OK, log the issue
      const errorData = await response.json();
      console.error("Login failed:", errorData);
      return {
        error: true,
        status: response.status,
        message: errorData.message || "Something went wrong",
      };
    }
  } catch (error) {
    // Handle errors, both HTTP-specific and non-HTTP
    if (error instanceof HTTPError) {
      const status = error.response.status;
      const responseBody = await error.response.json();
      console.error("HTTP ERROR:", status, responseBody);
      return {
        error: true,
        status,
        message: responseBody.message || "An error occurred during login",
      };
    } else {
      console.error("UNKNOWN ERROR:", error);
      return {
        error: true,
        message: "An unexpected error occurred during login",
      };
    }
  }
};

//create the server function to getMovies
// use ky insted of fetch

export const getMovies = async () => {
  try {
    const response = await api.get("v1/movies", { cache: "no-store" });
    // Check if the response is OK (status 200-299)
    if (response.ok) {
      return await response.json(); // Parse the response as JSON if it's valid
    } else {
      // If the response status is not OK, try to get the response as text and log it
      return { error: true, message: "Somthing went wrong" };
    }
  } catch (error) {
    // If an error occurs (e.g., network error or unexpected failure)
    console.log("MOVIES RESPONSE", error);

    if (error instanceof HTTPError) {
      const status = error.response.status;
      const responseBody = await error.response.json();
      console.error("HTTP ERROR:", status, responseBody);
      return {
        error: true,
        status,
        message: responseBody.message || "An error occurred",
      };
    } else {
      console.error("UNKNOWN ERROR:", error);
      return { error: true, message: "An unexpected error occurred" };
    }

    return undefined;
  }
};


export const registerUser = async (formData) => {
  try {
    //console.log("fromData", formData);
    const response = await api.post("api/v1/register", { json: formData });

    if (response.ok) {
      return response.json();
    } else {
      return undefined;
    }

    // console.log("Registration Response", response);
    // return await response.json();
  } catch (error) {
    // api end point responce capture here and set for frontend
    const status = error?.response.status;
    const responseBody = await error.response.json();
    if (status && responseBody) {
      // console.log("Registration Error", status);

      if (status === 409) {
        return responseBody;
      }
      return undefined;
    }
    return undefined;
  }
};
