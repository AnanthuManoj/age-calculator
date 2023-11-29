import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AgeQuote from './AgeQuote';


const AgeCalculator = () => {

  const [show, setShow] = useState(false);

  const [isBirthday , setIsBirthday] = useState(false)

  const handleClose = () => {
    setShow(false);
    handleReset()
  }
  const handleShow = () => {
    setShow(true);
    calculateAge()
  }


  const [birthDate, setBirthDate] = useState('');
  const [age, setAge] = useState({
    years: null,
    months: null,
    days: null,
  });

  const handleInputChange = (event) => {
    setBirthDate(event.target.value);
  };

  const calculateAge = () => {
    if (!birthDate) {
      alert('Please enter a valid birthdate');
      return;
    }

    const birthDateObj = new Date(birthDate);
    const currentDate = new Date();

    let years = currentDate.getFullYear() - birthDateObj.getFullYear();
    let months = currentDate.getMonth() - birthDateObj.getMonth();
    let days = currentDate.getDate() - birthDateObj.getDate();

    if (birthDateObj > currentDate) {
      alert('Birth date cannot be in the future');
      setBirthDate('');
      return;
    }



    // Adjust negative months or days
    if (days < 0) {
      months--;
      days += new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0
      ).getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setAge({ years, months, days });

    if( birthDateObj.getDate() === currentDate.getDate() &&
      birthDateObj.getMonth() === currentDate.getMonth()){
        setIsBirthday(true)
      }
   


  };

  const handleReset =()=>{
    setBirthDate('');
    setIsBirthday(false)
    setAge({
      years: null,
      months: null,
      days: null,
    });
  }

  return (
    <div style={{display:'flex', minHeight:'100vh', justifyContent:'center', alignItems:'center'}}>
      
        <div className='d-flex flex-column shadow rounded p-5' style={{gap:'1rem'}} >

          <div>
            <h1 className=' mt-3 fw-bold mb-3 text-white display-4'>AgeSpark.</h1>
            <h4 className='fw-bold text-white'>"Unlock the Wisdom of Time: <br /> Your Age, Your Story, Your Journey!"</h4>
  
          </div>
          
          <div>
            <label htmlFor="birthDate" className='fw-bold lead mb-3 text-white'>Enter your birthdate:</label>
               <div className='d-flex flex-column '>
             
              <input
                type="date"
                id="birthDate"
                value={birthDate}
                onChange={handleInputChange}
                className='form-control p-3 fs-5 fw-bold text-primary'
              />

            <div className='d-flex mt-5 justify-content-between'>
              <button onClick={handleShow} className='btn btn-success'>Calculate Age</button>
               <button onClick={handleReset} className='btn btn-danger'>Reset</button>
            </div>

               </div>
          </div>
              
        </div>

     

      {age.years !== null && (
        <Modal show={show} onHide={handleClose}   
        aria-labelledby="contained-modal-title-vcenter"
        centered >
        <Modal.Header closeButton>
         
        </Modal.Header>
        <Modal.Body>
                  
                {isBirthday&&
                  <div>
                  <h2 className='fw-bold text-danger display-6'>🎈 Happy birthday 🎈</h2>
                </div>}
       
            <div className='lead fw-bold mt-3 d-flex flex-column'>
              <p className='fw-bold display-5'>
                Your are <span className='fw-bold text-warning display-3'>{age.years}</span> years, <span className='fw-bold text-warning display-3'>{age.months}</span> months, and <span className='fw-bold text-warning display-3'>{age.days}</span>{' '}
                days old
              </p>
              {age.years>=0 &&
                <AgeQuote age = {age.years}/>}
            </div>
       

        </Modal.Body>
        <Modal.Footer className='text-center'>
          <Button variant="danger" onClick={handleClose} >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
         )}


    </div>
  );
};

export default AgeCalculator;
