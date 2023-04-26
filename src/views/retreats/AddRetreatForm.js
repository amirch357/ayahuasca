import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const AddRetreatForm = () => {
    const router = useRouter()

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [interested, setInterested] = useState("")
    const [going, setGoing] = useState("")

    const [loading, setLoading] = useState(false)

    const HandleTitle = (e) => setTitle(e.target.value)
    const HandleDescription = (e) => setDescription(e.target.value)
    const HandleInterested = (e) => setInterested(e.target.value)
    const HandleGoing = (e) => setGoing(e.target.value)

    const HandleAddRetreat = async (e) => {
        setLoading(true)
        await fetch('http://localhost:3007/add_retreat', {
            body: JSON.stringify({
                title: title,
                description: description,
                interested: interested,
                going: going
            }),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        }).then(
            response => response.json()
        ).then(res => {
            setLoading(false)
            if (res.msg === "success") {
                setTitle("")
                setDescription("")
                setInterested("")
                setGoing("")
                document.getElementById("retreat_form").reset();
                return toast.success(res.response, {
                    position: toast.POSITION.TOP_RIGHT
                })

            } else if (res.msg === "val_error") {
                var message = "";
                res.response.map((resp, k) => {
                    message += resp.msg;
                });
                toast.error(<div dangerouslySetInnerHTML={{ __html: message }} />, {
                    position: toast.POSITION.TOP_RIGHT
                });

            } else if (res.msg === "error") {
                return toast.error(res.response, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        })
    }

    return (
        <form id='retreat_form'>
            <CardContent>
                <Grid container spacing={5}>
                    <Grid item xs={12}>
                        <Typography variant='body2' sx={{ fontWeight: 600 }}>
                            Retreat Details
                        </Typography>
                    </Grid>
                    <Grid item md={6} xs={12} sm={6}>
                        <TextField
                            onChange={HandleTitle}
                            fullWidth
                            label='Title'
                            name='title'
                            placeholder='Title of retreat' />
                    </Grid>
                    <Grid item md={12} xs={12} sm={6}>
                        <TextField
                            onChange={HandleDescription}
                            fullWidth
                            label='Description'
                            name='description'
                            variant="outlined"
                            placeholder="Write awesome description about retreat"
                            multiline
                            rows={5}
                            
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            onChange={HandleInterested}
                            fullWidth
                            label='Intreasted'
                            name='interested'
                            type='Number'
                            placeholder='1' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            onChange={HandleGoing}
                            fullWidth
                            label='Going'
                            name='going'
                            type='Number'
                            placeholder='1' />
                    </Grid>
                </Grid>
            </CardContent>
            <Divider sx={{ margin: 0 }} />
            <CardActions>
                <Button
                    onClick={HandleAddRetreat}
                    size='small'
                    sx={{ mr: 2 }} variant='contained'
                >
                    Submit
                </Button>
                <Button onClick={() => router.push("/admin/retreats")} size='small' color='secondary' variant='outlined'>
                    Cancel
                </Button>
            </CardActions>
        </form>
    )
}

export default AddRetreatForm
