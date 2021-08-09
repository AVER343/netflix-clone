import axios from 'axios'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import API from '../../../Shared/API'
export default NextAuth({
  callbacks:{
    jwt: async (token, user, account, profile, isNewUser) => {
        user && (token.user = user);
        return Promise.resolve(token)   // ...here
    },
    session: async (session, user:any) => {
        session.user = user.user;
        return Promise.resolve(session)
    }
},
  // Configure one or more authentication providers
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Your email" },
        password: {  label: "Password", type: "password",placeholder: "*********" }
      },
      async authorize(credentials:any, req) {
        try{
            const res = await API.userSignIn(credentials)
            if(res.status==200)
            {
              return res.data
            }
          }
        catch(e:any){
          console.log(e)
          return Promise.reject(new Error(e?.response?.data?.['messages']?.[0]?.['message']||'Something went wrong !'))
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
    // signOut: '/auth/signout',
    error: '/login', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: undefined // If set, new users will be directed here on first sign in
  },
})