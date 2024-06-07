import ApiUtils from '../Utilities/ApiUtils.js';
import Post from '../Models/Post.js';

class ApiSteps {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async getPosts() {
    const response = await ApiUtils.get(`${this.baseURL}/posts`);
    return response;
  }

  async getPostById(id) {
    const response = await ApiUtils.get(`${this.baseURL}/posts/${id}`);
    return response;
  }

  async createPost(userId, title, body) {
    const newPost = new Post(userId, null, title, body);
    const response = await ApiUtils.post(`${this.baseURL}/posts`, newPost);
    return response;
}
}

export default ApiSteps;
