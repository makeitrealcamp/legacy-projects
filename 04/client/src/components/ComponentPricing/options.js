function OptionsPricing({value,children,state}){
    
    return(
        <>
        {
            state === value 
            ?
            <option value={value} selected>{children}</option>
            :
            <option value={value} >{children}</option>
        }
        </>
    )
}
export default OptionsPricing;