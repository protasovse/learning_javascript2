/**
 * @param {Function[]} operations
 * @param {Function} callback
 */
module.exports = function (operations, callback) {
    'use strict';
    let counter = operations.length;

    if (!counter) {
        callback(null, []);
        return;
    }

    let result = [];
    let hasError = false;

    operations.forEach((op, i) => {
        op((err, data) => {

            if (hasError) {
                return;
            }

            if (err) {
                callback(err);
                hasError = true;
                return;
            }

            result[i] = data;
            if (--counter === 0) {
                callback(null, result);
            }
        });
    });
};