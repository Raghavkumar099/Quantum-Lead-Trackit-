<svg viewBox="0 0 1800 1100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <path d="M0,0 L0,6 L9,3 z" fill="#000" />
    </marker>
  </defs>

  <text x="900" y="30" font-size="24" font-weight="bold" text-anchor="middle" fill="#1e3a8a">
    AI WORKFLOW FOR RAILWAY SECTION THROUGHPUT OPTIMIZATION
  </text>
  <text x="900" y="55" font-size="16" text-anchor="middle" fill="#666">
    SYSTEM WIRE FRAMES - COMPLETE WORKFLOW
  </text>

  <g id="data-gathering">
    <rect x="50" y="100" width="280" height="300" fill="#fff" stroke="#3b82f6" stroke-width="3" rx="5"/>
    <text x="190" y="85" font-size="14" font-weight="bold" text-anchor="middle">Data Gathering Layer</text>
    
    <rect x="60" y="110" width="260" height="35" fill="#3b82f6" stroke="#000" stroke-width="1"/>
    <text x="190" y="133" font-size="12" font-weight="bold" text-anchor="middle" fill="#fff">Data Sources Dashboard</text>
    
    <text x="70" y="165" font-size="11" font-weight="bold">Active Data Feeds:</text>
    
    <rect x="70" y="175" width="240" height="35" fill="#e6f7ff" stroke="#3b82f6" stroke-width="1" rx="2"/>
    <text x="80" y="192" font-size="9" font-weight="bold">Historical CSV Data</text>
    <text x="80" y="204" font-size="8" fill="#666">OGD Portal - Last sync: 10 min ago</text>
    
    <rect x="70" y="215" width="240" height="35" fill="#e6f7ff" stroke="#3b82f6" stroke-width="1" rx="2"/>
    <text x="80" y="232" font-size="9" font-weight="bold">Real-time API Feed</text>
    <text x="80" y="244" font-size="8" fill="#666">Live data - Update: 30 sec intervals</text>
    
    <rect x="70" y="255" width="240" height="35" fill="#e6f7ff" stroke="#3b82f6" stroke-width="1" rx="2"/>
    <text x="80" y="272" font-size="9" font-weight="bold">Digital Twin Simulator</text>
    <text x="80" y="284" font-size="8" fill="#666">Status: Running - 50 trains simulated</text>
    
    <text x="70" y="310" font-size="11" font-weight="bold">Data Collected:</text>
    <text x="80" y="328" font-size="9">Train Info: 142 active trains</text>
    <text x="80" y="343" font-size="9">Station Info: 45 stations</text>
    <text x="80" y="358" font-size="9">Section Info: 23 sections</text>
    
    <rect x="70" y="370" width="240" height="25" fill="#3b82f6" stroke="#000" stroke-width="1" rx="3"/>
    <text x="190" y="387" font-size="10" font-weight="bold" text-anchor="middle" fill="#fff">VIEW RAW DATA</text>
    
    <circle cx="335" cy="250" r="18" fill="#fff" stroke="#3b82f6" stroke-width="3"/>
    <text x="335" y="257" font-size="14" font-weight="bold" text-anchor="middle" fill="#3b82f6">1</text>
  </g>

  <g id="etl-processing">
    <rect x="400" y="100" width="280" height="300" fill="#fff" stroke="#10b981" stroke-width="3" rx="5"/>
    <text x="540" y="85" font-size="14" font-weight="bold" text-anchor="middle">Storage and Processing</text>
    
    <rect x="410" y="110" width="260" height="35" fill="#10b981" stroke="#000" stroke-width="1"/>
    <text x="540" y="133" font-size="12" font-weight="bold" text-anchor="middle" fill="#fff">ETL Pipeline Status</text>
    
    <text x="420" y="165" font-size="11" font-weight="bold">Pipeline Activity:</text>
    
    <rect x="420" y="175" width="250" height="40" fill="#e6ffe6" stroke="#10b981" stroke-width="1" rx="2"/>
    <text x="430" y="190" font-size="9" font-weight="bold">EXTRACT</text>
    <text x="430" y="203" font-size="8" fill="#666">Fetching from API and Simulator</text>
    <rect x="620" y="182" width="40" height="18" fill="#10b981" stroke="#000" stroke-width="1" rx="2"/>
    <text x="640" y="195" font-size="8" font-weight="bold" text-anchor="middle" fill="#fff">ACTIVE</text>
    
    <rect x="420" y="220" width="250" height="40" fill="#e6ffe6" stroke="#10b981" stroke-width="1" rx="2"/>
    <text x="430" y="235" font-size="9" font-weight="bold">TRANSFORM</text>
    <text x="430" y="248" font-size="8" fill="#666">Cleaning and Feature Engineering</text>
    <rect x="620" y="227" width="40" height="18" fill="#10b981" stroke="#000" stroke-width="1" rx="2"/>
    <text x="640" y="240" font-size="8" font-weight="bold" text-anchor="middle" fill="#fff">ACTIVE</text>
    
    <rect x="420" y="265" width="250" height="40" fill="#e6ffe6" stroke="#10b981" stroke-width="1" rx="2"/>
    <text x="430" y="280" font-size="9" font-weight="bold">LOAD</text>
    <text x="430" y="293" font-size="8" fill="#666">Writing to PostgreSQL</text>
    <rect x="620" y="272" width="40" height="18" fill="#10b981" stroke="#000" stroke-width="1" rx="2"/>
    <text x="640" y="285" font-size="8" font-weight="bold" text-anchor="middle" fill="#fff">ACTIVE</text>
    
    <text x="420" y="325" font-size="11" font-weight="bold">Database Stats:</text>
    <text x="430" y="343" font-size="9">Records processed: 1.2M</text>
    <text x="430" y="358" font-size="9">Storage used: 45 GB</text>
    
    <rect x="420" y="370" width="250" height="25" fill="#10b981" stroke="#000" stroke-width="1" rx="3"/>
    <text x="540" y="387" font-size="10" font-weight="bold" text-anchor="middle" fill="#fff">VIEW DATABASE</text>
    
    <circle cx="685" cy="250" r="18" fill="#fff" stroke="#10b981" stroke-width="3"/>
    <text x="685" y="257" font-size="14" font-weight="bold" text-anchor="middle" fill="#10b981">2</text>
  </g>

  <g id="digital-twin">
    <rect x="750" y="100" width="280" height="300" fill="#fff" stroke="#a855f7" stroke-width="3" rx="5"/>
    <text x="890" y="85" font-size="14" font-weight="bold" text-anchor="middle">Digital Twin Simulation</text>
    
    <rect x="760" y="110" width="260" height="35" fill="#a855f7" stroke="#000" stroke-width="1"/>
    <text x="890" y="133" font-size="12" font-weight="bold" text-anchor="middle" fill="#fff">Simulation Control Panel</text>
    
    <text x="770" y="165" font-size="11" font-weight="bold">Current Scenario:</text>
    
    <rect x="770" y="175" width="250" height="55" fill="#f0e6ff" stroke="#a855f7" stroke-width="1" rx="2"/>
    <text x="780" y="192" font-size="9" font-weight="bold">Test: Add 2 more trains to NDLS-GZB</text>
    <text x="780" y="207" font-size="8" fill="#666">Current: 16 trains/hour</text>
    <text x="780" y="220" font-size="8" fill="#666">Simulated: 18 trains/hour</text>
    
    <text x="770" y="245" font-size="11" font-weight="bold">Simulation Results:</text>
    
    <rect x="770" y="255" width="250" height="25" fill="#f0e6ff" stroke="#a855f7" stroke-width="1" rx="2"/>
    <text x="780" y="271" font-size="9">Congestion: +23% (High Risk)</text>
    
    <rect x="770" y="285" width="250" height="25" fill="#f0e6ff" stroke="#a855f7" stroke-width="1" rx="2"/>
    <text x="780" y="301" font-size="9">Avg Delay: +8 minutes</text>
    
    <rect x="770" y="315" width="250" height="25" fill="#ffe6e6" stroke="#ef4444" stroke-width="1" rx="2"/>
    <text x="780" y="331" font-size="9" font-weight="bold" fill="#ef4444">Decision: Infrastructure upgrade needed</text>
    
    <rect x="770" y="350" width="118" height="25" fill="#fff" stroke="#a855f7" stroke-width="2" rx="3"/>
    <text x="829" y="367" font-size="10" font-weight="bold" text-anchor="middle" fill="#a855f7">RUN NEW TEST</text>
    
    <rect x="897" y="350" width="123" height="25" fill="#a855f7" stroke="#000" stroke-width="1" rx="3"/>
    <text x="958" y="367" font-size="10" font-weight="bold" text-anchor="middle" fill="#fff">VIEW HISTORY</text>
    
    <circle cx="1035" cy="250" r="18" fill="#fff" stroke="#a855f7" stroke-width="3"/>
    <text x="1035" y="257" font-size="14" font-weight="bold" text-anchor="middle" fill="#a855f7">3</text>
  </g>

  <g id="ai-training">
    <rect x="1100" y="100" width="280" height="300" fill="#fff" stroke="#f97316" stroke-width="3" rx="5"/>
    <text x="1240" y="85" font-size="14" font-weight="bold" text-anchor="middle">AI Training Dashboard</text>
    
    <rect x="1110" y="110" width="260" height="35" fill="#f97316" stroke="#000" stroke-width="1"/>
    <text x="1240" y="133" font-size="12" font-weight="bold" text-anchor="middle" fill="#fff">Model Training Status</text>
    
    <text x="1120" y="165" font-size="11" font-weight="bold">Active Models:</text>
    
    <rect x="1120" y="175" width="250" height="35" fill="#fff0e6" stroke="#f97316" stroke-width="1" rx="2"/>
    <text x="1130" y="192" font-size="9" font-weight="bold">Regression Model</text>
    <text x="1130" y="204" font-size="8" fill="#666">Throughput Prediction - Accuracy: 94.2%</text>
    
    <rect x="1120" y="215" width="250" height="35" fill="#fff0e6" stroke="#f97316" stroke-width="1" rx="2"/>
    <text x="1130" y="232" font-size="9" font-weight="bold">Classification Model</text>
    <text x="1130" y="244" font-size="8" fill="#666">Congestion Risk - Accuracy: 91.8%</text>
    
    <rect x="1120" y="255" width="250" height="35" fill="#fff0e6" stroke="#f97316" stroke-width="1" rx="2"/>
    <text x="1130" y="272" font-size="9" font-weight="bold">RL Agent</text>
    <text x="1130" y="284" font-size="8" fill="#666">Scheduling - Episodes: 2.5M trained</text>
    
    <text x="1120" y="310" font-size="11" font-weight="bold">Training Metrics:</text>
    <text x="1130" y="328" font-size="9">Loss: 0.0042 (converged)</text>
    <text x="1130" y="343" font-size="9">Reward: +142.5 avg</text>
    <text x="1130" y="358" font-size="9">Last update: 5 min ago</text>
    
    <rect x="1120" y="370" width="250" height="25" fill="#f97316" stroke="#000" stroke-width="1" rx="3"/>
    <text x="1240" y="387" font-size="10" font-weight="bold" text-anchor="middle" fill="#fff">RETRAIN MODELS</text>
    
    <circle cx="1385" cy="250" r="18" fill="#fff" stroke="#f97316" stroke-width="3"/>
    <text x="1385" y="257" font-size="14" font-weight="bold" text-anchor="middle" fill="#f97316">4</text>
  </g>

  <g id="prediction">
    <rect x="400" y="470" width="280" height="320" fill="#fff" stroke="#ef4444" stroke-width="3" rx="5"/>
    <text x="540" y="455" font-size="14" font-weight="bold" text-anchor="middle">Real-time Predictions</text>
    
    <rect x="410" y="480" width="260" height="35" fill="#ef4444" stroke="#000" stroke-width="1"/>
    <text x="540" y="503" font-size="12" font-weight="bold" text-anchor="middle" fill="#fff">Live Inference Dashboard</text>
    
    <text x="420" y="535" font-size="11" font-weight="bold">Current State (NDLS-GZB):</text>
    <text x="430" y="553" font-size="9">Trains in section: 14</text>
    <text x="430" y="568" font-size="9">Avg speed: 72 km/h</text>
    <text x="430" y="583" font-size="9">Weather: Light fog</text>
    <text x="430" y="598" font-size="9">Time: 8:30 AM (Peak hour)</text>
    
    <text x="420" y="620" font-size="11" font-weight="bold">ML Predictions (next 60 min):</text>
    
    <rect x="420" y="630" width="250" height="25" fill="#ffe6e6" stroke="#ef4444" stroke-width="1" rx="2"/>
    <text x="430" y="646" font-size="9">Expected throughput: 16.2 trains/hr</text>
    
    <rect x="420" y="660" width="250" height="25" fill="#fff0e6" stroke="#f97316" stroke-width="1" rx="2"/>
    <text x="430" y="676" font-size="9">Congestion risk: Medium (75%)</text>
    
    <rect x="420" y="690" width="250" height="25" fill="#ffe6e6" stroke="#ef4444" stroke-width="1" rx="2"/>
    <text x="430" y="706" font-size="9">Bottleneck: KM 23 (signal junction)</text>
    
    <rect x="420" y="730" width="118" height="25" fill="#fff" stroke="#ef4444" stroke-width="2" rx="3"/>
    <text x="479" y="747" font-size="10" font-weight="bold" text-anchor="middle" fill="#ef4444">REFRESH</text>
    
    <rect x="547" y="730" width="123" height="25" fill="#ef4444" stroke="#000" stroke-width="1" rx="3"/>
    <text x="608" y="747" font-size="10" font-weight="bold" text-anchor="middle" fill="#fff">GET ACTIONS</text>
    
    <circle cx="685" cy="640" r="18" fill="#fff" stroke="#ef4444" stroke-width="3"/>
    <text x="685" y="647" font-size="14" font-weight="bold" text-anchor="middle" fill="#ef4444">5</text>
  </g>

  <g id="recommendations">
    <rect x="750" y="470" width="280" height="320" fill="#fff" stroke="#6366f1" stroke-width="3" rx="5"/>
    <text x="890" y="455" font-size="14" font-weight="bold" text-anchor="middle">AI Recommendations</text>
    
    <rect x="760" y="480" width="260" height="35" fill="#6366f1" stroke="#000" stroke-width="1"/>
    <text x="890" y="503" font-size="12" font-weight="bold" text-anchor="middle" fill="#fff">RL Agent Suggestions</text>
    
    <text x="770" y="535" font-size="11" font-weight="bold">Recommended Actions:</text>
    
    <rect x="770" y="545" width="250" height="45" fill="#f0f0ff" stroke="#6366f1" stroke-width="1" rx="2"/>
    <text x="780" y="562" font-size="9" font-weight="bold">1. Delay Train #12345 by 3 min at NDLS</text>
    <text x="780" y="577" font-size="8" fill="#047857">Expected impact: +0.8 trains/hr</text>
    
    <rect x="770" y="595" width="250" height="45" fill="#f0f0ff" stroke="#6366f1" stroke-width="1" rx="2"/>
    <text x="780" y="612" font-size="9" font-weight="bold">2. Increase priority Express #67890</text>
    <text x="780" y="627" font-size="8" fill="#047857">Expected impact: +0.4 trains/hr</text>
    
    <rect x="770" y="645" width="250" height="45" fill="#f0f0ff" stroke="#6366f1" stroke-width="1" rx="2"/>
    <text x="780" y="662" font-size="9" font-weight="bold">3. Reroute Local #11111 to alt platform</text>
    <text x="780" y="677" font-size="8" fill="#047857">Expected impact: +0.2 trains/hr</text>
    
    <rect x="770" y="700" width="250" height="30" fill="#e6ffe6" stroke="#047857" stroke-width="1" rx="2"/>
    <text x="890" y="721" font-size="10" font-weight="bold" text-anchor="middle" fill="#047857">Total Expected: +1.4 trains/hr</text>
    
    <rect x="770" y="740" width="118" height="25" fill="#fff" stroke="#6366f1" stroke-width="2" rx="3"/>
    <text x="829" y="757" font-size="10" font-weight="bold" text-anchor="middle" fill="#6366f1">TEST IN SIM</text>
    
    <rect x="897" y="740" width="123" height="25" fill="#6366f1" stroke="#000" stroke-width="1" rx="3"/>
    <text x="958" y="757" font-size="10" font-weight="bold" text-anchor="middle" fill="#fff">APPLY NOW</text>
    
    <circle cx="1035" cy="640" r="18" fill="#fff" stroke="#6366f1" stroke-width="3"/>
    <text x="1035" y="647" font-size="14" font-weight="bold" text-anchor="middle" fill="#6366f1">6</text>
  </g>

  <g id="scalability">
    <rect x="1100" y="470" width="280" height="320" fill="#fff" stroke="#0891b2" stroke-width="3" rx="5"/>
    <text x="1240" y="455" font-size="14" font-weight="bold" text-anchor="middle">System Scalability</text>
    
    <rect x="1110" y="480" width="260" height="35" fill="#0891b2" stroke="#000" stroke-width="1"/>
    <text x="1240" y="503" font-size="12" font-weight="bold" text-anchor="middle" fill="#fff">Deployment Overview</text>
    
    <text x="1120" y="535" font-size="11" font-weight="bold">Current Deployment:</text>
    
    <rect x="1120" y="545" width="250" height="35" fill="#e6f7ff" stroke="#0891b2" stroke-width="1" rx="2"/>
    <text x="1130" y="562" font-size="9" font-weight="bold">Scale: MEDIUM (Zone Level)</text>
    <text x="1130" y="574" font-size="8" fill="#666">Northern Railway Zone</text>
    
    <text x="1120" y="595" font-size="11" font-weight="bold">Infrastructure Stats:</text>
    <text x="1130" y="613" font-size="9">Stations: 52 active</text>
    <text x="1130" y="628" font-size="9">Sections: 218 monitored</text>
    <text x="1130" y="643" font-size="9">Trains: 5,247 per day</text>
    <text x="1130" y="658" font-size="9">DB: Master-Slave setup</text>
    <text x="1130" y="673" font-size="9">Kafka throughput: 125K msgs/sec</text>
    
    <text x="1120" y="695" font-size="11" font-weight="bold">Performance:</text>
    <text x="1130" y="713" font-size="9">Throughput gain: +17.8%</text>
    <text x="1130" y="728" font-size="9">Uptime: 99.7%</text>
    
    <rect x="1120" y="740" width="250" height="25" fill="#0891b2" stroke="#000" stroke-width="1" rx="3"/>
    <text x="1240" y="757" font-size="10" font-weight="bold" text-anchor="middle" fill="#fff">EXPAND TO PAN-INDIA</text>
    
    <circle cx="1385" cy="640" r="18" fill="#fff" stroke="#0891b2" stroke-width="3"/>
    <text x="1385" y="647" font-size="14" font-weight="bold" text-anchor="middle" fill="#0891b2">7</text>
  </g>

  <g id="control-room">
    <rect x="50" y="470" width="280" height="320" fill="#fff" stroke="#047857" stroke-width="3" rx="5"/>
    <text x="190" y="455" font-size="14" font-weight="bold" text-anchor="middle">Control Room Display</text>
    
    <rect x="60" y="480" width="260" height="35" fill="#047857" stroke="#000" stroke-width="1"/>
    <text x="190" y="503" font-size="12" font-weight="bold" text-anchor="middle" fill="#fff">Operator Dashboard</text>
    
    <text x="70" y="535" font-size="11" font-weight="bold">Live System Status:</text>
    
    <rect x="70" y="545" width="120" height="55" fill="#e6ffe6" stroke="#047857" stroke-width="1" rx="2"/>
    <text x="80" y="562" font-size="9" font-weight="bold">Throughput</text>
    <text x="80" y="577" font-size="16" font-weight="bold" fill="#047857">18.2/hr</text>
    <text x="80" y="590" font-size="7" fill="#047857">+12% today</text>
    
    <rect x="200" y="545" width="120" height="55" fill="#fff0e6" stroke="#f97316" stroke-width="1" rx="2"/>
    <text x="210" y="562" font-size="9" font-weight="bold">Active Trains</text>
    <text x="210" y="577" font-size="16" font-weight="bold" fill="#f97316">142</text>
    <text x="210" y="590" font-size="7" fill="#f97316">Normal load</text>
    
    <rect x="70" y="610" width="120" height="55" fill="#ffe6e6" stroke="#ef4444" stroke-width="1" rx="2"/>
    <text x="80" y="627" font-size="9" font-weight="bold">Avg Delay</text>
    <text x="80" y="642" font-size="16" font-weight="bold" fill="#ef4444">6.8 min</text>
    <text x="80" y="655" font-size="7" fill="#047857">-35% today</text>
    
    <rect x="200" y="610" width="120" height="55" fill="#f0e6ff" stroke="#a855f7" stroke-width="1" rx="2"/>
    <text x="210" y="627" font-size="9" font-weight="bold">AI Actions</text>
    <text x="210" y="642" font-size="16" font-weight="bold" fill="#a855f7">23</text>
    <text x="210" y="655" font-size="7" fill="#a855f7">Last hour</text>
    
    <text x="70" y="685" font-size="11" font-weight="bold">Recent AI Actions:</text>
    <text x="80" y="703" font-size="8">08:45 - Train #12345 delayed 3 min</text>
    <text x="80" y="718" font-size="8">08:42 - Priority to Express #67890</text>
    <text x="80" y="733" font-size="8">08:38 - Platform reassignment #11111</text>
    
    <rect x="70" y="745" width="120" height="25" fill="#fff" stroke="#047857" stroke-width="2" rx="3"/>
    <text x="130" y="762" font-size="10" font-weight="bold" text-anchor="middle" fill="#047857">OVERRIDE</text>
    
    <rect x="200" y="745" width="120" height="25" fill="#047857" stroke="#000" stroke-width="1" rx="3"/>
    <text x="260" y="762" font-size="10" font-weight="bold" text-anchor="middle" fill="#fff">AUTO MODE</text>
    
    <circle cx="335" cy="640" r="18" fill="#fff" stroke="#047857" stroke-width="3"/>
    <text x="335" y="647" font-size="14" font-weight="bold" text-anchor="middle" fill="#047857">8</text>
  </g>

  <path d="M 335 270 L 395 250" stroke="#000" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
  <path d="M 685 270 L 745 250" stroke="#000" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
  <path d="M 1035 270 L 1095 250" stroke="#000" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
  <path d="M 540 400 L 540 465" stroke="#000" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
  <path d="M 680 630 L 745 630" stroke="#000" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
  <path d="M 1035 660 L 1095 660" stroke="#000" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
  <path d="M 890 400 L 890 465" stroke="#000" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
  <path d="M 330 630 L 395 630" stroke="#000" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
  <path d="M 190 400 L 190 465" stroke="#000" stroke-width="2" fill="none" marker-end="url(#arrow)"/>

  <text x="365" y="260" font-size="9" fill="#666">ETL</text>
  <text x="715" y="260" font-size="9" fill="#666">Simulate</text>
  <text x="1065" y="260" font-size="9" fill="#666">Train</text>
  <text x="548" y="445" font-size="9" fill="#666">Predict</text>
  <text x="715" y="625" font-size="9" fill="#666">Actions</text>
  <text x="898" y="445" font-size="9" fill="#666">Optimize</text>
  <text x="365" y="625" font-size="9" fill="#666">Display</text>
</svg>