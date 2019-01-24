import React from 'react';
import styled from 'styled-components';

export default function FooterBar() {
  return (
    <FooterWrap id="footer">
      <p>copyright &copy; 2019 milos mcmandic</p>
    </FooterWrap>
  )
}

const FooterWrap = styled.footer`
  height:50px;
  width:100%;
  background: rgb(32, 32, 32);;
  text-align: center
  
`