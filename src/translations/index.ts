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
    'trips.old_khndzoresk': 'Old Khndzoresk',
    'trips.old_khndzoresk_desc': 'Ancient cave village carved into cliff faces, abandoned in the 1950s — a stunning ghost town in the gorge.',
    'trips.khndzoresk_caves': 'Khndzoresk Caves',
    'trips.khndzoresk_caves_desc': 'Hundreds of natural and man-made caves used as dwellings for centuries, connected by the famous swinging bridge.',
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
    'header.backToHome': 'Վերադառնալ գլխավոր էջ',

    // Trips Page
    'trips.title': 'Ճամփորդություններ Սյունիքում',
    'trips.subtitle': 'Բացահայտեք Սյունիքի լեռները, վանքերը և բնությունը',
    'trips.cities_title': 'Սյունիքի քաղաքներն ու տեսարժան վայրերը',
    'trips.historical_title': 'Պատմական տեսարժան վայրեր',

    // Historical Places
    'trips.tatev_monastery': 'Տաթևի վանք',
    'trips.tatev_monastery_desc':
      '9-րդ դարի հայտնի վանական համալիր Գորիսի մոտակայքում, ներառված ՅՈՒՆԵՍԿՕ-ի համաշխարհային ժառանգության ցանկում',

    'trips.meghri_church': 'Մեղրիի Մայր եկեղեցի',
    'trips.meghri_church_desc':
      'Հարավային Հայաստանի հայտնի եկեղեցի և 17-րդ դարի պահպանված պատմական հուշարձան',

    'trips.zorats_karer': 'Զորաց քարեր',
    'trips.zorats_karer_desc':
      'Հնագիտական համալիր Սիսիանի մոտակայքում՝ շուրջ 3500 տարվա պատմություն ունեցող աստղադիտարան',

    'trips.meghri_fortress': 'Մեղրիի բերդ',
    'trips.meghri_fortress_desc':
      'Մեղրիում գտնվող պատմական բերդ, որը համարվում է հայկական ճարտարապետության արժեքավոր հուշարձան',

    'trips.old_khndzoresk': 'Հին Խնձորեսկ',
    'trips.old_khndzoresk_desc':
      'Ժայռերի մեջ փորված հնագույն քարանձավային բնակավայր, որը լքվել է 1950-ական թվականներին և այսօր ներկայացնում է ձորի յուրահատուկ պատմական միջավայրը',

    'trips.khndzoresk_caves': 'Խնձորեսկի քարանձավներ',
    'trips.khndzoresk_caves_desc':
      'Հարյուրավոր բնական և արհեստական քարանձավներ, որոնք դարեր շարունակ օգտագործվել են որպես բնակատեղիներ և կապված են հայտնի ճոճվող կամրջով',

    'trips.shikahogh': 'Շիկահողի արգելոց',
    'trips.shikahogh_desc':
      'Արգելոց Հայաստանի հարավում՝ Սյունիքի մարզի Կապանի տարածաշրջանում, որը զբաղեցնում է 29,505.845 հեկտար տարածք',

    'trips.shake_waterfall': 'Շաքեի ջրվեժ',
    'trips.shake_waterfall_desc':
      'Շաքեի ջրվեժը գտնվում է Սիսիանի մոտ և հայտնի է իր գեղեցիկ բնությամբ ու հանգստի հնարավորություններով',

    // Nature Section
    'trips.nature_title': 'Բնության հրաշքներ և արկածներ',

    'trips.wings_of_tatev': 'Տաթևի ճոպանուղի',
    'trips.wings_of_tatev_desc':
      'Աշխարհի ամենաերկար հետադարձելի ճոպանուղին՝ 5.7 կմ երկարությամբ, որը տանում է դեպի Տաթևի վանք',

    'trips.khndzoresk_bridge': 'Խնձորեսկի ճոճվող կամուրջ',
    'trips.khndzoresk_bridge_desc':
      '160 մետր երկարությամբ կամուրջ, որը կապում է Հին և Նոր Խնձորեսկները՝ անցնելով ձորի վրայով',

    'trips.devils_bridge': 'Սատանի կամուրջ',
    'trips.devils_bridge_desc':
      'Որոտան գետի վրա գտնվող բնական կամուրջ՝ շրջակայքում գտնվող տաք հանքային աղբյուրներով',

    'trips.ughtasar': 'Ուղտասար',
    'trips.ughtasar_desc':
      '3300 մետր բարձրությամբ լեռ՝ հազարավոր ժայռապատկերներով (պետրոգլիֆներով)',

    // Sport Section
    'trips.sport_title': 'Սպորտային կյանք',

    'trips.syunik_fc': 'Սյունիք ՖԱ (Syunik FC)',
    'trips.syunik_fc_desc':
      'Սյունիքի մարզը ներկայացնող ֆուտբոլային ակումբ, որը հանդես է գալիս Հայաստանի Առաջին խմբում։ Ակումբը վերականգնում է Սյունիքի ֆուտբոլային ավանդույթները։',

    'trips.home_stadium_label': 'Տնային մարզադաշտ՝',
    'trips.gandzasar_stadium_kapan':
      'Գանձասար մարզադաշտ, Կապան (3500 նստատեղ)',

    'trips.stadiums_in_syunik': 'Մարզադաշտեր Սյունիքում',

    'trips.stadium_kapan_name': 'Գանձասար մարզադաշտ',
    'trips.stadium_kapan_info':
      'Տարողություն՝ 3,500 | Գտնվելու վայրը՝ Կապան, կենտրոն',

    'trips.stadium_goris_name': 'Գորիսի քաղաքային մարզադաշտ',
    'trips.stadium_goris_info':
      'Տարողություն՝ մոտ 3,500 | Գտնվելու վայրը՝ Գորիս',

    'trips.stadium_sisian_name': 'Սիսիանի ֆուտբոլի դպրոցի մարզադաշտ',
    'trips.stadium_sisian_info':
      'Տարողություն՝ 500+ | Գտնվելու վայրը՝ Սիսիան, հարավային հատված',

    'trips.stadium_agarak_name': 'Ագարակի մարզահամալիր',
    'trips.stadium_agarak_info':
      'Տարողություն՝ 3,000 | Գտնվելու վայրը՝ Ագարակ',

    // Useful Info
    'trips.useful_info_title': 'Օգտակար տեղեկություններ զբոսաշրջիկների համար',

    'trips.weather': 'Եղանակ',
    'trips.weather_desc':
      'Սյունիքն ունի բազմազան կլիմա։ Մեղրին շատ տաք է՝ մերձարևադարձային կլիմային մոտ, իսկ Սիսիանն ու Գորիսը՝ ավելի զով և խոնավ։',

    'trips.transport': 'Տրանսպորտ',
    'trips.transport_desc':
      'Երևանից մինչև Սյունիք՝ Կապան, հեռավորությունը մոտ 300 կմ է (մեքենայով՝ 4–5 ժամ)։ Կանոնավոր երթուղային տրանսպորտ է գործում նաև դեպի մարզի բոլոր խոշոր քաղաքները։',

    'trips.cuisine': 'Խոհանոց',
    'trips.cuisine_desc':
      'Անպայման փորձեք Սյունիքի ավանդական ուտեստները՝ լոբով ուտեստներ, քյալագյոշ, կուրկուտ և թթի օղի։',

    // Sidebar
    'trips.trip_info_title': 'Ճամփորդության մասին',

    'trips.select_city_msg':
      'Լրացուցիչ տեղեկությունների համար քարտեզից ընտրեք քաղաք կամ տեսարժան վայր',

    'trips.kapan': 'Կապան',
    'trips.goris': 'Գորիս',
    'trips.meghri': 'Մեղրի',
    'trips.sisian': 'Սիսիան',

    'trips.tour_info': 'Տուրի մասին',

    'trips.feature_historical': 'Պահպանված պատմական վայրեր',
    'trips.feature_guides': 'Պրոֆեսիոնալ ուղեկցորդներ',
    'trips.feature_transport': 'Տրանսպորտը ներառված է',
    'trips.feature_food': 'Սնունդը ներառված է',
    'trips.feature_insurance': 'Ապահովագրությունը ներառված է',

    'trips.book_now': 'Ամրագրել հիմա',
  },
};
