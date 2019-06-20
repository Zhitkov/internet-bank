"use strict";

import { expect } from 'chai';

import {
    convertApiNameToCamelCase
} from './Utils.js';

describe('Testing utils', () => {
    describe('Testing API names conversation', () => {
        it('Should return null', done => {
            let converted = convertApiNameToCamelCase(null);
            expect(converted).to.be.null;
            done();
        });

        it('Should return one word', () => {
            const string = 'test';
            let converted = convertApiNameToCamelCase(string);
            expect(converted).to.deep.equal(string);
        });

        it('Should return converted from dot syntax', () => {
            const string = 'test.method.name';
            let expected = 'testMethodName';
            let converted = convertApiNameToCamelCase(string);
            expect(converted).to.deep.equal(expected);
        });
    });
});