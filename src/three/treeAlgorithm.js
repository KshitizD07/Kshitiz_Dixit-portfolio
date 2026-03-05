/* ============================================
   ENHANCED TREE ALGORITHM
   Better structure, natural branching, realistic proportions
   ============================================ */

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
  
  // ============================================
  // 1. TRUNK - Tall, thick, tapered trunk
  // ============================================
  const trunkCount = Math.floor(targetCount * 0.18); // 18% for trunk
  for (let i = 0; i < trunkCount; i++) {
    const h = i / trunkCount; // 0 to 1 from bottom to top
    const y = -7 + h * 10; // Height from -7 to 3
    
    // Trunk radius - thick at base, thin at top
    const baseRadius = 1.8;
    const topRadius = 0.3;
    const radius = baseRadius * (1 - h) + topRadius * h;
    
    // Add slight twist for natural look
    const twist = h * Math.PI * 0.5;
    const angle = Math.random() * Math.PI * 2 + twist;
    
    const x = Math.cos(angle) * radius * (0.8 + Math.random() * 0.4);
    const z = Math.sin(angle) * radius * (0.8 + Math.random() * 0.4);
    
    // Bark color - dark brown with variation
    const shade = 0.08 + Math.random() * 0.12;
    addPoint(x, y, z, shade + 0.05, shade * 0.6, shade * 0.3);
  }
  
  // ============================================
  // 2. MAJOR BRANCHES - Primary branch structure
  // ============================================
  const branchEndpoints = [];
  const numMajorBranches = 8; // Fewer but stronger branches
  const majorBranchCount = Math.floor(targetCount * 0.12);
  const pointsPerMajorBranch = Math.floor(majorBranchCount / numMajorBranches);
  
  for (let b = 0; b < numMajorBranches; b++) {
    // Spiral distribution around trunk
    const branchAngle = (b / numMajorBranches) * Math.PI * 2 + Math.random() * 0.3;
    const branchHeight = 0.5 + (b / numMajorBranches) * 2; // Spread vertically
    
    // Branch grows outward and upward
    const pitch = 0.4 + Math.random() * 0.3; // Angle from horizontal
    const length = 4 + Math.random() * 2.5;
    
    const startX = Math.cos(branchAngle) * 0.5;
    const startY = branchHeight;
    const startZ = Math.sin(branchAngle) * 0.5;
    
    const endX = startX + Math.cos(branchAngle) * Math.sin(pitch) * length;
    const endY = startY + Math.cos(pitch) * length * 0.8;
    const endZ = startZ + Math.sin(branchAngle) * Math.sin(pitch) * length;
    
    branchEndpoints.push({ x: endX, y: endY, z: endZ, angle: branchAngle });
    
    // Create branch with tapering
    for (let i = 0; i < pointsPerMajorBranch; i++) {
      const t = i / pointsPerMajorBranch;
      
      // Natural curve - arch upward
      const arch = Math.sin(t * Math.PI) * 1.5;
      
      // Taper the branch
      const branchRadius = 0.25 * (1 - t * 0.7);
      const radialOffset = (Math.random() - 0.5) * branchRadius;
      
      const px = startX + (endX - startX) * t + radialOffset;
      const py = startY + (endY - startY) * t + arch;
      const pz = startZ + (endZ - startZ) * t + radialOffset;
      
      // Branch color - slightly lighter than trunk
      const shade = 0.12 + Math.random() * 0.08;
      addPoint(px, py, pz, shade + 0.08, shade * 0.65, shade * 0.35);
    }
  }
  
  // ============================================
  // 3. SECONDARY BRANCHES - Smaller branches from main branches
  // ============================================
  const secondaryBranchCount = Math.floor(targetCount * 0.15);
  const numSecondaryBranches = 24;
  const pointsPerSecondary = Math.floor(secondaryBranchCount / numSecondaryBranches);
  
  for (let s = 0; s < numSecondaryBranches; s++) {
    // Pick a random major branch endpoint
    const parent = branchEndpoints[Math.floor(Math.random() * branchEndpoints.length)];
    
    // Secondary branch grows from parent
    const subAngle = parent.angle + (Math.random() - 0.5) * Math.PI;
    const subLength = 2 + Math.random() * 1.5;
    const subPitch = 0.3 + Math.random() * 0.4;
    
    const startX = parent.x + (Math.random() - 0.5);
    const startY = parent.y - Math.random() * 0.5;
    const startZ = parent.z + (Math.random() - 0.5);
    
    const endX = startX + Math.cos(subAngle) * Math.sin(subPitch) * subLength;
    const endY = startY + Math.cos(subPitch) * subLength * 0.6;
    const endZ = startZ + Math.sin(subAngle) * Math.sin(subPitch) * subLength;
    
    for (let i = 0; i < pointsPerSecondary; i++) {
      const t = i / pointsPerSecondary;
      
      const px = startX + (endX - startX) * t + (Math.random() - 0.5) * 0.2;
      const py = startY + (endY - startY) * t;
      const pz = startZ + (endZ - startZ) * t + (Math.random() - 0.5) * 0.2;
      
      const shade = 0.15 + Math.random() * 0.08;
      addPoint(px, py, pz, shade, shade * 0.6, shade * 0.3);
    }
  }
  
  // ============================================
  // 4. LEAF CLUSTERS - Dense foliage
  // ============================================
  const leafCount = targetCount - (trunkCount + majorBranchCount + secondaryBranchCount);
  const numLeafClusters = 120; // Many clusters
  const leavesPerCluster = Math.floor(leafCount / numLeafClusters);
  
  for (let c = 0; c < numLeafClusters; c++) {
    // Leaves cluster around branch endpoints
    const endpoint = branchEndpoints[Math.floor(Math.random() * branchEndpoints.length)];
    
    // Cluster center with some spread
    const clusterX = endpoint.x + (Math.random() - 0.5) * 3;
    const clusterY = endpoint.y + (Math.random() - 0.5) * 2;
    const clusterZ = endpoint.z + (Math.random() - 0.5) * 3;
    
    // Cluster size varies
    const clusterSize = 0.8 + Math.random() * 1.2;
    
    for (let i = 0; i < leavesPerCluster; i++) {
      // Spherical distribution around cluster center
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = Math.random() * clusterSize;
      
      const px = clusterX + r * Math.sin(phi) * Math.cos(theta);
      const py = clusterY + r * Math.sin(phi) * Math.sin(theta);
      const pz = clusterZ + r * Math.cos(phi);
      
      // Leaf color - vibrant greens with variation
      const isFlower = Math.random() > 0.92; // 8% flowers
      
      if (isFlower) {
        // Bright cyan/blue flowers
        addPoint(px, py, pz, 0.1, 0.7, 0.95);
      } else {
        // Various shades of green
        const lightness = Math.random();
        const rCol = 0.08 + lightness * 0.15;
        const gCol = 0.35 + lightness * 0.45;
        const bCol = 0.12 + lightness * 0.20;
        addPoint(px, py, pz, rCol, gCol, bCol);
      }
    }
  }
  
  console.log(`🌳 Enhanced tree generated with ${Math.floor(currentIndex / 3)} particles`);
  return { positions, colors };
}