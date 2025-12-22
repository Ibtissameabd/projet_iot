<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard Température & Humidité</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f0f4f8; padding: 20px; }
        h1 { text-align: center; color: #333; }
        
        /* Styles d'état */
        #dashboardStatus {
            text-align: center;
            font-size: 18px;
            font-weight: bold;
            padding: 15px;
            margin: 20px auto;
            border-radius: 8px;
            color: white;
            max-width: 600px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            transition: background-color 0.5s ease;
        }
        .status-ok { background-color: #28a745; }
        .status-incident { background-color: #dc3545; }

        .container { display: flex; flex-wrap: wrap; justify-content: center; gap: 40px; margin-top: 30px; }
        .card {
            width: 280px;
            background: white;
            border-radius: 12px;
            padding: 25px;
            text-align: center;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            transition: transform 0.2s;
        }
        .card:hover { transform: translateY(-5px); }
        
        .header {
            background: #4da3ff;
            color: white;
            padding: 10px;
            border-radius: 6px;
            margin-bottom: 20px;
            font-size: 1.2em;
        }
        .value { font-size: 42px; font-weight: bold; margin-bottom: 10px; color: #2c3e50; }
        .time { color: #888; font-size: 13px; margin-bottom: 20px; }

        button {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 10px 20px;
            font-size: 14px;
            cursor: pointer;
            border-radius: 6px;
            width: 100%;
            transition: background-color 0.3s ease;
        }
        button:hover { background-color: #0056b3; }
    </style>
</head>

<body>

    <h1>Dashboard Température & Humidité (DHT11)</h1>

    <div id="dashboardStatus" class="status-ok">
        Chargement des données...
    </div>

    <div class="container">
        <div class="card">
            <div class="header">🌡️ Température</div>
            <div id="tempValue" class="value">-- °C</div>
            <div id="tempTime" class="time">--:--:--</div>
            <button onclick="location.href='/graph_temp/'">Voir historique</button>
        </div>

        <div class="card">
            <div class="header">💧 Humidité</div>
            <div id="humValue" class="value">-- %</div>
            <div id="humTime" class="time">--:--:--</div>
            <button onclick="location.href='/graph_hum/'">Voir historique</button>
        </div>
    </div>

    <script src="/static/js/dashboard.js"></script>
</body>
</html>