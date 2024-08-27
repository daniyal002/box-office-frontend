export interface ICash{
    id?:number,
    cash_name:string,
    cash_summ?:number
}

export interface ICashOption{
    value:number
    label:string,
}

export interface ICashFormValues{
    cash:ICashOption
}
