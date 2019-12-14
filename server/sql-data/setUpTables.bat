@ECHO OFF

cd C:\Users\asauerwein\Desktop\CompetencyViz\server\sql-data
set pgpassword=competencyviz
DO  BEGIN PERFORM pg_sleep(1); END $$;|psql -d postgres -U competencyviz
\c competency
drop table tag;
drop table tag_parents;
set client_encoding to 'utf8';
\i create.sql;
\i data-dev.sql;
