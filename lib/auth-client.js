import { createAuthClient } from "better-auth/react";


export const { signIn, signUp, signOut, useSession } = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
});



export const signInWithGoogle = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
  });

  if (data?.user) {
    console.log("User signed in:", data.user);
    // Redirect or handle user sign-in here
  }
};