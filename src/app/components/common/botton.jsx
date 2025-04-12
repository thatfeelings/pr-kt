import React from 'react'
import { Button } from '@material-ui/core';


const Botton = ({text, link}) => {
  return (
<Button variant="contained" color="primary" href={link}>
    {text}
  </Button>
  )
}

export default Botton