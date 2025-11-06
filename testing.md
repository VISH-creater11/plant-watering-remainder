# ✅ Testing Report — Plant Watering Reminder System

## 1) Add Plant Test
**Steps:**
1. Open index.html in browser
2. Enter plant details
3. Click "Add Plant"

**Expected Result:**
Plant card should appear in dashboard

**Status:** ✅ Passed


## 2) Plant Data Storage Test
**Steps:**
1. Add a plant
2. Refresh page

**Expected Result:**
Plant details remain visible

**Status:** ✅ Passed


## 3) Overdue / Due Calculation Test
**Steps:**
1. Add plant with past last-watered date
2. Set short interval

**Expected Result:**
Status displayed as "Due Soon" / "Overdue"

**Status:** ✅ Passed


## 4) SNS Email Reminder Test
**Steps:**
1. Confirm SNS subscription via email
2. Wait for scheduled EventBridge trigger

**Expected Result:**
Automated email reminding watering

**Status:** ✅ Passed


## 5) UI Test
**Steps:**
1. Navigate through UI
2. Switch table/cards view
3. Search plants

**Expected Result:**
UI responds smoothly

**Status:** ✅ Passed


## Final Test Result
✅ All major functionalities work as expected.
