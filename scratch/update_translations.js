const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, '../messages/en.json');
const hyPath = path.join(__dirname, '../messages/hy.json');

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const hyData = JSON.parse(fs.readFileSync(hyPath, 'utf8'));

const extraDataEN = {
    tatev: { height: "1500m", location: "Tatev Village, Syunik", more: "Tatev Monastery is a 9th-century Armenian Apostolic monastery." },
    karahunj: { height: "1770m", location: "Sisian, Syunik", more: "Often called the Armenian Stonehenge, this prehistoric archaeological site consists of hundreds of vertically set stones." },
    khndzoresk: { height: "1580m", location: "Khndzoresk Village, Syunik", more: "Famous for its swinging bridge and ancient cave village where people lived until the 1950s." },
    shake: { height: "1700m", location: "Sisian, Syunik", more: "With a height of 18 meters, Shake is one of the most beautiful waterfalls in Armenia." },
    khustup: { height: "3201m", location: "Kapan, Syunik", more: "Mount Khustup is a prominent peak in the Zangezur Mountains and is associated with Armenian national hero Garegin Nzhdeh." },
    vorotnavank: { height: "1400m", location: "Vaghatin, Syunik", more: "A monastic complex built in 1000 AD by Queen Shahandukht." },
    goris_caves: { height: "1370m", location: "Old Goris, Syunik", more: "A network of natural and man-made caves that were used as dwellings for centuries." },
    halidzor: {
        height: "1600m",
        location: "Kapan, Syunik",
        more: "Halidzor Fortress served as a key defensive stronghold in the early 18th century."
    },
    vahanavank: {
        height: "1000m",
        location: "Kapan, Syunik",
        more: "Founded in the 10th century, it was the religious center for the kings of Syunik."
    },
    devil_bridge: {
        height: "1000m",
        location: "Vorotan Gorge, Syunik",
        more: "A natural travertine bridge over the Vorotan River, featuring warm mineral springs."
    },
    meghri_viewpoint: {
        height: "1500m",
        location: "Meghri, Syunik",
        more: "Offers stunning panoramic views of the city of Meghri and the Araks River valley."
    },
    melik_tangi_bridge: {
        height: "1400m",
        location: "Vorotan River, Syunik",
        more: "A historic stone bridge built in 1853 by Melik Tangi."
    },
};

const extraDataHY = {
    tatev: { height: "1500մ", location: "Տաթև գյուղ, Սյունիք", more: "Տաթևի վանքը 9-րդ դարի հայ առաքելական վանական համալիր է։" },
    karahunj: { height: "1770մ", location: "Սիսիան, Սյունիք", more: "Հաճախ անվանվում է Հայկական Սթոունհենջ, բաղկացած է հարյուրավոր ուղղահայաց կանգնեցված քարերից։" },
    khndzoresk: { height: "1580մ", location: "Խնձորեսկ, Սյունիք", more: "Հայտնի է իր ճոճվող կամրջով և հին քարանձավային գյուղով։" },
    shake: { height: "1700մ", location: "Սիսիան, Սյունիք", more: "18 մետր բարձրությամբ Շաքին Հայաստանի ամենագեղեցիկ ջրվեժներից մեկն է։" },
    khustup: { height: "3201մ", location: "Կապան, Սյունիք", more: "Խուստուփ լեռը Զանգեզուրի լեռնաշղթայի հայտնի գագաթ է՝ կապված Գարեգին Նժդեհի անվան հետ։" },
    vorotnavank: { height: "1400մ", location: "Վաղատին, Սյունիք", more: "Վանական համալիր՝ կառուցված 1000 թվականին Շահանդուխտ թագուհու կողմից։" },
    goris_caves: { height: "1370մ", location: "Հին Գորիս, Սյունիք", more: "Բնական և արհեստական քարանձավների ցանց, որոնք դարեր շարունակ օգտագործվել են որպես կացարաններ։" },
    halidzor: { height: "1600մ", location: "Կապան, Սյունիք", more: "Հալիձորի բերդը առանցքային պաշտպանական դեր է ունեցել 18-րդ դարի սկզբին։" },
    vahanavank: { height: "1000մ", location: "Կապան, Սյունիք", more: "Հիմնադրվել է 10-րդ դարում, եղել է Սյունիքի թագավորների կրոնական կենտրոնը։" },
    devil_bridge: { height: "1000մ", location: "Որոտանի կիրճ, Սյունիք", more: "Բնական կամուրջ Որոտան գետի վրա՝ հայտնի իր տաք հանքային աղբյուրներով։" },
    meghri_viewpoint: { height: "1500մ", location: "Մեղրի, Սյունիք", more: "Առաջարկում է Մեղրի քաղաքի և Արաքս գետի հովտի համայնապատկերային տեսարաններ։" },
    melik_tangi_bridge: { height: "1400մ", location: "Որոտան գետ, Սյունիք", more: "Պատմական քարե կամուրջ, կառուցված 1853 թվականին Մելիք Թանգիի կողմից։" },
};

function addFields(data, langData, lang) {
    const trips = data.trips;
    const newTrips = {};
    for (const key in trips) {
        newTrips[key] = trips[key];

        if (key.startsWith('attraction_') && key.endsWith('_desc')) {
            const baseKey = key.slice(0, -5); // remove _desc
            const attractionId = baseKey.replace('attraction_', '');

            const info = langData[attractionId] || {
                height: lang === 'en' ? "Unknown" : "Անհայտ",
                location: lang === 'en' ? "Syunik Region" : "Սյունիքի մարզ",
                more: lang === 'en' ? "More details coming soon." : "Լրացուցիչ տեղեկությունները շուտով:"
            };

            newTrips[`${baseKey}_height`] = info.height;
            newTrips[`${baseKey}_location`] = info.location;
            newTrips[`${baseKey}_more`] = info.more;
        }
    }
    data.trips = newTrips;
    return data;
}

const newEnData = addFields(enData, extraDataEN, 'en');
const newHyData = addFields(hyData, extraDataHY, 'hy');

fs.writeFileSync(enPath, JSON.stringify(newEnData, null, 4));
fs.writeFileSync(hyPath, JSON.stringify(newHyData, null, 4));

console.log("Translations updated!");
