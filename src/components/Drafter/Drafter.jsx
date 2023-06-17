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
        useEffect(() => {
            console.log('я в эффекте')
            console.log(isDraftComplete)
            if (isDraftComplete)
                copyToClipboard(finalDraft)
        }, [finalDraft, isDraftComplete])
        const handleDrafting = () => {
            setFinalDraft([])
            setIsDraftComplete(false)
            if (isNaN(numberOfPlayers) || isNaN(numberOfLeaders) || numberOfPlayers <= 0 || numberOfLeaders <= 0) {
                setError('Неверно введены данные. Количество игроков и лидеров должно быть положительным числом.')
                return;
            }

            if (numberOfPlayers > 10) {
                setError('Слишком большое количество игроков, максимум 10.')
                return;
            }

            if (numberOfLeaders > checkedCheckboxes.length) {
                setError('Недостаточно доступных лидеров для каждого игрока.');
                return;
            }


            if (numberOfLeaders * numberOfPlayers > 10) {
                setWarning('На всех игроков не хватит фракций, поэтому фракции могут повторяться.')
                for (let i = 0; i < numberOfPlayers; i++) {
                    const playerArray = []
                    for (let j = 0; j < numberOfLeaders; j++) {
                        let randomIndex;
                        while (true) {
                            randomIndex = Math.floor(Math.random() * checkedCheckboxes.length);
                            if (!playerArray.includes(checkedCheckboxes[randomIndex])) {
                                break;
                            }
                        }
                        playerArray.push(checkedCheckboxes[randomIndex]);
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
                const playerText = `Игрок ${index + 1}: ${player.join(' / ')}\n`;
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
            'Антигерои': true,
            'Выживальщики': true,
            'Зомби': true,
            'Инопланетяне': true,
            'Мутанты': true,
            'Пираты': true,
            'Сектанты': true,
            'Скитальцы': true,
            'Сумасшедшие ученные': true,
            'Фанаты': true,
            "Последние военные": false,
            "Богатые пираты": false
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
                        }}>Список лидеров</Typography>
                        <CheckBoxContainer>
                            <img src={Borderlords}/>
                            <FormControlLabel
                                control={<Checkbox/>}
                                label="Антигерои"
                                name="Антигерои"
                                checked={checkboxValues['Антигерои']}
                                onChange={handleCheckboxChange}
                                labelPlacement="start"
                            />
                        </CheckBoxContainer>
                        <CheckBoxContainer>
                            <img src={Doomsday_Preppers}/>
                            <FormControlLabel
                                control={<Checkbox/>}
                                label="Выживальщики"
                                name="Выживальщики"
                                checked={checkboxValues['Выживальщики']}
                                onChange={handleCheckboxChange}
                                labelPlacement="start"

                            />
                        </CheckBoxContainer>
                        <CheckBoxContainer>
                            <img src={Zombies}/>
                            <FormControlLabel
                                control={<Checkbox/>}
                                label="Зомби"
                                name="Зомби"
                                checked={checkboxValues['Зомби']}
                                onChange={handleCheckboxChange}
                                labelPlacement="start"

                            />
                        </CheckBoxContainer>
                        <CheckBoxContainer>
                            <img src={Aliens}/>
                            <FormControlLabel
                                control={<Checkbox/>}
                                label="Инопланетяне"
                                name="Инопланетяне"
                                checked={checkboxValues['Инопланетяне']}
                                onChange={handleCheckboxChange}
                                labelPlacement="start"

                            />
                        </CheckBoxContainer>
                        <CheckBoxContainer>
                            <img src={AlieMutantsns}/>
                            <FormControlLabel
                                control={<Checkbox/>}
                                label="Мутанты"
                                name="Мутанты"
                                checked={checkboxValues['Мутанты']}
                                onChange={handleCheckboxChange}
                                labelPlacement="start"

                            />
                        </CheckBoxContainer>
                        <CheckBoxContainer>
                            <img src={Pirates}/>
                            <FormControlLabel
                                control={<Checkbox/>}
                                label="Пираты"
                                name="Пираты"
                                checked={checkboxValues['Пираты']}
                                onChange={handleCheckboxChange}
                                labelPlacement="start"

                            />
                        </CheckBoxContainer>
                        <CheckBoxContainer>
                            <img src={Cultists}/>
                            <FormControlLabel
                                control={<Checkbox/>}
                                label="Сектанты"
                                name="Сектанты"
                                checked={checkboxValues['Сектанты']}
                                onChange={handleCheckboxChange}
                                labelPlacement="start"

                            />
                        </CheckBoxContainer>
                        <CheckBoxContainer>
                            <img src={Wanderers}/>
                            <FormControlLabel
                                control={<Checkbox/>}
                                label="Скитальцы"
                                name="Скитальцы"
                                checked={checkboxValues['Скитальцы']}
                                onChange={handleCheckboxChange}
                                labelPlacement="start"

                            />
                        </CheckBoxContainer>
                        <CheckBoxContainer>
                            <img src={Mad_Scientists}/>
                            <FormControlLabel
                                control={<Checkbox/>}
                                label="Сумасшедшие ученные"
                                name="Сумасшедшие ученные"
                                checked={checkboxValues['Сумасшедшие ученные']}
                                onChange={handleCheckboxChange}
                                labelPlacement="start"

                            />
                        </CheckBoxContainer>
                        <CheckBoxContainer>
                            <img src={Jocks}/>
                            <FormControlLabel
                                control={<Checkbox/>}
                                label="Фанаты"
                                name="Фанаты"
                                checked={checkboxValues['Фанаты']}
                                onChange={handleCheckboxChange}
                                labelPlacement="start"

                            />
                        </CheckBoxContainer>
                        <CheckBoxContainer>
                            <img src={LastMilitary}/>
                            <FormControlLabel
                                control={<Checkbox/>}
                                label="Последние военные"
                                name="Последние военные"
                                checked={checkboxValues['Последние военные']}
                                onChange={handleCheckboxChange}
                                labelPlacement="start"

                            />
                        </CheckBoxContainer>
                        <CheckBoxContainer>
                            <img src={RichPirates}/>
                            <FormControlLabel
                                control={<Checkbox/>}
                                label="Богатые пираты"
                                name="Богатые пираты"
                                checked={checkboxValues['Богатые пираты']}
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
                            helperText="Количество игроков"
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
                            helperText="Количество лидеров на выбор"
                        />
                        <Button sx={{
                            height: '50px'
                        }
                        } onClick={handleDrafting} variant="contained" color="primary">
                            Распределить
                        </Button>
                    </Box>
                    <Box sx={{
                        border: '1px solid',
                        padding: '20px'
                    }}>
                        {warning && <Typography sx={{color: 'orange'}}>{warning}</Typography>}
                        {error && <Typography sx={{color: 'red'}}>{error}</Typography>}
                        {finalDraft.length > 0 && finalDraft.map((player, index) => (
                            <Typography key={index}>Игрок {index + 1}: {player.join(' / ')}</Typography>
                        ))}
                        {finalDraft.length > 0 && <Typography>Текст скопирован в буфер обмена</Typography>}
                    </Box>
                </Box>

            </div>
        );
    }
;

export default Drafter;