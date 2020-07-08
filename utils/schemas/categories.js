import { validationMixin } from 'vuelidate';
import { required, maxLength } from 'vuelidate/lib/validators'

const categoriesSchema = {
    mixins: [validationMixin],
    validations: { 
        form: {
            name: {
                required,
                maxLength: maxLength(180)
            },
            description: {
                maxLength: maxLength(2500)
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
    categoriesSchema
}