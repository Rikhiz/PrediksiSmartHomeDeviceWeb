import sqlite3
from datetime import datetime

def init_db():
    conn = sqlite3.connect('predictions.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS predictions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            device_type TEXT NOT NULL,
            usage_hours_per_day REAL NOT NULL,
            energy_consumption REAL NOT NULL,
            user_preferences TEXT NOT NULL,
            malfunction_incidents INTEGER NOT NULL,
            device_age_months INTEGER NOT NULL,
            prediction TEXT NOT NULL,
            timestamp DATETIME NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

def save_prediction(data):
    conn = sqlite3.connect('predictions.db')
    c = conn.cursor()
    c.execute('''
        INSERT INTO predictions (
            device_type, 
            usage_hours_per_day, 
            energy_consumption, 
            user_preferences, 
            malfunction_incidents,
            device_age_months,
            prediction,
            timestamp
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        data['DeviceType'],
        float(data['UsageHoursPerDay']),
        float(data['EnergyConsumption']),
        data['UserPreferences'],
        int(data['MalfunctionIncidents']),
        int(data['DeviceAgeMonths']),
        data['prediction'],
        datetime.now().isoformat()
    ))
    conn.commit()
    conn.close()

def get_predictions():
    conn = sqlite3.connect('predictions.db')
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    c.execute('SELECT * FROM predictions ORDER BY timestamp DESC')
    rows = c.fetchall()
    predictions = [{
        'id': row['id'],
        'deviceType': row['device_type'],
        'usageHoursPerDay': row['usage_hours_per_day'],
        'energyConsumption': row['energy_consumption'],
        'userPreferences': row['user_preferences'],
        'malfunctionIncidents': row['malfunction_incidents'],
        'deviceAgeMonths': row['device_age_months'],
        'prediction': row['prediction'],
        'timestamp': row['timestamp']
    } for row in rows]
    conn.close()
    return predictions