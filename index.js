exports = function () {
    browser.timeouts("script", 30000);

    var uniteConfig = require("../unite.json");

    if (/aurelia/i.test(uniteConfig.applicationFramework)) {
        require("./aurelia-webdriver-plugin");

        browser.addCommand("uniteLoadAndWaitForPage", function (url) {
            return browser
                .url(url)
                .waitForAureliaPage();
        });        
    } else {
        browser.addCommand("uniteLoadAndWaitForPage", function (url, timeout) {
            return browser
                .url(url)
                .waitUntil(function () {
                    return browser.getText("#root")
                        .then(function (text) {
                            return text && text.length > 0;
                        });
                }, timeout ? timeout : 5000);
        });
    }

    /* Borrowed from here https://github.com/angular/protractor/pull/4392/files */
    browser.addCommand("customShadowRoot", function (selector, using) {
        var selectors = selector.split('::sr');
        if (selectors.length === 0) {
            return [];
        }

        var shadowDomInUse = (document.head.createShadowRoot || document.head.attachShadow);
        var getShadowRoot = function (el) {
            return ((el && shadowDomInUse) ? el.shadowRoot : el);
        };
        var findAllMatches = function (selector /*string*/, targets /*array*/, firstTry /*boolean*/) {
            var scope, i, matches = [];
            for (i = 0; i < targets.length; ++i) {
                scope = (firstTry) ? targets[i] : getShadowRoot(targets[i]);
                if (scope) {
                    if (selector === '') {
                        matches.push(scope);
                    } else {
                        Array.prototype.push.apply(matches, scope.querySelectorAll(selector));
                    }
                }
            }
            return matches;
        };

        var matches = findAllMatches(selectors.shift().trim(), [using || document], true);
        while (selectors.length > 0 && matches.length > 0) {
            matches = findAllMatches(selectors.shift().trim(), matches, false);
        }
        return matches;
    });
};
