const config = {
  s3: {
    REGION: "us-west-2",
    BUCKET: "passport-app-upload",
  },
  apiGateway: {
    REGION: "us-west-2",
    URL: "https://2y2ztkkbjk.execute-api.us-west-2.amazonaws.com/prod",
  },
  cognito: {
    REGION: "us-east-2",
    USER_POOL_ID: "us-east-2_2LUzwluEH",
    APP_CLIENT_ID: "1c948fblu6cfsii9o1ebb5b5n2",
    IDENTITY_POOL_ID: "us-east-2:ff9b2353-b947-4060-b711-c82d1b9c1054",
  },
  googleMapsAPIKey: 'AIzaSyCQYVVXOxb1FV6fi-QUV_iDsvqR9S3k70o'
};

export default config;