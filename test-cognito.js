import { CognitoIdentityProviderClient, InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";

const client = new CognitoIdentityProviderClient({ region: "us-east-1" });

async function testLogin() {
  console.log("🔍 Testing Cognito Authentication...");
  console.log("User Pool ID: us-east-1_2ZIzhhjUY");
  console.log("Client ID: 7qi3ollo7i0uj6r07tcuk2r93i");
  console.log("Username: jd@jeremiahblakely.com");
  console.log("---");

  try {
    const response = await client.send(new InitiateAuthCommand({
      ClientId: "7qi3ollo7i0uj6r07tcuk2r93i",
      AuthFlow: "USER_PASSWORD_AUTH",
      AuthParameters: {
        USERNAME: "jd@jeremiahblakely.com",
        PASSWORD: "[INSERT_PASSWORD_HERE]"
      }
    }));
    
    console.log("✅ Success:", JSON.stringify(response, null, 2));
    
    if (response.ChallengeName) {
      console.log(`🔄 Challenge Required: ${response.ChallengeName}`);
    }
    
  } catch (error) {
    console.error("❌ Error:", error.name);
    console.error("📝 Message:", error.message);
    console.error("🔧 Full Error:", JSON.stringify(error, null, 2));
  }
}

testLogin();