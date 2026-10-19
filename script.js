const birthChartForm = document.getElementById("birthChartForm");
const birthdate = document.getElementById("birthdate");
const zodiacResult = document.getElementById("zodiac-result");
const horoscopeResult = document.getElementById("horoscope-result");
const apiCredit = document.getElementById("api-credit");
const horoscopePeriod = document.getElementById("horoscope-period");
const horoscopeHeading = document.getElementById("horoscope-heading");
const readingResult = document.getElementById("reading-result");


// Prevent users from selecting a future birth date
// Based on W3Schools JavaScript Date Get Methods and Input Date max Property (2026)
// https://www.w3schools.com/js/js_date_methods.asp
// https://www.w3schools.com/jsref/prop_date_max.asp

const today = new Date();

const maximumDate =
    today.getFullYear() + "-" +
    String(today.getMonth() + 1).padStart(2, "0") + "-" +
    String(today.getDate()).padStart(2, "0");

birthdate.max = maximumDate;


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


async function getHoroscope(zodiacSign, period) {

    horoscopeResult.textContent = "Loading your horoscope...";

    apiCredit.textContent = "";
    apiCredit.removeAttribute("href");

    try {

        // API request based on Sigastra documentation
        // https://sigastra.com/partners/api

        const response = await fetch(
            "https://sigastra.com/api/v1/" + period +
            "?lang=en&sign=" + zodiacSign.toLowerCase()
        );

        if (!response.ok) {

            const errorDetails = await response.text();

            throw new Error(
                "API error " + response.status + ": " + errorDetails
            );

        }

        const data = await response.json();

        horoscopeResult.textContent = data.items[0].text;

        apiCredit.textContent = data.attribution.text;
        apiCredit.href = data.attribution.localizedHref;

    } catch (error) {

        console.error("Horoscope error:", error);

        horoscopeResult.textContent =
            "Sorry, your horoscope is temporarily unavailable. Please try again later.";

    }
}


birthChartForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const date = new Date(birthdate.value + "T00:00:00");

    const day = date.getDate();
    const month = date.getMonth() + 1;

    const zodiacSign = getZodiacSign(day, month);
    const selectedPeriod = horoscopePeriod.value;

    if (selectedPeriod === "daily") {
        horoscopeHeading.textContent = "Today's Horoscope";
    } else if (selectedPeriod === "weekly") {
        horoscopeHeading.textContent = "Weekly Horoscope";
    } else if (selectedPeriod === "monthly") {
        horoscopeHeading.textContent = "Monthly Horoscope";
    }

    // Use the visitor's name to personalise the reading
    const userName = document.getElementById("name").value.trim();

    zodiacResult.textContent =
        userName + ", your zodiac sign is " + zodiacSign + ".";

    readingResult.hidden = false;

    getHoroscope(zodiacSign, selectedPeriod);

});


// jQuery click() and slideToggle() methods based on
// W3Schools jQuery Effects (2026)
// https://www.w3schools.com/jquery/jquery_hide_show.asp

$(document).ready(function() {

    $("#birth-chart-info-btn").click(function() {

        // Check whether the information panel is expanded
        const isExpanded = $(this).attr("aria-expanded") === "true";

        // Update the button's accessibility state
        $(this).attr("aria-expanded", String(!isExpanded));

        $("#birth-chart-info").slideToggle();

    });

});
