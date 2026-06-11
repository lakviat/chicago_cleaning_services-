(function () {
  var params = new URLSearchParams(window.location.search);
  var fields = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

  document.querySelectorAll("[data-lead-form]").forEach(function (form) {
    fields.forEach(function (field) {
      var input = form.querySelector('[name="' + field + '"]');
      if (input) input.value = params.get(field) || "";
    });

    var landing = form.querySelector('[name="landing_page_url"]');
    if (landing) landing.value = window.location.href;

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var data = Object.fromEntries(new FormData(form).entries());
      var storedLeads = JSON.parse(localStorage.getItem("chiCleaningLeads") || "[]");
      storedLeads.push(Object.assign({ submitted_at: new Date().toISOString() }, data));
      localStorage.setItem("chiCleaningLeads", JSON.stringify(storedLeads));

      form.style.display = "none";
      var success = form.parentElement.querySelector("[data-form-success]");
      if (success) success.style.display = "block";

      /*
        When the Google Apps Script endpoint is ready, replace this local-only
        success flow with a fetch call:

        fetch("YOUR_GOOGLE_SCRIPT_URL", {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify(data)
        });
      */
    });
  });

  document.querySelectorAll("[data-accordion] .faq-item button").forEach(function (button) {
    button.addEventListener("click", function () {
      var item = button.closest(".faq-item");
      var accordion = button.closest("[data-accordion]");

      accordion.querySelectorAll(".faq-item").forEach(function (other) {
        if (other !== item) other.classList.remove("open");
      });

      item.classList.toggle("open");
    });
  });
})();
