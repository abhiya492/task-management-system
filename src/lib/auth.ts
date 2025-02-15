import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/db";
import { users } from "@/db/schema"; // Import your users table
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs"; // For password hashing
import { signOut as nextAuthSignOut } from "next-auth/react"; // Import signOut function from next-auth/react
import { getServerSession } from "next-auth"; // P8fa3

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }
      
        // Fetch user from the database
        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email as string))
          .then((res) => res[0]);
      
        if (!user) {
          throw new Error("User not found");
        }
      
        // Compare hashed password
        if (!user.password) {
          throw new Error("User password is missing");
        }
        const isValidPassword = await bcrypt.compare(
          credentials.password as string,
          user.password
        );
      
        if (!isValidPassword) {
          throw new Error("Invalid password");
        }
      
        // Return user data
        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as typeof session.user;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Add a secret for NextAuth
});

export { nextAuthSignOut as signOut }; // Export signOut function

export const authOptions = { // P402d
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }
      
        // Fetch user from the database
        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email as string))
          .then((res) => res[0]);
      
        if (!user) {
          throw new Error("User not found");
        }
      
        // Compare hashed password
        if (!user.password) {
          throw new Error("User password is missing");
        }
        const isValidPassword = await bcrypt.compare(
          credentials.password as string,
          user.password
        );
      
        if (!isValidPassword) {
          throw new Error("Invalid password");
        }
      
        // Return user data
        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as typeof session.user;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Add a secret for NextAuth
}; // P402d
