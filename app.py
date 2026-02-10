from flask import Flask, request, jsonify, session, send_from_directory, redirect
import sqlite3
import bcrypt

app = Flask(__name__, static_folder=".")
app.secret_key = "card_secret"

# ---------- DATABASE ----------
def init_db():
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        age INTEGER,
        email TEXT,
        phone TEXT,
        password TEXT,
        avatar TEXT
    )
    """)

    conn.commit()
    conn.close()

def ensure_user_stats_columns():
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()

    cursor.execute("PRAGMA table_info(users)")
    existing_columns = [col[1] for col in cursor.fetchall()]

    if "avatar" not in existing_columns:
        cursor.execute("ALTER TABLE users ADD COLUMN avatar TEXT")

    if "games_played" not in existing_columns:
        cursor.execute("ALTER TABLE users ADD COLUMN games_played INTEGER DEFAULT 0")

    if "games_won" not in existing_columns:
        cursor.execute("ALTER TABLE users ADD COLUMN games_won INTEGER DEFAULT 0")

    if "total_score" not in existing_columns:
        cursor.execute("ALTER TABLE users ADD COLUMN total_score INTEGER DEFAULT 0")

    conn.commit()
    conn.close()

init_db()
ensure_user_stats_columns()



# ---------- SERVE PAGE ----------
@app.route("/")
def home():
    return send_from_directory(".", "index.html")


@app.route("/<path:path>")
def static_files(path):
    return send_from_directory(".", path)


@app.route("/main")
def main_page():

    if "user" not in session:
        return "Unauthorized", 401

    return send_from_directory(".", "main.html")


@app.route("/avatar")
def avatar_page():
    if "user" not in session:
        return redirect("/")

    return send_from_directory(".", "avatar.html")


@app.route("/lobby")
def lobby_page():
    if "user" not in session:
        return redirect("/")
    return send_from_directory(".", "lobby.html")



# ---------- SIGNUP ----------
@app.route("/signup", methods=["POST"])
def signup():
    try:
        data = request.get_json()

        username = data["username"]
        age = data["age"]
        email = data["email"]
        phone = data["phone"]
        password = data["password"]

        hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt())

        conn = sqlite3.connect("database.db")
        cursor = conn.cursor()

        cursor.execute("""
        INSERT INTO users(username, age, email, phone, password)
        VALUES (?, ?, ?, ?, ?)
        """, (username, age, email, phone, hashed))

        conn.commit()
        conn.close()

        return jsonify({"message": "Signup success"})

    except Exception as e:
        print(e)
        return jsonify({"error": "Signup failed"}), 400



# ---------- LOGIN ----------
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data["username"]
    password = data["password"]

    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE username=?", (username,))
    user = cursor.fetchone()
    conn.close()

    if user and bcrypt.checkpw(password.encode(), user[5]):
        session["user"] = username

        if user[6] is None:   # avatar column
            return jsonify({"redirect": "avatar"})

        return jsonify({"redirect": "main"})




#-------- AVTAR ---------------

@app.route("/save-avatar", methods=["POST"])
def save_avatar():

    if "user" not in session:
        return jsonify({"error": "Unauthorized"}), 401

    data = request.get_json()
    avatar = data["avatar"]
    username = session["user"]

    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()

    cursor.execute(
        "UPDATE users SET avatar=? WHERE username=?",
        (avatar, username)
    )

    conn.commit()
    conn.close()

    return jsonify({"message": "Avatar saved"})




@app.route("/get-user")
def get_user():

    if "user" not in session:
        return jsonify({"error": "Unauthorized"}), 401

    username = session["user"]

    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()

    cursor.execute("SELECT username, avatar FROM users WHERE username=?", (username,))
    user = cursor.fetchone()

    conn.close()

    return jsonify({
        "username": user[0],
        "avatar": user[1]
    })




@app.route("/profile-data")
def profile_data():

    if "user" not in session:
        return jsonify({"error":"Unauthorized"}), 401

    username = session["user"]

    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()

    cursor.execute("""
        SELECT username, avatar, games_played, games_won, total_score
        FROM users WHERE username=?
    """, (username,))

    user = cursor.fetchone()
    conn.close()

    return jsonify({
        "username": user[0],
        "avatar": user[1],
        "games_played": user[2],
        "games_won": user[3],
        "total_score": user[4]
    })


@app.route("/save-game-result", methods=["POST"])
def save_game_result():

    if "user" not in session:
        return jsonify({"error": "Unauthorized"}), 401

    data = request.get_json()

    player_score = data["playerScore"]
    computer_scores = data["computerScores"]

    username = session["user"]

    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()

    # update games played + total score
    cursor.execute("""
        UPDATE users
        SET games_played = games_played + 1,
            total_score = total_score + ?
        WHERE username = ?
    """, (player_score, username))

    # check if player won
    if player_score >= max(computer_scores):
        cursor.execute("""
            UPDATE users
            SET games_won = games_won + 1
            WHERE username = ?
        """, (username,))

    conn.commit()
    conn.close()

    return jsonify({"message": "Game result saved"})




if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

