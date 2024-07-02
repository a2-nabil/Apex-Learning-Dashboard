//  for password show - hide
const currentPassword = document.getElementById("current_password");
const currentPasswordToggler = document.getElementById(
  "current_password_toggler"
);
const newPassword = document.getElementById("new_password");
const newPasswordToggler = document.getElementById("new_password_toggler");
const confirmPassword = document.getElementById("confirm_password");
const confirmPasswordToggler = document.getElementById(
  "confirm_password_toggler"
);

// reusable function for password show hide
function showHidePassword(passwordField, togglerElement) {
  if (passwordField.type === "password") {
    passwordField.setAttribute("type", "text");
    togglerElement.classList.add("fa-eye-slash");
  } else {
    togglerElement.classList.remove("fa-eye-slash");
    passwordField.setAttribute("type", "password");
  }
}

// for current password
currentPasswordToggler.addEventListener("click", function () {
  showHidePassword(currentPassword, currentPasswordToggler);
});
// for new password
newPasswordToggler.addEventListener("click", function () {
  showHidePassword(newPassword, newPasswordToggler);
});
// for confirm password
confirmPasswordToggler.addEventListener("click", function () {
  showHidePassword(confirmPassword, confirmPasswordToggler);
});

//  main tabs and nav
document.addEventListener("DOMContentLoaded", function () {
  const nxtNavbarToggle = document.getElementById("a2n_navbar-toggle");
  const nxtSidebar = document.querySelector(".a2n-nxt_sidebar");
  const nxtNavList = document.getElementById("a2n_nav-list");
  const nxtTabs = document.querySelectorAll(".a2n_dash_tabs");
  const nxtNavLinks = document.querySelectorAll("#a2n_nav-list li a");
  const nxtUserNavLinks = document.querySelectorAll(".a2n_user_log ul li a");

  nxtNavbarToggle.addEventListener("click", function () {
    nxtSidebar.classList.toggle("a2n_sidebar_active");
    nxtNavbarToggle.classList.toggle("a2n_toggle_active");
  });

  // Function to remove active class from all nav links
  function removeActiveClass() {
    nxtNavLinks.forEach(function (navLink) {
      navLink.classList.remove("a2n_active");
    });
    nxtUserNavLinks.forEach(function (userNavLink) {
      userNavLink.classList.remove("a2n_active");
    });
  }

  // Function to set active tab based on hash in URL
  function setActiveTabFromHash() {
    const hash = window.location.hash.substring(1);
    if (hash) {
      nxtTabs.forEach((tab) => tab.classList.remove("a2n_active_tab"));
      const selectedTab = document.getElementById(hash);
      if (selectedTab) {
        selectedTab.classList.add("a2n_active_tab");
        const correspondingNavLink = document.querySelector(
          `#a2n_nav-list li a[href="#${hash}"]`
        );
        if (correspondingNavLink) {
          correspondingNavLink.classList.add("a2n_active");
        }
      }
      const correspondingUserNavLink = document.querySelector(
        `.a2n_user_log ul li a[href="#${hash}"]`
      );
      if (correspondingUserNavLink) {
        correspondingUserNavLink.classList.add("a2n_active");
      }
    } else {
      // If no hash is present, activate the first tab by default
      const firstTab = nxtTabs[0];
      if (firstTab) {
        firstTab.classList.add("a2n_active_tab");
        const firstNavLink = nxtNavLinks[0];
        if (firstNavLink) {
          firstNavLink.classList.add("a2n_active");
        }
      }
    }
  }

  // Event listener for navigation links
  nxtNavLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      removeActiveClass();
      link.classList.add("a2n_active");
      nxtNavList.classList.remove("a2n_show_nav");
      const targetTabId = this.getAttribute("href").substring(1);
      window.location.hash = targetTabId;
      changeTab(targetTabId);
    });
  });

  // Event listener for user navigation links
  nxtUserNavLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      removeActiveClass();
      link.classList.add("a2n_active");
      const targetTabId = this.getAttribute("href").substring(1);
      window.location.hash = targetTabId;
      changeTab(targetTabId);
      const correspondingNavLink = document.querySelector(
        `#a2n_nav-list li a[href="#${targetTabId}"]`
      );
      if (correspondingNavLink) {
        correspondingNavLink.classList.add("a2n_active");
      }
    });
  });

  // Set active tab on page load
  setActiveTabFromHash();

  function changeTab(tabId) {
    nxtTabs.forEach((tab) => tab.classList.remove("a2n_active_tab"));
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
      selectedTab.classList.add("a2n_active_tab");
    }
  }

  // common functions for tab sections
  function setupTabNavigation(
    navLinksSelector,
    tabsSelector,
    navActiveClass,
    tabsActiveClass
  ) {
    const navLinks = document.querySelectorAll(navLinksSelector);
    const tabs = document.querySelectorAll(tabsSelector);

    navLinks.forEach(function (link) {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        navLinks.forEach(function (navLink) {
          if (navLink !== link) {
            navLink.classList.remove(navActiveClass);
          }
        });
        link.classList.add(navActiveClass);
        const targetTabId = this.getAttribute("href").substring(1);
        switchTab(targetTabId, tabs, tabsActiveClass);
      });
    });
  }

  function switchTab(tabId, tabs, tabsActiveClass) {
    tabs.forEach((tab) => tab.classList.remove(tabsActiveClass));
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
      selectedTab.classList.add(tabsActiveClass);
    }
  }

  // My courses tab
  setupTabNavigation(
    "#a2n_c-nav li a",
    ".a2n-c_tab",
    "a2n_c-active",
    "a2n-c_active-tab"
  );
  // Certificate tab
  setupTabNavigation(
    "#a2n_p-nav li a",
    ".a2n-p_tab",
    "a2n_p-active",
    "a2n-p_active-tab"
  );
  // Transcript tab
  setupTabNavigation(
    "#a2n_t-nav li a",
    ".a2n-t_tab",
    "a2n_t-active",
    "a2n-t_active-tab"
  );

  function filterCards(inputSelector, cardSelector, titleSelector) {
    const inputField = document.querySelector(inputSelector);
    const cards = document.querySelectorAll(cardSelector);

    inputField.addEventListener("input", function () {
      const inputValue = inputField.value.trim().toLowerCase();

      cards.forEach((card) => {
        const title = card
          .querySelector(titleSelector)
          .textContent.toLowerCase();

        if (title.includes(inputValue)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  }

  // my course search
  filterCards(".nxt_input_field", ".a2n-course__card", ".a2n-course__title a");
});

// for nxtModal
function nxtToggleModal(modalId, closeBtnId) {
  const modal = document.getElementById(modalId);
  const closeButton = document.getElementById(closeBtnId);
  const closeFormButton = document.querySelector(".cancelForm_btn");
  modal.classList.add("nxt_tab_active");

  closeButton.onclick = function () {
    modal.classList.remove("nxt_tab_active");
  };

  closeFormButton.onclick = function () {
    modal.classList.remove("nxt_tab_active");
  };
}

// activate the intlTelInput
const nxtCountryInput = document.querySelector("#phone");
window.intlTelInput(nxtCountryInput, {
  separateDialCode: true,
  initialCountry: "gb",
});

// for certificate js
const srsRadioButtons = document.querySelectorAll(
  'input[type="radio"][name="certificate"]'
);

const srsOrderButton = document.getElementById("srs_orderBtn");

srsRadioButtons.forEach((radioButton) => {
  radioButton.addEventListener("change", function () {
    const isChecked = [...srsRadioButtons].some((radio) => radio.checked);

    srsOrderButton.disabled = !isChecked;
  });
});
