import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import ImageUrl from '../dukke_ilt.png';

const genderList = [
    {value: 'Voice'},{ value: 'Female' }, { value: 'Male' } ];
const TextToSpeechCard = () => {
    const [gender, setGender] = useState('Voice');
    const [text, setText] = useState('');
    
    const submitHandler = (event) => {
        event.preventDefault();
        const genderVoice = (gender === "Female") ? "da-DK-ChristelNeural" : "da-DK-JeppeNeural";
        postTextToSpeechRequest(genderVoice, text);
    };

    const textChangeHandler = (event) => {
        setText(event.target.value);
    }
    const selectHandler = (event) => {
        setGender(event.target.value);
    };

    const postTextToSpeechRequest = (genderVoice, text) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/octet-stream' },
            body: JSON.stringify(
                { "ssmlText": '<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis"\\r\\nxmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="en-US">\\r\\n<voice name="' + genderVoice + '">\\r\\n<mstts:express-as style=\\"general">\\r\\n"' + text + '"</mstts:express-as>\\r\\n</voice>\\r\\n</speak>", "audioFormat": "Audio16Khz32KBitRateMonoMp3"' }
            )
        }
           
        fetch('http://localhost:5000/text-to-speech', requestOptions)
            .then(response => { response.blob().then(blob => {
                const url = URL.createObjectURL(blob);
                const audio0 = new Audio(url);
                audio0.play();
            })
        });
    }
    return (<Card sx={{ maxWidth: 345 }}>
    <CardMedia
      component="img"
      height="140"
      image={ImageUrl}
      alt="green iguana"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        What will you say to the patient, to calm him down?
      </Typography>
    <TextField
        id="outlined-select-gender"
        select
        label="Select"
        value={gender}
        onChange={selectHandler}
        >
        {genderList.map((option) => (
            <MenuItem key={option.value} value={option.value}>
            {option.value}
            </MenuItem>
        ))}
        </TextField>
        <TextField
        id="outlined-textarea"
        label="Speak to the patient"
        placeholder="What will you say?"
        multiline
        value={text}
        onChange={textChangeHandler}
        />
    </CardContent>
    <CardActions>
        <Button size="small" onClick={submitHandler}>SUBMIT</Button>
    </CardActions>
  </Card>);
}

export default TextToSpeechCard;