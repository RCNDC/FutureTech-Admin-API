export async function generateId():Promise<string>{
    const { v4 } = await import('uuid');
    return v4();
}

export async function generateOrder(length?:number):Promise<string>{
    const {nanoid} = await import('nanoid')
    return nanoid(length || 5);
}