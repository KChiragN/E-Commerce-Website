import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import img from '../Asset/downbar.PNG';
import logo from '../Asset/logo.PNG';
import SearchIcon from '@mui/icons-material/Search';
import PeopleIcon from '@mui/icons-material/People';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

// Header component for the website
function Header(prop) {
    const [active,setactive] = useState(false);// State for dropdown menu visibility
    const [searchQuery, setSearchQuery] = useState('');// State for search input value
    const allProducts = prop.allProducts;

     // Handle search input change
    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

     // Handle search action
    const handleSearch = () => {
        console.log('Search query:', searchQuery);
        if (prop.searchProducts) {
            prop.searchProducts(searchQuery);
        } else {
            console.error('searchProducts prop is not provided');
        }
    };
    
    
  return (
    <>
    {/* Top header section with currency selector and contact info */}
        <Top1>
            <Left>
                <Select name="" id="">
                    <option>USD</option>
                    <option>Rs.</option>
                </Select>
                <p>
                    <span style={{color:"#ACACAC"}}>CALL US</span>&nbsp;
                    <span>(0123) 45678</span>
                </p>

            </Left>
            <Right>
                <p style={{color:"#ACACAC"}}>FREE DELIVERY ON ORDERS ABOVE <span style={{color:"#BDC361"}}>Rs999</span></p>

            </Right>

        </Top1>
        {/* Search bar section with logo and icons */}
        <Search>
            <Logo>
                <Actualimg src={logo}></Actualimg>
            </Logo>
            <Bar>
            <Inp type='text' placeholder='Search our store' value={searchQuery} onChange={handleSearchInputChange} />
                    <SearchIcon onClick={handleSearch} />
                </Bar>
                <Icons>
                    <PeopleIcon onClick={()=>{
                        prop.setHome1(false)
                        prop.setslider1(false)
                        prop.setAbout1(false)
                        prop.setPayment1(false)
                        prop.setSignup1(true)
                        prop.setPayment1(false)
                        prop.setLogin101(false)
                        prop.setCartpage1(false)
                        prop.setShipping1(false)
                        prop.setOrderConfirmation1(false)
                    }}/>
                    <FavoriteBorderIcon/>
                    <ShoppingBagIcon onClick={()=>{
                        prop.setHome1(false)
                        prop.setslider1(false)
                        prop.setAbout1(false)
                        prop.setPayment1(false)
                        prop.setSignup1(false)
                        prop.setPayment1(false)
                        prop.setLogin101(false)
                        prop.setCartpage1(true)
                        prop.setShipping1(false)
                        prop.setOrderConfirmation1(false)
                    }}/>

                </Icons>

    
        </Search>
         {/* Navigation bar section */}
        <Nav>
            <div onClick={()=>{
                            prop.setHome1(true)
                            prop.setslider1(false)
                            prop.setAbout1(false)
                            prop.setPayment1(false)
                            prop.setSignup1(false)
                            prop.setPayment1(false)
                            prop.setLogin101(false)
                            prop.setCartpage1(false)
                            prop.setShipping1(false)
                            prop.setOrderConfirmation1(false)
                    }}>Home</div>
            <Shop>
                <p onClick={()=>setactive(!active)}>Shop</p>
                {active?<KeyboardArrowUpIcon onClick={()=>setactive(!active)}/>:<KeyboardArrowDownIcon onClick={()=>setactive(!active)}/>}
                <Content active={active}>
                    <F1>
                        <h5 style={{color:"black"}}>NEW ARRIVALS</h5>
                        <p>Casuals</p>
                        <p>Exclusive</p>
                        <p>Alligori</p>
                        <p>Chudidar</p>
                        <p>Shalwar</p>
                        <p>Jeans</p>
                        <p>Fruits</p>
                    </F1>
                    <F1>
                        <h5 style={{color:"black"}}>ACCESSORIES</h5>
                        <p>Belts</p>
                        <p>Wallets</p>
                        <p>Card Holders</p>
                        <p>Fruits</p>
                        <p>Bags</p>
                        <p>Malesauda</p>
                        <p>Destibulum</p>

                    </F1>
                    <F1>
                        <h5 style={{color:"black"}}>WATCH</h5>
                        <p>Wallets</p>
                        <p>Card Holders</p>
                        <p>Cufflinks</p>
                        <p>Fruits</p>
                        <p>Boat shoes</p>
                        <p>Brogoan</p>
                        <p>Chelsea boot</p>
                    </F1>
                    <Image>
                        <Actualimg src={img}></Actualimg>

                    </Image>

                </Content>
            </Shop>
            
                <div onClick={()=>{
                            prop.setHome1(false)
                            prop.setslider1(false)
                            prop.setAbout1(true)
                            prop.setPayment1(false)
                            prop.setSignup1(false)
                            prop.setPayment1(false)
                            prop.setLogin101(false)
                            prop.setCartpage1(false)
                            prop.setShipping1(false)
                            prop.setOrderConfirmation1(false)
                                                }}>
                    About
                </div>
                <Selectseach>
                    <option selected disabled >Pages</option>
                    <option style={{color:"black"}}>Home</option>
                </Selectseach>
                <div>
                    Contact
                </div>
                <div onClick={()=>{
                            prop.setHome1(false)
                            prop.setslider1(false)
                            prop.setAbout1(false)
                            prop.setPayment1(false)
                            prop.setSignup1(false)
                            prop.setPayment1(false)
                            prop.setLogin101(true)
                            prop.setCartpage1(false)
                            prop.setShipping1(false)
                            prop.setOrderConfirmation1(false)
                    }} >
                    Login
                </div>
                <div onClick={()=>{
                            prop.setHome1(false)
                            prop.setslider1(false)
                            prop.setAbout1(false)
                            prop.setPayment1(false)
                            prop.setSignup1(false)
                            prop.setPayment1(false)
                            prop.setLogin101(false)
                            prop.setCartpage1(false)
                            prop.setShipping1(true)
                            prop.setOrderConfirmation1(false)
                    }} >
                    Check out
                </div>

        </Nav>
    </>
  )
}
// Styled components for styling the UI elements
const Inp = styled.input`
    width:400px;
    height: 30px;
    border-radius: 3px;
    border: 1px solid grey;
    padding-left: 5px;
`;
const Bar = styled.div`
width:450px;
display: flex;
align-items: center;
align-items: center;
gap:10px;
    
`;
const Icons = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap:20px;

`;
const Logo = styled.div`
    width:120px;
    height: 50px;
`;
const Actualimg = styled.img`
  height  : 100%;
  width : 100%;
`;
const Image = styled.div`
    height: 250px;
    width:200px;
    margin-left: -20px;
`;
const F1 = styled.div`
  width:200px;
  height  : 100%;
  padding-left: 20px;
`;
const Content = styled.div`
    background-color: white;
    height:320px;
    width:1050px;
    position: absolute;
    top:${props=>props.active?168:-500}px;
    left: 100px;
    opacity: ${props=>props.active?1:0};
    transition: 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap:60px;
    color: #ACACAC;
    z-index: 1000;
`;
const Top1 = styled.div`
    height: 40px;
    display: flex;
    justify-content: center;
    gap: 300px

`;
const Left = styled.div`
    width  : 250px;
    height: 100%;
    display: flex;
    gap: 15px;
    justify-content: center;
    align-items: center;

`;
const Select = styled.select`
    width:50px;
    height:30px;
    border: none;
    background-color: white;
    color: #ACACAC;
    `;
const Right = styled.div`
    width  : 320px;
    height: 100%;
    background-color: white;
    margin-top: -8px;
`;
const Search = styled.div`
    width  : 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap:60px;
`;
const Nav = styled.div`
    width  : 100%;
    height: 60px;
    background-color: #BDC361;
    display: flex;
    gap:30px;
    justify-content: center;
    align-items: center;
    color: white;
`;
const Selectseach = styled.select`
  background-color  : transparent;
  color: white;
  border: none;
  font-weight: 1300;
  &:hover{
    cursor: pointer;
  }
`;
const Shop = styled.div`
  display  : flex;
  align-items: center;
  justify-content: center;
  &:hover{
    cursor: pointer;
  }
`;

export default Header