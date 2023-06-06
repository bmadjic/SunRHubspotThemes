function addCustomLogo() {
  var logos = Array.from(document.getElementsByClassName('nav-logo'));
  logos.forEach(function(logo) {
    var newLogo = document.createElement('img');
    newLogo.src = 'https://sunr.fr/wp-content/uploads/2022/01/logo-sunr.png';
    newLogo.className = 'nav-logo';
    newLogo.style.maxHeight = '30px';
    newLogo.style.verticalAlign = 'middle';
    logo.parentNode.insertBefore(newLogo, logo);
    logo.style.display = 'none';
  });
}

function toggleDateDisplay() {
  var spans = document.querySelectorAll('[data-test-id="cdbc-property-label"]');
  spans.forEach(function(span) {
    if (span.textContent === 'Expected RTB:') {
      var dateSpan = span.nextElementSibling.querySelector('[data-test-id="cdbc-property-value"] span');
      var date = new Date(dateSpan.textContent);
      var quarter = Math.ceil((date.getMonth() + 1) / 3);

      var quarterSpan = document.createElement('span');
      quarterSpan.textContent = 'Q' + quarter + ' ' + date.getFullYear();
      quarterSpan.style.display = 'inline';
      dateSpan.parentNode.appendChild(quarterSpan);
      dateSpan.style.display = 'none';
    }
  });
}


function togglePowerDisplay() {
  var spans = document.querySelectorAll('[data-test-id="cdbc-property-label"]');
  spans.forEach(function(span) {
    var valueSpan = span.nextElementSibling.querySelector('[data-test-id="cdbc-property-value"] span[data-selenium-test="currency-component-loaded"] span');
    if (span.textContent === 'Amount:') {
      span.textContent = 'Power:';
      var amount = valueSpan.textContent.substring(1); // remove the leading 'M'
      if (!amount.endsWith('MWp')) {
        valueSpan.textContent = amount + 'MWp';
      }
    }
  });

  // Code for totals
  var totalElements = document.querySelectorAll('span[data-key="indexPage.board.deals.total"]');
  totalElements.forEach(function(totalElement) {
    totalElement.firstElementChild.textContent = 'Total Power: ';
    var totalAmount = totalElement.lastElementChild.textContent.substring(1); // remove the leading 'M'
    if (!totalAmount.endsWith('MWp')) {
      totalElement.lastElementChild.textContent = totalAmount + 'MWp';
    }
  });

  // Code for 'Weighted:'
  var weightedElements = document.querySelectorAll('span[data-key="indexPage.board.deals.weightedTotal.default"]');
  weightedElements.forEach(function(weightedElement) {
    weightedElement.firstElementChild.textContent = 'Weighted Power: ';
    var weightedAmount = weightedElement.childNodes[1].textContent.substring(1); // remove the leading 'M'
    if (!weightedAmount.endsWith('MWp')) {
      weightedElement.childNodes[1].textContent = weightedAmount + 'MWp';
    }
  });
}

function toggleCustomMenu() {
  var checked = true; // Set the desired value of the 'checked' variable

  var ul = document.querySelector('ul.primary-links');
  while (ul.children.length > 1) {
    ul.removeChild(ul.lastChild);
  }

  if (checked) {
    var menuItems = [
      { name: 'Contacts', link: 'https://app-eu1.hubspot.com/contacts/26693160/contacts' },
      { name: 'Companies', link: 'https://app-eu1.hubspot.com/contacts/26693160/companies' },
      { name: 'Deals', link: 'https://app-eu1.hubspot.com/contacts/26693160/deals' },
      { name: 'Tasks', link: 'https://app-eu1.hubspot.com/tasks/26693160' },
      { name: 'Tickets', link: 'https://app-eu1.hubspot.com/contacts/26693160/tickets' },
      { name: 'Dashboard', link: 'https://app-eu1.hubspot.com/reports-dashboard/26693160' },
    ];

    menuItems.forEach(function (menuItem) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.textContent = menuItem.name;
      a.href = menuItem.link;
      a.classList.add("primary-link");  // Add class to each element
      li.appendChild(a);
      ul.appendChild(li);
    });
  } else {
    // Revert the changes to the menu items.
    // The specific code will depend on what the original menu items and their URLs were.
  }
}

function waitMenuToLoad() {
    var checkExist = setInterval(function() {
        var elem = document.querySelector("#nav-primary-home");
        if (elem) {
            addCustomLogo()
            toggleDateDisplay();
            clearInterval(checkExist);
            toggleCustomMenu();
        }
    }, 500); // check every 500ms
}
function waitHelpToLoad() {
    var checkExist = setInterval(function() {
        var elem = document.querySelector("#help-widget-toggle");
        if (elem) {
            toggleDateDisplay();
            togglePowerDisplay();
            
            clearInterval(checkExist);
        }
    }, 500); // check every 500ms
}

waitMenuToLoad();
waitHelpToLoad();
