
const throwIfUndefined = (key: string, value: string | undefined): string | null => {
    if (!value) {
        console.error(`error loading env variable ${key}`)
        return null
    }
    return value;
  };
  
  export const config= {
    NODE_ENV: throwIfUndefined('NODE_ENV', process.env.NODE_ENV),
    NEXT_PUBLIC_API_URL: throwIfUndefined('NEXT_PUBLIC_API_URL', process.env.NEXT_PUBLIC_API_URL),
    PORT: throwIfUndefined('NEXT_PUBLIC_PORT', process.env.NEXT_PUBLIC_PORT),
  };
  