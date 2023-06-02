import React, { useState, ChangeEvent } from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";


export default function ToggleSwitch() { 
    const [switchState, setSwitchState] = useState(false);  
    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
      console.log("---", e.target.checked);
      setSwitchState(!switchState);
    }
    return (    
      <StyledLabel htmlFor="checkbox" checked={switchState}> 
        <input 
          id="checkbox" 
          type="checkbox" 
          checked={switchState}
          onChange={handleOnChange} />    
      </StyledLabel>
    );
  }

  const StyledLabel = styled.label<{ checked: boolean }>`  
    cursor: pointer;  
    text-indent: -9999px;  
    width: 250px;  
    height: 125px;  
    background: ${({ checked }) => (checked ? theme.colors.green :  theme.colors.grey)};  
    display: block;  
    border-radius: 100px;  
    position: relative;
    transform: scale(0.5);
    &:after {    
    content: "";    
    position: absolute;    
    left: ${({ checked }) => (checked ? "calc(55% - 5px)" : "14px")};    top: 12px;    
    width: 100px;    
    height: 100px;    
    background: #fff;    
    border-radius: 90px;    
    transition: 0.3s;  
  }`;