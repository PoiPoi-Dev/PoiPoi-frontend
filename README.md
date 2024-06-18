# POI POI

is an immersive web game that challenges players to identify locations within Tokyo using visual clues from carefully curated images.

## Features

- **Responsive Design:** The application is desinged with Mobile first in mind.
- **Interactive Maps:** Leveraging MapLibre GL, the application offers interactive map functionality, allowing users to explore and interact with geographical data.
- **Accessibility:** The user interface components are built with accessibility in mind, following best practices and guidelines for inclusive design.

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for server-rendered and static applications
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Shad/CN](https://ui.shadcn.com/) - Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable.
- [Firebase](https://firebase.google.com/) - Google's cloud-based platform for building web and mobile applications
- [MapLibre GL](https://maplibre.org/) - Open-source map rendering library
- [Jest](https://jestjs.io/) - JavaScript testing framework

## Architectural Highlights

### Front End

- **Architectural Highlights:** The application follows a microservices architecture, with the frontend and backend components deployed and scaled independently. The frontend is deployed on Vercel, a cloud platform for static sites and Serverless Functions, while the backend is deployed on Heroku, a cloud platform for hosting and running applications. This architectural approach promotes scalability, flexibility, and separation of concerns, allowing each component to evolve and be maintained independently.
- **Server-side Rendering (SSR):** Next.js is used to provide server-side rendering, improving initial load times and enhancing the overall performance of the application.
- **Component-based Architecture:** The application follows a component-based architecture, promoting code reusability and modular development.
- **State Management:** The application utilizes React's built-in state management capabilities, along with Redux for managing global application state when necessary.
- **Testing:** The codebase includes unit tests and integration tests, ensuring code quality and facilitating easier maintenance and refactoring.
- **Modular Architecture:** The codebase is structured using a modular approach, promoting code reusability, maintainability, and scalability.

![High-Level-Diagram](image.png)

## Getting Started

### Prerequisites

- [Node.js] (https://nodejs.org/en)
- [Firebase] (https://firebase.google.com/): Account for their Authentication and Picture Storage
- [Protomaps] (https://protomaps.com/dashboard): API Key

### Installation

1. Fork the repository on GitHub.
2. Clone your forked repository:
3. Navigate to the project directory:
4. Install dependencies:

```
npm install
```

### Firebase - Setup

1. Install Firebase with npm install -g firebase-tools. To check your current version of Firebase, run the command firebase --version.

2. The installation is done globally, so if you encounter an firebase: command not found error, be sure to update your PATH variable on your machine's environmental variables or run npm exec -- firebase [CLI args].

3. Log into Firebase with firebase login using the account that has the Firebase project.
   3.1 Initialize Firebase with firebase init, and set up the Authentication emulator.
   3.2 If a .firebaserc file already exists, run the command firebase init emulators instead.

4. Set your firebaseConfig object variables in .env. These values can be found in the Google Firebase Console: Project Settings → Your app → SDK setup and configuration.
5. Run the command firebase emulators:start.

### Development

To start the development server, run:

```
npm run dev
```

The application will be available at `https://localhost:3000`.

### Setting up the Enviromental Variables

Go to .env.local.example folder and replace the placeholders with your keys

### Building for Production

To build the application for production, run:

```
npm run build
```

After the build is complete, you can start the production server with:

```
npm start
```

### Linting and Testing

To lint the codebase, run:

```
npm run lint
```

To run the test suite, execute:

```
npm test
```

For watching changes and re-running tests, use:

```
npm run test:watch
```

## Contributing

1. Fork the project repository on GitHub.
2. Create a new branch for your feature or bug fix: `git checkout -b my-new-feature`
3. Make changes and commit them: `git commit -am 'Add some feature'`
4. Push your branch to your forked repository: `git push origin my-new-feature`
5. Create a new Pull Request on the original repository.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

Thank you to:

[Chad] (https://github.com/orgs/CC34-Senior-Project/people/chadgrover) for helping us in by giving advice on what to prioritize.
[Tomas] Video that helped us set up the sctrict type script rules: https://www.youtube.com/watch?v=Y2OpsF_dkrQ&t=274s

## Team

[Ter] (https://github.com/departurelv)
[Jarrod] (https://github.com/J-Ariola)
[Dominik] (https://github.com/dominiksakic)
[Ning] (https://github.com/NChang55)
[Deana] (https://github.com/deanachou)
[Jacob] (https://github.com/Flumanuck)
