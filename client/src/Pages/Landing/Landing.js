import styled from 'styled-components';
import LandingImg from '../../images/background-image.jpg'

const BackgroundImage = styled.div`
    background-image: url(${LandingImg});
    height: 657px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    flex: 1 1 0;

    &:hover:{
        box-shadow: 3px 0px 30px rgba(163,163,163, 1);
    }

    a{
        text-decoration : none;
        color: white;
    }
`;

const LogoItem = styled.div`
    margin:70px;
    width: 264px;
    &:hover{
        box-shadow: 3px 0px 30px rgba(163,163,163, 1);
        background: rgba(163,163,163, 1);
    }
`;

const BtnHome = styled.button`
    margin-left: 150px; 
    width: 120px;
    height: 50px;
    border: none;
    background: #D84DC3;
    border-radius: 10px; 
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: .1s ease all;

    
    &:hover{
        box-shadow: 3px 0px 30px rgba(163,163,163, 1);
    }

`;
export {
    BackgroundImage,
    LogoItem,
    BtnHome,
}