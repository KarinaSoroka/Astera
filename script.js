const form = document.getElementById("birthChartForm");
const birthdate = document.getElementById("birthdate");
const result = document.getElementById("zodiac-result");

const horoscopeResult = document.getElementById("horoscope-result");
const apiCredit = document.getElementById("api-credit");

function getZodiacSign(day, month){

    let zodiacSign = "";

    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) {
        zodiacSign = "Aries";
    } else if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) {
        zodiacSign = "Taurus";
    } else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) {
        zodiacSign = "Gemini";
    } else if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) {
        zodiacSign = "Cancer";
    } else if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) {
        zodiacSign = "Leo";
    } else if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) {
        zodiacSign = "Virgo";
    } else if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) {
        zodiacSign = "Libra";
    } else if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) {
        zodiacSign = "Scorpio";
    } else if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) {
        zodiacSign = "Sagittarius";
    } else if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) {
        zodiacSign = "Capricorn";
    } else if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) {
        zodiacSign = "Aquarius";
    } else {
        zodiacSign = "Pisces";
    }

    return zodiacSign;
}

async function getHoroscope(zodiacSign) {

    try {

        const response = await fetch(
            "https://sigastra.com/api/v1/daily?lang=en&sign=" +
            zodiacSign.toLowerCase()
        );

        const data = await response.json();

        horoscopeResult.textContent = data.items[0].text;

        apiCredit.textContent = data.attribution.text;
        apiCredit.href = data.attribution.localizedHref;

    } catch (error) {

        horoscopeResult.textContent =
            "Sorry, the horoscope could not be loaded.";
    }
}
form.addEventListener("submit", function(event) {

    event.preventDefault();

    const date = new Date(birthdate.value + "T00:00:00");

    const day = date.getDate();
    const month = date.getMonth() + 1;

    const zodiacSign = getZodiacSign(day, month);

        result.textContent = "Your zodiac sign is " + zodiacSign + ".";

    result.classList.add("show-result");
     getHoroscope(zodiacSign);
});
// jQuery click() and slideToggle() methods based on
// W3Schools jQuery Effects (2026)
// https://www.w3schools.com/jquery/jquery_hide_show.asp

$(document).ready(function() {

    $("#birth-chart-info-btn").click(function() {

        $("#birth-chart-info").slideToggle();

    });

});