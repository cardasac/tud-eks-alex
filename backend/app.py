from flask import Flask
import os
import psycopg
import logging


app = Flask(__name__)

@app.route("/")
def hello_world():
    # Connect to an existing database
    with psycopg.connect(os.getenv("DB_URI")) as conn:
        # Open a cursor to perform database operations
        with conn.cursor() as cur:

            # Execute a command: this creates a new table
            # cur.execute("""
            #     CREATE TABLE test (
            #         id serial PRIMARY KEY,
            #         num integer,
            #         data text)
            #     """)

            # # Pass data to fill a query placeholders and let Psycopg perform
            # # the correct conversion (no SQL injections!)
            cur.execute(
                "INSERT INTO test (num, data) VALUES (%s, %s)",
                (100, "abc'def"))

            # Query the database and obtain data as Python objects.
            cur.execute("SELECT * FROM test")
            cur.fetchone()
            # will return (1, 100, "abc'def")

            # You can use `cur.fetchmany()`, `cur.fetchall()` to return a list
            # of several records, or even iterate on the cursor
            for record in cur:
                print(record)
                result = record

            # Make the changes to the database persistent
            conn.commit()
    return str(result)


if __name__ == '__main__':
	app.run(host='0.0.0.0', port=8080)