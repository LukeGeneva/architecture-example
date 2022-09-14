export let DATA_DIR = process.env.DATA_DIR as string;
export let NODE_ENV = process.env.NODE_ENV as string;
export let SESSION_SECRET = process.env.SESSION_SECRET as string;
export let STORAGE_METHOD = process.env.STORAGE_METHOD as string;

if (process.env.NODE_ENV === 'development') {
  assertVariable('DATA_DIR');
  assertVariable('SESSION_SECRET');
  assertVariable('STORAGE_METHOD');

  if (!['local', 'prisma'].includes(STORAGE_METHOD)) {
    throw new Error(
      'Invalid storage method. Valid storage methods are "local" or "prisma".'
    );
  }
}

if (process.env.NODE_ENV === 'production') {
  assertVariable('SESSION_SECRET');
  assertVariable('STORAGE_METHOD');
}

function assertVariable(variable: string) {
  if (!process.env[variable])
    throw new Error(`${variable} environment variable is required.`);
}
