import axios from 'axios';

export const fetchCurrencyData=async()=>{
    try{
        const response =await axios.get('https://currency-conversion-server.onrender.com/api/getTopHundredCryptocurrencies');//http://localhost:8080        
        return response;
    }catch(err){
        console.log(err.message)
    }

}

export const getConvertedCurrency=async(sourceCrypto,amount,targetCurrency)=>{
    try{
        const response=await axios.post(`https://currency-conversion-server.onrender.com/api/getConvertedCurrency?sourceCrypto=${sourceCrypto}&amount=${amount}&targetCurrency=${targetCurrency}`);        
        return response.data;
    }catch(err){
        console.log(err.message)
    }
}

