export function generateTreeTargets(targetCount) {
  const positions = new Float32Array(targetCount * 3);
  const colors = new Float32Array(targetCount * 3);
  let currentIndex = 0;

  function addPoint(x, y, z, r, g, b) {
    if (currentIndex >= targetCount * 3) return false;
    positions[currentIndex] = x;
    positions[currentIndex + 1] = y;
    positions[currentIndex + 2] = z;
    
    colors[currentIndex] = r;
    colors[currentIndex + 1] = g;
    colors[currentIndex + 2] = b;
    
    currentIndex += 3;
    return true;
  }

  // 1. WIDER, MORE MASSIVE TRUNK
  const trunkCount = Math.floor(targetCount * 0.15);
  for (let i = 0; i < trunkCount; i++) {
    const h = i / trunkCount;
    const y = -6 + h * 9; 
    
    // Increased the base radius multiplier from 1.2 to 2.5 for a massive, grounded trunk
    const radius = 2.5 * Math.pow(1 - h, 1.5) + 0.4; 
    const angle = Math.random() * Math.PI * 2;
    
    const twist = h * Math.PI * 2;
    const x = Math.cos(angle + twist) * radius;
    const z = Math.sin(angle + twist) * radius;

    const shade = 0.1 + Math.random() * 0.15;
    addPoint(x, y, z, shade + 0.1, shade * 0.7, shade * 0.4); 
  }

  // 2. WIDER REACHING BRANCHES
  const branchEndpoints = [];
  const numBranches = 16; 
  const branchCount = Math.floor(targetCount * 0.15);
  const pointsPerBranch = Math.floor(branchCount / numBranches);

  for (let b = 0; b < numBranches; b++) {
    const branchAngle = (b / numBranches) * Math.PI * 2 + (Math.random() - 0.5);
    const branchPitch = 0.3 + Math.random() * 0.4; // Flatter angle pushes them wider
    
    // Increased branch length from 5 to 8 for a huge canopy spread
    const branchLength = 6 + Math.random() * 5;

    const startY = 0 + Math.random() * 3;
    const startX = 0; 
    const startZ = 0;

    const endX = startX + Math.cos(branchAngle) * Math.sin(branchPitch) * branchLength;
    const endY = startY + Math.cos(branchPitch) * branchLength;
    const endZ = startZ + Math.sin(branchAngle) * Math.sin(branchPitch) * branchLength;

    branchEndpoints.push({ x: endX, y: endY, z: endZ });

    for (let i = 0; i < pointsPerBranch; i++) {
      const t = i / pointsPerBranch;
      const arch = Math.sin(t * Math.PI) * 2.0; // Higher arch
      const px = startX + (endX - startX) * t;
      const py = startY + (endY - startY) * t + arch;
      const pz = startZ + (endZ - startZ) * t;

      const shade = 0.1 + Math.random() * 0.1;
      addPoint(px, py, pz, shade + 0.1, shade * 0.6, shade * 0.3);
    }
  }

  // 3. THICKER, CLUSTERED LEAVES
  const vineCount = targetCount - (trunkCount + branchCount);
  const numVines = 180; 
  const pointsPerVine = Math.floor(vineCount / numVines);

  for (let v = 0; v < numVines; v++) {
    const endpoint = branchEndpoints[Math.floor(Math.random() * branchEndpoints.length)];
    const startX = endpoint.x + (Math.random() - 0.5) * 4;
    const startY = endpoint.y + (Math.random() - 0.5) * 2;
    const startZ = endpoint.z + (Math.random() - 0.5) * 4;

    const distFromCenter = Math.sqrt(startX * startX + startZ * startZ);
    const vineLength = 4 + Math.random() * 5 + (distFromCenter * 0.2);

    for (let i = 0; i < pointsPerVine; i++) {
      const t = i / pointsPerVine; 
      
      // Increased the scatter (from 0.2 to 1.5) so the leaves cluster thickly around the vine
      const px = startX + (Math.random() - 0.5) * 1.5; 
      const py = startY - (vineLength * t) + (Math.random() - 0.5) * 0.5; 
      const pz = startZ + (Math.random() - 0.5) * 1.5;

      const isTip = t > 0.85;
      if (isTip && Math.random() > 0.6) {
        addPoint(px, py, pz, 0.0, 0.85, 0.95); 
      } else {
        const rCol = 0.05 + (t * 0.1);
        const gCol = 0.25 + (t * 0.5) + Math.random() * 0.2; 
        const bCol = 0.1 + (t * 0.2);
        addPoint(px, py, pz, rCol, gCol, bCol);
      }
    }
  }

  return { positions, colors };
}