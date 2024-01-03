import axios from 'axios';

export const fetchCurrencyData=async()=>{
    try{
        const response =await axios.get('http://localhost:8080/api/getTopHundredCryptocurrencies');       
        return response;////http://localhost:8080
        
    }catch(error){        
        //console.log(error)
        return error.response;        
    }

}

export const getConvertedCurrency=async(sourceCrypto,amount,targetCurrency)=>{
    try{
        const response=await axios.post(`http://localhost:8080/api/getConvertedCurrency?sourceCrypto=${sourceCrypto}&amount=${amount}&targetCurrency=${targetCurrency}`);        
        return response.data;
    }catch(error){
        console.log(error.message)               
    }
}

