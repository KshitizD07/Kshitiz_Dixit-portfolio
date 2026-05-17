# Cosmic Portfolio

A high-performance, immersive 3D portfolio website built with **React**, **Vite**, and **Three.js**. This project pushes the boundaries of web UI by integrating procedural particle animations with a modular, component-based architecture.

## 🚀 Key Features

*   **Immersive 3D Experience**: Uses `@react-three/fiber` and `@react-three/drei` to render a dynamic "Big Bang" tree background that adapts to user device performance.
*   **Procedural Animations**: Custom particle systems handle complex sequences including explosions, dispersal, and UI reconstruction.
*   **Modular Architecture**: Built for scale, featuring discrete sections for Hero, About, Projects, Research, Skills, Ideas, and Contact.
*   **Performance Optimized**: Automatically adjusts particle density based on screen dimensions for smooth HMR and user interaction.
*   **Fluid Transitions**: Implements GSAP for precise animation control and smooth interaction flows.

## 🛠 Tech Stack

*   **Frontend**: React 19, Vite
*   **3D/Graphics**: Three.js, React Three Fiber, React Three Drei
*   **Animation**: GSAP (GreenSock Animation Platform)
*   **Controls**: Leva (integrated for rapid UI/3D debugging)
*   **Tooling**: ESLint, PostCSS

## 📂 Project Structure

- `src/components/`: Modular React components for each portfolio section.
- `src/three/`: 3D-specific logic, including custom tree growth algorithms and shader implementations.
- `src/animations/`: Custom logic for the particle systems powering the site transitions.
- `src/pages/`: Main page layouts (`Home.jsx`).
- `src/App.jsx`: Main entry point and 3D background wrapper.

## 🏗 Setup & Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## 📜 Animation Workflow

The portfolio features a unique intro sequence:
1. **Explosion**: A high-energy circular explosion of 500+ particles.
2. **Reconstruction**: Smooth transition as particles flow to form the layout of the landing section.
3. **Reveal**: A clean fade-in that transitions the user from the 3D visual experience into the main content.

---

*Built with passion for immersive web design.*
