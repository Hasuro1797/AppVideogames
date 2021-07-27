import React from 'react';
import {  Link } from 'react-router-dom';
import { configure,shallow } from 'enzyme';
import NavBar from '../components/NavBar/NavBar.jsx';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('<Nav />', () => {
    let wrapper
    beforeEach(() => {
    wrapper = shallow(<NavBar />)
    })

    it('Should render three <Link />', () => {
        expect(wrapper.find(Link)).toHaveLength(3);
    });
    it('The first Link must have an "img" tag and change the path to "/".', () => {
        expect(wrapper.find(Link).at(0).prop('to')).toEqual('/');
        expect(wrapper.find('img')).toHaveLength(1);
    });
    it('The second Link must have the text "Home" and change the path to "/ home"', () => {
        expect(wrapper.find(Link).at(1).prop('to')).toEqual('/home');
        expect(wrapper.find(Link).at(1).text()).toEqual('Home');
    });
    it('The third Link must have the text "Add" and change the path to "/ home / addvideogame".', () => {
        expect(wrapper.find(Link).at(2).prop('to')).toEqual('/home/addvideogame');
        expect(wrapper.find(Link).at(2).text()).toEqual('Add');
    });
})