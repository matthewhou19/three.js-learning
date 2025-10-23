import { World } from "./World/World.js";

// Get canvas element
const canvas = document.getElementById("canvas");

// Create the world instance
const world = new World(canvas);

// Start the animation
world.start();
