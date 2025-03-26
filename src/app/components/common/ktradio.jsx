import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function KtRadio() {
  
  const radioStyles = {
  color: "black",
  "&.Mui-checked": { color: "black" },
  "&:hover": { color: "black" },
};



  return (
    <FormControl  sx={{
      border: "2px solid black", // Black border
      borderRadius: "8px", // Rounded corners
      padding: "16px", // Padding inside the box
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Shadow effect
    }}>
      <FormLabel id="demo-row-radio-buttons-group-label" 
         sx={{
          top: "-16px", // Top position
          position: "absolute", // Absolute 
          fontSize: "1.25rem", // Font size for title
          fontWeight: "bold", // Bold text
          marginBottom: "8px", // Space below the title
        }}>Gender</FormLabel>
      <RadioGroup
    
        className=''
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel sx={{color: "black",}} value="پیش نویس" control={<Radio sx={radioStyles}/>} label="پیش نویس" />
        <FormControlLabel sx={{color: "black",}} value="ارسالی" control={<Radio sx={radioStyles}/>} label="ارسالی" />
        <FormControlLabel sx={{color: "black",}} value="دریافتی" control={<Radio sx={radioStyles}/>} label="دریافتی" />
        <FormControlLabel sx={{color: "black",}} value="لیست انتظار" control={<Radio sx={radioStyles}/>} label="لیست انتظار"/>
        <FormControlLabel sx={{color: "black",}} value="همه" control={<Radio sx={radioStyles}/>} label="همه"/>
      </RadioGroup>
    </FormControl>  
  );
}
