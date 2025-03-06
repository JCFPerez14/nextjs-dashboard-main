from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/api/home', methods=['GET'])
def get_home():
    return jsonify({
        'message': 'Test API to Nextjs',
        'people': ['John', 'Doe', 'Jane', 'Dogee']
        
        })

if __name__ == '__main__':
    app.run(debug=True, port=8080)