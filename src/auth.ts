import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        authorized: async ({ auth }) => {
            return !!auth;
        },
        async signIn({ profile }) {
            const email = profile?.email;
            if(email?.endsWith("@seiko.ac.jp")) {
                return true;
            }
            return false;
        }
    },
});