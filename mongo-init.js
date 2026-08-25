// Runs automatically the first time the mongo container starts with an
// empty data volume. Creates the same application-level user your local
// MongoDB already has, scoped to support_desk_db only (not a root/admin
// user) - matching how your actual local database is set up.
db = db.getSiblingDB('support_desk_db');

db.createUser({
  user: 'support_app_user',
  pwd: 'supportPwd123',
  roles: [
    { role: 'readWrite', db: 'support_desk_db' }
  ]
});