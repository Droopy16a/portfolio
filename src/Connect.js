import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DiscordLogin = () => {
  const [discordUser, setDiscordUser] = useState(null);

  const CLIENT_ID = "1333073404781133877"; // Replace with your Discord app client ID
  const CLIENT_SECRET = "kSBemv87eJcICFk75rp_h-vFFUYTkB7L";
  const REDIRECT_URI = "https://discord.com/oauth2/authorize?client_id=1333073404781133877&response_type=code&redirect_uri=https%3A%2F%2Fdroopy16a.github.io%2Fportfolio%2F&scope=identify"; // This should be the URI you set up in the Discord Developer Portal
  const RESPONSE_TYPE = "code"; // OAuth2 response type
  const SCOPE = "identify"; // Scope for the permissions you need, "identify" gives access to basic info like username

  const oauthUrl = `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

// Handle redirect after OAuth2 login
const handleRedirect = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get('code'); // The code is returned by Discord after login

    if (code) {
      // Exchange the code for an access token (you'll typically do this on the backend)
      axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI,
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      })
      .then(response => {
        const { access_token } = response.data;
        
        // Use the access token to fetch user info
        axios.get('https://discord.com/api/v10/users/@me', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          }
        })
        .then(userResponse => {
          setDiscordUser(userResponse.data); // Set user data in state
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
      })
      .catch(error => {
        console.error('Error exchanging code for token:', error);
      });
    }
  };

  useEffect(() => {
    handleRedirect(); // Handle redirect on component mount
  }, []);

  return (
    <div>
      <h1>Discord Login</h1>
      {!discordUser ? (
        <button onClick={() => window.location.href = oauthUrl}>Login with Discord</button>
      ) : (
        <div>
          <h2>Welcome, {discordUser.username}!</h2>
          <img src={`https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`} alt="User Avatar" />
          <p>Discord ID: {discordUser.id}</p>
        </div>
      )}
    </div>
  );
};

export default DiscordLogin;
