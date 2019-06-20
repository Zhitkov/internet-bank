import assert from  'assert';

import fieldNumberNormalizer from './fieldNumberNormalizer';


describe('fieldNumberNormalizer', () => {

    it('number', () => {
        assert.strictEqual(
            fieldNumberNormalizer(2),
            '2'
        );
    });
    
    it('number as string', () => {
        assert.strictEqual(
            fieldNumberNormalizer('32.1'),
            '32.1'
        );
        assert.strictEqual(
            fieldNumberNormalizer('32.'),
            '32.'
        );

        assert.strictEqual(
            fieldNumberNormalizer('32....'),
            '32.'
        );

        assert.strictEqual(
            fieldNumberNormalizer('32....2'),
            '32.2'
        );

        assert.strictEqual(
            fieldNumberNormalizer('32....2...'),
            '32.2'
        );

        assert.strictEqual(
            fieldNumberNormalizer('32....2...1..23..'),
            '32.2123'
        );
    });

    it('unparsable number', () => {
        assert.strictEqual(
            fieldNumberNormalizer('Ziliboba'),
            ''
        );
    });

});