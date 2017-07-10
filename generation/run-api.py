# Runs the demo API which sets up route to provide the client app with data

from api import app
app.debug = True

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, use_reloader=True, port=3115, passthrough_errors=False, threaded=True)