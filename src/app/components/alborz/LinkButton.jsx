import React from "react";

import { Button, Link } from "@mui/material";
import CustomTypography from "./CustomTypography";

const LinkButton = ({
  icon,
  buttonText,
  style,
  disabledCondition = () => false,
  href,
  textType = "Body/Medium",
  key = "button-key",
}) => {
  return (
    <Button
      key={key}
      sx={{ ...style }}
      LinkComponent={Link}
      disabled={disabledCondition()}
      href={href}
    >
      {icon}
      <CustomTypography text={buttonText} typoName={textType} />
    </Button>
  );
};

export default LinkButton;
