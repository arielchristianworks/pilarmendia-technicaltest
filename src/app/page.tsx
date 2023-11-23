"use client"

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Button, Typography } from "@mui/material";

import MainLayout from './MainLayout'

export default function Home() {
  const { data } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/sigin?callback=/')
    },
  })
  console.log(data?.user)
  
  return (
    <MainLayout appBarTitle='Home'>
      <Typography variant="h4">
        Hello,
        <Typography component="span" variant="inherit" color={"primary.main"}>{data?.user?.name}</Typography>
        !
      </Typography>
      <Typography>
        You are logged in using email: {" "}
        <Typography component="span" variant="inherit" color="blue">{data?.user?.email}</Typography>
      </Typography>
    </MainLayout>
  )
}
