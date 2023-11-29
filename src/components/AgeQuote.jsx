import React from 'react'
import ageQuotes from '../ageQuotes.js'; 

function AgeQuote({age}) {

    const getQuote = () => {

        const userQuote = ageQuotes.find((quote) => {    
            if(age<=100){
                return quote.age === age;
            }else if (age >100){
                return quote.n
            }
        });
    
        return userQuote.quote ;
      };
    
  return (
    <div>
       
        <div className='text-danger'>{getQuote()}</div>
        
    </div>
  )
}

export default AgeQuote