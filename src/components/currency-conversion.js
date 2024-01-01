import './currency-conversion.css';
import React, { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import { fetchCurrencyData,getConvertedCurrency } from '../services/currencyService';

export default function SelectVariants() {    
    const [currency,setCurrency]=useState();
    const [convertedCurrency,setConvertedCurrency]=useState('0.0');
    const [currencyValue, setCurrencyValue] = useState();
    const [sourceCurrency,setSourceCurrency]=useState('');
    const [targetCurrency,setTargetCurrency]=useState('');
    const [error,setError]=useState('');

    const handleSourceCurrency=(e)=>{
        setSourceCurrency(e.target.value)
        setError('');
    }

    const handleChange = (e) => {
        setCurrencyValue(e.target.value);
        setError('');
    };

    const handleTargetCurrency=(e)=>{
        setTargetCurrency(e.target.value);
        setError('');
    }

    const handleConvert=async ()=>{
        if(!currencyValue?.trim() || !sourceCurrency ||!targetCurrency){
            setError("All fields are required!")
        }else{
            if(!/^\d*\.?\d*$/.test(currencyValue)){
                setError('Only number is allowed in currency value field!')
            }else{
                const convertedAmount= await getConvertedCurrency(sourceCurrency,currencyValue,targetCurrency);                
                setConvertedCurrency(convertedAmount?.convertedAmount);
            }
        }

    }

    useEffect(()=>{
        const fetchCurrencies=async()=>{ 
        const currency=await fetchCurrencyData();
        setCurrency(currency?.data);        
        }
        fetchCurrencies();
    },[]);
//{marginTop:'14%',marginBottom:'14%', position:'relative'}
    return (
        <div style={{positon:'absolute',top:0,bottom:0,left:0, right:0,margin:'auto'}}>
            <Card sx={{ maxWidth: 450, minHeight: 350, margin: 'auto' }}>
                <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }} noValidate autoComplete="off">
                    <h1>Currency Converter</h1>
                    <Divider />
                    <div style={{ marginTop: "25px" }}>
                        <TextField                                                      
                            id="standard-required"
                            label="Enter the currency value"                            
                            value={currencyValue}                            
                            variant="standard"
                            placeholder="Enter the currency value"
                            onChange={handleChange}
                        />                        
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 140 }}>
                            <InputLabel id="demo-simple-select-standard-label">Source currency</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={sourceCurrency}
                                onChange={handleSourceCurrency}
                                label="Source currency"
                                defaultValue='USD'
                            >
                            {currency?.map(item=><MenuItem key={item?.id} value={item?.id}>{item?.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </div>
                    <div style={{ marginTop: "15px" }}>                        
                        <TextField
                            readOnly
                            id="standard-required"
                            label="Converted currency"                            
                            variant="standard"
                            value={convertedCurrency}
                        />
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 140 }}>
                            <InputLabel id="demo-simple-select-standard-label">Target currency</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={targetCurrency}
                                onChange={handleTargetCurrency}
                                label="Target currency"
                            >
                            {currency?.map(item=><MenuItem key={item?.id} value={item?.id}>{item?.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </div>
                </Box>

                <div style={{ marginTop: '10px', position: '', marginLeft: '40px', display:'flex', flexDirection:'column', alignItems:'flex-start'  }}>
                <span style={{color:'red', marginBottom:'-14px'}}>{error}</span><br/>
                    <Button variant="contained" color="success" style={{ padding: '10px', width:'100px' }} onClick={handleConvert}>
                        Convert
                    </Button>
                </div>
            </Card>
        </div>
    );
}