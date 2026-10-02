// Scene layout in metres (y up; the desk front edge faces +z towards the camera).
// One place for object placement, marker positions and camera poses so the scene,
// markers and camera rig always agree.

export const DESK_TOP_Y = 0.775;

export const OBJECT_LAYOUT = {
  rack: {
    position: [-1.65, 0, -0.45],
    marker: [-1.65, 1.78, -0.15],
    focus: { position: [-1.05, 1.2, 2.15], target: [-1.65, 0.85, -0.2] },
  },
  terminal: {
    position: [-0.82, DESK_TOP_Y, -0.55],
    rotationY: 0.32,
    marker: [-0.84, 1.42, -0.5],
    focus: { position: [-0.6, 1.22, 0.6], target: [-0.82, 1.15, -0.55] },
  },
  monitor: {
    position: [0, DESK_TOP_Y, -0.62],
    marker: [0.44, 1.7, -0.6],
    focus: { position: [0, 1.32, 1.3], target: [0, 1.25, -0.62] },
  },
  laptop: {
    position: [0.78, DESK_TOP_Y, -0.3],
    rotationY: -0.35,
    marker: [0.8, 1.12, -0.36],
    focus: { position: [0.6, 1.2, 0.62], target: [0.78, 0.9, -0.34] },
  },
  phone: {
    position: [1.18, DESK_TOP_Y, -0.3],
    rotationY: -0.5,
    marker: [1.2, 1.02, -0.3],
    focus: { position: [1.02, 1.05, 0.42], target: [1.18, 0.86, -0.3] },
  },
  cabinet: {
    position: [0.95, 0, -0.42],
    marker: [0.95, 0.68, -0.1],
    focus: { position: [0.8, 0.72, 1.15], target: [0.95, 0.35, -0.15] },
  },
  shelf: {
    position: [0.95, 0, -0.8],
    marker: [0.95, 2.03, -0.72],
    focus: { position: [0.8, 1.78, 0.85], target: [0.95, 1.82, -0.75] },
  },
};

// Overview framing for a 16:9 viewport; the camera rig pulls back for narrower ones.
export const OVERVIEW = {
  position: [0.1, 1.7, 3.3],
  target: [-0.05, 1.0, -0.45],
  referenceAspect: 16 / 9,
};

// Where the camera starts, so entering the workspace is a short dolly-in.
export const INTRO_POSITION = [0.4, 2.5, 5.8];

// Desk lamp (warm key light) sits back-right so it never overlaps the monitor.
export const LAMP_HEAD = [0.64, 1.27, -0.55];
