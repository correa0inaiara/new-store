export enum ENUM_CART_STATUS {
    ACTIVE,
    ABANDONED,
    CHECKOUT_PENDING,
    COMPLETED
}

export type Type_Cart_Status = ENUM_CART_STATUS.ACTIVE | 
                          ENUM_CART_STATUS.ABANDONED | 
                          ENUM_CART_STATUS.CHECKOUT_PENDING | 
                          ENUM_CART_STATUS.COMPLETED 