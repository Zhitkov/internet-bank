import assert from 'assert';
import {
    extractResultDataState
} from './dataState';


describe('modules/dataState', () => {


    describe('extractResultDataState', () => {

        describe('one item', () => {
            it('hasn\'t data', () => {
                const result = extractResultDataState({
                    isRequesting: false,
                    isUpdating: false,
                    isError: false,
                    errorText: '',
                    hasData: false,
                    data: {}
                });

                assert.deepEqual(
                    result,
                    {
                        isRequesting: false,
                        isUpdating: false,
                        isError: false,
                        errorText: '',
                        hasData: false
                    }
                );
            });

            it('has data', () => {
                const result = extractResultDataState({
                    isRequesting: false,
                    isUpdating: false,
                    isError: false,
                    errorText: '',
                    hasData: true,
                    data: {}
                });

                assert.deepEqual(
                    result,
                    {
                        isRequesting: false,
                        isUpdating: false,
                        isError: false,
                        errorText: '',
                        hasData: true
                    }
                );
            });

            it('requesting', () => {
                const result = extractResultDataState({
                    isRequesting: true,
                    isUpdating: false,
                    isError: false,
                    errorText: '',
                    hasData: false,
                    data: {}
                });

                assert.deepEqual(
                    result,
                    {
                        isRequesting: true,
                        isUpdating: false,
                        isError: false,
                        errorText: '',
                        hasData: false
                    }
                );
            });

            it('updating', () => {
                const result = extractResultDataState({
                    isRequesting: false,
                    isUpdating: true,
                    isError: false,
                    errorText: '',
                    hasData: false,
                    data: null
                });

                assert.deepEqual(
                    result,
                    {
                        isRequesting: false,
                        isUpdating: true,
                        isError: false,
                        errorText: '',
                        hasData: false
                    }
                );
            });

            it('error', () => {
                const result = extractResultDataState({
                    isRequesting: false,
                    isUpdating: false,
                    isError: true,
                    errorText: 'error',
                    hasData: false,
                    data: {}
                });

                assert.deepEqual(
                    result,
                    {
                        isRequesting: false,
                        isUpdating: false,
                        isError: true,
                        errorText: 'error',
                        hasData: false
                    }
                );
            });
        });

        describe('some item', () => {
            it('hasn\'t data', () => {
                const result = extractResultDataState(
                    {
                        isRequesting: false,
                        isUpdating: false,
                        isError: false,
                        errorText: '',
                        hasData: true,
                        data: {}
                    },
                    {
                        isRequesting: false,
                        isUpdating: false,
                        isError: false,
                        errorText: '',
                        hasData: true,
                        data: {}
                    },
                    {
                        isRequesting: false,
                        isUpdating: false,
                        isError: false,
                        errorText: '',
                        hasData: false,
                        data: {}
                    }
                );

                assert.deepEqual(
                    result,
                    {
                        isRequesting: false,
                        isUpdating: false,
                        isError: false,
                        errorText: '',
                        hasData: false
                    }
                );
            });

            it('has data', () => {
                const result = extractResultDataState(
                    {
                        isRequesting: false,
                        isUpdating: false,
                        isError: false,
                        errorText: '',
                        hasData: true,
                        data: {}
                    },
                    {
                        isRequesting: false,
                        isUpdating: false,
                        isError: false,
                        errorText: '',
                        hasData: true,
                        data: {}
                    },
                    {
                        isRequesting: false,
                        isUpdating: false,
                        isError: false,
                        errorText: '',
                        hasData: true,
                        data: {}
                    }
                );

                assert.deepEqual(
                    result,
                    {
                        isRequesting: false,
                        isUpdating: false,
                        isError: false,
                        errorText: '',
                        hasData: true
                    }
                );
            });

            it('requesting', () => {
                const result = extractResultDataState(
                    {
                        isRequesting: false,
                        isUpdating: false,
                        isError: false,
                        errorText: '',
                        hasData: true,
                        data: {}
                    },
                    {
                        isRequesting: false,
                        isUpdating: false,
                        isError: false,
                        errorText: '',
                        hasData: true,
                        data: {}
                    },
                    {
                        isRequesting: true,
                        isUpdating: false,
                        isError: false,
                        errorText: '',
                        hasData: false,
                        data: {}
                    }
                );

                assert.deepEqual(
                    result,
                    {
                        isRequesting: true,
                        isUpdating: false,
                        isError: false,
                        errorText: '',
                        hasData: false
                    }
                );
            });

            it('updating', () => {
                const result = extractResultDataState(
                    {
                        isRequesting: false,
                        isUpdating: false,
                        isError: false,
                        errorText: '',
                        hasData: false,
                        data: null
                    },
                    {
                        isRequesting: false,
                        isUpdating: true,
                        isError: false,
                        errorText: '',
                        hasData: false,
                        data: null
                    }
                );

                assert.deepEqual(
                    result,
                    {
                        isRequesting: false,
                        isUpdating: true,
                        isError: false,
                        errorText: '',
                        hasData: false
                    }
                );
            });

            it('error', () => {
                const result = extractResultDataState(
                    {
                        isRequesting: false,
                        isUpdating: false,
                        isError: false,
                        errorText: '',
                        hasData: true,
                        data: {}
                    },
                    {
                        isRequesting: false,
                        isUpdating: false,
                        isError: true,
                        errorText: 'error',
                        hasData: false,
                        data: {}
                    },
                    {
                        isRequesting: false,
                        isUpdating: false,
                        isError: false,
                        errorText: '',
                        hasData: true,
                        data: {}
                    }
                );

                assert.deepEqual(
                    result,
                    {
                        isRequesting: false,
                        isUpdating: false,
                        isError: true,
                        errorText: 'error',
                        hasData: false
                    }
                );
            });
        });

    });

});