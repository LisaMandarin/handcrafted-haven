import { AuthOptions, User, Session } from "next-auth"
import { JWT } from "next-auth/jwt"
import Google from "next-auth/providers/google"
import Facebook from "next-auth/providers/facebook"
import Credentials from "next-auth/providers/credentials"
import { sql } from "@vercel/postgres"
import bcrypt from "bcryptjs"

export const authOptions: AuthOptions = {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        Facebook({
            clientId: process.env.FACEBOOK_CLIENT_ID!,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET!
        }),
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Enter your email"},
                password: { label: "Password", type: "password", placeholder: "Enter your password"}
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing email or password");
                }

                try {
                    const result = await sql`
                        SELECT id, email, password FROM users WHERE email = ${credentials.email}
                    `
                    if (result.rowCount === 0) {
                        throw new Error("UserNotFound")
                    }

                    const isValidPW = await bcrypt.compare(credentials.password, result.rows[0].password);
                    if (!isValidPW) {
                        throw new Error("Invalid password")
                    }

                    return {
                        id: result.rows[0].id,
                        email: result.rows[0].email
                    } 
                } catch (error) {
                    console.error("Authentication error: ", error)
                    throw new Error("Invalid credentials")
                }
            }
        })
    ],
    pages: {
        error: "/login"
    },
    callbacks: {
        // Check if the user exists in DB or create a new record
        // async signIn({user} : {user: User}) {
        //     try {
        //         console.log('user: ', user)
        //         const existingUser = await sql`
        //             SELECT id FROM users 
        //             WHERE email = ${user.email}
        //             LIMIT 1
        //         `

        //         let userId = existingUser.rowCount !== null && existingUser.rowCount > 0 ? existingUser.rows[0].id : null
        //         if (!userId) {
        //             userId = crypto.randomUUID()
        //             await sql`
        //                 INSERT INTO users (id, email, username, created_at)
        //                 VALUES (${userId}, ${user.email}, ${user.name ?? ""}, ${new Date().toISOString()} )
        //             `
        //         }
        //         user.id = userId
        //         return true
        //     } catch (error) {
        //         console.error("Database Error: ", error)
        //         return false
        //     }
        // },

        // Store user ID in the token
        async jwt({ token, user }: { token: JWT, user: User }) {
            if (user) {
                token.userId = user.id;
                token.email = user.email;
            }

            if (!token.userId && token.email) {
                try {
                    const existingUser = await sql`
                        SELECT id FROM users WHERE email = ${token.email}
                        LIMIT 1
                    `
                    if (existingUser.rowCount!== null && existingUser.rowCount > 0 ) {
                        token.userId = existingUser.rows[0].id
                    }
                } catch (error) {
                    console.error('JWT callback DB Error: ', error)
                }
            }
            
            return token
        },

        // Add user ID to the session
        async session({session, token} : {session: Session; token: JWT}) {
            if (session.user) {
                session.user.id = String(token.userId ?? "");
            }
            
            return session
        },
    },
    secret: process.env.NEXTAUTH_SECRET
}