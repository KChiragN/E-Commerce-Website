import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import image1 from '../Asset/img1.jpg';
import image2 from '../Asset/img2.jpg';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function Slider() {
    const [activeimg,setactiveimg] = useState(0);
    const imgs = [image1,image2];
    const len = imgs.length;
  return (
    <>
    <Holder>
        <Actual11 src={imgs[activeimg]}></Actual11>
        <Left onClick={()=>{
            activeimg<1?setactiveimg(len-1):setactiveimg(activeimg-1);
        }}>
            <ChevronLeftIcon/>
        </Left>
        <Right onClick={()=>{
            activeimg>=len-1?setactiveimg(0):setactiveimg(activeimg+1);
        }}>
            <ChevronRightIcon />
        </Right>
    </Holder>
    </>
  )
}
const Right = styled.div`
    background-color: #f1f1ca;
    z-index: 1000;
    position: absolute;
    top:200px;
    left:1180px;
    &:hover{
        cursor: pointer;
    }
`;
const Left = styled.div`
    background-color: #f1f1ca;
    z-index: 1000;
    position: absolute;
    top:200px;
    &:hover{
        cursor: pointer;
    }
`;
const Actual11 = styled.img`
    width  : 100%;
    height: 400px;
    position: absolute;
`;
const Holder =  styled.div`
    height  : 400px;
    background-color: red;
    position: relative;
`;
