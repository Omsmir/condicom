import z, { TypeOf } from 'zod';
const validImageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];

const bodyPayload = z.object({
    firstName: z
        .string({ message: 'First name is required' })
        .min(2, { message: 'Minimum characters is 2' }),
    lastName: z
        .string({ message: 'Last name is required' })
        .min(2, { message: 'Minimum characters is 2' }),
    birthDate: z.string({ message: 'Please select a date' }),
    phone: z.string({ message: 'Phone number is required' }),
    weight: z.string().optional(),
    height: z.string().optional(),
    email: z
        .string({ message: 'please write down patient email' })
        .email({ message: 'invalid email supported' }),
    gender: z.string({ message: 'please select a gender' }),
    bloodType: z.string({ message: 'please select a blood type' }),
    country: z.string({ message: 'Please select a country' }),
    emergencyContactPerson: z.string().optional(),
    emergencyContactRelationship: z.string().optional(),
    emergencyContactNumber: z.string({ message: 'emergency number is required' }),
    residentialAddress: z.string().optional(),
    insuranceProvider: z.string().optional(),
    medicalConditions: z.string({
        message: 'please select a medical condition',
    }),
    allergies: z.string({ message: 'please select an allergy' }),
    pastSurgeries: z.string().optional(),
    familyMedicalHistory: z.string().optional(),
    currentMedications: z.string({
        message: 'please describe your medications',
    }),
    smoking: z.enum(['yes', 'no'], {
        required_error: 'Please select if you smoke',
    }),
    smokingFrequency: z.enum(['daily', 'occasionally', 'rarely', 'never']).optional(),
    alcohol: z.enum(['yes', 'no'], {
        required_error: 'Please select if you consume alcohol',
    }),
    alcoholFrequency: z.enum(['daily', 'occasionally', 'rarely', 'never']).optional(),
});

const PatientsPayload = {
    body: z.object({
        patients: z.array(bodyPayload),
    }),
};

const DeletePatientsPayload = {
    body: z.object({
        patientsIds: z.array(z.string()).refine(arr => arr.length > 0, {
            message: 'Please provide array of patient IDs',
        }),
    }),
    query: z.object({
        all: z.string({ required_error: 'query is required' }),
    }),
};
const getPatientPayload = {
    query: z.object({
        email: z
            .string({ message: 'email is required' })
            .email({ message: 'Invalid email address' }),
    }),
};
const payload = {
    body: bodyPayload,
    file: z
        .object({
            profileImg: z
                .custom<Express.Multer.File | undefined>(
                    file => file !== undefined && file !== null,
                    {
                        message: 'please select a profile picture',
                    }
                )
                .refine(
                    file => {
                        if (!file) return false;
                        const fileName = file.originalname.toLowerCase();
                        const extension = fileName.split('.').pop();
                        return validImageExtensions.includes(extension || '');
                    },
                    { message: 'Invalid image extension' }
                ),
        })
        .optional(),
};

const params = {
    params: z.object({
        id: z.string({ message: 'id is required' }),
    }),
};

const GetPatientsForSpecificPeriodPayload = {
     body:z.object({
        filters:z.array(z.object({
            columnId:z.string(),
            value:z.any()
        }))
    }),
    query: z.object({
        date: z.string().optional(),
        pageSize: z.string().optional(),
        pageIndex: z.string().optional(),
    })
   
};
export const patientSchema = z.object({
    ...payload,
});

export const getPatientSchema = z.object({
    ...params,
});

export const getPatientByEmailSchema = z.object({
    ...getPatientPayload,
});
export const deletePatientSchema = z.object({
    ...params,
});

export const PatientsSchema = z.object({
    ...PatientsPayload,
});

export const deletePatientsSchema = z.object({
    ...params,
    ...DeletePatientsPayload,
});

export const getPatientsForPeriodSchema = z.object({
    ...GetPatientsForSpecificPeriodPayload,
});

export type patientSchemaInterface = z.infer<typeof patientSchema>;
export type GetpatientSchemaInterface = z.infer<typeof getPatientSchema>;
export type DeletepatientSchemaInterface = z.infer<typeof deletePatientSchema>;
export type PatientsSchemaInterface = z.infer<typeof PatientsSchema>;
export type DeletePatientsSchemaInterface = z.infer<typeof deletePatientsSchema>;
export type GetPatientByEmailSchemaInterface = z.infer<typeof getPatientByEmailSchema>;
export type GetPatientsForPeriodSchemaInterface = z.infer<typeof getPatientsForPeriodSchema>;
