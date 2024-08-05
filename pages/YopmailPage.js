import { remote } from 'webdriverio';
import { expect } from 'chai';

export default class YopmailPage {
    constructor(browser) {
        this.browser = browser;
    }

    async newEmail() {
        const newEmailButton = await this.browser.$('//h3[text()="Случайный адрес электронной почты"]');
        await newEmailButton.click();
    }


async newMessage() {
        const checkEmail = await this.browser.$('//span[text()="Проверить почту"]');
        await checkEmail.click();
        const newMessageButton = await this.browser.$('#newmail');
        await newMessageButton.click();
        await this.browser.switchToFrame(await this.browser.$('iframe#ifmail'));
        const messageTextField = await this.browser.$('#msgbody');
        await messageTextField.click();
        await messageTextField.setValue('Hello, I do not know what can I do. The requirements are expired!');
        await this.browser.switchToParentFrame();
    }

    async copyMessage() {
        const emailText = await this.browser.$('#autoaltcpt em');
        this.email = await emailText.getText();
    }
}
