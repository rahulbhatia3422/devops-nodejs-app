const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" /> 
      <title>DevOps Node.js App</title>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
      <style>
        :root {
          --primary: #4361ee;
          --secondary: #3a0ca3;
          --accent: #f72585;
          --light: #f8f9fa;
          --dark: #212529;
        }
        
        body {
          margin: 0;
          padding: 0;
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          font-family: 'Poppins', sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          color: var(--dark);
          animation: gradientShift 15s ease infinite;
          background-size: 200% 200%;
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .container {
          background: rgba(255, 255, 255, 0.95);
          padding: 2.5rem;
          border-radius: 20px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
          text-align: center;
          max-width: 700px;
          width: 90%;
          transform: translateY(0);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          backdrop-filter: blur(5px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        .container:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
        }
        
        h1 {
          color: var(--primary);
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
          background: linear-gradient(to right, #4361ee, #3a0ca3);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .tagline {
          color: var(--secondary);
          font-weight: 400;
          margin-bottom: 2rem;
          font-size: 1.1rem;
        }
        
        .dev-name {
          display: inline-block;
          background: linear-gradient(to right, #f72585, #b5179e);
          padding: 0.5rem 1.5rem;
          border-radius: 50px;
          color: white;
          font-weight: 600;
          margin: 1rem 0;
          box-shadow: 0 4px 15px rgba(247, 37, 133, 0.3);
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        .description {
          color: #555;
          line-height: 1.8;
          font-size: 1.1rem;
          margin: 2rem 0;
          text-align: left;
        }
        
        .description strong {
          color: var(--secondary);
        }
        
        .tech-stack {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 10px;
          margin: 2rem 0;
        }
        
        .tech-item {
          background: var(--light);
          padding: 0.5rem 1rem;
          border-radius: 50px;
          font-size: 0.9rem;
          color: var(--primary);
          border: 1px solid #e0e0e0;
          transition: all 0.3s ease;
        }
        
        .tech-item:hover {
          background: var(--primary);
          color: white;
          transform: translateY(-2px);
        }
        
        .footer {
          font-size: 0.9rem;
          color: #888;
          margin-top: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 15px;
        }
        
        .visit-count {
          background: var(--light);
          padding: 0.3rem 0.8rem;
          border-radius: 50px;
          font-weight: 600;
          color: var(--accent);
        }
        
        .social-links {
          display: flex;
          gap: 15px;
        }
        
        .social-icon {
          color: var(--primary);
          font-size: 1.2rem;
          transition: all 0.3s ease;
        }
        
        .social-icon:hover {
          transform: translateY(-3px) scale(1.1);
        }
        
        .fa-linkedin:hover {
          color: #0a66c2;
        }
        
        .fa-github:hover {
          color: #333;
        }
        
        .server-info {
          background: var(--light);
          padding: 0.3rem 0.8rem;
          border-radius: 50px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🚀 DevOps Node.js Application</h1>
        <p class="tagline">Automated Deployment Pipeline with CI/CD</p>
        
        <div class="dev-name">👨‍💻 Rahul Bhatia | DevOps Engineer</div>
        
        <p class="description">
          This application demonstrates a complete DevOps workflow featuring:
          <br><br>
          • <strong>CI/CD Pipeline</strong> with Jenkins<br>
          • <strong>Containerization</strong> using Docker<br>
          • <strong>Infrastructure as Code</strong> with Terraform<br>
          • <strong>Configuration Management</strong> via Ansible<br>
          • <strong>Cloud Deployment</strong> on AWS<br>
          • <strong>Version Control</strong> with Git and GitHub
        </p>
        
        <div class="tech-stack">
          <span class="tech-item">Node.js</span>
          <span class="tech-item">Express</span>
          <span class="tech-item">Git</span>
          <span class="tech-item">GitHub</span>
          <span class="tech-item">Docker</span>
          <span class="tech-item">Terraform</span>
          <span class="tech-item">Ansible</span>
          <span class="tech-item">AWS</span>
          <span class="tech-item">Jenkins</span>
        </div>
        
        <div class="footer">
          <div class="visit-count">Visits: ${Math.floor(Math.random() * 1000)}</div>
          <div class="server-info">Server: http://localhost:${port}</div>
          <div class="social-links">
            <a href="https://www.linkedin.com/in/rahul-bhatia-6ba321207/" target="_blank" class="social-icon">
              <i class="fab fa-linkedin"></i>
            </a>
            <a href="https://github.com/rahulbhatia3422" target="_blank" class="social-icon">
              <i class="fab fa-github"></i>
            </a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
