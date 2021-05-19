import {getViewportWidth, addClass, removeClass} from "../utils/utils";

let tabsContainer = document.querySelector("#tabs");

let tabTogglers = tabsContainer.querySelectorAll(".tab-toggler");

export function addEventTabs() {
  let width = getViewportWidth();

  if(width < 1024) {
    removeClass(document.getElementById('tabs'), 'hidden');
    removeClass(document.getElementById('alojamiento-list-container'), 'view-tabs desktopTabs');

    addEventClickToTabs();

    // show map
    document.getElementById("default-tab").click();
  } else {
    addClass(document.getElementById('tabs'), 'hidden');

    // show map
    document.getElementById("default-tab").click();

    removeClass(document.getElementById('alojamiento-list-container'), 'hidden');
    addClass(document.getElementById('alojamiento-list-container'), 'view-tabs desktopTabs');
  }
}

function addEventClickToTabs() {
  let tabContents = document.querySelector("#tab-contents");

  tabTogglers.forEach(function(toggler) {
    toggler.addEventListener("click", function(e) {
      e.preventDefault();

      let tabName = this.getAttribute("href");

      for (let i = 0; i < tabContents.children.length; i++) {
        tabTogglers[i].parentElement.classList.remove("border-yellow-400", "border-b", "opacity-100");
        tabContents.children[i].classList.remove("hidden");

        if ("#" + tabContents.children[i].id === tabName) {
          continue;
        }

        tabContents.children[i].classList.add("hidden");

      }
      e.target.parentElement.classList.add("border-yellow-400", "border-b-4", "-mb-px", "opacity-100");
    });
  });
}
