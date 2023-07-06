import React, {useEffect} from 'react';
import styled from "@emotion/styled";
import Logo from "/public/logo.svg"
import {useTranslation} from "react-i18next";
import {Typography} from "@mui/material";

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
  -webkit-filter: ${props => props.theme === 'dark' ? 'invert(100%);' : ''} /* safari 6.0 - 9.0 */
  filter: ${props => props.theme === 'dark' ? 'invert(100%);' : ''};
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

const Header = ({theme}) => {
    const {t, i18n} = useTranslation();
    const currentLanguage = i18n.language
    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
        localStorage.setItem('language', language);
    };

    useEffect(() => {
        const language = localStorage.getItem('language')
        if (language)
            i18n.changeLanguage(language)
    }, [])

    return (
        <header data-theme={theme}>
            <div className={'container'}>
                <HeaderContent>
                    <a href={'/'}>
                        <LogoBlock>
                            <Title theme={theme}>Red Death Drafter</Title>
                            <LogoImg theme={theme} src={Logo}/>
                        </LogoBlock>
                    </a>
                    <NavBar>
                        <Typography
                            onClick={() => {
                                changeLanguage('ru')
                            }}
                            sx={{
                                fontWeight: `${currentLanguage === 'ru' ? 600 : ''}`,
                                textDecoration: `${currentLanguage === 'ru' ? 'underline' : ''}`,
                                cursor : 'pointer'
                            }}>RU</Typography>
                        <Typography
                            onClick={() => {
                                changeLanguage('en')
                            }}
                            sx={{
                                fontWeight: `${currentLanguage === 'en' ? 600 : ''}`,
                                textDecoration: `${currentLanguage === 'en' ? 'underline' : ''}`,
                                cursor : 'pointer'
                            }}>EN</Typography>
                    </NavBar>
                </HeaderContent>
            </div>
        </header>
    )
        ;
};

export default Header;