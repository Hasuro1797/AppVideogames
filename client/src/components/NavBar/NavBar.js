import styled from 'styled-components';

const Navigation = styled.nav`
    background-color : black;
    ${'' /* #3a3c41; */}
    height: 75px;
    width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 5px 0 10px rgba(255,255,255,0.6);
`;
const MenuItems = styled.ul`
    display : flex;
    list-style: none;
    margin right: 30px;
    li{
        margin: 25px 10px;
        font-size: 20px;
    }
    a{
        text-decoration: none;
        color: white;

    }
    .active{
        background-color: #969292;
    }  
`;

let LogoNavBar = styled.div`
    padding: 0 60px;
`;

export {
    Navigation,
    MenuItems,
    LogoNavBar,
}