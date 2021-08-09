echo "Configuring database"
export PGPASSWORD="postgres"
# dropdb -U postgres far_away_app
createdb -U postgres application_database
echo "Configured CREATING TABLES"
psql -U postgres  < ./src/db/sql/CREATE_TABLES.sql
echo "Configured INSERTING TO TABLES"
psql -U postgres  < ./src/db/sql/INSERT_TO_TABLES.sql
echo "Configured CREATING FUNCTIONS"
psql -U postgres  < ./src/db/sql/CREATE_FUNCTIONS.sql
echo "Configured database"