import migrateTables from './tables';

(async () => {
  console.log('creating tables...');
  await migrateTables();
})();
