import React, { useState } from "react"
import Analytics from '@aws-amplify/analytics';
import Auth from '@aws-amplify/auth';
import { navigate } from "gatsby";

const amplifyConfig = {
  Auth: {
    identityPoolId: "us-east-1:71f75b3f-b95f-41fb-8621-ce3f73e97e0d",
    region: 'us-east-1'
  }
}
//Initialize Amplify
Auth.configure(amplifyConfig);

const analyticsConfig = {
  AWSPinpoint: {
    appId: 'e9dafa031d7f4de78cc087428ce7909f',
    region: 'us-east-1',
    mandatorySignIn: false,
  }
}
Analytics.configure(analyticsConfig)

export default function Home() {
  Analytics.updateEndpoint({
    userAttributes: {
      interests: ['football', 'basketball', 'AWS']
      // ...
    },
    attributes: {
      // Custom attributes that your app reports to Amazon Pinpoint. You can use these attributes as selection criteria when you create a segment.
      hobbies: ['piano', 'hiking'],
    },
  })
  Analytics.record({
    name: 'Home',
    attributes: { genre: 'Rock', year: '1989' }
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("")
  return (
    <div>
      <div>
        Hello world!
      </div>
      <div>
        <label>Name: <input type="text" onChange={(e) => setName(e.target.value)} /></label><br />
        <label>Email: <input type="text" onChange={(e) => setEmail(e.target.value)} /></label>
      </div>
      <div>
        <button onClick={() => {
          console.log("Button clicked sending record");
          Analytics.record({
            name: 'ButtonClickedHome',
            attributes: { name: name, email: email }
          });
        }}>Click Here</button>
      </div>
      <div>
        <button onClick={() => {
          console.log("Button clicked sending record");
          Analytics.record({
            name: 'MoveToPage2',
            attributes: { name: 'Page2Movement' }
          });
          navigate('/page2');
        }}>Go to Page 2</button>
      </div>
    </div>
  )
}
