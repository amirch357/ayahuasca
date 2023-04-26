import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { Box} from '@mui/material';

const EditRetreatForm = () => {

    const router = useRouter();
    const id = router.query.id;

    const [ret_data, setRetData] = useState([]);
    const GetRetreat = async (e) => {
        await fetch('http://localhost:3007/get_retreat/' + id, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        }).then(
            response => response.json()
        ).then(res => {
            const result = res.response;
            setRetData(result);
        })
    };
    useEffect(() => {
        GetRetreat()
    }, []);

    const [title, setTitle] = useState(ret_data.title)
    const [description, setDescription] = useState(ret_data.description)
    const [interested, setInterested] = useState(ret_data.interested)
    const [going, setGoing] = useState(ret_data.going)
    const [loading, setLoading] = useState(false)

    const HandleTitle = (e) => setTitle(e.target.value)
    const HandleDescription = (e) => setDescription(e.target.value)
    const HandleInterested = (e) => setInterested(e.target.value)
    const HandleGoing = (e) => setGoing(e.target.value)

    const HandleUpdateRetreat = async (e) => {
        setLoading(true)
        await fetch('http://localhost:3007/update_retreat', {
            body: JSON.stringify({
                id: ret_data._id,
                title: title,
                description: description,
                interested: interested,
                going: going
            }),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'PUT',
        }).then(
            response => response.json()
        ).then(res => {
            setLoading(false)
            if (res.msg === "success") {
                return toast.success(res.response, {
                    position: toast.POSITION.TOP_RIGHT
                }),
                setTitle(""),
                setDescription(""),
                setInterested(""),
                setGoing(""),
                document.getElementById("retreat_form").reset(),
                setTimeout(() => {
                    router.push('/admin/retreats')
                  }, 2500);
                
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
                            Edit Retreat Details
                        </Typography>
                    </Grid>
                    <Box sx={{ padding: 10, width: '100%' }}>
                        <Grid container spacing={5} pt={4}>
                            <Grid item md={2} xs={12} sm={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: { md: 'end' } }}>
                                <label >Title</label>
                            </Grid>
                            <Grid item md={6} xs={12} sm={9} >
                                <input
                                    className='input'
                                    type='text'
                                    defaultValue={ret_data.title}
                                    onChange={HandleTitle}
                                    name='title'
                                    placeholder='Title'
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={5} pt={4}>
                            <Grid item md={2} xs={12} sm={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: { md: 'end' } }}>
                                <label >Description</label>
                            </Grid>
                            <Grid item md={10} xs={12} sm={12}>
                                <TextField
                                    onChange={HandleDescription}
                                    fullWidth
                                    defaultValue={ret_data.description}
                                    name='description'
                                    variant="outlined"
                                    placeholder="Write awesome description about retreat"
                                    multiline
                                    rows={5}
                                    rowsMax={10}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={5} pt={4}>
                            <Grid item md={2} xs={12} sm={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: { md: 'end' } }}>
                                <label >Interested</label>
                            </Grid>
                            <Grid item md={4} xs={12} sm={12}>
                                <input
                                    className='input'
                                    onChange={HandleInterested}
                                    defaultValue={ret_data.interested}
                                    fullWidth
                                    name='interested'
                                    type='Number'
                                />
                            </Grid>
                            <Grid item md={2} xs={12} sm={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: { md: 'end' } }}>
                                <label >Going</label>
                            </Grid>
                            <Grid item md={4} xs={12} sm={12}>
                                <input
                                    className='input'
                                    onChange={HandleGoing}
                                    defaultValue={ret_data.going}
                                    fullWidth
                                    name='going'
                                    type='Number'
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </CardContent>
            <Divider sx={{ margin: 0 }} />
            <CardActions>
                <Button
                    onClick={HandleUpdateRetreat}
                    size='small'
                    sx={{ mr: 2 }} variant='contained'
                >
                    Update
                </Button>

                <Button onClick={() => router.push("/admin/retreats")} size='small' color='secondary' variant='outlined'>
                    Cancel
                </Button>
            </CardActions>
        </form >
    )
}

export default EditRetreatForm
