import json

def update_json(filepath, data):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = json.load(f)
    
    # Merge the new data
    for key, val in data.items():
        if key not in content:
            content[key] = val
        else:
            content[key].update(val)

    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(content, f, ensure_ascii=False, indent=4)

en_add = {
    "booking_flow": {
        "trip_to": "Trip to",
        "step_1": "1. Explore",
        "step_2": "2. Dates",
        "step_3": "3. Details",
        "step_4": "4. Confirm",
        "where_to_stay": "Where to Stay in",
        "when_going": "When are you going?",
        "select_dates": "Select your check-in and check-out dates for",
        "guest_details": "Guest Details",
        "enter_info": "Please enter your information to secure the booking.",
        "first_name": "First Name",
        "last_name": "Last Name",
        "email_address": "Email Address",
        "phone_number": "Phone Number",
        "booking_confirmed": "Booking Confirmed!",
        "thank_you": "Thank you",
        "trip_to_lower": "Your trip to",
        "from": "from",
        "to": "to",
        "has_been_booked": "has been securely booked.",
        "back_to_trips": "Back to Trips",
        "back": "Back",
        "continue_to_dates": "Continue to Dates",
        "continue_to_details": "Continue to Details",
        "confirm_booking": "Confirm Booking",
        "no_hotels": "No hotels found for this city."
    },
    "hotel_info": {
        "where_to_stay": "🏨 Where to Stay"
    },
    "attraction_details": {
        "back_to_trips": "Back to Trips",
        "most_visited": "Most Visited Attraction",
        "more_information": "More Information",
        "more_from_syunik": "More from Syunik"
    }
}

hy_add = {
    "booking_flow": {
        "trip_to": "Ուղևորություն դեպի",
        "step_1": "1. Ուսումնասիրել",
        "step_2": "2. Ամսաթվեր",
        "step_3": "3. Մանրամասներ",
        "step_4": "4. Հաստատել",
        "where_to_stay": "Որտեղ մնալ",
        "when_going": "Ե՞րբ եք մեկնում:",
        "select_dates": "Ընտրեք ձեր ժամանման և մեկնման ամսաթվերը՝",
        "guest_details": "Հյուրի տվյալներ",
        "enter_info": "Խնդրում ենք մուտքագրել ձեր տվյալները ամրագրումն ապահովելու համար:",
        "first_name": "Անուն",
        "last_name": "Ազգանուն",
        "email_address": "Էլ. հասցե",
        "phone_number": "Հեռախոսահամար",
        "booking_confirmed": "Ամրագրումը հաստատված է:",
        "thank_you": "Շնորհակալություն",
        "trip_to_lower": "Ձեր ուղևորությունը դեպի",
        "from": "սկսած",
        "to": "մինչև",
        "has_been_booked": "հաջողությամբ ամրագրված է:",
        "back_to_trips": "Վերադառնալ Ուղևորություններ",
        "back": "Հետ",
        "continue_to_dates": "Շարունակել դեպի Ամսաթվեր",
        "continue_to_details": "Շարունակել դեպի Մանրամասներ",
        "confirm_booking": "Հաստատել ամրագրումը",
        "no_hotels": "Այս քաղաքում հյուրանոցներ չեն գտնվել:"
    },
    "hotel_info": {
        "where_to_stay": "🏨 Որտեղ մնալ"
    },
    "attraction_details": {
        "back_to_trips": "Վերադառնալ Ուղևորություններ",
        "most_visited": "Ամենաշատ այցելվող վայր",
        "more_information": "Լրացուցիչ տեղեկություն",
        "more_from_syunik": "Ավելին Սյունիքից"
    }
}

update_json('messages/en.json', en_add)
update_json('messages/hy.json', hy_add)
