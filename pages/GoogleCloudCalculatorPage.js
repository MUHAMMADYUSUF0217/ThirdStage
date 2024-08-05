import { remote } from 'webdriverio';
import { expect } from 'chai';

export default class GoogleCloudCalculatorPage {
  constructor(browser) {
      this.browser = browser;
  }

  async chooseNumberOfInstances() {
      const numberOfInstances = await this.browser.$('//input[@id="c13"]');
      await numberOfInstances.clearValue();
      await numberOfInstances.setValue('4');
      await browser.pause(5000);
  }

  async chooseMachineType() {
      const machineTypeDropdown = await this.browser.$('//span[text()="Machine type"]');
      await machineTypeDropdown.click();
      const machineTypeChooseOption = await this.browser.$('//li[@data-value="n1-standard-8"]');
      await machineTypeChooseOption.click();
  }

  async addGpus() {
      const gpusAddButton = await this.browser.$('//button[@aria-label="Add GPUs"]//span[@class="eBlXUe-hywKDc"]');
      await gpusAddButton.click();
      const gpusTypeDropDown = await this.browser.$('//div[@data-field-type="158"]');
      await gpusTypeDropDown.click();
      const gpusOption = await this.browser.$('//li[@data-value="nvidia-tesla-v100"]');
      await gpusOption.click();
  }

  async addLocalSsd() {
      const localSsdDropDown = await this.browser.$('//div[@data-field-type="180"]');
      await localSsdDropDown.click();
      const localSsdOption = await this.browser.$('//span[text()="2x375 GB"]/../..');
      await localSsdOption.click();
  }

  async chooseLocation() {
      const locationDropDown = await this.browser.$('//div[@data-field-type="115"]');
      await locationDropDown.click();
      const locationOption = await this.browser.$('//li[@data-value="europe-west4"]');
      await locationOption.click();
  }

  async chooseDiscount() {
      const discountButton = await this.browser.$('//label[text()="1 year"]');
      await discountButton.click();
  }

  async shareCalc() {
      const totalPrice = await this.browser.$('//span[text()="$5,628.90"]');
      await totalPrice.waitForDisplayed({ timeout: 5000 });
      const shareButton = await this.browser.$('//span[text()="Share"]/..');
      await shareButton.click();
      const copyLinkButton = await this.browser.$('//button[@track-name="copy link"]');
      await copyLinkButton.click();
  }
}
