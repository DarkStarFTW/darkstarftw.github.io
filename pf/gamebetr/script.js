const mt = new JSMTRand();

// Read URL params to auto populate fields
const urlParams = new URLSearchParams(window.location.search);
document.getElementById("serverSeedHash").value = urlParams.get('serverSeedHash');
document.getElementById("serverSeed").value = urlParams.get('serverSeed');
document.getElementById("clientSeed").value = urlParams.get('clientSeed');

function verify() {
    let serverSeedHash = document.getElementById("serverSeedHash").value;
    let serverSeed = document.getElementById("serverSeed").value;
    let clientSeed = document.getElementById("clientSeed").value;

    if (CryptoJS.SHA256(serverSeed) != serverSeedHash) {
        document.getElementById("resultBox").className = "card mt-3 bg-danger"
        document.getElementById("resultText").innerHTML = `Failed to verify: Server seed did not match the server seed hash! <br /> Got: ${CryptoJS.SHA256(serverSeed)} <br /> Expected: ${serverSeedHash}`
        return;
    }
    let hash = CryptoJS.HmacSHA256(serverSeed, clientSeed).toString();
    let PRNGSeed = parseInt(`0x${hash.substr(hash.length - 8)}`);
    mt.srand(PRNGSeed);
    document.getElementById("resultBox").className = "card mt-3 bg-success"
    document.getElementById("resultText").innerHTML = `Roll: ${mt.rand(0, 10000)}`;
}