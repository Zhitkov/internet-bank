"use strict";

import { expect } from 'chai';
import {
    getMockAnswer
} from './mocks.js';

const positiveDataExpected = {
    data: {
        ok: 'ok'
    }
};

const negativeDataExpected = {
    name: 'Error',
    message: 'Error message'
};

const defaultPositiveResult = {
    data: {
        ok: 'ok'
    }
};

const defaultNegativeResult = {
    name: 'Emulated',
    message: 'This error was emulated'
};

const testMethodName = 'test.request.sent';

describe('Testing mocks generation', () => {
    it(`Should return correct positive result for ${testMethodName}`, () => {
        let data = getMockAnswer(testMethodName, false);
        expect(data).to.deep.equal(positiveDataExpected);
    });

    it(`Should return correct negative result for ${testMethodName}`, () => {
        let data = getMockAnswer(testMethodName, true);
        expect(data).to.deep.equal(negativeDataExpected);
    });

    it(`Should return default positive result`, () => {
        let data = getMockAnswer('hey.hye');
        expect(data).to.deep.equal(defaultPositiveResult);
    });

    it(`Should return default positive result`, () => {
        let data = getMockAnswer('hey.hye', true);
        expect(data).to.deep.equal(defaultNegativeResult);
    });
});