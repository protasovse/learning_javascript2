(() => {
    'use strict';
    // Код валидации формы

    window.validateForm = function (setting) {
        const validator = new Validators(setting);
        const form = document.getElementById(setting.formId);

        form.addEventListener('blur', e => validator.validate(e.target), true);
        form.addEventListener('focus', e => validator.unValidate(e.target), true);
        form.addEventListener('submit', event => {
            let validateMapping = Array.from(form.getElementsByTagName("INPUT")).map(el => validator.validate(el));
            if (validateMapping.every(x => x)) {
                form.classList.remove(setting.formInvalidClass);
                form.classList.add(setting.formValidClass);
            } else {
                form.classList.add(setting.formInvalidClass);
                form.classList.remove(setting.formValidClass);
            }
            event.preventDefault();
        });
    };

    function Validators(setting) {
        this.setting = setting;
        this.validate = (el) => {
            if (el.tagName === 'INPUT' && (
                ('required' in el.dataset && !this.__required(el)) ||
                ('validator' in el.dataset && !this['__' + el.dataset.validator](el))
            )) {
                el.classList.add(this.setting.inputErrorClass);
                return false;
            }
            return true;
        };

        this.unValidate = (el) => {
            if (el.tagName === 'INPUT') {
                el.classList.remove(this.setting.inputErrorClass);
            }
        };

        this.__required = (elem) => {
            return !!elem.value;
        };

        this.__letters = (elem) => {
            return !elem.value || /^[a-zа-яё]+$/i.test(elem.value);
        };

        this.__regexp = (elem) => {
            if (!elem.value) {
                return true;
            }
            if (!('validatorPattern' in elem.dataset)) {
                return false;
            }
            let regexp = new RegExp(elem.dataset.validatorPattern);
            return regexp.test(elem.value);
        };

        this.__number = (elem) => {
            if (!elem.value) {
                return true;
            }
            let min = isNaN(+elem.dataset.validatorMin) ? -Infinity : +elem.dataset.validatorMin;
            let max = isNaN(+elem.dataset.validatorMax) ? +Infinity : +elem.dataset.validatorMax;
            let v = +elem.value;
            return /^\-?\d+$/.test(elem.value) && min <= v && v <= max;
        };
    }

})();