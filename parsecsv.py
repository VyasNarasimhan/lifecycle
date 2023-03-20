import json

with open('devices.csv', encoding="utf8") as file:
    devices = file.readlines()
    data = []
    for device in devices:
        deviceInfo = [i.strip().replace('\n', '') for i in device.split(',')]
        data.append({'name': deviceInfo[0], 'cost': int(deviceInfo[1]), 'footprint': int(deviceInfo[2]), 'year': int(deviceInfo[3]), 'manufacturer': deviceInfo[4]})
    with open('devices.json', "w", encoding="utf8") as newJson:
        newJson.write(json.dumps(data, indent=2))