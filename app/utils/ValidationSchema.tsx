/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from "zod";

const validationSchema = z.object({
    firstName: z.string().min(2, 'First name is required'),
    middleName: z.string().optional(),
    lastName: z.string().min(2, 'Last name is required'),
    phone: z.string().regex(/^\d{10}$/, 'Invalid phone number'),
    birthDate: z.date(),
    gender: z.enum(['male', 'female', 'other']),
    country: z.string().min(1, 'Country is required'),
    province: z.string().min(1, 'Province is required'),
    district: z.string().min(1, 'District is required'),
    municipality: z.string().min(1, 'Municipality is required'),
    city: z.string().min(1, 'City is required'),
    ward: z.string().min(1, 'Ward is required'),
    profilePicture: z.instanceof(File).optional(),
});

export type FormData = z.infer<typeof validationSchema>
export default validationSchema;    