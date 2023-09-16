import transparenciaApi from "@/app/api/transparencia-api";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Correo electronico", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const { data } = await transparenciaApi.post(
          `/Auth/login?user=${credentials!.email}&password=${
            credentials!.password
          }`
        );
        if (data) {
          return {
            id : data.id,
            token: data.token,
            name: data.user,
            user: data.user,
          
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session: async({ session, token }) => {
      console.log(`callback session: ${ JSON.stringify( session )}`)
      if( session && session.user) {
        session.user.token = token.token;
       // session.user = token.user
      }
      return session;
    },
    async jwt( { token }) {
      console.log(`callback token: ${ JSON.stringify( token ) }` );
      return token;
    },
    
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
