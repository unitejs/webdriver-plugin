browser.addCommand("waitForAureliaPage", function () {
    return browser.executeAsync(function (done) {
        const routerHook = function () {
            const qs = document.querySelector("[aurelia-app]");
            if (qs) {
                if (qs.aurelia) {
                    if (!qs.aurelia.WEBDRIVERIO_NAVIGATION_READY) {
                        qs.aurelia.WEBDRIVERIO_NAVIGATION_READY = [];
                        qs.aurelia.WEBDRIVERIO_WAIT_ID = 0;

                        qs.aurelia.subscribe("router:navigation:complete", function () {
                            qs.aurelia.WEBDRIVERIO_NAVIGATION_READY.push(qs.aurelia.WEBDRIVERIO_WAIT_ID);
                        });
                    }
                }
            }
        };

        if (document.querySelector("[aurelia-app]")) {
            routerHook();
            done();
        } else {
            document.addEventListener("aurelia-composed", function () {
                routerHook();
                done();
            });
        }
    });
});

browser.addCommand("loadAndWaitForAureliaPage", function (url) {
    return browser
        .url(url)
        .waitForAureliaPage();
});

browser.addCommand("waitForRouterComplete", function () {
    let waitId = 0;
    return browser
        .executeAsync(function (done) {
            const qs = document.querySelector("[aurelia-app]");
            if (qs) {
                if (qs.aurelia) {
                    qs.aurelia.WEBDRIVERIO_WAIT_ID++;
                    waitId = qs.aurelia.WEBDRIVERIO_WAIT_ID;
                    done();
                } else {
                    done();
                }
            } else {
                done();
            }
        })
        .waitUntil(function () {
            browser.executeAsync(function (done) {
                const qs = document.querySelector("[aurelia-app]");
                if (qs) {
                    if (qs.aurelia) {
                        done(qs.aurelia.WEBDRIVERIO_NAVIGATION_READY &&
                            qs.aurelia.WEBDRIVERIO_NAVIGATION_READY.indexOf(waitId) > 0);
                    } else {
                        done(false);
                    }
                } else {
                    done(false);
                }
            });
        });
});
