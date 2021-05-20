import {getViewportWidth, addClass, removeClass} from "../utils/utils";

let tabsContainer = document.querySelector("#tabs");

export function addEventTabs() {
  let width = getViewportWidth();

  const tabs = document.getElementById('tabs');
  const alojListContainer = document.getElementById('alojamiento-list-container');

  if(tabs) {
    if(width < 1024) {
      removeClass(tabs, 'hidden');
      removeClass(alojListContainer, 'view-tabs desktopTabs');

      addEventClickToTabs();

      // show map
      document.getElementById("default-tab").click();
    } else {
      addClass(tabs, 'hidden');

      // show map
      document.getElementById("default-tab").click();

      removeClass(alojListContainer, 'hidden');
      addClass(alojListContainer, 'view-tabs desktopTabs');
    }
  }
}

function addEventClickToTabs() {
  let tabContents = document.querySelector("#tab-contents");

  if(tabsContainer) {
    let tabTogglers = tabsContainer.querySelectorAll(".tab-toggler");
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
}
