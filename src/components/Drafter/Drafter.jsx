import {useEffect, useState} from 'react';
import {Box, Button, FormGroup, TextField, Typography} from "@mui/material";
import styled from "@emotion/styled";
import {useTranslation} from "react-i18next";
import fractions from "../../data/fractions.json"
import {use} from "i18next";

const CheckBoxContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  column-gap: 10px;
  cursor: pointer;

  & img {
    max-width: 60px;
    border-radius: 100px;
  }

  border-radius: 10px;
  padding: 5px;
  background-color: ${props => props.checked ? "#8fd781" : "#e6abab"};
`
const CustomCheckbox = styled.div`
  font-family: 'Roboto', sans-serif;
`

const TextInput = styled.input`
  padding: 10px;
  border-radius: 5px;
  outline: blue 1px solid;
  transition: all ease-in-out 0.1s;
  width: 50px;

  &:focus {
    outline: blue 2px solid;
  }
`

const TextBlock = styled.label`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  row-gap: 5px;
`

const FractionListBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-around;

  & div {
    flex: 40% 0 0;
    @media (max-width: 730px) {
      flex: 100% 0 0;
    }
  }
`

const Drafter = () => {
        const [isInitialized, setInitialized] = useState(false)
        const [numberOfPlayers, setNumberOfPlayers] = useState(0)
        const [numberOfLeaders, setNumberOfLeaders] = useState(0)
        const [finalDraft, setFinalDraft] = useState([])
        const [error, setError] = useState('')
        const [warning, setWarning] = useState('')
        const [isDraftComplete, setIsDraftComplete] = useState(false)
        const {t, i18n} = useTranslation();
        const [translatedFractions, setTranslatedFractions] = useState([])
        const currentLanguage = i18n.language


        const errorCheck = () => {
            if (isNaN(numberOfPlayers) || isNaN(numberOfLeaders) || numberOfPlayers <= 0 || numberOfLeaders <= 0) {
                setError(t('errors.wrong_number_error'))
                setWarning(t(''))
                return false;
            }

            if (numberOfPlayers > 12) {
                setError(t('errors.too_many_players_error'))
                setWarning(t(''))
                return false;
            }
            if (numberOfLeaders > checkedCheckboxes.length) {
                setError(t('errors.too_little_fractions_error'));
                setWarning(t(''))
                return false
            }
            if (numberOfLeaders * numberOfPlayers > checkedCheckboxes.length) {
                setWarning(t('warnings.warning_1'))
            }
            return true
        }

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
            if (isInitialized) {
                errorCheck()
            }
        }, [currentLanguage])

        const handleDrafting = () => {
            setInitialized(true)
            setFinalDraft([])
            setIsDraftComplete(false)
            if (!errorCheck())
                return
            if (numberOfLeaders * numberOfPlayers > checkedCheckboxes.length) {
                const selectedFractions = []
                let selectedFractionsAmount = 0
                setWarning(t('warnings.warning_1'))
                for (let i = 0; i < numberOfPlayers; i++) {
                    const playerArray = []
                    for (let j = 0; j < numberOfLeaders; j++) {
                        if (selectedFractionsAmount === checkedCheckboxes.length) {
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
            "Rich Pirates": false,
            "Raider Leaders": false
        });

        const handleCheckboxChange = (fractionName) => {
            setCheckboxValues((prevValues) => ({
                ...prevValues,
                [fractionName]: !checkboxValues[fractionName],
            }));
        };

        const checkedCheckboxes = Object.keys(checkboxValues).filter(
            (label) => checkboxValues[label]
        );
        return (
            <div>
                <Box sx={{
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: "25px",
                    marginBottom: '100px',
                    width: "600px",
                    '@media (max-width: 730px)': {
                        width: "auto",
                        flexDirection: 'column',
                        padding: '0 10%',
                        margin: '0 auto',
                    }
                }}>
                    <FormGroup sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexWrap: 'wrap',
                        border: '1px solid black',
                        borderRadius: '10px',
                        rowGap: '25px',
                        padding: '20px',
                        '@media (max-width: 730px)': {
                            marginLeft: '0',
                        }
                    }}>
                        <Typography sx={{
                            textAlign: 'center',
                            fontWeight: 600,
                            fontSize: "18px",
                        }}>{t('fractions_list_title')}</Typography>
                        <FractionListBlock>
                            {
                                fractions.map((fraction) => (
                                    <CheckBoxContainer
                                        checked={checkboxValues[fraction.name]}
                                        onClick={() => {
                                            handleCheckboxChange(fraction.name)
                                        }}
                                        key={`fraction_${fraction.name}`}>
                                        <img src={fraction.img_src}/>
                                        <CustomCheckbox>{t(`fractions_list.${fraction.name}`)}</CustomCheckbox>
                                    </CheckBoxContainer>
                                ))
                            }
                        </FractionListBlock>
                    </FormGroup>
                    <Box sx={{
                        display: 'flex',
                        border: '1px solid black',
                        padding: '10px',
                        borderRadius: '10px',
                        alignItems: 'flex-start',
                        justifyContent: 'space-around',
                        '@media(max-width:730px)': {
                            flexDirection: "column",
                            alignItems: 'center',
                            rowGap: "20px"
                        }
                    }}><TextBlock>
                        {t('helper_text.amount_of_player_helper_text')}
                        <TextInput
                            onChange={(e) => setNumberOfPlayers(Number(e.target.value))}
                            value={numberOfPlayers}
                            type="number"
                            min={0}
                            onFocus={(event) => event.target.select()}
                        />
                    </TextBlock>
                        <TextBlock>
                            {t('helper_text.amount_of_fractions_helper_text')}
                            <TextInput
                                onFocus={(event) => event.target.select()}
                                onChange={(e) => setNumberOfLeaders(Number(e.target.value))}
                                value={numberOfLeaders}
                                type="number"
                                min={0}
                            />
                        </TextBlock>
                        <Button sx={{
                            height: '50px'
                        }
                        } onClick={handleDrafting} variant="contained" color="primary">
                            {t('draftButton')}
                        </Button>
                    </Box>
                    {(warning || error || finalDraft.length > 0) &&
                        <Box sx={{
                            borderRadius: '10px',
                            border: '1px solid',
                            padding: '20px'
                        }}>
                            {warning && <Typography sx={{color: 'orange'}}>{warning}</Typography>}
                            {error && <Typography sx={{color: 'red'}}>{error}</Typography>}
                            {finalDraft.length > 0 && translatedFractions.map((player, index) => (
                                <Typography key={index}>{t('player')} {index + 1}: {player.join(' / ')}</Typography>
                            ))}
                            {finalDraft.length > 0 &&
                                <Typography><i>{t('helper_text.text_copy_to_clipboard')}</i></Typography>}
                        </Box>
                    }
                </Box>

            </div>
        );
    }
;

export default Drafter;