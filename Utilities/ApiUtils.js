import { request } from '@playwright/test';

class ApiUtils {
  static async get(url) {
    const context = await request.newContext();
    const response = await context.get(url);
    return response;
  }

  static async post(url, body) {
    const context = await request.newContext();
    const response = await context.post(url, {
        data: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
    });
    return response;
  }
}

export default ApiUtils;
