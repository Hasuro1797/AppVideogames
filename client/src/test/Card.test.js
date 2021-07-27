import React from 'react';
import { configure,shallow } from 'enzyme';
import Card from '../components/Card/Card.jsx';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('<Card />', () => {
    let wrapper
    beforeEach(() => {

    wrapper = shallow(<Card id={1} name={'El gran juego'} rating={'3.8'} background_image={'https://argentina.jpg'} genres={[{id:'gen1',name:'Family'}, {id:'gen2', name:'Adventure'}]}/>)
    })

    it('The first h4 must have the name of the game', () => {
        expect(wrapper.find('h4').at(0).text()).toEqual('El gran juego');
    });

    it('The first tag "p" must have the genre "Family"', () => {
        expect(wrapper.find('p').at(0).text()).toEqual('Family');
    });

    it('The second tag "p" must have the genre "Adventure"', () => {
        expect(wrapper.find('p').at(1).text()).toEqual('Adventure');
    });

    it('Should render 2 <h4 />', () => {
        expect(wrapper.find('h4')).toHaveLength(2);
    });

    it('Should render 2 <p />', () => {
        expect(wrapper.find('p')).toHaveLength(2);
    });

    it('Should render 1 <img/>', () => {
        const background_image='https://argentina.jpg'
        const id = 1;
        expect(wrapper.find('img')).toHaveLength(1);
        expect(wrapper.contains(<img id = "background-image" src={background_image} alt={"image " + {id}} />)).toEqual(true)
    });
})