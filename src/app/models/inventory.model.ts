export interface Member {
    id?: string;
    name: string;
    internalPartNumber: string;
    manufacturerPartNumber: string;
    location: string;
    amount: string;
    inputedByUser: number;
    borrowedByUser: number;
    image?: File;
}
