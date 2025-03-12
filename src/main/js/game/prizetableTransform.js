define(function (require) {
    var SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
    var resources = require('skbJet/component/pixiResourceLoader/pixiResourceLoader');

    return (data) => ({
        cells: {
            prizeLevel: data.division,
            description: resources.i18n.Paytable.descriptions[data.division - 1],
            prizeValue: SKBeInstant.formatCurrency(data.prize).formattedAmount
        },
    });
});
