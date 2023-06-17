import React, {useEffect, useState} from 'react';
import {Box, Button, Checkbox, FormControlLabel, FormGroup, TextField, Typography} from "@mui/material";
import Aliens from "/public/Aliens.webp"
import Borderlords from "/public/Borderlords.webp"
import Cultists from "/public/Cultists.webp"
import Doomsday_Preppers from "/public/Doomsday_Preppers.webp"
import Jocks from "/public/Jocks.webp"
import Mad_Scientists from "/public/Mad_Scientists.webp"
import AlieMutantsns from "/public/Mutants.webp"
import Pirates from "/public/Pirates.webp"
import Wanderers from "/public/Wanderers.webp"
import Zombies from "/public/Zombies.webp"
import RichPirates from "/public/richpirate.png"
import LastMilitary from "/public/Last_military.png"
import styled from "@emotion/styled";
import {useTranslation} from "react-i18next";


const CheckBoxContainer = styled.div`
  display: flex;

  & img {
    max-width: 60px;
    border-radius: 100px;
  }
`
const Drafter = () => {

        const [numberOfPlayers, setNumberOfPlayers] = useState(0)
        const [numberOfLeaders, setNumberOfLeaders] = useState(0)
        const [finalDraft, setFinalDraft] = useState([])
        const [error, setError] = useState('')
        const [warning, setWarning] = useState('')
        const [isDraftComplete, setIsDraftComplete] = useState(false)
        const {t, i18n} = useTranslation();
        const [translatedFractions, setTranslatedFractions] = useState([])
        const currentLanguage = i18n.language


        useEffect(() => {
            if (isDraftComplete)
                setTranslatedFractions(finalDraft.map((fractionArray) =>
                    fractionArray.map((key) => i18n.t(`fractions_list.${key}`))
                ));

        }, [finalDraft, isDraftComplete])

        useEffect(() => {
            if (isDraftComplete)
                copyToClipboard(translatedFractions)
        }, [translatedFractions])

        useEffect(() => {
            if (isDraftComplete)
                setTranslatedFractions(finalDraft.map((fractionArray) =>
                    fractionArray.map((key) => i18n.t(`fractions_list.${key}`))
                ));
        }, [currentLanguage])
        const handleDrafting = () => {
            setFinalDraft([])
            setIsDraftComplete(false)
            if (isNaN(numberOfPlayers) || isNaN(numberOfLeaders) || numberOfPlayers <= 0 || numberOfLeaders <= 0) {
                setError(t('errors.wrong_number_error'))
                return;
            }

            if (numberOfPlayers > 12) {
                setError(t('errors.too_many_players_error'))
                return;
            }
            if (numberOfLeaders > checkedCheckboxes.length) {
                setError(t('errors.too_little_fractions_error'));
                return;
            }


            if (numberOfLeaders * numberOfPlayers > checkedCheckboxes.length) {
                const selectedFractions = []
                let selectedFractionsAmount = 0
                setWarning(t('warnings.warning_1'))
                for (let i = 0; i < numberOfPlayers; i++) {
                    const playerArray = []
                    for (let j = 0; j < numberOfLeaders; j++) {
                        if (selectedFractionsAmount === checkedCheckboxes.length){
                            selectedFractions.length = 0
                            selectedFractionsAmount = 0
                        }
                        let randomIndex;
                        while (true) {
                            randomIndex = Math.floor(Math.random() * checkedCheckboxes.length);
                            const randomElement = checkedCheckboxes[randomIndex]
                            if (selectedFractions.includes(randomElement)) {

                            } else {
                                if (!playerArray.includes(randomElement)) {
                                    break;
                                }
                            }

                        }
                        playerArray.push(checkedCheckboxes[randomIndex]);
                        selectedFractions.push(checkedCheckboxes[randomIndex]);
                        selectedFractionsAmount++;
                    }
                    setFinalDraft(prevState => [...prevState, playerArray.sort()]);
                }
            } else {
                const draftedFraction = []
                setWarning('')
                for (let i = 0; i < numberOfPlayers; i++) {
                    const playerArray = []
                    for (let j = 0; j < numberOfLeaders; j++) {
                        let randomIndex;
                        while (true) {
                            randomIndex = Math.floor(Math.random() * checkedCheckboxes.length);
                            if (!draftedFraction.includes(checkedCheckboxes[randomIndex])) {
                                break;
                            }
                        }
                        playerArray.push(checkedCheckboxes[randomIndex]);
                        draftedFraction.push(checkedCheckboxes[randomIndex])
                    }
                    setFinalDraft(prevState => [...prevState, playerArray.sort()]);
                }
            }
            setError('')

            setIsDraftComplete(true)
        }
        const copyToClipboard = (fractionArray) => {
            let text = '';
            fractionArray.forEach((player, index) => {
                const playerText = `${t('player')} ${index + 1}: ${player.join(' / ')}\n`;
                text += playerText;
            });
            console.log(text.trim())
            navigator.clipboard.writeText(text.trim())
                .then(() => {
                    console.log('Текст скопирован в буфер обмена.');
                })
                .catch((error) => {
                    console.error('Ошибка при копировании текста в буфер обмена:', error);
                });
        };

        const [checkboxValues, setCheckboxValues] = useState({
            'Borderlords': true,
            'Doomsday Preppers': true,
            'Zombies': true,
            'Aliens': true,
            'Mutants': true,
            'Pirates': true,
            'Cultists': true,
            'Wanderers': true,
            'Mad Scientists': true,
            'Jocks': true,
            "Last Military": false,
            "Rich Pirates": false
        });

        const handleCheckboxChange = (event) => {
            const {name, checked} = event.target;
            setCheckboxValues((prevValues) => ({
                ...prevValues,
                [name]: checked,
            }));
        };

        const checkedCheckboxes = Object.keys(checkboxValues).filter(
            (label) => checkboxValues[label]
        );
        return (
            <div>
                <Box sx={{
                    display: 'flex',
                    marginBottom: '100px',
                    '@media (max-width: 730px)': {
                        flexDirection: 'column',
                        padding: '0 10%',
                        margin: '0 auto',
                    }
                }}>
                    <FormGroup sx={{
                        marginLeft: '100px',
                        display: 'flex',
                        flexDirection: 'column',
                        flexWrap: 'wrap',
                        border: '1px solid black',
                        borderRadius: '5px',
                        rowGap: '25px',
                        padding: '20px',
                        '@media (max-width: 730px)': {
                            marginLeft: '0',
                        }
                    }}>
                        <Typography sx={{
                            textAlign: 'center'
                        }}>{t('fractions_list_title')}</Typography>
                        <CheckBoxContainer>
                            <img src={Borderlords}/>
                            <FormControlLabel
                                control={<Checkbox/>}
                                label={t('fractions_list.Borderlords')}
                                name={'Borderlords'}
                                checked={checkboxValues['Borderlords']}
                                onChange={handleCheckboxChange}
                                labelPlacement="start"
                            />
                        </CheckBoxContainer>
                        <CheckBoxContainer>
                            <img src={Doomsday_Preppers}/>
                            <FormControlLabel
                                control={<Checkbox/>}
                                label={t('fractions_list.Doomsday Preppers')}
                                name={'Doomsday Preppers'}
                                checked={checkboxValues['Doomsday Preppers']}
                                onChange={handleCheckboxChange}
                                labelPlacement="start"

                            />
                        </CheckBoxContainer>
                        <CheckBoxContainer>
                            <img src={Zombies}/>
                            <FormControlLabel
                                control={<Checkbox/>}
                                label={t('fractions_list.Zombies')}
                                name={'Zombies'}
                                checked={checkboxValues['Zombies']}
                                onChange={handleCheckboxChange}
                                labelPlacement="start"

                            />
                        </CheckBoxContainer>
                        <CheckBoxContainer>
                            <img src={Aliens}/>
                            <FormControlLabel
                                control={<Checkbox/>}
                                label={t('fractions_list.Aliens')}
                                name={'Aliens'}
                                checked={checkboxValues['Aliens']}
                                onChange={handleCheckboxChange}
                                labelPlacement="start"

                            />
                        </CheckBoxContainer>
                        <CheckBoxContainer>
                            <img src={AlieMutantsns}/>
                            <FormControlLabel
                                control={<Checkbox/>}
                                label={t('fractions_list.Mutants')}
                                name={'Mutants'}
                                checked={checkboxValues['Mutants']}
                                onChange={handleCheckboxChange}
                                labelPlacement="start"

                            />
                        </CheckBoxContainer>
                        <CheckBoxContainer>
                            <img src={Pirates}/>
                            <FormControlLabel
                                control={<Checkbox/>}
                                label={t('fractions_list.Pirates')}
                                name={'Pirates'}
                                checked={checkboxValues['Pirates']}
                                onChange={handleCheckboxChange}
                                labelPlacement="start"

                            />
                        </CheckBoxContainer>
                        <CheckBoxContainer>
                            <img src={Cultists}/>
                            <FormControlLabel
                                control={<Checkbox/>}
                                label={t('fractions_list.Cultists')}
                                name={'Cultists'}
                                checked={checkboxValues['Cultists']}
                                onChange={handleCheckboxChange}
                                labelPlacement="start"

                            />
                        </CheckBoxContainer>
                        <CheckBoxContainer>
                            <img src={Wanderers}/>
                            <FormControlLabel
                                control={<Checkbox/>}
                                label={t('fractions_list.Wanderers')}
                                name={'Wanderers'}
                                checked={checkboxValues['Wanderers']}
                                onChange={handleCheckboxChange}
                                labelPlacement="start"

                            />
                        </CheckBoxContainer>
                        <CheckBoxContainer>
                            <img src={Mad_Scientists}/>
                            <FormControlLabel
                                control={<Checkbox/>}
                                label={t('fractions_list.Mad Scientists')}
                                name={'Mad Scientists'}
                                checked={checkboxValues['Mad Scientists']}
                                onChange={handleCheckboxChange}
                                labelPlacement="start"

                            />
                        </CheckBoxContainer>
                        <CheckBoxContainer>
                            <img src={Jocks}/>
                            <FormControlLabel
                                control={<Checkbox/>}
                                label={t('fractions_list.Jocks')}
                                name={'Jocks'}
                                checked={checkboxValues['Jocks']}
                                onChange={handleCheckboxChange}
                                labelPlacement="start"

                            />
                        </CheckBoxContainer>
                        <CheckBoxContainer>
                            <img src={LastMilitary}/>
                            <FormControlLabel
                                control={<Checkbox/>}
                                label={t('fractions_list.Last Military')}
                                name={'Last Military'}
                                checked={checkboxValues['Last Military']}
                                onChange={handleCheckboxChange}
                                labelPlacement="start"

                            />
                        </CheckBoxContainer>
                        <CheckBoxContainer>
                            <img src={RichPirates}/>
                            <FormControlLabel
                                control={<Checkbox/>}
                                label={t('fractions_list.Rich Pirates')}
                                name={'Rich Pirates'}
                                checked={checkboxValues['Rich Pirates']}
                                onChange={handleCheckboxChange}
                                labelPlacement="start"

                            />
                        </CheckBoxContainer>
                    </FormGroup>
                    <Box sx={{
                        display: 'flex',
                        columnGap: '20px',
                        flexDirection: 'column',
                        border: '1px solid black',
                        padding: '10px',
                        alignItems: 'center'
                    }}>
                        <TextField
                            onChange={(e) => setNumberOfPlayers(Number(e.target.value))}
                            value={numberOfPlayers}
                            sx={{
                                width: '100px',
                                '& .MuiInputBase-input': {
                                    textAlign: 'center !important',
                                },
                            }}
                            type="number"
                            inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                            helperText={t('helper_text.amount_of_player_helper_text')}
                        />
                        <TextField
                            onChange={(e) => setNumberOfLeaders(Number(e.target.value))}
                            value={numberOfLeaders}
                            sx={{
                                width: '100px',
                                '& .MuiInputBase-input': {
                                    textAlign: 'center !important',
                                },
                            }}
                            type="number"
                            inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                            helperText={t('helper_text.amount_of_fractions_helper_text')}
                        />
                        <Button sx={{
                            height: '50px'
                        }
                        } onClick={handleDrafting} variant="contained" color="primary">
                            {t('draftButton')}
                        </Button>
                    </Box>
                    <Box sx={{
                        border: '1px solid',
                        padding: '20px'
                    }}>
                        {warning && <Typography sx={{color: 'orange'}}>{warning}</Typography>}
                        {error && <Typography sx={{color: 'red'}}>{error}</Typography>}
                        {finalDraft.length > 0 && translatedFractions.map((player, index) => (
                            <Typography key={index}>{t('player')} {index + 1}: {player.join(' / ')}</Typography>
                        ))}
                        {finalDraft.length > 0 && <Typography>{t('helper_text.text_copy_to_clipboard')}</Typography>}
                    </Box>
                </Box>

            </div>
        );
    }
;

export default Drafter;