(() => {
    'use strict';

    // /*
    function applyForVisa(documents) {
        console.log('Обработка документов...');
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (documents.ok) {
                    let visa = {to: 'USA'};
                    resolve(visa);
                } else {
                    reject('Хуй вам визу...');
                }
            }, 4000);
        });
    }

    function getVisa(visa) {
        console.info(`Виза «в ${visa.to}» получена!`);
        return new Promise(resolve => {
            setTimeout(resolve, 2000, visa);
        });
    }

    function bookHotel(visa) {
        console.log(`начинаем бронировать отель в ${visa.to}...`);
        return Promise.resolve('New York');
    }

    function byTickets(city) {
        console.log(`покупаем билеты в ${city}...`);
    }

    function cancelVacation(error) {
        console.error(error, 'отменяем отпуск...');
    }


    applyForVisa({ok: true})
        .then(getVisa)
        .then(bookHotel)
        .then(byTickets)
        .catch(cancelVacation);
})();