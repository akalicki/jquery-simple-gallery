$(document).ready(function() {
    $(".section-photos .display-image").gallery({
        source: ".section-photos img",
        selectClass: "shown",
        waitTime: 7000
    });
});