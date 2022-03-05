export interface Item{
    id?: string;
    name: string;
    type: string;
    internalPartNumber: string;
    manufacturerPartNumber: string;
    manufacturer: string;
    link: string;
    description: string;
    amountUnit: string;
    location: string;
    amount: number;
    isBorrowable: boolean;
    isBorrowed: boolean,
    // inputedByUser: string;
    borrowedByUser: string;
    image?: File;
    imageUrl: string;
}
