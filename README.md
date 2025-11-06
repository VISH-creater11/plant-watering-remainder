# Plant Watering Reminder System  
*A Serverless Cloud-Based Automation Project*

---

## Project Overview
The **Plant Watering Reminder System** is a serverless web application designed to help users efficiently manage and track plant-watering schedules. Users can add plant details such as plant name, watering interval, and last-watered date. The system automatically calculates due or overdue watering reminders and notifies the user via email.

This project demonstrates hands-on experience with **AWS services, cloud automation, and event-driven development**, making it a strong showcase for cloud and full-stack engineering roles.

---

##  Key Features
- Add and manage plant details
- Automated due / overdue watering calculations
- Email notifications for watering reminders
- Daily scheduled checks
- Simple and responsive UI hosted on S3
- Fully serverless – no server maintenance

---

##  Skills Demonstrated
- Serverless application development
- Event-driven architecture
- Frontend development (HTML, CSS, JavaScript)
- AWS service integration
- IAM role configuration
- Cloud hosting & automation
- Scalable solution design

This project highlights strong cloud fundamentals and the ability to build real-world automated workflows—valuable for cloud and software roles.

---

##  Architecture

| Layer | Technology |
|-------|------------|
| Frontend | HTML, CSS, JavaScript |
| Hosting | Amazon S3 |
| Business Logic | AWS Lambda |
| Event Scheduling | Amazon EventBridge |
| Notifications | Amazon SNS |

**Workflow:**  
User inputs → Lambda → EventBridge → Reminder check → SNS email → UI updates  

---

## 🔧 Technologies Used
- **AWS Lambda**
- **Amazon S3**
- **Amazon SNS**
- **Amazon EventBridge**
- **HTML / CSS**
- **JavaScript**

---

##  How It Works
1. User enters plant data via the web interface.
2. The system stores processable plant information.
3. EventBridge triggers Lambda daily to check watering schedules.
4. Lambda determines due or overdue plants.
5. SNS sends email reminders to the user.
6. The UI displays updated plant statuses.

---


