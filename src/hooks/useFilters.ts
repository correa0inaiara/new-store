import { useMemo } from 'react';

export const useFilters = (initialValue: string, isNumber: false = false) => {
    const filters = useMemo(() => ({
        value: initialValue,

        uppercase() {
            if (isNumber) return false

            this.value = this.value?.toUpperCase() || '';
            return this;
        },

        lowercase() {
            if (isNumber) return false
            
            this.value = this.value?.toLowerCase() || '';
            return this;
        },

        currency(currency = 'BRL') {
            let new_value = Number(this.value)
            this.value = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency
            }).format(new_value);
            return this;
        },

        get() {
            return this.value;
        }
    }), [initialValue]);

    return filters;
};