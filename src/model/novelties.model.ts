
export interface Novelty {
    noveltyId: string,
    senderId: string
    text?: string,
    img?: File | null,
}

export interface NoveltyCard extends Omit<Novelty, "img"> {
    img: string
}

export interface Novelties {
    novelties: Novelty[]
}
