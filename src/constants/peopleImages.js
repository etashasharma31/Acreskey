/** Portrait URLs — Indian professionals for agents, testimonials, and CTAs. */
const base = (id, w = 400) =>
  `https://images.unsplash.com/${id}?w=${w}&fit=crop&crop=faces&auto=format`;

export const PEOPLE_IMAGES = {
  agentMale1: base('photo-1653666866518-d01fabfa94c2', 400),
  agentMale2: base('photo-1626063240213-c629ae4ef34c', 400),
  agentMale3: base('photo-1656221010175-bcfeadcb6017', 400),
  agentFemale1: base('photo-1620025939271-47be27b7449c', 400),
  agentFemale2: base('photo-1620025852056-b52acdd0266c', 400),
  agentFemale3: base('photo-1620025939271-47be27b7449c', 400),
  featuredAgentMale: base('photo-1653666866518-d01fabfa94c2', 600),
  featuredAgentFemale: base('photo-1620025939271-47be27b7449c', 600),
  joinAgentBanner: base('photo-1626063240213-c629ae4ef34c', 800),
  expertMale: base('photo-1656221010175-bcfeadcb6017', 600),
  expertFemale: base('photo-1620025852056-b52acdd0266c', 600),
  testimonialFemale: base('photo-1620025939271-47be27b7449c', 100),
  testimonialMale: base('photo-1653666866518-d01fabfa94c2', 100),
};

export const AGENT_AVATARS = {
  male: [PEOPLE_IMAGES.agentMale1, PEOPLE_IMAGES.agentMale2, PEOPLE_IMAGES.agentMale3],
  female: [PEOPLE_IMAGES.agentFemale1, PEOPLE_IMAGES.agentFemale2, PEOPLE_IMAGES.agentFemale3],
};
