// frontend/env.d.ts or frontend/types/env.d.ts

namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_URL: string;
      NEXT_PUBLIC_PORT: string;
      NEXTAUTH_SECRET: string;
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
  