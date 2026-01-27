export type Language = 'en' | 'hy';

export type TranslationKeys = keyof typeof translations.en;

export const translations = {
  en: {
    // Header
    'header.home': 'Home',
    'header.backToHome': 'Back to Home',

    // Trips Page
    'trips.title': 'Syunik Trips',
    'trips.subtitle': 'Befriend the mountains, temples, and nature of Syunik',
    'trips.cities_title': 'Cities and Places of Syunik',
    'trips.historical_title': 'Historical Trip Places',

    // Historical Places
    'trips.tatev_monastery': 'Tatev Monastery',
    'trips.tatev_monastery_desc': '9th-century famous monastery near Goris, registered by UNESCO',
    'trips.meghri_church': 'Meghri Mother Church',
    'trips.meghri_church_desc': 'Famous church of Southern Armenia, preserved historical monument of the 17th century.',
    'trips.zorats_karer': 'Zorats Karer',
    'trips.zorats_karer_desc': 'Archaeological complex in Sisian, 3500-year-old observatory',
    'trips.meghri_fortress': 'Meghri Fortress',
    'trips.meghri_fortress_desc': 'State palace in Meghri, a masterpiece of Armenian architecture',
    'trips.shikahogh': 'Shikahogh Reserve',
    'trips.shikahogh_desc': 'Reserve located in the southernmost part of Armenia, in Kapan region of Syunik, covering 29,505.845 hectares',
    'trips.shake_waterfall': 'Shake Waterfall',
    'trips.shake_waterfall_desc': 'Shake Waterfall is near Sisian and famous for its beautiful natural scenery and recreation places.',

    // Nature Section
    'trips.nature_title': 'Nature Wonders & Adventures',
    'trips.wings_of_tatev': 'Wings of Tatev',
    'trips.wings_of_tatev_desc': 'The world\'s longest reversible aerial tramway (5.7 km) leading to Tatev Monastery.',
    'trips.khndzoresk_bridge': 'Khndzoresk Swinging Bridge',
    'trips.khndzoresk_bridge_desc': '160-meter long bridge connecting Old and New Khndzoresk, passing over the gorge.',
    'trips.devils_bridge': 'Devil\'s Bridge',
    'trips.devils_bridge_desc': 'Natural bridge on Vorotan river with hot mineral springs.',
    'trips.ughtasar': 'Ughtasar',
    'trips.ughtasar_desc': 'Mountain at 3300m height with thousands of rock carvings (petroglyphs).',

    // Sport Section
    'trips.sport_title': 'Sport Life',
    'trips.syunik_fc': 'Syunik FC',
    'trips.syunik_fc_desc': 'Football club representing Syunik region, playing in the Armenian First League. The club is reviving Syunik\'s football traditions.',
    'trips.home_stadium_label': 'Home Stadium:',
    'trips.gandzasar_stadium_kapan': 'Gandzasar Stadium, Kapan (3500 seats)',
    'trips.stadiums_in_syunik': 'Stadiums in Syunik',
    'trips.stadium_kapan_name': 'Gandzasar Stadium',
    'trips.stadium_kapan_info': 'Capacity: 3,500 | Location: Kapan, Center',
    'trips.stadium_goris_name': 'Goris City Stadium',
    'trips.stadium_goris_info': 'Capacity: ~3,500 | Location: Goris',
    'trips.stadium_sisian_name': 'Sisian Football School Stadium',
    'trips.stadium_sisian_info': 'Capacity: 500+ | Location: Sisian, South',
    'trips.stadium_agarak_name': 'Agarak Sports Complex',
    'trips.stadium_agarak_info': 'Capacity: 3,000 | Location: Agarak',

    // Useful Info
    'trips.useful_info_title': 'Useful Information for Tourists',
    'trips.weather': 'Weather',
    'trips.weather_desc': 'Syunik has a diverse climate. Meghri is very warm (similar to subtropical), while Sisian and Goris are cooler and more humid.',
    'trips.transport': 'Transport',
    'trips.transport_desc': 'Distance from Yerevan to Syunik (Kapan) is about 300 km (4-5 hours by car). Regular minibuses also operate to all major cities.',
    'trips.cuisine': 'Cuisine',
    'trips.cuisine_desc': 'Definitely try traditional Syunik dishes: bean soups, karshm, kurkut, and mulberry vodka.',

    // Sidebar
    'trips.trip_info_title': 'Trip Information',
    'trips.select_city_msg': 'Select a city or place from the map for more information',
    'trips.kapan': 'Kapan',
    'trips.goris': 'Goris',
    'trips.meghri': 'Meghri',
    'trips.sisian': 'Sisian',
    'trips.tour_info': 'Tour Information',
    'trips.feature_historical': 'Preserved historical places',
    'trips.feature_guides': 'Professional guides',
    'trips.feature_transport': 'Transport included',
    'trips.feature_food': 'Food provided',
    'trips.feature_insurance': 'Insurance included',
    'trips.book_now': 'Book Now',
  },
  hy: {
    // Header
    'header.home': 'Գլխավոր',
    'header.backToHome': 'Վերադառնալ Գլխավոր',

    // Trips Page
    'trips.title': 'Սյունիքի ճամփորդություններ',
    'trips.subtitle': 'Ընկերացեք Սյունիքի լեռների, տաճարների և բնության հետ',
    'trips.cities_title': 'Սյունիքի քաղաքներ և վայրեր',
    'trips.historical_title': 'Պատմական ճամփորդության վայրեր',

    // Historical Places
    'trips.tatev_monastery': 'Տաթևի վանք',
    'trips.tatev_monastery_desc': '9-րդ դարի հայտնի վանք Գորիսի մոտ, Յունեսկոյի հաշվառման մեջ',
    'trips.meghri_church': 'Մեղրի Մայր Եկեղեցի',
    'trips.meghri_church_desc': 'Հարավային Հայաստանի հայտնի եկեղեցի, պահպանված պատմական հուշարձան 17-րդ դարի:',
    'trips.zorats_karer': 'Զորաց քարերը',
    'trips.zorats_karer_desc': 'Հնագիտական համալիր Սիսիանում, 3500 տարեկան պահարան',
    'trips.meghri_fortress': 'Մեղրի ամրոց',
    'trips.meghri_fortress_desc': 'Պետական պալատ Մեղրիում, հայ ճարտարապետության գլուխ',
    'trips.shikahogh': 'Շիկահողի արգելոց',
    'trips.shikahogh_desc': 'Արգելոցը գտնվում է Հայաստանի ամենահարավային մասում՝ Սյունիքի մարզի Կապանի շրջանում, զբաղեցնում է 29,505.845 հա',
    'trips.shake_waterfall': 'Շաքեի ջրվեժ',
    'trips.shake_waterfall_desc': 'Շաքեի ջրվեժը Սիսիանի մոտ է և հայտնի իր գեղեցիկ բնական տեսարանով և հանգստի վայրերով:',

    // Nature Section
    'trips.nature_title': 'Բնության Հրաշքներ և Արկածներ',
    'trips.wings_of_tatev': 'Տաթևի ճոպանուղի',
    'trips.wings_of_tatev_desc': 'Աշխարհի ամենաերկար հետադարձելի ճոպանուղին (5.7 կմ), որը տանում է դեպի Տաթևի վանք։',
    'trips.khndzoresk_bridge': 'Խնձորեսկի ճոճվող կամուրջ',
    'trips.khndzoresk_bridge_desc': '160 մետր երկարությամբ կամուրջ, որը կապում է Հին և Նոր Խնձորեսկները՝ անցնելով ձորի վրայով։',
    'trips.devils_bridge': 'Սատանի կամուրջ',
    'trips.devils_bridge_desc': 'Բնական կամուրջ Որոտան գետի վրա՝ տաք հանքային աղբյուրներով։',
    'trips.ughtasar': 'Ուղտասար',
    'trips.ughtasar_desc': '3300մ բարձրության վրա գտնվող լեռ՝ հազարավոր ժայռապատկերներով (պետրոգլիֆներ)։',

    // Sport Section
    'trips.sport_title': 'Սպորտային Կյանք',
    'trips.syunik_fc': 'Սյունիք ՖԱ (Syunik FC)',
    'trips.syunik_fc_desc': 'Սյունիքի մարզը ներկայացնող ֆուտբոլային ակումբ, որը հանդես է գալիս Հայաստանի Առաջին խմբում։ Ակումբը վերականգնում է Սյունիքի ֆուտբոլային ավանդույթները։',
    'trips.home_stadium_label': 'Տնային մարզադաշտ՝',
    'trips.gandzasar_stadium_kapan': 'Գանձասար մարզադաշտ, ք. Կապան (3500 նստատեղ)',
    'trips.stadiums_in_syunik': 'Մարզադաշտեր Սյունիքում',
    'trips.stadium_kapan_name': 'Գանձասար Մարզադաշտ',
    'trips.stadium_kapan_info': 'Տարողություն՝ 3,500 | Գտնվելու վայրը՝ ք. Կապան, կենտրոն',
    'trips.stadium_goris_name': 'Գորիսի Քաղաքային Մարզադաշտ',
    'trips.stadium_goris_info': 'Տարողություն՝ ~3,500 | Գտնվելու վայրը՝ ք. Գորիս',
    'trips.stadium_sisian_name': 'Սիսիանի Ֆուտբոլի Դպրոցի Մարզադաշտ',
    'trips.stadium_sisian_info': 'Տարողություն՝ 500+ | Գտնվելու վայրը՝ ք. Սիսիան, հարավային մաս',
    'trips.stadium_agarak_name': 'Ագարակի Մարզահամալիր',
    'trips.stadium_agarak_info': 'Տարողություն՝ 3,000 | Գտնվելու վայրը՝ ք. Ագարակ',

    // Useful Info
    'trips.useful_info_title': 'Օգտակար Տեղեկություններ Զբոսաշրջիկի Համար',
    'trips.weather': 'Եղանակ',
    'trips.weather_desc': 'Սյունիքը ունի բազմազան կլիմա։ Մեղրին շատ տաք է (նման է մերձարևադարձայինին), իսկ Սիսիանը և Գորիսը՝ ավելի զով և խոնավ։',
    'trips.transport': 'Տրանսպորտ',
    'trips.transport_desc': 'Երևանից Սյունիք (Կապան) հեռավորությունը մոտ 300 կմ է (4-5 ժամ մեքենայով)։ Գործում են նաև կանոնավոր երթուղային տաքսիներ դեպի բոլոր խոշոր քաղաքներ։',
    'trips.cuisine': 'Խոհանոց',
    'trips.cuisine_desc': 'Անպայման փորձեք Սյունիքի ավանդական ուտեստները՝ լոբով ճաշերը, քյալագյոշը, կուրկուտը և թթի օղին։',

    // Sidebar
    'trips.trip_info_title': 'Ճամփորդության տեղեկություններ',
    'trips.select_city_msg': 'Քարտեզից ընտրեք քաղաք կամ վայր ավելի շատ տեղեկության համար',
    'trips.kapan': 'Կապան',
    'trips.goris': 'Գորիս',
    'trips.meghri': 'Մեղրի',
    'trips.sisian': 'Սիսիան',
    'trips.tour_info': 'Տուրի տեղեկություններ',
    'trips.feature_historical': 'Պահպանված պատմական վայրեր',
    'trips.feature_guides': 'Պրոֆեսիոնալ ուղեղներ',
    'trips.feature_transport': 'Տրանսպորտ ներառված',
    'trips.feature_food': 'Կերակուր տրամադրված',
    'trips.feature_insurance': 'Ապահովագրում ներառված',
    'trips.book_now': 'Գրանցել Այժմ',
  },
};
