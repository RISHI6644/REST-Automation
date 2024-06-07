import {test, expect} from '@playwright/test';
import ApiSteps from '../Steps/ApiSteps';

test.describe('REST API Tests', () => {
  let apiSteps;

  test.beforeAll(() => {
    apiSteps = new ApiSteps('https://jsonplaceholder.typicode.com');
  });

// Step 1

  test('should get all posts', async () => {
    const response = await apiSteps.getPosts();

    // Assert that the status code is 200
    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    // Verify the response is an array
    expect(Array.isArray(responseBody)).toBeTruthy();

    // Verify posts are sorted by id in ascending order
    const isSorted = responseBody.every((post, index) => {
      return index === 0 || post.id > responseBody[index - 1].id;
    });
    expect(isSorted).toBeTruthy();
  });

// Step 2
  test('should get post with id=99', async () => {
    const response = await apiSteps.getPostById(99);

    // Assert that the status code is 200
    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    // Verify post information is correct
    expect(responseBody.userId).toBe(10);
    expect(responseBody.id).toBe(99);
    expect(responseBody.title).not.toBe('');
    expect(responseBody.body).not.toBe('');
  });

// Step 3
test('should return 404 for post with id=150', async () => {
  const response = await apiSteps.getPostById(150);

  // Assert that the status code is 404
  expect(response.status()).toBe(404);

  const responseBody = await response.json();

  // Verify the response body is empty
  expect(responseBody).toEqual({});
});

// Step 4
test('should create a new post', async () => {
  const userId = 1;
  const title = `title-${Math.random().toString(36).substring(7)}`;
  const body = `body-${Math.random().toString(36).substring(7)}`;
  
  const response = await apiSteps.createPost(userId, title, body);

  // Assert that the status code is 201
  expect(response.status()).toBe(201);

  const createdPost = await response.json();

  // Verify the post information is correct
  expect(createdPost.userId).toBe(userId);
  expect(createdPost.title).toBe(title);
  expect(createdPost.body).toBe(body);
  expect(createdPost.id).toBeDefined();
});
})