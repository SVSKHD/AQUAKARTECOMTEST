import React from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

const AquaButton = (props) => {
  const renderButton = () => (
    <Button
      className={
        props.variant !== "normal" ? "custom-button ms-1 me-1 rounded-pill" : ""
      }
      variant={props.variant}
      {...props}
    >
      {props.children}
    </Button>
  );

  return (
    <>
      {props.tooltip ? (
        <OverlayTrigger
          placement={props.toolTipPlacement || "top"}
          overlay={<Tooltip>{props.tooltipMessage}</Tooltip>}
        >
          {renderButton()}
        </OverlayTrigger>
      ) : (
        renderButton()
      )}
    </>
  );
};

export default AquaButton;
