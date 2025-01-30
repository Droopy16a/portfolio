import './style/Color.css'
import React, { useState, useEffect } from "react";
import axios from "axios";
import logoW from"./asset/img/logoDiscordW.png"
import logoN from"./asset/img/logoDiscordN.png"

function lightOrDark(color) {

    // Variables for red, green, blue values
    var r, g, b, hsp;
    
    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {

        // If RGB --> store the red, green, blue values in separate variables
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
        
        r = color[1];
        g = color[2];
        b = color[3];
    } 
    else {
        
        // If hex --> Convert it to RGB: http://gist.github.com/983661
        color = +("0x" + color.slice(1).replace( 
        color.length < 5 && /./g, '$&$&'));

        r = color >> 16;
        g = color >> 8 & 255;
        b = color & 255;
    }
    
    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(
    0.299 * (r * r) +
    0.587 * (g * g) +
    0.114 * (b * b)
    );

    // Using the HSP value, determine whether the color is light or dark
    if (hsp>200) {

        return 'light';
    } 
    else {

        return 'dark';
    }
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }
  
  function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }
  
  function lightenColor(r, g, b, alpha = 0.32) {
    const newR = Math.round(r + alpha * (255 - r));
    const newG = Math.round(g + alpha * (255 - g));
    const newB = Math.round(b + alpha * (255 - b));
    return rgbToHex(newR, newG, newB);
  }
  
  const hex2rgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    
    return [ r, g, b ];
  }

function Color () {
  const [L, setTheme] = useState("light");
  const [discordUser, setDiscordUser] = useState(null);

  const CLIENT_ID = "1333073404781133877"; // Replace with your Discord app client ID
  const CLIENT_SECRET = "Y4a7Gm2jYlYkOABFogH2yFIwkHGLdSjQ";
  const REDIRECT_URI = "https://droopy16a.github.io/portfolio/"; // Replace with your redirect URI
  const SCOPE = "identify";

  const oauthUrl = `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=${SCOPE}`;


  // Handle redirect after OAuth2 login
  const handleRedirect = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get('code'); // The code is returned by Discord after login
    console.log(code);

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
          console.log(userResponse.data);
          const El = userResponse.data["banner_color"];
          var r = document.body;
          var rgbL = hex2rgb(El);
          rgbL = lightenColor(rgbL[0], rgbL[1], rgbL[2])
          r.style.setProperty('--bleu', El);
          r.style.setProperty('--lightB', rgbL);
          document.getElementsByClassName("inputColor")[0].value = El;

          const user = document.getElementsByClassName("divInputColor")[0].querySelector("h3");
          console.log(user.getBoundingClientRect().width);
          const C = document.getElementsByClassName("inputColor")[0];
          let taille = (100 * (user.getBoundingClientRect().width + 50 + 2 * (C.getBoundingClientRect().width))) / 90;
          console.log(taille);
          r.style.setProperty('--colorTaille', taille + "px");
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
        const rgbList = window.getComputedStyle(document.body).getPropertyValue("--bleu").split("(")[1].split(')')[0].split(",").map((val) => parseInt(val.replace(" ", "")));
        // console.log(rgbList);
        // console.log(rgbToHex(rgbList[0], rgbList[1], rgbList[2]));
        document.getElementsByClassName("inputColor")[0].value = rgbToHex(rgbList[0], rgbList[1], rgbList[2]);
        setTheme(lightOrDark(rgbToHex(rgbList[0], rgbList[1], rgbList[2])));
        
        // if (!discordUser) return;
        handleRedirect();
    }, [])
    return (
        <div className='divInputColor' onClick={(e) => {console.log(e.target.getBoundingClientRect().width); if (!discordUser && e.target.getBoundingClientRect().width !== 50) {window.location.href = oauthUrl}}}>
            <img src={discordUser ? (discordUser.avatar ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png` : (L === "dark" ? logoW : logoN)) : (L === "dark" ? logoW : logoN)}/>
            <h3>{discordUser ? discordUser.username   : "Connexion"}</h3>
            <input type='color' className='inputColor'  onClick={(e) => e.stopPropagation()} onChange={(e) => {
            var r = document.body;
            setTheme(lightOrDark(e.target.value));
            console.log(L === "light");
            var rgbL = hex2rgb(e.target.value);
            rgbL = lightenColor(rgbL[0], rgbL[1], rgbL[2])
            r.style.setProperty('--bleu', e.target.value);
            r.style.setProperty('--lightB', rgbL);
            }}/>
        </div>
    );
};

export default Color;