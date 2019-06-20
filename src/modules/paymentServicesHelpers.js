/**
 * @typedef {Object} IPaymentServiceFieldApiED
 * @property {string} id
 * @property {string|number} value
 * @property {Array.<IPaymentSourceFieldContentItem>} [content]
 */


/**
 * @param {IPaymentServiceED} paymentService
 * @param {Object.<string, number|string>} values
 * @return {Array.<IPaymentServiceFieldApiED>}
 */
export const preparePaymentServiceFieldsValuesForServer = (paymentService, values) =>
    paymentService.fields.map(field => {

        const resultApiField = {
            id: field.id,
            type: field.type
        };
        const fieldValue = values[field.id];

        switch (field.type) {
            case 'paymentSource':
                resultApiField.content = [
                    field.content.find(paymentSourceFieldContent =>
                        paymentSourceFieldContent.sourceId === fieldValue
                    )
                ];
                resultApiField.content[0].isSelected = true;
                break;

            case 'amount':
                let amountAsNumber = parseFloat(fieldValue);
                if (isNaN(amountAsNumber)) {
                    amountAsNumber = 0;
                }
                resultApiField.value = amountAsNumber;
                break;

            case 'OTP':
            case 'list':
            case 'text':
                resultApiField.value = fieldValue;
                break;
        }

        return resultApiField;
    });