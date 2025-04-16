import { Box } from '@mui/material'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
   <Box sx={{
    display: "flex",
    width: "100%",
    height: "100%",
  }}>
    <Image src='/images/solutionbg.jpg' alt='landing page' width={1000} height={500} />
   </Box>
  )
}

export default page