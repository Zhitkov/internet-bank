import assert from 'assert';

import fieldStrictNumberNormalizer from './fieldStrictNumberNormalizer';


describe('fieldStrictNumberNormalizer', () => {

    it('normal number', () => {
        assert.strictEqual(
            fieldStrictNumberNormalizer(3),
            3
        );
    });

    it('number as string', () => {
        assert.strictEqual(
            fieldStrictNumberNormalizer('3.28'),
            3.28
        );

        assert.strictEqual(
            fieldStrictNumberNormalizer('3.'),
            3
        );
    });

    it('unparsable string', () => {
        assert.strictEqual(
            fieldStrictNumberNormalizer('Ziliboba'),
            undefined
        );
    });

});