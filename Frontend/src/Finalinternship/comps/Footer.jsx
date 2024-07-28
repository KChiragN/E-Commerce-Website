import React from 'react'
import styled from 'styled-components'
import footerlogo from '../Asset/footerlogo.PNG'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';

// Footer component for the website
function Footer() {
  return (
    <>
    {/* Main footer container */}
        <All21>
          {/* Company information section */}
            <Data11 style={{marginRight:"20px"}}>
              <img src={footerlogo}></img>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam molestiae nam sunt modi, consequatur ex atque, accusamus aperiam quos autem repudiandae fuga? Placeat voluptatem 
              </p>
              <Row>
              <LocationOnIcon/>
              <p>184 Main Road E, st Albans VIC</p>
              </Row>
              <Row>
              <EmailIcon/>
              <p>info@example.com</p>
              </Row>

             {/* Information section with links */}
            </Data11>
            <Data11>
              <h3 style={{marginTop:"0px"}}>INFORMATION</h3> 
              <Under/>
              <p>MY ACCOUNT</p>
              <p>ORDER HISTORY</p>
              <p>CONTACT US</p>
              <p>TRACK YOUR ORDER</p>
              <p>TERMS AND CONDITION</p>
              <p>MANUFACTUERERS</p>
              <p>SITE MAP</p>
            </Data11>

            {/* Account-related links section */}
            <Data11>
            <h3 style={{marginTop:"0px"}}>MY ACCOUNT</h3> 
            <Under/>
              <p>ABOUT US</p>
              <p>SPECIALS</p>
              <p>RETURNS</p>
              <p>AFFILIATES</p>
              <p>FAQ</p>
              <p>GAURANTEE</p>                
            </Data11>

             {/* Newsletter subscription section */}
            <Data11>
            <h3 style={{marginTop:"0px"}}>NEWSLETTER</h3> 
            <Under/>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate sint recusandae voluptatum eveniet nam veritatis amet ullam consectetur possimus velit?</p>
            <In placeholder='Your email address'></In>
            <Bt>SEND MAIL</Bt>
                
            </Data11>
        </All21>
        {/* Footer bottom section with copyright information */}
        <Bottom>
          Copyrights@Harmic Shopify All rights received

            </Bottom>
    </>
  )
}

// Styled components for styling the UI elements
const Row = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
`;
const Under = styled.div`
  height: 5px;
  border-radius: 5px;
  width:50px;
  background-color: #BDC361;
  margin-top: -15px;
`;
const Bt = styled.button`
  background-color: #BDC361;
  color: white;
  width: 100px;
  height: 30px;
  border: none;
  margin-top: 10px;
`;
const In = styled.input`
  width:100%;
  height: 30px;
`;
const Data11 = styled.div`
 width: 550px;
 height: 280px;
`;
const Bottom = styled.div`
  width  :100% ;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: #BDC361;
`;
const All21 = styled.div`
    height  : 300px;
    background-color: #E0D8C5;
    padding:40px;
    display: flex;
    gap:20px;

`;

export default Footer