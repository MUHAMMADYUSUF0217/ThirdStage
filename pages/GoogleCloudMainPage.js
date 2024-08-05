import { remote } from 'webdriverio';
import { expect } from 'chai';

export default class GoogleCloudMainPage {
    constructor(browser) {
        this.browser = browser;
    }

    async openPage() {
        await this.browser.url('https://cloud.google.com/');
        await this.browser.window.maximize();
    }

    async searchText(text) {
        const searchButton = await this.browser.$('//div[@class="ND91id LLv0lb"]');
        await searchButton.click();
        const searchField = await this.browser.$('//input[@id="i4"]');
        await searchField.setValue(text);
        const sendSearchTextButton = await this.browser.$('//i[@class="google-material-icons PETVs PETVs-OWXEXe-UbuQg"]');
        await browser.pause(5000);
        await sendSearchTextButton.click();
    }

    async chooseSearchResult() {
        const searchResultLink = await this.browser.$('//a[@href="https://cloud.google.com/products/calculator"]');
        await searchResultLink.click();
    }

    async addToEstimate() {
        const pricingButton = await this.browser.$('//button[@class="UywwFc-LgbsSe UywwFc-LgbsSe-OWXEXe-Bz112c-M1Soyc UywwFc-LgbsSe-OWXEXe-dgl2Hf xhASFc"]');
        await pricingButton.click();
    }

    async addComputeEngine() {
        const computeEngineButton = await this.browser.$('//h2[text()="Compute Engine"]');
        await computeEngineButton.click();
        await browser.pause(5000);
    }
}

