/**
 * Конструктор коллекции
 * @constructor
 */
function Collection() {
    "use strict";
    this._values = [];
}

// Методы коллекции
Collection.prototype.values = function () {
    "use strict";
    return this._values;
};

Collection.prototype.count = function () {
    "use strict";
    return this._values.length;
};

Collection.prototype.at = function (index) {
    "use strict";
    return this._values[index - 1] || null;
};

Collection.prototype.removeAt = function (index) {
    "use strict";
    if ("undefined" === typeof this._values[index - 1]) {
        return false;
    } else {
        this._values.splice(index - 1, 1);
        return true;
    }
};

Collection.prototype.append = function (value) {
    "use strict";
    if (value instanceof this.constructor) {
        this._values = this._values.concat(value.values());
    } else {
        this._values.push(value);
    }
};

/**
 * Создание коллекции из массива значений
 */
Collection.from = function (values) {
    "use strict";
    var obj = new Collection();
    obj._values = values;
    return obj;
};

module.exports = Collection;