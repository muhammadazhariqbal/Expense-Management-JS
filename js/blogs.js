// Function to fetch and display blog post details from Medium API
function fetchBlogs() {
  // Fetch details from Medium API
  fetch('https://api.medium.com/v1/publications/{publication_id}/latest', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer {access_token}' // Replace {access_token} with your Medium API access token
      }
  })
  .then(response => response.json())
  .then(data => {
      // Extract necessary details from the response
      const { title, content, canonicalUrl } = data.items[0]; // Assuming the first item is the latest post
      
      // Create a container element
      const container = document.createElement('div');
      
      // Create a title element
      const titleElement = document.createElement('h2');
      titleElement.textContent = title;
      
      // Create a content element
      const contentElement = document.createElement('div');
      contentElement.innerHTML = content;
      
      // Append title and content to the container
      container.appendChild(titleElement);
      container.appendChild(contentElement);
      
      // Add a click event listener to the container for redirecting to the Medium website
      container.addEventListener('click', () => {
          window.location.href = canonicalUrl;
      });
      
      // Append the container to the document body
      document.body.appendChild(container);
  })
  .catch(error => {
      console.error('Error fetching blog post:', error);
  });
}
