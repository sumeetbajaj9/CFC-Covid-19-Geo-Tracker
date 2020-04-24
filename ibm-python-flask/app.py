from flask import Flask, render_template,request,jsonify
from neo4j import GraphDatabase
from flask_cors import CORS
import re, datetime

uri = "neo-4j-uri"
driver = GraphDatabase.driver(uri, auth=("neo4j-username", "neo4j-password"))

app= Flask(__name__)
CORS(app)
@app.route('/app/mobilelogin',methods=['POST'])
def mobile():   
    db = driver.session()
    pid=request.json['pid']
    pin=int(request.json['pin'])
    params={'pid':pid,'pin':pin}
    results = db.run("MATCH(P:Person{pid:$pid,pin:$pin}) RETURN P.pid as PatientID,P.status as PersonStatus",params)
    for record in results:
        if not record['PatientID']:
            status="false"
            response={'status':status}
        else:
            status="true"
            response={'status':status,'pid':record["PatientID"],'personstatus':record["PersonStatus"]}
    return{"response":response}

@app.route('/app/getdatafromdb',methods=['POST'])
def authority():
    return{"response":"Working fine"}


@app.route('/app/markinfectedPerson', methods=['POST'])
def index3():
    db = driver.session()
    name=request.json['ipid']
    params={'pid':name} 
    results=db.run("MATCH(P:Person{pid:$pid}) SET P.status='infected'",params)
    return{'response':"Successfully marked the infected person"}

@app.route('/app/post', methods=['POST'])
def index2():
    db = driver.session()
    name=request.json['pid']
    surname=request.json['date']
    match = re.search('\d{4}-\d{2}-\d{2}', surname)
    date = datetime.datetime.strptime(match.group(), '%Y-%m-%d').date()
    date1=str(date.day)+'/'+str(date.month)+'/'+str(date.year)
    params={'pid':name,'date':date1}
    data=[]
    results=db.run("MATCH(P:Person{pid:$pid}),(OP:Person),(H:Hour),(D:Day{uuid:$date}),(M:Month),(Y:Year),(P)-[r1:AT]->(H)<-[r2:AT]-(OP),(H)<-[:CONTAINS]-(D)<-[:CONTAINS]-(M)<-[:CONTAINS]-(Y)WHERE distance(r1.location,r2.location)<1000 SET OP.status =CASE WHEN distance(r1.location,r2.location)<300 THEN 'quarantine' ELSE 'precaution' END RETURN P.pid as InfectedPerson,OP.pid as NearbyPeople,distance(r1.location,r2.location) as Distance, H.value as TIME,D.value as Day,M.value as Month,Y.value as Year,r2.location.y as Latitude,r2.location.x as Longitude,r1.location.y as IPLatitude,r1.location.x as IPLongitude,OP.status as Status,P.status as IStatus",params)
    for record in results:
        if int(record['TIME'])<12:
            time=str(record['TIME'])+' AM'
        else:
            time=str(record['TIME'])+' PM'
        res={'pid':record['NearbyPeople'],'distance':record['Distance'],'month':record['Month'],'year':record['Year'],'day':record['Day'],'time':time,'latitude':record['Latitude'],'longitude':record['Longitude'],'iplatitude':record['IPLatitude'],'iplongitude':record['IPLongitude'],'ipid':record['InfectedPerson'],'status':record['Status'],'infstatus':record['IStatus']}
        data.append(res)
    return{'response':data}