import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"

import User from "@/backend/models/user"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        //get email & password from fe
        const email = credentials?.email;
        const password = String(credentials?.password);

        //get the jwt token
        let user = await User.findOne({
          where: { email }, // TODO: ini kurang mainan di encryption nya aja
        });

        
        if (!!user) {
          let passMatch = false;

          await bcrypt.compare(password, user.password)
          .then(res => {
            if (res) passMatch = true;
          })
          .catch(err => {
            passMatch = false;
          })

          if (passMatch) {
            return {
              id: user.id,
              email: user.email,
              name: user.displayName,
            }
          }
        }
        
        return null;
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  jwt: {
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  // Ini buat kalo mau pake custom pages
  // pages: {
  //   signIn: '/service/auth/signin',
  //   signOut: '/service/auth/signout',
  //   error: '/service/auth/error', // Error code passed in query string as ?error=
  //   verifyRequest: '/service/auth/verify-request', // (used for check email message)
  //   newUser: '/service/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  // },
  theme: {
    colorScheme: "light", // "auto" | "dark" | "light"
    brandColor: "#ED2B2A", // Hex color code
    logo: "/images/logo-pilarmedia.png", // Absolute URL to image
    // buttonText: "" // Hex color code
  },
});

export { handler as GET, handler as POST }