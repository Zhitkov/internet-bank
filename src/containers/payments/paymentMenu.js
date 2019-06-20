import { SECONDARY_MENU_ITEM_LINK } from '../../components/menus/SecondaryMenu';

/**
 * @param {Array.<Object>} paymentServicesData
 * @param {?number} activeServiceId
 * @param {function(string, string): string} $l — localization util method
 * @return {ISecondaryMenu}
 */
export const createPaymentMenu = (paymentServicesData, activeServiceId, $l) => {
    // TODO: [dmitry.makhnev] rewrite for all


    const transfersCategory = paymentServicesData.find(
        paymentService => (paymentService.type === 'category')
            && (paymentService.title === 'services.services_group_transfers')
    );

    console.log('Build services menu from:');
    console.log(paymentServicesData);

    let transfersSubItems;
    if (transfersCategory) {
        transfersSubItems = transfersCategory.content.reduce(
            (resultTransfers, paymentService) => {
                const paymentServiceId = paymentService.id;
                const paymentServiceTitle = paymentService.title;
                // 2 — international transfer service
                // 4 — international transfer service
                //if ((paymentServiceId === 2) || (paymentServiceId === 4)) {

                // Using title instead of ID
                if ((paymentServiceTitle === 'services.transfer.international')
                    || (paymentServiceTitle === 'services.transfer.between.own')
                ) {
                    resultTransfers.push({
                        //isActive: paymentServiceId === activeServiceId,
                        isActive: false,
                        id: paymentServiceId,
                        type: SECONDARY_MENU_ITEM_LINK,
                        label: $l('payment-services', paymentService.title),
                        href: `/history/payments/${paymentServiceId}`,
                        isDisabled: paymentServiceTitle === 'services.transfer.accounts'
                    });
                }
                return resultTransfers;
            },
            []
        );
    }

    return {
        items: [
            {
                label: $l('payment_menu', 'make_payment'),
                subItems: transfersSubItems
            }
        ]
    };
};
