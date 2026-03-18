/** @type {import('stylelint').Config} */
export default {
    extends: ["stylelint-model-standard"],
    plugins: ["stylelint-order"],
    rules: {
        "order/properties-alphabetical-order": true,
    },
};
