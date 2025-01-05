import { HTTPError } from "ky";
import { api } from "../api";

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

export const loginUser = async (loginData) => {
  try {
    const response = await fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Ensure the Content-Type header is set
      },
      body: JSON.stringify({
        email: loginData?.email,
        password: loginData?.password,
      }),
    });

    // Check for HTTP error responses
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Login failed:", errorData);
      throw new Error(`Login failed: ${response.status}`);
    }

    const data = await response.json();
    console.log("SERVER LOGIN ACTION", data);
    return data;
  } catch (error) {
    console.error("Error in loginUser:", error);
    return { error: true, message: error.message };
  }
};


//create the server function to getMovies
// use ky insted of fetch

export const getMovies = async () => {
  try {
    const response = await api.get("movies", { cache: "no-store" });
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
    // if (error) {
    //   // Handle HTTP errors specifically
    //   const status = error?.response?.status; //http status code 404, 500
    //   const responseBody = await error?.response?.json();

    //   console.log("HTTP ERROR: ", status, responseBody);
    // } else {
    //   //Handle non-Http errors (network issues)
    //   console.log("UNKNOWN ERROR: ", error);
    // }

    //chat gpt error Handling
    if (error instanceof HTTPError) {
      const status = error.response.status;
      const responseBody = await error.response.json();
      console.error("HTTP ERROR:", status, responseBody);
      return { error: true, status, message: responseBody.message || "An error occurred" };
    } else {
      console.error("UNKNOWN ERROR:", error);
      return { error: true, message: "An unexpected error occurred" };
    }

    return undefined;
  }
};
// Actual function for get the restaurants data
export const getRestaurants = async () => {
  try {
    const response = await api.get("restaurants", { cache: "no-store" })  
    //console.log(response)  
    if (response.ok) {
      return await response.json(); // Parse the response as JSON if it's valid
    } else {
      return { error: true, message: "Somthing went wrong" }; // If the response status is not OK, try to get the response as text and log it
    }
    
  } catch (error) {
    console.log("RESTAURANTS RESPONSE :", error)
    // if (error) {
    //   // Handle HTTP errors specifically
    //   const status = error?.response?.status; //http status code 404, 500
    //   const responseBody = await error?.response?.json();

    //   console.log("HTTP ERROR: ", status, responseBody);
    // } else {
    //   //Handle non-Http errors (network issues)
    //   console.log("UNKNOWN ERROR: ", error);
    // }

    if (error instanceof HTTPError) {
      const status = error.response.status;
      const responseBody = await error.response.json();
      console.error("HTTP ERROR:", status, responseBody);
      return { error: true, status, message: responseBody.message || "An error occurred" };
    } else {
      console.error("UNKNOWN ERROR:", error);
      return { error: true, message: "An unexpected error occurred" };
    }
    
    return undefined;
  }
}


//create a server funtion to getRestaurants
// server function for get dummy data
// export const getRestaurants = async () => {
//   try {

//     const response = await api.get("restaurants", { cache: "no-store" })
//     return response
    
//   } catch (error) {
    
//   }
// }

