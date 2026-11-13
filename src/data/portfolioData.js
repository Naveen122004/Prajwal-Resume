export const nav = ['Home', 'About', 'Expertise', 'Projects', 'Certifications', 'Education', 'Contact'];

export const skills = [
  {
    category: 'Core Domain',
    items: ['Medical Electronics', 'Biomedical Instrumentation', 'Analog Electronics', 'Digital Electronics'],
  },
  {
    category: 'Embedded Systems',
    items: ['Embedded C', 'C Programming', 'Microcontroller Programming', 'Arduino IDE', 'Sensor Integration', 'Stepper Motor Control', 'PWM'],
  },
  {
    category: 'Medical Equipment',
    items: ['ECG', 'EEG', 'Patient Monitoring Systems', 'Pulse Oximeters', 'Ventilators'],
  },
  {
    category: 'Software & Tools',
    items: ['MATLAB', 'Proteus', 'Arduino IDE', 'Python Basics', 'MS Office'],
  },
  {
    category: 'Engineering Skills',
    items: ['Signal Acquisition', 'Signal Processing', 'Circuit Analysis', 'Troubleshooting', 'Testing', 'Calibration', 'Sensors & Transducers'],
  },
];

export const projects = [
  {
    id: '01',
    title: 'Digital Stethoscope for Telemedicine',
    date: 'December 2025',
    tags: ['C', 'Python', 'MATLAB', 'Signal Processing', 'Embedded Systems'],
    description:
      'Developed an electronic acoustic stethoscope designed to acquire real-time phonocardiogram (PCG) signals for heart and lung auscultation.',
    contributions: [
      'Implemented embedded C/C++ microcontroller programming for real-time signal acquisition.',
      'Applied digital signal processing filters and frequency-domain noise suppression using Python and MATLAB.',
      'Developed a graphical interface to visualize live biometric waveforms and manage audio playback.',
      'Implemented data serialization and export protocols for remote clinical assessment.',
    ],
    color: '#2677FF',
    githubUrl: '#', // Replace with actual GitHub URL
    liveUrl: null,
  },
  {
    id: '02',
    title: 'Automated Fast Winding Machine',
    date: 'May 2026',
    tags: ['C', 'Arduino IDE', 'Stepper Motors', 'Embedded Firmware', 'IoT'],
    description:
      'Designed and developed an automated industrial coil-winding system using an Arduino microcontroller and embedded C programming.',
    contributions: [
      'Developed firmware for automated coil winding.',
      'Implemented PWM and stepper motor control algorithms.',
      'Integrated LCD dashboard and tactile input interface.',
      'Enabled real-time calibration of winding metrics.',
      'Optimized winding accuracy and mechanical performance.',
    ],
    color: '#00D4FF',
    githubUrl: '#', // Replace with actual GitHub URL
    liveUrl: null,
  },
];

export const education = [
  {
    degree: 'B.E. – Medical Electronics Engineering',
    institution: 'BMS College, Bengaluru',
    period: 'December 2023 – June 2026',
    score: 'CGPA: 7.00 (Till 8th Semester)',
  },
  {
    degree: 'Diploma in Engineering',
    institution: 'Maratha Mandal Polytechnic, Belagavi',
    period: '2020 – 2023',
    score: 'CGPA: 7.50',
  },
  {
    degree: 'SSLC',
    institution: 'PVS Ainapur, Karnataka',
    period: '2020',
    score: 'Percentage: 71.43%',
  },
];

export const certifications = [
  { title: 'Machine Learning', issuer: 'Simplilearn | SkillUp', icon: '🤖' },
  { title: 'Python 101 for Data Science', issuer: 'IBM', icon: '🐍' },
  { title: 'MATLAB Onramp / Fundamentals', issuer: 'MathWorks', icon: '📊' },
];

export const strengths = [
  'Analytical Thinking',
  'Problem-Solving',
  'Team Collaboration',
  'Communication',
  'Adaptability',
  'Time Management',
  'Continuous Learning',
];

export const languages = ['English', 'Kannada', 'Hindi', 'Marathi'];
export const interests = ['Emerging Technologies', 'Traveling', 'Playing Cricket', 'Watching Cricket'];

export const contact = {
  name: 'Prajwal Banajawad',
  location: 'Bengaluru, Karnataka, India',
  phone: '+91 7411005315',
  email: 'prajwalbanajawad1@gmail.com',
  linkedin: '#', // Replace with actual LinkedIn URL
  github: '#',   // Replace with actual GitHub URL
};
