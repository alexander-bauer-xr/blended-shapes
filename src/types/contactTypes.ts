export interface ContactFormData {
    name: string;
    service: string;
    email: string;
    message: string;
}

export type Step = 'name' | 'service' | 'email' | 'message' | 'done';  