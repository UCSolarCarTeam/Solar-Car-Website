export interface Item {
    id?: string;
    name: string;
    internalPartNumber: string;
    manufacturerPartNumber: string;
    location: string;
    amount: number;
    isBorrowable: boolean;
    isBorrowed: boolean;
    // inputedByUser: string;
    borrowedByUser: string;
    image?: File;
    imageUrl: string;
}
