import React from "react"
import Analytics from '@aws-amplify/analytics';
import Auth from '@aws-amplify/auth';

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

export default function Page2() {
    Analytics.record({
      name: 'Page',
      attributes: { genre: 'Rock', year: '1920' }
  });
  return (
    <div>
      <div>
        We are on Page 2 detection
      </div>
      <div>
        <button onClick={()=>{
            console.log("Button clicked sending record");
            Analytics.record({
              name: 'Page2ButtonClickedHome',
              attributes: { name: 'SubmitDataNew' }
            });
        }}>Click Here for Page 2 Event</button>
      </div>
    </div>
  )
}