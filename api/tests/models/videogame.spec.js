const { Videogame,conn } = require('../../src/db.js');
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const agent = session(app);

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => 
      Videogame.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Videogame.create({
            status:'On platform',
            released: '2015-04-13',
            rating: 4.5,
            background_image: 'https://i.blogs.es/4185d3/godofwar2/1366_2000.jpg',
            description: 'Anything description'
          })
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should throw an error when only sended the name', (done) => {
        Videogame.create({ name: 'Super Mario Bros' })
          .then(() => done(new Error('More data is required')))
          .catch(() => done());
      });
    });
    describe('status', () => {
      it('should throw an error if status is null', (done) => {
        Videogame.create({
          name:'god of war 2',
          released: '2015-04-13',
          rating: 4.5,
          background_image: 'https://i.blogs.es/4185d3/godofwar2/1366_2000.jpg',
          description: 'Anything description'
        })
          .then(() => done(new Error('It requires a valid status')))
          .catch(() => done());
      });
      it('should throw an error when only sended the status', (done) => {
        Videogame.create({ status: 'On platform' })
          .then(() => done(new Error('More data is required')))
          .catch(() => done());
      });
    });
    describe('released', () => {
      it('should throw an error when only sended the released', (done) => {
        Videogame.create({ released: '2015-04-13' })
          .then(() => done(new Error('More data is required')))
          .catch(() => done());
      });
    });
    describe('rating', () => {
      it('should throw an error when only sended the rating', (done) => {
        Videogame.create({ rating: 4.3 })
          .then(() => done(new Error('More data is required')))
          .catch(() => done());
      });
    });
    describe('background_image', () => {
      it('should throw an error if background_image is null', (done) => {
        Videogame.create({
          name:'god of war 2',
          status: 'On platform',
          released: '2015-04-13',
          rating: 4.5,
          description: 'Anything description'
        })
          .then(() => done(new Error('It requires a valid status')))
          .catch(() => done());
      });
      it('should throw an error when only sended the background_image', (done) => {
        Videogame.create({ background_image: 'https://i.blogs.es/4185d3/godofwar2/1366_2000.jpg', })
          .then(() => done(new Error('More data is required')))
          .catch(() => done());
      });
    });
    describe('description', () => {
      it('should throw an error if description is null', (done) => {
        Videogame.create({
          name:'god of war 2',
          status: 'On platform',
          released: '2015-04-13',
          rating: 4.5
        })
          .then(() => done(new Error('It requires a valid description')))
          .catch(() => done());
      });
      it('should throw an error when only sended the description', (done) => {
        Videogame.create({ description: 'Anything description' })
          .then(() => done(new Error('More data is required')))
          .catch(() => done());
      });
    });
  });
});
