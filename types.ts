
export interface Option {
  id: string;
  label: string;
  isCorrect: boolean;
}

export interface GameState {
  status: 'idle' | 'playing' | 'success' | 'failed';
  message: string;
  aiLoveLetter: string;
}
