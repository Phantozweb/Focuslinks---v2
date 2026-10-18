export type DemoScene = 'feed' | 'directory' | 'typing' | 'chat';

export interface SimulatedDoctor {
  id: string;
  name: string;
  credentials: string;
  headline: string;
  clinic: string;
  location: string;
  avatar: string;
  bannerImage: string;
  mutuals: number;
  bio: string;
  peerConcordance: number;
}
