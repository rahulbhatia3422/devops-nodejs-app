const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>DevOps Node.js App</title>
      <style>
        body {
          background-color: #f0f4f8;
          font-family: Arial, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        .container {
          background-color: #ffffff;
          border-radius: 15px;
          padding: 40px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          text-align: center;
          max-width: 600px;
        }
        h1 {
          color: #2e86de;
          margin-bottom: 10px;
        }
        h2 {
          color: #10ac84;
          margin-top: 0;
        }
        p {
          color: #576574;
          font-size: 16px;
          line-height: 1.6;
        }
        .footer {
          margin-top: 30px;
          font-size: 14px;
          color: #888;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🚀 DevOps Node.js App</h1>
        <h2>👨‍💻 Rahul Bhatia</h2>
        <p>Welcome to my DevOps case study project! This Node.js application is a part of a CI/CD pipeline integrated with GitHub, Jenkins, Terraform, Docker, Ansible, and AWS EC2. The goal is to automate deployment workflows, containerize applications, and manage infrastructure as code using modern DevOps tools and practices.</p>
        <div class="footer">App hosted at: http://localhost:${port}</div>
      </div>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
