export const CastBigIntFromJson = (data:any)=>{
    const tempjson = JSON.stringify(data, (key, value)=>{
            if(typeof value === "bigint"){
                return value.toString();
            }
            return value;
        })
        return JSON.parse(tempjson);
}