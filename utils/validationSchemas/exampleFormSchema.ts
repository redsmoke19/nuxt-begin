import * as yup from 'yup'

const generalSchema = yup.object({
  name: yup.string().required('Введите имя'),
  surname: yup.string().required('Введите фамилию'),
  email: yup.string().required('Введите email').email('Введите корректный email'),
  phone: yup.string().required('Введите телефон').min(17, 'Введите корректный телефон'),
  password: yup.string().required('Введите пароль').min(6, 'Пароль должен содержать минимум 6 символов'),
  agree: yup.boolean().oneOf([true], 'Необходимо подтвердить согласие').required('Необходимо подтвердить'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Пароли должны совпадать')
    .required('Подтвердите пароль')
})

type GeneralSchemaKeys = keyof yup.InferType<typeof generalSchema>

export default (fields: GeneralSchemaKeys[]) => {
  return generalSchema.pick(fields)
}
