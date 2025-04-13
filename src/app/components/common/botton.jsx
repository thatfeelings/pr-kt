import React from 'react'
import { Button } from "@mui/material";


const Botton = ({text, link}) => {
  return (
<Button variant="contained" color="primary" href={link}>
    {text}
  </Button>
  )
}

export default Botton