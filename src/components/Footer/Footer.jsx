import React from 'react';
import {Box, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";

const Footer = ({theme}) => {
    const {t, i18n} = useTranslation();
    const styles = {
        links: {
            color: theme === 'dark' ? 'white' : 'black',
        },
    };
    return (
        <Box sx={{
            marginTop: "20px",
            borderTop: '1px solid black',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            rowGap: '10px',
            "& a":{
                color: 'black',
                textDecoration : 'none'
            }
        }}>
            <Typography sx={{
                '& a': styles.links
            }}>{t('footer_text.made_by')} <a href={'https://github.com/Vademzip/'} target={"_blank"}>Vadem Zip</a></Typography>
            <Typography sx={{
                '& a': styles.links
            }}>{t('footer_text.other_project')}: <a href={'https://civdiscount.vercel.app/'} target={"_blank"}>CivDiscount</a></Typography>
            <Typography sx={{
                '& a': styles.links
            }}>{t('footer_text.version')}: 1.4.0</Typography>
        </Box>
    );
};

export default Footer;