import YopmailPage from '../pages/YopmailPage.js';
import GoogleCloudMainPage from '../pages/GoogleCloudMainPage.js';
import GoogleCloudCalculatorPage from '../pages/GoogleCloudCalculatorPage.js';
import { remote } from 'webdriverio';
import { expect } from 'chai';

describe('Google Cloud Test', function() {
    this.timeout(20000); // increase timeout for async operations
    let browser;
    let mainPage;
    let calculatorPage;
    let emailPage;

    before(async function() {
        browser = await remote({
            capabilities: {
                browserName: 'chrome',
            },
        });
        await browser.setTimeout({ implicit: 3000 });
        mainPage = new GoogleCloudMainPage(browser);
        calculatorPage = new GoogleCloudCalculatorPage(browser);
        emailPage = new YopmailPage(browser);
    });

    it('should test Google Cloud calculator and email', async () => {
        await mainPage.openPage();
        await mainPage.searchText('Google Cloud Platform Pricing Calculator');
        await mainPage.chooseSearchResult();
        await mainPage.addToEstimate();
        await mainPage.addComputeEngine();
        await calculatorPage.chooseNumberOfInstances();
        await calculatorPage.chooseMachineType();
        await calculatorPage.addGpus();
        await calculatorPage.addLocalSsd();
        await calculatorPage.chooseLocation();
        await calculatorPage.chooseDiscount();
        await calculatorPage.shareCalc();

       
        await browser.execute(() => window.open());
        const handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[1]);
        await browser.url('https://yopmail.com/ru/');
        await emailPage.newEmail();
        await emailPage.newMessage();
        await emailPage.copyMessage();
    });

    after(async function() {
        if (browser) {
            await browser.deleteSession();
        }
    });
});
