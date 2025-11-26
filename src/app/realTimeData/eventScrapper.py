from bs4 import BeautifulSoup
from selenium import webdriver
import schedule
import time
import json

#Scrapper class that get the event information from the website
def scrapperEvents():
    #options on loading the driver
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')
    
    event_urls = webdriver.Chrome(options=options)
    event_urls.get("https://gobblerconnect.vt.edu/events")
    
    #Next we want to parse the url request through html format 
    #after the url is fetehced by the driver
    time.sleep(3)
    event_soup = BeautifulSoup(event_urls.page_source, "html.parser")
    event_urls.quit()
    
    #Then we want to find the html that contains the dev for the event 
    #card information 
    event_info = event_soup.find_all('div', class_='MuiPaper-root MuiCard-root MuiPaper-elevation3 MuiPaper-rounded')
    data = []
    
    #Now we need to loop through the elements of the hmtl to get the specific information of the info
    for events in event_info:
        
        event_title_tag = events.find('h3')
        if event_title_tag:
            event_title = event_title_tag.get_text(strip=True)
        else:   
            event_title = "N/A"
        
        #Unlike the h3 element that is properly nested, this text is contained within a hidden svg from the element
        #so we need to find the parent-div of it and then strip it for text
        event_date = ""
        event_location = ""
        
        #Additionally since both contain the svg tag, for the date and location they need to be stepped in differently
        #by finding all the instances that the different data is stored under same tag
        event_date_and_location_tag = events.find_all('svg')
        
        for find_data in event_date_and_location_tag:
            event_date_location_text = find_data.parent
            
            #Now we can parse through and check by how the text is wordered to differeinate the svg calls
            #through the multi label tag (in this case they both under the aria-label tag)
            multi_label_tag = event_date_location_text.get('aria-label', '')
            
            #Once all the html elements are found we can parse inside of them to get the information
            if "happening on" in multi_label_tag:
                event_date = event_date_location_text.get_text(strip=True)
            elif "located at" in multi_label_tag:
                event_location = event_date_location_text.get_text(strip=True)
            
        #Addding the informtation to an array that can be return
        data.append({"Title": event_title, 
                     "Date": event_date, 
                     "Location": event_location})
    
    #Then we write our saved data to a json which can later be translated to the react
    with open("../../../appUpdates/appData/events.json", mode="w", encoding="utf-8") as file:
        json.dump(data, file, indent=3)
        
    print("Events were added to json")
        
#Have it update every 15 minutes with new events to display
schedule.every(15).minutes.do(scrapperEvents)

if __name__ == "__main__":
    scrapperEvents()
    while True:
        schedule.run_pending()
        time.sleep(1)