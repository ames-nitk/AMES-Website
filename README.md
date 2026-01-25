# AMES-Website

> Official website for the Association of Mechanical Engineering Students (AMES), NITK Surathkal

## About

This repository contains the source code for the AMES NITK website, a modern React-based web application showcasing our organization, events, projects, and team. The website serves as the central hub for mechanical engineering students at NITK, providing information about our activities, alumni network, and ways to get involved.

## Tech Stack

- **Frontend:** React.js
- **Styling:** CSS3 with custom animations
- **Routing:** React Router
- **Build Tool:** Create React App
- **Production Server:** Nginx + PM2 on Ubuntu
- **SSL:** Let's Encrypt (Certbot)

## Team

This project was developed and deployed by a collaborative team of three:

- **@adarshs14193** - Frontend Development & Design
- **@Ashutoshgupta-26** - Frontend Development & Features
- **@PrudhviNallagatla** - Production Deployment & DevOps

## Local Development

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ames-nitk/AMES-Website.git
   cd AMES-Website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## Production Deployment

For detailed production deployment instructions (Ubuntu + Nginx + PM2 + HTTPS), see [production_guide.md](production_guide.md).

### Quick Overview

1. Install dependencies: `sudo bash all_dependencies.sh`
2. Setup server: `sudo bash server_setup.sh`
3. Enable SSL: `sudo bash ssl_certbot.sh`
4. Manual Nginx fix (required after SSL setup - see production guide)

## Project Structure

```
AMES-Website/
├── public/             # Static files
├── src/
│   ├── animation/      # Custom animation hooks
│   ├── assets/         # Images and media
│   ├── components/     # React components
│   │   ├── About/
│   │   ├── Contact/
│   │   ├── Events/
│   │   ├── Footer/
│   │   ├── HomePage/
│   │   ├── Navbar/
│   │   └── ...
│   ├── data/           # Static data (alumni, events, projects)
│   ├── Pages/          # Page components
│   ├── App.js          # Main app component
│   ├── routes.js       # Route configuration
│   └── index.js        # Entry point
├── nginx.conf          # Nginx configuration template
├── server_setup.sh     # Production setup script
├── ssl_certbot.sh      # SSL certificate setup
└── package.json        # Dependencies
```

## Contributing

We welcome contributions from AMES members and the NITK community!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

### Guidelines

- Follow the existing code style
- Test your changes locally before submitting
- Update documentation if needed
- Keep commits atomic and descriptive

## License

This project is maintained by AMES, NITK Surathkal.

## Contact

- **Website:** [ames.nitk.ac.in](https://ames.nitk.ac.in)
- **Email:** amesnitk@gmail.com
- **Organization:** Association of Mechanical Engineering Students (AMES), NITK Surathkal

## Acknowledgments

- CCC NITK for hosting and support
- All AMES members who contributed content and feedback
- The open-source community for the tools and libraries used

---

**Maintained with ❤️ by AMES Web Team**
