import React from 'react';
import showcase from './img/showcase.jpg';
import styled from 'styled-components';
import Navbar from './navbar/Nav';

const Showcase = () => {
  return (
    <ShowcaseImg img={showcase}>
      <Navbar/>
        <div className="header">
          <h1>Lorem ipsum dolor sit amet.</h1>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque quisquam eos hic beatae accusamus doloribus aperiam ea voluptas nulla quos.</p>
        </div>
    </ShowcaseImg>
  )
}

const ShowcaseImg = styled.header`
  margin: 0;
  padding: 0;
  background: url(${props => props.img}) no-repeat center/cover;
  width: 100%;
  height: 100vh;
  position: relative;
  overflow-y: hidden;

  .header{
    max-width:1180px;
    text-align: center;
    margin: 0 auto;
    padding: 0 3rem;
    margin-top: 25vh;
  }

  @media(max-width:500px){
    height: 50vh;

    .header{
      position: absolute;
      margin-top: 10vh;
      
    }
  }
`

export default Showcase;