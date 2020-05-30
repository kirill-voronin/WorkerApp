export interface MyWorker {
    id: number;
    name: string;
    surname: string;
    patronymic:string;
    phone: string;
    email: string;
    date: string;
    type: number;
}

export enum MyWorkerType{
    it,
    sales,
    delivery,
    lawyer
}