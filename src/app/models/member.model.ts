export interface Member {
    id? : string;
    name: string;
    position: string;
    subteam: string;
    major: string;
    description: string;
    year: number;
    imageName: string;
    image?: File;
}
