// // tests/GoogleCloudTest.js

// import { Builder, By, until } from 'selenium-webdriver';
// import { expect } from 'chai';
// import GoogleCloudMainPage from '../pages/GoogleCloudMainPage.js';
// import GoogleCloudCalculatorPage from '../pages/GoogleCloudCalculatorPage.js';

// describe('Google Cloud Test', function() {
//   this.timeout(30000); // Set the timeout to 30 seconds
//   let driver;
//   let mainPage;
//   let calculatorPage;
//   const config = {
//     numberOfInstances: '4',
//     machineType: 'n1-standard-8, vCPUs: 8, RAM: 30 GB',
//     numberOfGPUs: '1',
//     localSsd: '2x375 GB',
//     committedUsage: '1 year'
//   };

//   before(async () => {
//     driver = await new Builder().forBrowser('chrome').build();
//     mainPage = new GoogleCloudMainPage(driver);
//     calculatorPage = new GoogleCloudCalculatorPage(driver);
//   });

//   it('should create a new estimate and verify the details', async () => {
//     await mainPage.openPage();
//     await mainPage.searchText('Google Cloud Platform Pricing Calculator');
//     await mainPage.chooseSearchResult();
//     await mainPage.addToEstimate();
//     await mainPage.addComputeEngine();
//     await calculatorPage.configureGoogleCloudCalculator(config);
//     await calculatorPage.shareCalc();
//     await calculatorPage.openEstimatedSummary();

//     // Working with the new window
//     const allWindows = await driver.getWindowHandles();
//     const originalWindow = await driver.getWindowHandle();
//     let newWindow = null;
//     for (const windowHandle of allWindows) {
//       if (windowHandle !== originalWindow) {
//         newWindow = windowHandle;
//         break;
//       }
//     }
//     // Switch to the new window
//     await driver.switchTo().window(newWindow);
//     await calculatorPage.assertAllEnteredInfo();
//   });

//   after(async () => {
//     if (driver) {
//       await driver.quit();
//     }
//   });
// });
 
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

        // Handle new tab and perform email operations
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
            // await browser.deleteSession();
        }
    });
});