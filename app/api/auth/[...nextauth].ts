// app/api/auth/[...nextauth].ts
import NextAuth from "next-auth"
import CredentialsProviders from "next-auth/providers/credentials"

export default NextAuth({
  providers: [
    CredentialsProviders({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Example authentication check (replace with your actual logic)
        if (credentials && credentials.username === "admin" && credentials.password === "password") {
          // Convert `id` to a string
          return { id: "1", name: "Admin", email: "admin@example.com" };
        }
        return null;
      }
    }),
    // Add other providers as needed
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  // Additional configuration...
})
