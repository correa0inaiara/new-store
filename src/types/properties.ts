export type PropertyResponse = {
    property_id: string,
    name: string
}

export type PropertyOptionsResponse = {
    property_options_id: string
    option: string
    sku: string
    property_id: string,
    property?: PropertyResponse
}