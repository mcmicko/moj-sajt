import React, { Component } from 'react';
import styled from 'styled-components';
import {styles} from '../utils';


export default class NavIcons extends Component {
  state = {
    icons:[
      {
        id:1,
        icon:<i class="fab fa-facebook-square icon"></i>,
        path: 'https://www.facebook.com',
      },
      {
        id:2,
        icon:<i class="fab fa-twitter icon"></i>,
        path: 'https://www.twitter.com',
      },
      {
        id:3,
        icon:<i class="fab fa-instagram icon"></i>,
        path: 'https://www.instagram.com',
      },
    ]
  }
  render() {
    return (
      <IconWrapper>
        {
          this.state.icons.map(item => {
            return(
              <a 
                target="_blank" 
                href={item.path} 
                key={item.id}
                >
                  {item.icon}
              </a>
            )
          })
        }
      </IconWrapper>
    )
  }
}

const IconWrapper = styled.div`
  .icon{
    font-size: 1.3rem;
    cursor: pointer;
    ${styles.transFunction()};
  }
  .fa-facebook-square {
    color: rgb(75, 104, 235);
  }
  .fa-twitter {
    color: #3ab7f0;
  }
  .fa-instagram {
    color: #da5f53;
  }
  .icon:hover{
    color:${styles.colors.mainYellow};
  }
  display: none;
  @media(min-width: 768px){
    display: flex;
    width: 10rem;
    justify-content: space-around;
  }
`
