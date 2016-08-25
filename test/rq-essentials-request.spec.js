/* eslint-env node */

/* eslint-disable no-inline-comments */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */

/* global require:false, describe:false, it:false, expect:false, beforeEach:false, afterEach:false */

'use strict';

const expect = require('chai').expect;
const RQ = require('rq-commonjs');
const rq = require('rq-essentials');
const rqRequest = require('../index');


describe('RQ-essentials: Request', () => {

    it('should exist', () => {
        expect(rqRequest).to.exist;
        expect(rqRequest).to.be.an('object');
    });


    describe('GET', () => {
        it('should exist as a function', () => {
            expect(rqRequest.get).to.exist;
            expect(rqRequest.get).to.not.be.a('string');
            expect(rqRequest.get).to.not.be.a('number');
            expect(rqRequest.get).to.not.be.an('array');
            expect(rqRequest.get).to.not.be.an('object');
            expect(rqRequest.get).to.be.a('function');
        });

        it('should be a requestor factory, taking one (option) argument', () => {
            expect(rqRequest.get.length).to.be.equal(1);
            expect(rqRequest.get().length).to.be.equal(2); // The resulting requestor function
        });

        it('should set URL via "uri" options property', () => {
            const requestor = rqRequest.get({ uri: 'https://www.example.com:8080' });
            const requestContextObj = requestor(rq.run, null);

            expect(requestContextObj.host).to.be.equal('www.example.com');
            expect(requestContextObj.port).to.be.equal('8080');
            expect(requestContextObj.uri.protocol).to.be.equal('https:');
            expect(requestContextObj.uri.port).to.be.equal('8080');
            expect(requestContextObj.uri.path).to.be.equal('/');
        });

        it('should set URL via single string argument', () => {
            const requestor = rqRequest.get('http://www.example.com');
            const requestContextObj = requestor(rq.run, null);

            expect(requestContextObj.host).to.be.equal('www.example.com');
            expect(requestContextObj.port).to.be.equal(80);
            expect(requestContextObj.uri.protocol).to.be.equal('http:');
            expect(requestContextObj.uri.port).to.be.equal(80);
            expect(requestContextObj.uri.path).to.be.equal('/');
        });

        it('should have default options', () => {
            const requestor = rqRequest.get({ uri: 'https://www.example.com:8080' });
            const requestContextObj = requestor(rq.run, null);

            expect(requestContextObj.method).to.be.equal('GET');
            expect(requestContextObj.encoding).to.be.equal('UTF-8');
            expect(requestContextObj.headers['User-Agent']).to.be.equal('request (npm)');
        });

        it('should discontinue function processing when URI is missing', (done) => {
            RQ.fallback([
                RQ.sequence([
                    rqRequest.get(),
                    rq.then(() => {
                        throw new Error('Should not reach this place!');
                    })
                ]),
                RQ.sequence([
                    rq.then(() => {
                        done();
                    })
                ]),
                (callback, args) => {
                    throw new Error('Should not reach this place!');
                }
            ])(rq.run);
        });

        it('should GET arbitrary URLs', (done) => {
            RQ.fallback([
                RQ.sequence([
                    rqRequest.get('http://www.axbit.com/'),
                    rq.then(() => {
                        done();
                    })
                ]),
                RQ.sequence([
                    rq.then(() => {
                        throw new Error('Should not reach this place!');
                    })
                ]),
                (callback, args) => {
                    throw new Error('Should not reach this place!');
                }
            ])(rq.run);
        });
    });
});
