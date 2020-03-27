function calculate() {
    var multiplier = document.getElementById("multiplier").value;
    var winprob = document.getElementById("winprob").value;
    var lossback = document.getElementById("lossback").value;
    var count = document.getElementById("count").value;
    var trials = document.getElementById("trials").value;

    var profitAmounts = new Array();

    for (var i = 0; i < trials; i++) {
        var sessionProfit = 0;
        for (var j = 0; j < count; j++) {
            if (winprob/100 > Math.random()) {
                sessionProfit += (multiplier - 1);
            } else {
                sessionProfit -= (1 - lossback/100);
            }
        }
        profitAmounts.push(sessionProfit);
    }

    var profitCount = 0;
    var lossCount = 0;
    var totalProfit = 0;
    var totalWins = 0;
    var totalLosses = 0;
    for (var i = 0; i < profitAmounts.length; i++) {
        if (profitAmounts[i] > 0) {
            profitCount++;
            totalWins += profitAmounts[i];
        } else {
            lossCount++;
            totalLosses += profitAmounts[i];
        }
        totalProfit += profitAmounts[i];
    }

    document.getElementById("result").innerHTML = "With " + trials + " simulations, " + profitCount + " runs ended in profit and " + lossCount + " ended with losses, averaging a profit of " + totalProfit/(profitCount+lossCount) + ". The loss amount averaged " + totalLosses/lossCount + " and the win amount averaged " + totalWins/lossCount;
}