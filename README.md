# UniteJS WebDriverIO Plugin

This plugin extends the capabilities of Webdriver with some UniteJS specific methods.

The methods will adjust their functionality based on the application framework you are using.

* browser.uniteLoadAndWaitForPage(url, timeoutMs) - Loads the url and waits for content, timeout is optional and defaults to 5000.
* browser.customShadowRoot(selector, starting) - Find a dom element in a shadow root using selector and optional starting element.