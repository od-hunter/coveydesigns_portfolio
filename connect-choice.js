(function () {
  var EMAIL = "mailto:covenantzechariah001@gmail.com";
  var EMAIL_HIRE = "mailto:covenantzechariah001@gmail.com?subject=Hire%20me";
  var CONTRA =
    "https://contra.com/covenant_f2dl8ook?referralExperimentNid=DEFAULT_REFERRAL_PROGRAM&referrerUsername=covenant_f2dl8ook";
  var SELECTOR = ".connect-btn, .footer-connect-btn";
  var dialog = null;
  var emailLink = null;
  var lastTrigger = null;

  function ensureDialog() {
    if (dialog) return dialog;

    dialog = document.createElement("div");
    dialog.className = "connect-choice";
    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-modal", "true");
    dialog.setAttribute("aria-labelledby", "connect-choice-title");
    dialog.hidden = true;
    dialog.innerHTML =
      '<div class="connect-choice__backdrop" data-close="true"></div>' +
      '<div class="connect-choice__panel">' +
      '<p id="connect-choice-title" class="connect-choice__title">How would you like to connect?</p>' +
      '<div class="connect-choice__options">' +
      '<a class="connect-choice__option connect-choice__option--email" data-action="email" href="' +
      EMAIL +
      '">Send an email</a>' +
      '<a class="connect-choice__option connect-choice__option--contra" data-action="contra" href="' +
      CONTRA +
      '" target="_blank" rel="noopener noreferrer">Hire me on Contra</a>' +
      "</div>" +
      '<button type="button" class="connect-choice__close" data-close="true">Close</button>' +
      "</div>";

    document.body.appendChild(dialog);
    emailLink = dialog.querySelector('[data-action="email"]');

    dialog.addEventListener("click", function (event) {
      if (event.target.closest("[data-close]")) {
        closeDialog();
        return;
      }
      var option = event.target.closest("[data-action]");
      if (option) closeDialog();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && dialog && !dialog.hidden) closeDialog();
    });

    return dialog;
  }

  function openDialog(trigger) {
    ensureDialog();
    lastTrigger = trigger || null;

    var isHire =
      trigger &&
      (trigger.classList.contains("about-hire-btn") ||
        /hire\s*me/i.test(trigger.textContent || ""));
    emailLink.href = isHire ? EMAIL_HIRE : EMAIL;

    dialog.hidden = false;
    document.body.classList.add("connect-choice-open");
    var first = dialog.querySelector(".connect-choice__option");
    if (first) first.focus();
  }

  function closeDialog() {
    if (!dialog || dialog.hidden) return;
    dialog.hidden = true;
    document.body.classList.remove("connect-choice-open");
    if (lastTrigger && typeof lastTrigger.focus === "function") lastTrigger.focus();
  }

  document.addEventListener(
    "click",
    function (event) {
      var trigger = event.target.closest(SELECTOR);
      if (!trigger) return;
      if (trigger.closest(".connect-choice")) return;
      event.preventDefault();
      openDialog(trigger);
    },
    true
  );
})();
