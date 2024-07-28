import React from 'react';
import styled from 'styled-components';
// import cartbg from '../Asset/cartbg.jpg'
import img1 from '../Asset/img1.jpg'

// About component displays information about the website
function About() {
  return (
    <>
     {/* Container for the about section */}
        <All22>
            <h1>Your Shopping Cart</h1>
            <h4>Home &gt; About us</h4>
            <Conte>
              {/* Left section containing an image */}
              <Leftimage>
                <Imggg src={img1}></Imggg>
              </Leftimage>
              {/* Right section containing text */}
              <Right5>
                <h4 style={{paddingTop:20}}>Welcome to Harmic</h4>
                <h1 style={{fontSize:60}}>BEST ORGANIC SHOP</h1>
                {/* Placeholder text */}
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo ex dolor voluptates dolorem dignissimos officiis sint praesentium facilis beatae. Repellendus id expedita nisi at necessitatibus vel non quasi tempore quam illo dolorum voluptas blanditiis sed eligendi explicabo, dolor quae quas ratione enim commodi est quibusdam accusamus! Repudiandae minus officiis, temporibus fuga corrupti rem molestiae eligendi laboriosam quibusdam quasi excepturi aut tempora eos assumenda magnam recusandae repellendus! Hic molestiae, quos fugit officiis optio temporibus repellat totam. Molestiae quas dolorem sequi, optio consectetur nulla sunt adipisci maiores nostrum assumenda dignissimos ipsum, ad cupiditate quia cumque? Eveniet quod odit ipsum expedita voluptatum repudiandae?</p>
              </Right5>

            </Conte>

        </All22>
    </>
  )
}
// Styled components for styling the UI elements
const Imggg = styled.img`
    width: 100%;
    height: 100%;
`;
const Right5 = styled.div`
    width: 50%;
    min-height: 100%;
    background-color: #D7D7D7;
    justify-content: left;
    color: black;
    padding-left: 30px;
`;
const Leftimage = styled.div`
  width: 50%;
  height: 100%;
`;
const Conte = styled.div`
    background-color  : white;
    width: 100%;
    display: flex;
    background-color: #D7D7D7;

`;
const All22 = styled.div`
    min-height: 500px;
    background-image: url("https://th.bing.com/th/id/OIP.qYQE4mUiJP5QumA_KCnqhQHaFP?rs=1&pid=ImgDetMain");
    background-attachment: scroll;
    background-repeat: no-repeat;
  background-size: 100% 100%;
  color: white;
  display: flex;
  flex-direction: column;
  gap:0;
  align-items: center;
  justify-content: center;


`
export default About