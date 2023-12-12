import crypto from "crypto"; // Cryptographic library
import Oauth from "oauth-1.0a"; // OAuth 1.0a library

// Create an OAuth 1.0a instance with consumer key and secret
const oauth = new Oauth({
  consumer: {
    key: process.env.TWITTER_API_KEY!,
    secret: process.env.TWITTER_API_SECRET!,
  },
  signature_method: "HMAC-SHA1",
  hash_function: (baseString, key) =>
    crypto.createHmac("sha1", key).update(baseString).digest("base64"),
});

export async function writeTweet(tweet: { text: string }) {
  const token = {
    key: process.env.TWITTER_ACCESS_TOKEN!,
    secret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
  };

  const url = "https://api.twitter.com/2/tweets";

  const headers = oauth.toHeader(
    oauth.authorize(
      {
        url,
        method: "POST",
      },
      token
    )
  );

  try {
    const request = await fetch(url, {
      method: "POST",
      body: JSON.stringify(tweet),

      headers: {
        Authorization: headers["Authorization"],
        "user-agent": "V2CreateTweetJS",
        "content-type": "application/json",
        accept: "application/json",
      },
    });
    const body = await request.json();
    return body;
  } catch (error) {
    console.error("Error:", error);
  }
}
