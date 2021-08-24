/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, Genero, conn } = require('../../src/db.js');
const agent = session(app);


const videogame1 = { 
  name: 'game1',
  status: 'On platform',
  description: 'anything description',
  released: '2012-06-29',
  rating: 3.2,
  background_image:'https://i.blogs.es/4185d3/godofwar2/1366_2000.jpg'
}

const videogame2 = {
  name: 'game2',
  status: 'On platform',
  description: 'anything description',
  released: '2000-08-13',
  rating: 3.5,
  background_image:'https://i.blogs.es/4185d3/godofwar2/1366_2000.jpg'
}

const videogame3 ={
  name: 'game3',
  status: 'On platform',
  description: 'anything description',
  released: '2003-05-23',
  rating: 3.4,
  background_image:'https://i.blogs.es/4185d3/godofwar2/1366_2000.jpg'
}
const body = {
  count: 1,
  pages: 1,
  page: 1,
  results: [
    {
      id: 1,
      name: 'game1',
      background_image: 'https://i.blogs.es/4185d3/godofwar2/1366_2000.jpg',
      rating: 3.2,
      genres: [],
      released: "2012-06-29"
    }
  ],
  actualEndPoint: 'http://localhost:3001/videogames?page=1'
}

describe('Videogame routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  beforeEach(() => Videogame.sync({ force: true })
    .then( () => conn.sync({ force : true }))
    .then(()=> Videogame.create(videogame1))
  
    
    .catch((e)=>console.log("Err: ",e))
    );


  describe('GET /videogames', () => {
    it('should get 200', () =>
      agent.get('/videogames').expect(200)
      .then(res=> 
        expect(res.body).to.deep.equal(body))
    );

    it('answer all the games in the data base', function () {
      return Videogame.create(videogame3)
        .then(() => {
          return agent.get('/videogames')
        })
        .then(res => {
          expect(res.body.results.length).to.equal(2)
        })
    });
    it('/videogames?name=1 answer with a json of game1', function() {
      return Videogame.create(videogame3)
      .then(() => {
        return agent.get('/videogames?name=1 ')
      })
      .then(res => {
        expect(res.body.results.length).to.equal(1)
        expect(res.body.results[0].name).to.equal('game1')
        expect(res.body.results[0].id).to.equal(1)
      })
    });
    it('/videogames?order=rating&way=desc answer the rating in descending order ', function() {
      return Videogame.create(videogame2)
      .then(() => {
      return Videogame.create(videogame3)
      })
      .then(() => {
        return agent.get('/videogames?order=rating&way=desc ')
      })
      .then(res => {
        expect(res.body.results.length).to.equal(3)
        expect(res.body.results[0].name).to.equal('game2')
        expect(res.body.results[0].id).to.equal(2)
        expect(res.body.results[1].name).to.equal('game3')
        expect(res.body.results[1].id).to.equal(3)
        expect(res.body.results[2].name).to.equal('game1')
        expect(res.body.results[2].id).to.equal(1)
      })
    });
    it('/videogames?order=rating&way=asc answer the rating in ascending order', function() {

      return Videogame.create(videogame2)
      .then(() => {
      return Videogame.create(videogame3)
      })
      .then(() => {
        return agent.get('/videogames?order=rating&way=asc ')
      })
      .then(res => {
        expect(res.body.results.length).to.equal(3)
        expect(res.body.results[0].name).to.equal('game1')
        expect(res.body.results[0].id).to.equal(1)
        expect(res.body.results[1].name).to.equal('game3')
        expect(res.body.results[1].id).to.equal(3)
        expect(res.body.results[2].name).to.equal('game2')
        expect(res.body.results[2].id).to.equal(2)
      })
    });
    
    it('/videogames?rating=true&orden=asc&name=juego responde con juego1, juego3, juego2',  function() {
      return Videogame.create(videogame2)
      .then(() => {
      return Videogame.create(videogame3)
      })
      .then(() => {
        return agent.get('/videogames?order=rating&way=asc&results')
      })
      .then(res => {
        expect(res.body.results.length).to.equal(3)
        expect(res.body.results[0].name).to.equal('game1')
        expect(res.body.results[0].id).to.equal(1)
        expect(res.body.results[1].name).to.equal('game3')
        expect(res.body.results[1].id).to.equal(3)
        expect(res.body.results[2].name).to.equal('game2')
        expect(res.body.results[2].id).to.equal(2)
      })
    });
    
    it('/videogame/id2 responde con juego2',  function() {
      return Videogame.create(videogame2)
      .then(() => {
      return Videogame.create(videogame3)
      })
      .then(() => {
        console.log("pidiendo get")
        return agent.get('/videogame/'+ 2)
      })
      .then(res => {
        expect(res.body.name).to.equal('game2')
      })
    });
    

    

  });
});

