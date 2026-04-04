# TrackIT: AI-Powered Train Traffic Control System

## Project Overview

TrackIT is an AI-powered traffic control system designed for the Indian railway network, focusing on maximizing section throughput and minimizing delays using real-time AI decisions. The project includes a simulation engine, predictive analytics, and a modern dashboard for operators and passengers.

## Features

- **Dynamic Traffic Management:** Real-time AI-driven scheduling and delay reduction.
- **Intelligent Control Dashboard:** Live monitoring, single-click control, and AI recommendations.
- **Predictive Disruption Handling:** Delay prediction and alternate route suggestions.
- **Conflict-Free Path Planning:** Automatic, safe, and collision-free train path generation.
- **What-If Simulation Analysis:** Scenario testing for disruptions and failures.
- **Live Signaling and Track View:** Graphical map of trains, tracks, and signals.
- **Comprehensive Reporting:** Performance analytics and efficiency monitoring.

## Directory Structure

- **/UI/**: Next.js frontend app for dashboards, visualizations, and operator controls.
- **/visualizations_results/**: Output images and diagrams from simulation and analytics.
- **.csv files**: Datasets for simulation, training, and real-time data.
- **simulation.ipynb**: Jupyter notebook for synthetic data generation and throughput simulation.
- **throughput_model.ipynb**: Model training and evaluation notebook.

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS, Radix UI
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **ML/Simulation:** Python (pandas, numpy, scikit-learn, matplotlib, joblib, Constrained Deep Reinforcement Learning (PPO + Safety Layer))
- **Deployment:** Render

## Setup Instructions

1. **Clone the Repository:**
   ```bash
   git clone <repo-url>
   cd Quantum-Lead-Trackit-
   ```
2. **Install Node.js & Python:**
   - Download and install [Node.js](https://nodejs.org/)
   - Ensure Python 3.8+ is installed
3. **Install Frontend Dependencies:**
   ```bash
   cd UI
   npm install
   # or
   pnpm install
   ```
4. **Start the Frontend:**
   ```bash
   npm run dev
   ```
5. **Run Simulations/ML Notebooks:**
   - Open `simulation.ipynb` and `throughput_model.ipynb` in Jupyter or VS Code
   - Ensure required Python packages are installed:
     ```bash
     pip install pandas numpy matplotlib scikit-learn joblib
     ```
   - Run all cells for data generation, simulation, and model training
6. **Data Files:**
   - Place all `.csv` files in the project root as provided

## Team

- Raghav Kumar
- Subham

## Useful Links

- [Prototype](https://youtu.be/Sahed24SbGk)
