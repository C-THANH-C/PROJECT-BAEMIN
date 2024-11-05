
import { Prisma } from "@prisma/client";

export const checkNonNegativeValue: Prisma.Middleware = async (params, next) => {
    if (params.model === 'product') {
        const data = params.args?.data;
        if (data?.product_price !== undefined && data.product_price < 0) {
            throw new Error('product_price không thể là số âm');
        }
        if (data?.product_quantity !== undefined && data.product_quantity < 0) {
            throw new Error('product_quantity không thể là số âm');
        }
    }
    return next(params);

}