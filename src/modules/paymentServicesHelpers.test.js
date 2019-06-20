import assert from 'assert';

import { preparePaymentServiceFieldsValuesForServer } from './paymentServicesHelpers';


const paymentServiceStub = {
    operationId: "09866a7b-edd1-4de2-ae1c-a8df637ab3cd",
    steps: [
        "services.service_step_internationalTransfer",
        "services.service_step_otpSMS",
        "services.service_step_result"
    ],
    currentStepIndex:1,
    fields:[
        {
            id: "{\"internalId\":\"b2153cba4785cc74af040a0969a8c5831739c067\",\"externalId\":\"paymentSource\"}",
            title: "services.title_paymentSource",
            type: "paymentSource",
            validate: {isRequired: true},
            content:[
                {title: "DO54DMDM00000000000000000002", sourceId: 2, sourceType: "account", balance: 0},
                {title: "DO81DMDM00000000000000000001", sourceId: 1, sourceType: "account", balance: 0}
            ]
        },
        {
            id: "{\"internalId\":\"8876a7a420ce069f7bbfd3035e7e1f6f7bf4253b\",\"externalId\":\"customerName\"}",
            type: "text",
            title: "Customer name",
            validate: {isRequired: false},
            isReadOnly: true,
            value: "Customer name"
        },
        {
            id: "{\"internalId\":\"fecbd74c6fdfe8210f24fbaadc9f30525d65dd60\",\"externalId\":\"paymentDocumentId\"}",
            type: "text",
            title: "Payment document number",
            validate: {isRequired: false},
            isReadOnly: true,
            value: 1
        },
        {
            id: "{\"internalId\":\"ee0995bcc3d29bf496e900ec8da806721ec32441\",\"externalId\":\"transferType\"}",
            type: "list",
            title: "Transfer type",
            validate: {isRequired: false},
            isReadOnly: false,
            items: [
                {
                    label: "internationalTransferType.general",
                    value: 1
                },
                {
                    label: "internationalTransferType.instant",
                    value: 2
                }
            ],
            defaultValue: 1,
            value: null
        },
        {
            id: "{\"internalId\":\"294de6e2a8e8dffec9420e9b3ed8a3ec79353821\",\"externalId\":\"feePayer\"}",
            type: "list",
            title: "Who will pay the fee?",
            validate: {isRequired: false},
            isReadOnly: false,
            items: [
                {
                    label: "feePayer.sender",
                    value: 1
                },
                {
                    label: "feePayer.recipient",
                    value: 2
                }
            ],
            defaultValue: 1,
            value: null
        },
        {
            id: "{\"internalId\":\"9cb6ff12fb81d5cd585d45ce555565a410036da6\",\"externalId\":\"amount\"}",
            type: "amount",
            title: "services.field_amount",
            validate: {isRequired: true, regExp: "^\\d+(\\.\\d+)?$"},
            isReadOnly: false,
            value: null
        },
        {
            id: "{\"internalId\":\"001517ee5d3d0c7f4481ec2cd77c6aefd2fa802e\",\"externalId\":\"currency\"}",
            type: "list",
            title: "Currency",
            validate: {isRequired:false},
            isReadOnly: false,
            items: [
                {
                    label: "UAH",
                    value: 980
                },
                {
                    label: "USD",
                    value: 840
                },
                {
                    label: "EUR",
                    value: 978
                },
                {
                    label: "RUB",
                    value: 643
                },
                {
                    label: "CHF",
                    value: 756
                }
            ],
            defaultValue: 0,
            value: 980
        }
    ],
    errors:{}
};

const paymentServiceValuesStub = {
    "{\"internalId\":\"b2153cba4785cc74af040a0969a8c5831739c067\",\"externalId\":\"paymentSource\"}": 2,
    "{\"internalId\":\"8876a7a420ce069f7bbfd3035e7e1f6f7bf4253b\",\"externalId\":\"customerName\"}": "Customer name",
    "{\"internalId\":\"fecbd74c6fdfe8210f24fbaadc9f30525d65dd60\",\"externalId\":\"paymentDocumentId\"}": 1,
    "{\"internalId\":\"ee0995bcc3d29bf496e900ec8da806721ec32441\",\"externalId\":\"transferType\"}": 2,
    "{\"internalId\":\"294de6e2a8e8dffec9420e9b3ed8a3ec79353821\",\"externalId\":\"feePayer\"}": 1,
    "{\"internalId\":\"9cb6ff12fb81d5cd585d45ce555565a410036da6\",\"externalId\":\"amount\"}": '0.13',
    "{\"internalId\":\"001517ee5d3d0c7f4481ec2cd77c6aefd2fa802e\",\"externalId\":\"currency\"}": 840
};

const resultStub = [
    {
        id: "{\"internalId\":\"b2153cba4785cc74af040a0969a8c5831739c067\",\"externalId\":\"paymentSource\"}",
        type: "paymentSource",
        content: [
            {title: "DO54DMDM00000000000000000002", sourceId: 2, sourceType: "account", balance: 0, isSelected: true}
        ]
    },
    {
        id: "{\"internalId\":\"8876a7a420ce069f7bbfd3035e7e1f6f7bf4253b\",\"externalId\":\"customerName\"}",
        type: "text",
        value: "Customer name"
    },
    {
        id: "{\"internalId\":\"fecbd74c6fdfe8210f24fbaadc9f30525d65dd60\",\"externalId\":\"paymentDocumentId\"}",
        type: "text",
        value: 1
    },
    {
        id: "{\"internalId\":\"ee0995bcc3d29bf496e900ec8da806721ec32441\",\"externalId\":\"transferType\"}",
        type: "list",
        value: 2
    },
    {
        id: "{\"internalId\":\"294de6e2a8e8dffec9420e9b3ed8a3ec79353821\",\"externalId\":\"feePayer\"}",
        type: "list",
        value: 1
    },
    {
        id: "{\"internalId\":\"9cb6ff12fb81d5cd585d45ce555565a410036da6\",\"externalId\":\"amount\"}",
        type: "amount",
        value: 0.13
    },
    {
        id: "{\"internalId\":\"001517ee5d3d0c7f4481ec2cd77c6aefd2fa802e\",\"externalId\":\"currency\"}",
        type: "list",
        value: 840
    }
];

describe('preparePaymentServiceFieldsValuesForServer', () => {
    it('base', () => {
        assert.deepStrictEqual(
            preparePaymentServiceFieldsValuesForServer(paymentServiceStub, paymentServiceValuesStub),
            resultStub
        );
    });

    it('amount isn\'t number', () => {
        const paymentServiceValuesStubCopy = { ...paymentServiceValuesStub };
        paymentServiceValuesStubCopy[paymentServiceStub.fields.find(filed => filed.type === 'amount').id] = '';

        const resultStubCopy = resultStub.map(resultField => {
            if (resultField.type === 'amount') {
                resultField = {...resultField};
                resultField.value = 0;
                return resultField;
            }
            return resultField;
        });

        assert.deepStrictEqual(
            preparePaymentServiceFieldsValuesForServer(paymentServiceStub, paymentServiceValuesStubCopy),
            resultStubCopy
        );

    });
});
