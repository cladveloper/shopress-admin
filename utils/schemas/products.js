import { validationMixin } from 'vuelidate';
import { required, minLength, maxLength, between } from 'vuelidate/lib/validators'

const productsSchema = {
    mixins: [validationMixin],
    validations: { 
        form: {
            name: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(180)
            },
            description: {
                maxLength: maxLength(2500)
            },
            sku: {
                maxLength: maxLength(500)
            },
            price: {
                required,
                between: between(0, 999999999),
            },
            stock: {
                between: between(0, 999999999),
            },
            url: {
                required,
                maxLength: maxLength(50),
                regex: (url) => {
                    return /^[\w-]{1,50}$/.test(url);
                }
            },
        }
    }
}

export {
    productsSchema
}