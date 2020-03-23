window.addEventListener("DOMContentLoaded", () => {
  fetch("https://vendorlist.consensu.org/vendorlist.json")
    .then(res => {
      return res.json();
    })
      .then(res => {
        let list = "<h1>GDPR consent</h1>";
        res.vendors.forEach(e => {
          list += 
          `<li>
              <span class="vendor-name">${e.name}</span> 
              <a href="${e.policyUrl}">Privacy Policy</a>
              <form>
                <input type="checkbox" name="${e.id}" class="checkbox">
                <label for="${e.id}">Accept Privacy Policy</label>
              </form>
            </li>`;
      })
    document.getElementById("api-list").innerHTML = list;
    })

    const acceptBtn = document.getElementById("accept-btn");
    const rejectBtn = document.getElementById("reject-btn");
    const modal = document.getElementById("modal");
    const body = document.querySelector("body");

    acceptBtn.addEventListener("click", () => {
      modal.classList.add("hidden")
      const checkbox = document.querySelectorAll(".checkbox");

      checkbox.forEach(e => {
        if (e.checked) {
          document.cookie = `${e.name}=checked; privacyPolicy=accepted; max-age=84600; secure;`;
        }
      })
    })

    rejectBtn.addEventListener("click", () => {
      document.cookie = "privacyPolicy=rejected; max-age=84600; secure;";
      modal.classList.add("hidden");
      body.classList.add("body-overflow");
    })

    if (document.cookie.includes("privacyPolicy=accepted") || document.cookie.includes("privacyPolicy=rejected")) {
      modal.classList.add("hidden");
      body.classList.add("body-overflow");
    }
})