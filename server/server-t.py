from flask import Flask, jsonify, request
from flask_cors import CORS
import numpy as np
import os
import pickle

# Build the file path relative to this script's directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model_category_path = os.path.join(BASE_DIR, 'model_category.pkl')

with open(model_category_path, 'rb') as f:
    model_category = pickle.load(f)

with open('model_violation.pkl', 'rb') as f:
    model_violation = pickle.load(f)

with open('model_sanction.pkl', 'rb') as f:
    model_sanction = pickle.load(f)

with open('label_encoders.pkl', 'rb') as f:
    label_encoders = pickle.load(f)

with open('tfidf_vectorizer.pkl', 'rb') as f:
    tfidf_vectorizer = pickle.load(f)

print(model_category.get_booster())  # Should not be None
print(model_violation.get_booster())  # Should not be None
print(model_sanction.get_booster())   # Should not be None

app = Flask(__name__)
CORS(app)

def predict_category_violation_sanction(scenario_text, number_of_offense):
    # Step 1: Transform the Scenario text using TF-IDF
    scenario_tfidf = tfidf_vectorizer.transform([scenario_text])
    
    # Step 2: Predict Category
    category_pred = model_category.predict(scenario_tfidf)
    category_label = label_encoders['Category'].inverse_transform([category_pred[0]])[0]
    
    # Step 3: Add predicted Category to TF-IDF features for Violation model
    scenario_tfidf_with_category = np.hstack((scenario_tfidf.toarray(), category_pred.reshape(-1, 1)))
    
    # Step 4: Predict Violation using the combined features
    violation_pred = model_violation.predict(scenario_tfidf_with_category)
    violation_label = label_encoders['Violation'].inverse_transform([violation_pred[0]])[0]
    
    # Step 5: Encode Number of Offense and create feature array for Sanction prediction
    try:
        number_of_offense_encoded = label_encoders['Number of Offense'].transform([number_of_offense])
    except KeyError:
        print("Warning: The 'Number of Offense' encoder is missing from label_encoders. Using default encoding.")
        number_of_offense_encoded = [0]
    
    sanction_features = np.array([[violation_pred[0], number_of_offense_encoded[0]]])
    
    # Step 6: Predict Sanction
    sanction_pred = model_sanction.predict(sanction_features)
    
    try:
        sanction_label = label_encoders['Sanction'].inverse_transform([sanction_pred[0]])[0]
    except KeyError:
        print("Warning: The 'Sanction' encoder is missing from label_encoders. Returning raw prediction.")
        sanction_label = sanction_pred[0]
    
    return {
        "Category": category_label,
        "Violation": violation_label,
        "Sanction": sanction_label
    }

@app.route('/api/home', methods=['GET'])
def get_home():
    return jsonify({
        'message': 'Test API to Nextjs',
        'people': ['John', 'Doe', 'Jane', 'Dogee']
    })

@app.route('/api/predict', methods=['POST'])
def api_predict():
    data = request.get_json()
    if not data or 'scenario_text' not in data or 'number_of_offense' not in data:
        return jsonify({"error": "Please provide 'scenario_text' and 'number_of_offense'"}), 400
    scenario_text = data['scenario_text']
    number_of_offense = data['number_of_offense']
    result = predict_category_violation_sanction(scenario_text, number_of_offense)
    return jsonify(result)

if __name__ == '__main__':
    # Uncomment the following lines if you wish to run in interactive mode
    # print("Welcome to the Predictive Model for Category, Violation, and Sanction!")
    # scenario_input = input("Please enter your scenario: ")
    # number_of_offense_input = 2
    # result = predict_category_violation_sanction(scenario_input, number_of_offense_input)
    # print("Predicted Results for " + scenario_input + " are:")
    # print(f"Category: {result['Category']}")
    # print(f"Violation: {result['Violation']}")
    # print(f"Sanction: {result['Sanction']}")
    
    app.run(debug=True, port=8080)
