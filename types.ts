export type AppPhase = 'volume' | 'intro' | 'birthdayIntro' | 'personality' | 'gallery' | 'video' | 'final' | 'finalVideo' | 'thankYou';

export interface Memory {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  rotation: number;
}