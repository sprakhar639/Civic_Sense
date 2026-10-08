# CivicSense

CivicSense is a computer-vision-based civic issue monitoring system.

The system uses continuous CCTV feeds to detect civic issues such as potholes and garbage using YOLO, track detected objects, create incidents, and display them through a monitoring dashboard.

## Core Flow

CCTV Feed
→ Frame Sampling
→ YOLO Detection
→ Confidence Filtering
→ Object Tracking
→ Temporal Confirmation
→ Incident Management
→ MongoDB
→ Dashboard
