export const tabsContainer = document.querySelector(".tabs-container");

const toggleClasses = (currentTab, tabs, tabsContent) => {
  tabs.forEach((tab) => {
    tab.classList.toggle("tab_active", currentTab === tab);
  });
  tabsContent.forEach((tabContent) => {
    tabContent.classList.toggle("tab-content_active", tabContent.dataset.tab === currentTab.dataset.tab);
  });
};

export const initTabs = () => {
  tabsContainer.addEventListener("click", (e) => {
    const currentTab = e.target.closest(".tab");

    if (currentTab) {
      const tabGroups = [
        {
          containerSelector: ".mealplan__tabs",
          tabSelector: ".mealplan__tab",
          contentSelector: ".mealplan__content",
        },
        {
          containerSelector: ".mealplan__programs",
          tabSelector: ".programs__tab",
          contentSelector: ".mealplan__program-content",
        },
        {
          containerSelector: ".schedule__days",
          tabSelector: ".schedule__day-tab",
          contentSelector: ".schedule__day-content",
        },
      ];

      tabGroups.forEach(({ containerSelector, tabSelector, contentSelector }) => {
        if (currentTab.closest(containerSelector)) {
          const tabs = tabsContainer.querySelectorAll(tabSelector);
          const tabsContent = tabsContainer.querySelectorAll(contentSelector);
          toggleClasses(currentTab, tabs, tabsContent);
        }
      });
    }

    /*if (currentTab) {
      if (currentTab.closest(".mealplan__tabs")) {
        const mealplanTabs = tabsContainer.querySelectorAll(".mealplan__tab");
        const mealplanContents = tabsContainer.querySelectorAll(".mealplan__content");
        toggleClasses(currentTab, mealplanTabs, mealplanContents);
      }
      if (currentTab.closest(".mealplan__programs")) {
        const programTabs = tabsContainer.querySelectorAll(".programs__tab");
        const programContents = tabsContainer.querySelectorAll(".mealplan__program-content");
        toggleClasses(currentTab, programTabs, programContents);
      }
      if (currentTab.closest(".schedule__days")) {
        const dayTabs = tabsContainer.querySelectorAll(".schedule__day-tab");
        const dayContents = tabsContainer.querySelectorAll(".schedule__day-content");
        toggleClasses(currentTab, dayTabs, dayContents);
      }
    }*/
  });
};
