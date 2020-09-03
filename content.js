function injectTargetSpans() {
  // Regex details:
  // Matches prices like: $1, $10, $100, $100.00
  // The final `g` is necessary to match more than one instance per match() call.
  const regex = /\$\d+(\.\d{1,2})?/g
  const elements = document.querySelectorAll("h1, h2, h3, h4, h5, p, li, td, caption, span, a")

  console.log("[PriceClipper] Checking " + elements.length + " elements...")

  for (i = 0; i < elements.length; i++) {
    var element = elements[i];
    var regexMatches = element.innerHTML.match(regex) || [];
    for (j = 0; j < regexMatches.length; j++) {
      var priceText = regexMatches[j];
      console.log("[PriceClipper] Found match: " + priceText);
      element.innerHTML = element.innerHTML.replace(
        priceText,
        "<span class=\"priceclipper_price\">" + priceText + "</span>"
      );
    }
  }
}

function addClickListeners() {
  var elements = document.getElementsByClassName("priceclipper_price");
  console.log("[PriceClipper] Found " + elements.length + " items.");

  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', function(event) {
      copyToClipboard(event.target.innerHTML);
      event.stopPropagation();
    });
  }
}

function copyToClipboard(text) {
  const element = document.createElement('textarea');
  element.value = text;
  document.body.appendChild(element);
  element.select();
  document.execCommand('copy');
  document.body.removeChild(element);
}

function refresh() {
  injectTargetSpans();
  addClickListeners();
}

refresh();
