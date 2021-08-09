// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import { getSession } from 'next-auth/client'
import React from 'react'
import { Feature, OptForm } from '../components'
import {JumboTronContainer,Header} from '../containers'
import { FAQsContainer } from '../containers'
import { Footer } from '../containers'
// import { FooterContainer } from '../containers/Footer'
export default function Home(props:any) {
  return (<div>
              <Header>
              <Feature>
                <Feature.Title>Unlimited films, TV programmes and more.</Feature.Title>
                <Feature.SubTitle>Watch anywhere. Cancel at any time.</Feature.SubTitle>
                <OptForm>
                  <OptForm.Input placeholder="Email address" />
                  <OptForm.Button>Try it now</OptForm.Button>
                  <OptForm.Break />
                  <OptForm.Text>Ready to watch? Enter your email to create or restart your membership.</OptForm.Text>
                </OptForm>
              </Feature>
              </Header>
              <JumboTronContainer/>
              <FAQsContainer/>
              <Footer/>
          </div>
  )
}
export async function getServerSideProps(context){
  const session =await getSession(context)
  return {
    props:{session}
  }
}
