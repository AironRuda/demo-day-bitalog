export interface Novelty {
  noveltyId: string;
  senderId: string;
  text?: string;
  img?: string;
}

export interface CreateNoveltyDTO extends Omit<Novelty, 'img'> {
  img?: File | null;
}

export interface Novelties {
  novelties: Novelty[];
}
