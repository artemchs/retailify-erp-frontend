import { emailField, requiredField } from '@/utils/zodErrorMessages'
import { z } from 'zod'

export const logInFormSchema = z.object({
  email: z.string().email({ message: emailField }).min(1, requiredField),
  password: z.string().min(1, requiredField),
})
