const GoogleAdressFilter = (addressComponents,types)=>{    

    switch(types){
        case 'street_address':
            return addressComponents[6]+ ' ' +addressComponents[5]
        case 'route':
            return addressComponents[2]+ ' ' +addressComponents[3]
        case 'intersection':
            return addressComponents[4]+ ' ' +addressComponents[5]
        case 'political':
            return addressComponents[1]+ ' ' +addressComponents[2]
        case 'country':
            return addressComponents[0]
        case 'locality':
            return addressComponents[1]+ ' ' +addressComponents[2]
        case 'sublocality':
            return addressComponents[1]+ ' ' +addressComponents[2]
        case 'neighborhood':
            return addressComponents[1]+ ' ' +addressComponents[2]
        case 'park':
            return addressComponents[4]+ ' ' +addressComponents[5]
        case 'point_of_interest':
            return addressComponents[6]+ ' ' +addressComponents[5]
        case "establishment":
            return addressComponents[6]+ ' ' +addressComponents[5]
        default:
            return addressComponents[0]
    }
}

export default GoogleAdressFilter;