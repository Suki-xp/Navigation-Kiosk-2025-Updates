#Class is responibile for translated the closure data for the campus 
#and display on the campus map

import requests
import json
import datetime
import schedule
import time

def running():
    #This sets the url so it can be called later through the json
    service_url = 'https://arcgis-central.gis.vt.edu/arcgis/rest/services/facilities/Construction_Closures/FeatureServer'   

    #This is supposed to hold the ids for the type of closure data that is stored
    #Currently it will grab that current closures and when future closures and currently going to be displayed
    scheduling = [
        {'id': 0, 'type': 'Current'},
        {'id': 1, 'type': 'Scheduled'}
    ]

    closures = []

    #Used to convert the time format of the data properly to readable human time 
    def format_time(format_time):
        if format_time is None:
            return 'N/A'
        return datetime.datetime.fromtimestamp(format_time / 1000).strftime('%Y-%m-%d %H:%M:%S')

    #Creates the URl that can be scrapped 
    def scrape_layer(layer_info):
        query_url = f"{service_url}/{layer_info['id']}/query"
        params = {
            'where': '1=1',
            'outFields': '*',
            'returnGeometry': 'false',
            'f': 'json'
        }
        #This first attempt is sending the HTTP request to make sure that it 
        #was recieved, as that means it connected correctly to the website and
        #can begin the data parsing
        try:
            response = requests.get(query_url, params=params)
            response.raise_for_status()
            data = response.json()
        
            #A check to make sure that response of the cars being scanned contained the correct data 
            #tied to them in the correct format or not
            if 'features' not in data:
                print(f"No features found for layer {layer_info['id']} ({layer_info['type']})")
                return
            #This takes that idea and just loops through before constructing the format
            for feature in data['features']:
                attr = feature['attributes']
                closure_data = {
                    "id": attr.get('objectid', 'N/A'),
                    "name": attr.get('constructionsite', 'N/A'),
                    "type": layer_info['type'],
                    "details": {
                        "Closure Start Date": format_time(attr.get('closurestartdate')),
                        "Closure End Date": format_time(attr.get('closureenddate')),
                        "COMMENTS": attr.get('comments', 'N/A'), 
                        "More Information": attr.get('url', 'N/A')
                    }
                }
                closures.append(closure_data)
                print(f"Successfully scraped all the closure_data")
    
        except requests.exceptions.RequestException as e:
            print(f"Scrapping couldn;t be done due to {layer_info['id']}: {e}")

    #This is basically the main loop that tells it to repeat the scrapping function
    #for all the other closure cards on the map
    for layer in scheduling:
        scrape_layer(layer)

    #Saves the data into the JSON which can then be queued into our map implementation later
    with open("../../../appUpdates/appData/closures.json", "w", encoding="utf-8") as f:
        json.dump(closures, f, ensure_ascii=False, indent=4)
        
    print(f"Formatted to both JSON file")
    
#This will run and update the closure data every 15 minutes on the website
if __name__ == "__main__":
    running()
    schedule.every(15).minutes.do(running)
    
    while True:
        schedule.run_pending()
        time.sleep(1)