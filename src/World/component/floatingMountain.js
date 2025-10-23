import * as THREE from 'three';
import { createNoise3D } from 'simplex-noise';

function createFloatingMountain() {
    // Create base icosahedron geometry with high detail for smooth terrain
    const radius = 2;
    const detail = 4; // Higher detail = more vertices to manipulate
    const geometry = new THREE.IcosahedronGeometry(radius, detail);

    // Initialize noise generator for procedural terrain
    const noise3D = createNoise3D();

    // Get vertex positions
    const positionAttribute = geometry.attributes.position;

    // Apply inverted mountain scaling + noise displacement
    for (let i = 0; i < positionAttribute.count; i++) {
        let x = positionAttribute.getX(i);
        let y = positionAttribute.getY(i);
        let z = positionAttribute.getZ(i);

        // Normalize Y coordinate to 0-1 range (0 = bottom, 1 = top)
        const normalizedY = (y + radius) / (radius * 2);

        // STEP 1: Create inverted mountain shape (wider at top, narrower at bottom)
        // Using custom curve for Avatar-style floating mountain
        let scaleFactor;
        if (normalizedY < 0.4) {
            // Bottom 40%: narrow stem
            scaleFactor = 0.25 + normalizedY * 0.3;
        } else {
            // Top 60%: dramatic widening
            scaleFactor = 0.4 + Math.pow((normalizedY - 0.4) / 0.6, 1.5) * 1.8;
        }

        // Apply horizontal scaling (only X and Z, keep Y for height)
        x *= scaleFactor;
        z *= scaleFactor;

        // STEP 2: Add rocky surface detail using 3D noise
        const noiseScale = 1.5; // Controls feature size (lower = larger features)
        const noiseAmplitude = 0.3; // Controls displacement intensity

        // Sample noise at vertex position
        const noiseValue = noise3D(x * noiseScale, y * noiseScale, z * noiseScale);

        // Calculate displacement along the surface normal direction
        const length = Math.sqrt(x * x + y * y + z * z);
        const displacement = noiseValue * noiseAmplitude;

        // Apply displacement outward from center
        x += (x / length) * displacement;
        y += (y / length) * displacement;
        z += (z / length) * displacement;

        // Update vertex position
        positionAttribute.setXYZ(i, x, y, z);
    }

    // Update geometry to reflect changes
    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals(); // Recalculate normals for proper lighting

    // Generate proper UV coordinates for texture mapping
    // IcosahedronGeometry has UVs, but we need to ensure they're properly unwrapped
    const uvAttribute = geometry.attributes.uv;
    if (!uvAttribute) {
        // If no UVs exist, we need to generate them
        const uvs = [];
        for (let i = 0; i < positionAttribute.count; i++) {
            const x = positionAttribute.getX(i);
            const y = positionAttribute.getY(i);
            const z = positionAttribute.getZ(i);

            // Spherical UV mapping
            const length = Math.sqrt(x * x + y * y + z * z);
            const u = 0.5 + Math.atan2(z, x) / (2 * Math.PI);
            const v = 0.5 - Math.asin(y / length) / Math.PI;
            uvs.push(u, v);
        }
        geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    }

    // Generate second UV channel for AO map
    geometry.setAttribute('uv2', geometry.attributes.uv);

    // Load PBR textures
    const textureLoader = new THREE.TextureLoader();
    const basePath = '/src/assets/rocky-rugged-terrain-bl/';

    const albedoMap = textureLoader.load(basePath + 'rocky-rugged-terrain_1_albedo.png');
    const normalMap = textureLoader.load(basePath + 'rocky-rugged-terrain_1_normal-ogl.png');
    const roughnessMap = textureLoader.load(basePath + 'rocky-rugged-terrain_1_roughness.png');
    const aoMap = textureLoader.load(basePath + 'rocky-rugged-terrain_1_ao.png');

    // Create rock material with PBR textures
    const material = new THREE.MeshStandardMaterial({
        map: albedoMap,              // Color texture
        normalMap: normalMap,        // Surface detail
        normalScale: new THREE.Vector2(1, 1), // Normal map intensity
        roughnessMap: roughnessMap,  // Surface roughness variation
        aoMap: aoMap,                // Ambient occlusion for depth
        aoMapIntensity: 1.0,         // AO strength
        metalness: 0,                // Rocks are not metallic
        flatShading: false           // Smooth shading for organic look
    });

    // Create mesh
    const mountain = new THREE.Mesh(geometry, material);

    // Position the mountain
    mountain.position.set(0, 1, 0); // Centered

    // Animation tick function - gentle floating motion
    let time = 0;
    mountain.tick = (delta) => {
        time += delta || 0.016; // Increment time (fallback to ~60fps)

        // Vertical bobbing (slow up and down)
        mountain.position.y = 1 + Math.sin(time * 0.5) * 0.3;

        // Horizontal swaying (subtle side-to-side)
        mountain.position.x = Math.sin(time * 0.3) * 0.2;
        mountain.position.z = Math.cos(time * 0.4) * 0.15;

        // Gentle rotation around Y-axis
        mountain.rotation.y += 0.002;
    };

    return mountain;
}

export { createFloatingMountain };
