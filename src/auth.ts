import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // Simple hardcoded admin check for the portfolio owner
        // In a real app with multiple users, check DB.
        const adminUser = "admin";
        const adminPass = "admin123"; // Should be in env, but for demo/default

        if (
          credentials.username === adminUser &&
          credentials.password === adminPass
        ) {
          return {
            id: "1",
            name: "Ravi Agrahari",
            email: "admin@example.com",
            role: "admin",
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
