import React from 'react';
import styled from "@emotion/styled";
import Logo from "/public/logo.svg"

const HeaderContent = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;

  & > a {
    text-decoration: none;
    color: black;
  }
`

const LogoBlock = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  column-gap: 10px;
`

const Title = styled.div`
  font-size: 28px;
  color: ${props => props.theme === 'dark' ? 'white' : 'black'}
`

const LogoImg = styled.img`
  height: 64px;
  width: 64px;
`


const NavBar = styled.div`
  display: flex;
  column-gap: 15px;
  font-size: 18px;

  & a {
    text-decoration: none;
    color: ${props => props.theme === 'dark' ? 'white' : 'black'}

  }

  & .active {
    font-weight: 600;
  }
`

const Header = () => {
    return (
        <header>
            <div className={'container'}>
                <HeaderContent>
                    <a href={'/'}>
                        <LogoBlock>
                            <Title>Red Death Drafter</Title>
                            <LogoImg src={Logo}/>
                        </LogoBlock>
                    </a>
                </HeaderContent>
            </div>
        </header>
    );
};

export default Header;