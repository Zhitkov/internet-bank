/**
 * @param {IPaymentSourceFieldContentItem} paymentSourceFieldContentItem
 * @param {Array.<IAccountED>} accounts
 * @return {string}
 */
function createAccountPaymentSourceLabel(paymentSourceFieldContentItem, accounts) {
    const account = accounts.find(account => account.id === paymentSourceFieldContentItem.sourceId);
    return paymentSourceFieldContentItem.title
        + ' ' + account.currencyName
        + ' ' + paymentSourceFieldContentItem.balance.toFixed(2);
}


/**
 * @param {IPaymentServiceFieldBase} paymentServiceField
 * @return {number|string}
 */
function resolveBaseValue(paymentServiceField) {
    let resultValue = paymentServiceField.value;

    if (paymentServiceField.value != null) {
        resultValue = paymentServiceField.value;
    }

    if ((resultValue == null) && (paymentServiceField.defaultValue != null)) {
        resultValue = paymentServiceField.defaultValue;
    }

    return resultValue;
}

/**
 * @param {IPaymentServiceFieldBase} paymentServiceField
 * @return {number|string}
 */
function resolveListInitialValue(paymentServiceField) {
    const resultValue = resolveBaseValue(paymentServiceField);

    // if we don't have any value, use first item value
    if (resultValue == null) {
        return paymentServiceField.items[0].value;
    }

    // if we have value, check that we have item with this value
    const item = paymentServiceField.items
        .find(item => item.value === resultValue);

    // if we don't have any item with value which was set, use first item value
    if (item == null) {
        return paymentServiceField.items[0].value;
    }

    return resultValue;
}

/**
 * @param {IPaymentServiceFieldBase} paymentServiceField
 * @return {number|string}
 */
function resolvePaymentSourceInitialValue(paymentServiceField) {
    const resultValue = resolveBaseValue(paymentServiceField);

    if (resultValue == null) {
        return paymentServiceField.content[0].sourceId;
    }

    const content = paymentServiceField.content
        .find(paymentSource => paymentSource.sourceId === resultValue);

    if (content == null) {
        return paymentServiceField.content[0].sourceId;
    }

    return resultValue;
}


/**
 * @param {IPaymentServiceED} paymentService
 * @param {Array.<IAccountED>} accounts
 * @param {function(string, string): string} $l
 * @return {{fields: Array, initialValues: {}}}
 */
export default function preparePaymentServiceFieldsForDynamicForm(paymentService, accounts, $l) {

    const fields = paymentService.fields.map(paymentServiceField => {
        switch(paymentServiceField.type) {
            case 'paymentSource':
                return {
                    ...paymentServiceField,
                    title: $l('service-field', paymentServiceField.title),
                    value: resolvePaymentSourceInitialValue(paymentServiceField),
                    content: paymentServiceField.content.map(paymentSourceItem => ({
                        ...paymentSourceItem,
                        title: createAccountPaymentSourceLabel(paymentSourceItem, accounts),
                        label: paymentSourceItem.title
                    }))
                };
            case 'list':
                return {
                    ...paymentServiceField,
                    title: $l('service-field', paymentServiceField.title),
                    value: resolveListInitialValue(paymentServiceField),
                    items: paymentServiceField.items.map(paymentServiceFieldItem => ({
                        ...paymentServiceFieldItem,
                        label: $l('service-field-item', paymentServiceFieldItem.label)
                    }))
                };
            default:
                return {
                    ...paymentServiceField,
                    title: $l('service-field', paymentServiceField.title)
                };
        }
    });

    const initialValues = fields.reduce(
        (initialValues, field) => {
            initialValues[field.id] = field.value || field.defaultValue;
            return initialValues;
        },
        {}
    );

    return {
        fields,
        initialValues
    };
}