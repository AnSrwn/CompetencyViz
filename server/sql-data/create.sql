--<ScriptOptions statementTerminator=";"/>

CREATE TABLE tag (
		id INT8 NOT NULL,
		created TIMESTAMP NOT NULL,
		created_by VARCHAR(255) NOT NULL,
		modified TIMESTAMP,
		modified_by VARCHAR(255),
		version INT8,
		description VARCHAR(8192),
		name VARCHAR(255) NOT NULL,
		a_type VARCHAR(255)
	);


CREATE TABLE tag_parents (
		tag_id INT8 NOT NULL,
		parents_id INT8 NOT NULL
	);

