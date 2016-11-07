# Jazzercise

Generate endless exercises and practice material

<img height="250" src="http://mindequalsblown.net/wp-content/uploads/2016/06/shutterstock_148740653-600x400.jpg"/>
<img height="250" src="http://www.kingofthegym.com/wp-content/uploads/2013/01/56-yo-lifting-weights-and-trying-to-lose-fat-weight-lifting-q-and-a.jpg"/>

## Installation

Clone the repo
```
git clone git@github.com/gpascale/Jazzercise.git
```

Install client dependencies
```
cd client/
npm install -g webpack
npm install
```

Install Server dependencies
```
cd ../server
<set up and activate a virtualenv / conda environment (recommended)>
pip install -r requirements.txt
```

## Running

Client
```
cd client/
npm run dev
```

Server
```
cd server/
python run-api.py
```
