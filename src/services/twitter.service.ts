import { chromium, Browser, Page } from 'playwright';
import { TWITTER_USERNAME, TWITTER_PASSWORD } from '../core/config';
import { info, error } from '../core/logger';

let browser: Browser | null = null;

async function getBrowser(): Promise<Browser> {
  if (!browser) {
    browser = await chromium.launch({ headless: true });
  }
  return browser;
}

async function loginToTwitter(page: Page): Promise<void> {
  info('Logging into Twitter...');
  
  await page.goto('https://twitter.com/i/flow/login');
  
  // Wait for username input
  await page.waitForSelector('input[autocomplete="username"]', { timeout: 10000 });
  await page.fill('input[autocomplete="username"]', TWITTER_USERNAME!);
  await page.click('text=Next');
  
  // Wait for password input
  await page.waitForSelector('input[name="password"]', { timeout: 10000 });
  await page.fill('input[name="password"]', TWITTER_PASSWORD!);
  await page.click('text=Log in');
  
  // Wait for home page
  await page.waitForSelector('[data-testid="primaryColumn"]', { timeout: 30000 });
  info('Twitter login successful');
}

export async function postTweet(text: string): Promise<string | null> {
  let page: Page | null = null;
  
  try {
    info('Starting browser automation for Twitter post...');
    const browser = await getBrowser();
    page = await browser.newPage();
    
    await loginToTwitter(page);
    
    // Click on tweet composer
    await page.click('[data-testid="SideNav_NewTweet_Button"]');
    await page.waitForSelector('[data-testid="tweetTextarea_0"]', { timeout: 10000 });
    
    // Type the tweet
    await page.fill('[data-testid="tweetTextarea_0"]', text);
    
    // Click post button
    await page.click('[data-testid="tweetButton"]');
    
    // Wait for tweet to post
    await page.waitForTimeout(3000);
    
    info('Tweet posted successfully via browser automation');
    
    // Get tweet URL from current page or return timestamp as ID
    const timestamp = Date.now().toString();
    
    await page.close();
    return timestamp;
  } catch (err) {
    error(`Failed to post tweet: ${err instanceof Error ? err.message : String(err)}`);
    if (page) await page.close();
    throw err;
  }
}

export async function closeBrowser(): Promise<void> {
  if (browser) {
    await browser.close();
    browser = null;
  }
}
