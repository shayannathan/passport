const config = {
    MAX_ATTACHMENT_SIZE: 5000000,
    s3: {
      REGION: "us-east-2",
      BUCKET: "notes-app-upload-shayan",
    },
    apiGateway: {
      REGION: "us-east-1",
      URL: "https://uk8zl19qge.execute-api.us-east-1.amazonaws.com/prod",
    },
    cognito: {
      REGION: "us-east-2",
      USER_POOL_ID: "us-east-2_9nKwZ5eBC",
      APP_CLIENT_ID: "3bgt063hf9mcs6smriaepsfo4k",
      IDENTITY_POOL_ID: "us-east-2:bd7abe7b-0998-40de-8fc9-e56405c3cae5",
    },
};
  
export default config;