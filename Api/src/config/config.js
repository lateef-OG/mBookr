export default {
  development: {
    username: 'postgres',
    password: 'databasepassword',
    database: 'mbookr',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: 'postgres',
    password: 'databasepassword',
    database: 'mbookr',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
  },
};
