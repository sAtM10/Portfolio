import mongoose from 'mongoose';

// Reject query-selector injection: any user-supplied object containing `$` keys in a
// filter is wrapped in `$eq`, and unknown filter paths are rejected.
mongoose.set('sanitizeFilter', true);
mongoose.set('strictQuery', 'throw');

const STATES = ['disconnected', 'connected', 'connecting', 'disconnecting'];

export const getDatabaseState = () => STATES[mongoose.connection.readyState] ?? 'unknown';

export const isDatabaseConnected = () => mongoose.connection.readyState === 1;

/** Turns driver errors into actionable messages. Never includes the connection string. */
function describeConnectionError(error) {
  const text = `${error.name} ${error.message} ${error.cause?.message ?? ''}`;
  if (/bad auth|authentication failed/i.test(text)) {
    return 'Authentication failed — check the username and password in MONGODB_URI (URL-encode special characters such as @ : / ? # %).';
  }
  if (/ENOTFOUND|querySrv|EREFUSED/i.test(text)) {
    return 'The cluster hostname could not be resolved — check the cluster address in MONGODB_URI and your internet connection.';
  }
  if (/ServerSelection|whitelist|timed out/i.test(text)) {
    return 'Could not reach the cluster — make sure your current IP is allowed in Atlas → Network Access.';
  }
  return `Unexpected database error (${error.name}).`;
}

function assertUri(uri) {
  if (!uri) {
    throw new Error(
      'MONGODB_URI is not set. Copy server/.env.example to server/.env and add your Atlas connection string.',
    );
  }
  if (uri.includes('<db_password>')) {
    throw new Error(
      'MONGODB_URI still contains the <db_password> placeholder. Replace it with the database user password in server/.env.',
    );
  }
}

export async function connectDatabase(uri, dbName) {
  assertUri(uri);

  mongoose.connection.on('disconnected', () => console.warn('[db] disconnected'));
  mongoose.connection.on('reconnected', () => console.info('[db] reconnected'));

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 10_000, ...(dbName && { dbName }) });
  } catch (error) {
    throw new Error(describeConnectionError(error), { cause: error });
  }

  const { host, name } = mongoose.connection;
  console.log(`[db] connected to database "${name}" on ${host}`);
}

export async function disconnectDatabase() {
  // Intentional shutdown: drop the "disconnected" warning listener first.
  mongoose.connection.removeAllListeners('disconnected');
  await mongoose.disconnect();
}
