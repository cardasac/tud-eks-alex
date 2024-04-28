from flask import Flask, jsonify
import os
import psycopg


app = Flask(__name__)
DB_URI = os.getenv("DB_URI")

@app.post("/<text>")
def add_product(text):
    with psycopg.connect(DB_URI) as conn:
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO products (description) VALUES (%s)",
                (text,))
            conn.commit()

    return jsonify(status = "success"), 200

@app.get("/")
def view_products():
    with psycopg.connect(DB_URI) as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM products")

            return cur.fetchall()

@app.delete("/<id>")
def delete_product(id):
    with psycopg.connect(DB_URI) as conn:
        with conn.cursor() as cur:
            cur.execute(
                "DELETE FROM products WHERE id = %s",
                (id,))
            conn.commit()

    return jsonify(status = "success"), 200

if __name__ == '__main__':
	app.run(host='0.0.0.0', port=8080, use_reloader=True)
