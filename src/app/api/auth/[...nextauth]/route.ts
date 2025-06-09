
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import oficiosApi from "../../oficios-api";
import { LoginResponse } from "@/app/application/dto/login-response.dto";

export const authOptions: NextAuthOptions = {

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        rfc: { label: "rfc", type: "string" },
      },


      async authorize(credentials) {
        const { data } = await oficiosApi.post<LoginResponse>(
          `${process.env.NEXT_PUBLIC_API_URL}auth/login`,
          {
            rfc: credentials!.rfc, // Cambia "email" por "rfc" si es necesario
          }
        );
        if (data) {
          return {
            id: data.empleado.EMPLEADO.toString(), // Ensure 'id' is a string
            empleado: data.empleado.EMPLEADO,
            token: data.token,
            name: data.empleado.NOMBRE,
            appat: data.empleado.APPAT,
            apmat: data.empleado.APMAT,
            rfc: data.empleado.RFC,
            curp: data.empleado.CURP,
            tipo: data.empleado.TIPO,
            admin: data.empleado.ADMIN,
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
     // console.log(`callback session: ${ JSON.stringify( session )}`)
      if( session && session.user) {
        session.user.token = token.token;
        session.user.empleado = token.empleado;
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.appat = token.appat;
        session.user.apmat = token.apmat;
        session.user.rfc = token.rfc;
        session.user.curp = token.curp;
        session.user.tipo = token.tipo;
        session.user.admin = token.admin;
        //session.user.empleadoId = token.empleadoId;
        
      }
      return session;
    },
    async jwt( { token, user }) {
     // console.log(`callback token: ${ JSON.stringify( token ) }` );
      if( token &&  user) {
        token.id = user.id;
        token.empleado = user.empleado;
        token.token = user.token;
        token.name = user.name;
        token.appat = user.appat;
        token.apmat = user.apmat;
        token.rfc = user.rfc;
        token.curp = user.curp;
        token.tipo = user.tipo;
        token.admin = user.admin;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET
  
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
