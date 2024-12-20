export type Ad = {
        id:number;
        title: string;
        description?: string;
        owner: string;
        price: number; 
        picture: string;
        location: string; 
        createdAt: string;
}

export type Categ = {
        id: number; 
        name: string;
}
