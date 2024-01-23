import axios from 'axios';

// Function to fetch user details from the OAuth provider
export const fetchUserDetails = async (provider, accessToken) => {
  let userInfoUrl;

  // Determine the URL based on the provider
  switch (provider) {
    case 'google':
      userInfoUrl = 'https://www.googleapis.com/oauth2/v3/userinfo';
      break;
    case 'facebook':
      userInfoUrl = 'https://graph.facebook.com/me?fields=id,name,email,picture';
      break;
    case 'github':
      userInfoUrl = 'https://api.github.com/user';
      break;
    // Add more cases for other providers
    default:
      throw new Error('Unsupported provider');
  }

  // Make an HTTP GET request to the provider's user info URL
  const response = await axios.get(userInfoUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // Return the user data
  return response.data;
};

export const exchangeCodeForAccessToken = async (code) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_GITHUB_OAUTH}`, {
      client_id: '5a03979623deaed9eddf',
      client_secret: '62553222235a31fe0a68a89023a4844bb1b46aa2',
      code: code,
      redirect_uri: import.meta.env.VITE_GITHUB_REDIRECT_URI
    });
    console.log("response", response)
    return response.data.access_token;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.detail) {
      throw new Error(error.response.data.detail);
    } else {
      throw new Error('Failed to exchange code for access token');
    }
  }
};