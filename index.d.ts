/// <reference types="webdriverio"/>

declare namespace WebdriverIO {
    interface Client<T> {
        uniteLoadAndWaitForPage(url: string, timeout?: number): Client<T>;
        customShadowRoot(selector: string, starting?: any): Client<T>;
    }
}
