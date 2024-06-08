const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bloggify - APIs",
      description:
        "API endpoints for a bloggify web application documented on swagger",
      contact: {
        name: "Divyanshu Prasad",
        url: "https://divyanshuprasad.dev/",
      },
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:8000/",
        description: "Local server",
      },
      {
        url: "https://blog-mern-app-c78l.onrender.com",
        description: "Live server",
      },
    ],
    components: {
      securitySchemes: {
        apiKeyAuth: { 
          type: "apiKey",
          in: "header", 
          name: "Authorization", 
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};
const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  console.log(`Swagger docs setup on port ${port}`);
}

module.exports = swaggerDocs;
